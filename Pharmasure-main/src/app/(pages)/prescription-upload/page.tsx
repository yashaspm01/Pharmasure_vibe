'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Camera, Loader2, FileCheck2, AlertTriangle, X } from 'lucide-react';
import { analyzeMedicineLabel, type MedicineLabelAnalysisOutput } from '@/ai/flows/medicine-label-analysis';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import type { Scan } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion } from '@/components/ui/accordion';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { saveScan, deleteScan } from '@/services/scan-service';
import { ScanItem } from '@/components/ScanItem';
import { useCollection } from '@/firebase/firestore/use-collection';
import { uploadImageAndGetURL } from '@/services/storage-service';
import { getStorage } from 'firebase/storage';
import { saveMedicationFromScan } from '@/services/medication-service';
import { createDefaultReminder } from '@/services/reminder-service';
import { useRouter } from 'next/navigation';

type Status = 'idle' | 'previewing' | 'processing' | 'success' | 'error' | 'camera';

export default function MedicineScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<MedicineLabelAnalysisOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { user } = useUser();
  const firestore = useFirestore();

  const scansQuery = useMemoFirebase(() => {
    if (user && firestore) {
      return query(
        collection(firestore, 'users', user.uid, 'scans'),
        orderBy('scannedAt', 'desc')
      );
    }
    return null;
  }, [user, firestore]);

  const { data: recentScans, isLoading: isLoadingScans, error: scansError } = useCollection<Scan>(scansQuery);
  
  useEffect(() => {
    return () => {
      // Clean up the camera stream when component unmounts
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setStatus('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this feature.',
      });
      setStatus('idle');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setStatus('previewing');
        setResult(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalysis = async (fileToProcess: File) => {
    if (!fileToProcess) return;

    setStatus('processing');
    setResult(null);
    setErrorMessage(null);

    try {
      const medicineImage = await fileToDataUri(fileToProcess);
      const analysisResult = await analyzeMedicineLabel({ medicineImage });

      if (!analysisResult.isMedicineLabel) {
        setErrorMessage("This doesn't look like a medicine label. Please upload a clear image of a medicine box or strip.");
        setStatus('error');
        return;
      }
      if (!analysisResult.expiryDate) {
        setErrorMessage("The expiry date could not be found. Please try a clearer image or a different angle.");
        setStatus('error');
        return;
      }

      setResult(analysisResult);
      setStatus('success');
      toast({ title: 'Analysis Complete' });
    } catch (error) {
      console.error('Error analyzing medicine label:', error);
      setErrorMessage("An unexpected error occurred during analysis. Please try again.");
      setStatus('error');
      toast({ title: 'Analysis Failed', variant: 'destructive' });
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setFile(capturedFile);
        setPreview(canvas.toDataURL('image/jpeg'));
        setStatus('previewing');
        stopCamera();
      }
    });
  };

  const resetState = () => {
    stopCamera();
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveScan = async (scanResult: MedicineLabelAnalysisOutput, imageFile: File) => {
    if (!firestore || !user) {
      toast({ title: "Save Failed", description: "You must be logged in to save.", variant: 'destructive' });
      return;
    }
  
    const scanDocRef = doc(collection(firestore, 'users', user.uid, 'scans'));
    const scanId = scanDocRef.id;
    const storage = getStorage();
  
    try {
      // Step 1: Upload image
      const imageUrl = await uploadImageAndGetURL(storage, user.uid, scanId, imageFile);
  
      // Step 2: Prepare scan data (for Recent Scans)
      const scanData: Scan = {
        id: scanId,
        name: scanResult.medicineName,
        strength: scanResult.strength || 'N/A',
        manufacturer: scanResult.manufacturer || 'N/A',
        mfgDate: scanResult.manufactureDate || 'N/A',
        expiryDate: scanResult.expiryDate,
        batchNumber: scanResult.batchNumber || 'N/A',
        imageUrl: imageUrl,
        scannedAt: new Date().toISOString(),
      };
  
      // Step 3: Save to 'scans' subcollection (for Recent Scans list)
      await saveScan(firestore, user.uid, scanId, scanData);
  
      // Step 4: Save to 'meds' subcollection (for My Meds list)
      await saveMedicationFromScan(firestore, user.uid, scanData);
  
      // Step 5: Create a default reminder for this medication
      try {
        await createDefaultReminder(firestore, user.uid, scanId, scanResult.medicineName);
      } catch (reminderError) {
        console.error("Failed to create reminder:", reminderError);
        // Don't fail the whole process if reminder creation fails
      }
  
      toast({
        title: "Saved Successfully!",
        description: `${scanResult.medicineName} has been added to your medications with a daily reminder.`,
      });
      
      // Step 6: Navigate to the medications page to show the result
      router.push('/products');
  
    } catch (error: any) {
      console.error("Failed to save scan and medication:", error);
      toast({
        title: "Save Failed",
        description: error.message || "Could not save your scan. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const handleDeleteScan = async (scanId: string) => {
    if (!firestore || !user) return;
    try {
      await deleteScan(firestore, user.uid, scanId);
      toast({ title: "Scan Removed" });
    } catch (error) {
      console.error("Failed to delete scan:", error);
      toast({ title: "Delete Failed", variant: 'destructive' });
    }
  };

  const renderIdleContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/10 transition-all aspect-square"
        >
          <UploadCloud className="h-10 w-10 text-primary mb-2" />
          <span className="font-semibold text-center">Upload Image</span>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <button
          onClick={startCamera}
          className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/10 transition-all aspect-square"
        >
          <Camera className="h-10 w-10 text-primary mb-2" />
          <span className="font-semibold text-center">Use Camera</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <Loader2 className="mr-2 h-16 w-16 animate-spin text-primary" />
            <p className="font-semibold text-lg mt-4">Analyzing Label...</p>
          </div>
        );
      case 'previewing':
        return preview && (
          <div className='space-y-4'>
            <Image src={preview} alt="Preview" width={400} height={400} className="rounded-lg object-contain w-full max-h-64" />
            <div className='grid grid-cols-2 gap-4'>
              <Button variant='outline' onClick={resetState}>Remove</Button>
              <Button onClick={() => file && handleAnalysis(file)}>Confirm & Analyze</Button>
            </div>
          </div>
        );
      case 'success':
        return result && file && (
          <div className="w-full">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><FileCheck2 className="text-green-600" /> Extracted Details</h3>
            <div className="space-y-4">
              <div className='space-y-2'><Label htmlFor='medName'>Medicine Name</Label><Input id='medName' defaultValue={result.medicineName} /></div>
              <div className='space-y-2'><Label htmlFor='medStrength'>Strength / Dosage</Label><Input id='medStrength' defaultValue={result.strength || ''} /></div>
              <div className='space-y-2'><Label htmlFor='manufacturer'>Manufacturer</Label><Input id='manufacturer' defaultValue={result.manufacturer || ''} /></div>
              <div className='space-y-2'><Label htmlFor='batchNumber'>Batch Number</Label><Input id='batchNumber' defaultValue={result.batchNumber || ''} /></div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'><Label htmlFor='mfgDate'>Mfg. Date</Label><Input id='mfgDate' defaultValue={result.manufactureDate || ''} /></div>
                <div className='space-y-2'><Label htmlFor='expDate'>Expiry Date</Label><Input id='expDate' defaultValue={result.expiryDate} /></div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-6'>
              <Button variant='outline' onClick={resetState}>Discard</Button>
              <Button onClick={() => handleSaveScan(result, file)}>Confirm & Save</Button>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="w-full text-center p-8 min-h-[300px] flex flex-col justify-center items-center">
            <AlertTriangle className="text-destructive h-12 w-12 mx-auto mb-4" />
            <p className="font-semibold text-lg">Analysis Failed</p>
            <p className="text-muted-foreground mt-2">{errorMessage || 'An unknown error occurred.'}</p>
            <Button onClick={resetState} className='mt-6'>Try Again</Button>
          </div>
        );
      case 'camera':
        return (
          <div className="w-full space-y-4">
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-dashed">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {/* Camera guides */}
            </div>
            <Button onClick={handleCapture} className="w-full" size="lg" disabled={hasCameraPermission === false}>
              <Camera className="mr-2 h-5 w-5" /> Scan Label
            </Button>
            {hasCameraPermission === false && (
              <Alert variant="destructive"><AlertTitle>Camera Access Denied</AlertTitle><AlertDescription>Please allow camera access to use this feature.</AlertDescription></Alert>
            )}
          </div>
        );
      default:
        return renderIdleContent();
    }
  };

  return (
    <div className='bg-background min-h-screen'>
      <div className="container mx-auto max-w-2xl py-8 px-4 space-y-6">
        <Card className="w-full shadow-lg rounded-2xl">
          <CardHeader className='relative'>
            {status !== 'idle' && (
              <Button variant="ghost" size="icon" className="absolute top-4 left-4 rounded-full" onClick={resetState}><X className="h-5 w-5" /></Button>
            )}
            <CardTitle className="text-2xl font-bold text-center">Scan Medicine</CardTitle>
            <CardDescription className='text-center'>Upload or take a picture of your medicine label.</CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
        
        <Card className="w-full shadow-lg rounded-2xl">
          <CardHeader><CardTitle>Recent Scans</CardTitle></CardHeader>
          <CardContent>
            {isLoadingScans ? (
              <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : scansError ? (
              <div className="text-center py-4 text-destructive">
                <p>Error loading scans. Please check permissions.</p>
              </div>
            ) : recentScans && recentScans.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {recentScans.map((scan) => (
                  <ScanItem key={scan.id} scan={scan} onDelete={handleDeleteScan} />
                ))}
              </Accordion>
            ) : (
              <p className='text-sm text-muted-foreground text-center py-4'>No recent scans found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
