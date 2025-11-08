'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Medication } from '@/lib/pharma/types';
import { formatDate } from '@/lib/pharma/helpers';
import { analyzeMedicineLabel } from '@/ai/flows/medicine-label-analysis';
import { XIcon, CameraIcon } from './Icons';
import { useToast } from '@/hooks/use-toast';
import { getStorage } from 'firebase/storage';
import { uploadImageAndGetURL } from '@/services/storage-service';

// --- Camera View Component ---
interface CameraViewProps {
  onCapture: (file: File) => void;
  onClose: () => void;
  setCameraError: (error: string) => void;
}
const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, setCameraError }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera Error:", err);
                setCameraError("Could not access camera. Please check permissions.");
                onClose();
            }
        };
        startCamera();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [onClose, setCameraError]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if(context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
                canvasRef.current.toBlob(blob => {
                    if (blob) {
                        onCapture(new File([blob], "capture.jpg", { type: "image/jpeg" }));
                    }
                }, 'image/jpeg');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <button 
              onClick={onClose} 
              className="absolute top-5 right-5 text-white bg-black bg-opacity-60 rounded-full py-2 px-4 flex items-center gap-2 text-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
                <XIcon />
                <span>Back</span>
            </button>
            <div className="absolute bottom-8 flex flex-col items-center">
                <p className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full mb-4">Position camera over medication package</p>
                <button onClick={handleCapture} className="w-20 h-20 bg-white rounded-full border-4 border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"></button>
            </div>
        </div>
    );
};


// --- Main Detail Sheet Component ---
interface MedicationDetailSheetProps {
  isOpen: boolean;
  med: Medication | null;
  onSave: (medData: Omit<Medication, 'id'> & { id?: string }) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

const MedicationDetailSheet: React.FC<MedicationDetailSheetProps> = ({ isOpen, med, onSave, onRemove, onClose }) => {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [stock, setStock] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [manufacturer, setManufacturer] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setName(med?.name || '');
      setExpiryDate(formatDate(med?.expiryDate));
      setStock(med?.stock?.toString() || '');
      setScanError('');
      setShowCamera(false);
    }
  }, [med, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: med?.id, name, expiryDate, stock: parseInt(stock) || 0 });
  };
  
  const handleRemove = () => {
    if(med?.id && window.confirm(`Are you sure you want to remove ${med.name}?`)) {
        onRemove(med.id);
    }
  }

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileScan = async (file: File) => {
    if (!file) return;
    setIsScanning(true);
    setScanError('');
    try {
      const medicineImage = await fileToDataUri(file);
      const analysisResult = await analyzeMedicineLabel({ medicineImage });
      
      if (!analysisResult.isMedicineLabel) {
        setScanError("This doesn't look like a medicine label. Please upload a clear image.");
        toast({ title: 'Not a Medicine Label', variant: 'destructive' });
        return;
      }
      
      if (analysisResult.medicineName) setName(analysisResult.medicineName);
      if (analysisResult.expiryDate) setExpiryDate(formatDate(analysisResult.expiryDate));
      if (analysisResult.manufacturer) setManufacturer(analysisResult.manufacturer);
      if (analysisResult.batchNumber) setBatchNumber(analysisResult.batchNumber);
      
      toast({ title: 'Scan Successful', description: 'Medicine details extracted!' });
    } catch (error) {
      console.error('Scan error:', error);
      setScanError(error instanceof Error ? error.message : "An unknown error occurred.");
      toast({ title: 'Scan Failed', variant: 'destructive' });
    } finally {
      setIsScanning(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onCameraCapture = (file: File) => {
      setShowCamera(false);
      handleFileScan(file);
  };
  
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileScan(file);
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      
      {showCamera && <CameraView onCapture={onCameraCapture} onClose={() => setShowCamera(false)} setCameraError={setScanError} />}

      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out z-50 max-w-md mx-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <header className="flex justify-between items-center pb-2">
            <h2 className="text-lg font-bold text-gray-900">{med ? 'Medication Details' : 'Add Medication'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><XIcon /></button>
          </header>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileInputChange} className="hidden" />
            <button type="button" onClick={() => setShowCamera(true)} disabled={isScanning} className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50">
                {isScanning ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Scanning...</span></>
                ) : (
                    <><CameraIcon /> Scan with Camera</>
                )}
            </button>
            <div className="text-center">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-blue-600 hover:underline font-medium">
                    Or upload an image
                </button>
            </div>
            {scanError && <p className="text-red-500 text-sm text-center">{scanError}</p>}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Drug Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
              <input id="expiryDate" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-600 mb-1">Manufacturer</label>
              <input id="manufacturer" type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-600 mb-1">Batch Number</label>
              <input id="batchNumber" type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-600 mb-1">In Stock (quantity)</label>
              <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="flex flex-col space-y-2 pt-4">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">{med ? 'Update Medication' : 'Add to Inventory'}</button>
              {med && <button type="button" onClick={handleRemove} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">Remove from Inventory</button>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MedicationDetailSheet;
