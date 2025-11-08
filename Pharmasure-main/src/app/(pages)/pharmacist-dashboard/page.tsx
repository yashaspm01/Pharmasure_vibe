'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Medication, ViewType } from '@/lib/pharma/types';
import InventoryView from '@/components/pharma/InventoryView';
import DashboardView from '@/components/pharma/DashboardView';
import BottomNavBar from '@/components/pharma/BottomNavBar';
import MedicationDetailSheet from '@/components/pharma/MedicationDetailSheet';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { saveMedication, deleteMedication } from '@/services/pharmacist-medication-service';
import { useToast } from '@/hooks/use-toast';
import { generateSampleMedications } from '@/lib/pharma/sample-data';


const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-600">Initializing Pharmasure...</p>
  </div>
);

export default function PharmacistDashboard() {
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('inventory');
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  // Fetch medications from Firestore
  const medsQuery = useMemoFirebase(() => {
    if (user && firestore) {
      return query(
        collection(firestore, 'users', user.uid, 'pharmacist_inventory'),
        orderBy('updatedAt', 'desc')
      );
    }
    return null;
  }, [user, firestore]);

  const { data: meds, isLoading: isLoadingMeds, error: medsError } = useCollection<Medication>(medsQuery);
  const [isLoadingSample, setIsLoadingSample] = useState(false);

  // Check if user is pharmacist and redirect if not
  useEffect(() => {
    if (!isUserLoading && (!user || user.role !== 'pharmacist')) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const openDetailSheet = useCallback((med: Medication | null) => {
    setSelectedMed(med);
    setIsDetailSheetOpen(true);
  }, []);
  
  const closeDetailSheet = useCallback(() => {
    setIsDetailSheetOpen(false);
    setSelectedMed(null);
  }, []);

  const onSave = useCallback(async (medData: Omit<Medication, 'id'> & { id?: string; manufacturer?: string; batchNumber?: string }) => {
    if (!firestore || !user) {
      toast({ title: 'Error', description: 'Please log in to save medications', variant: 'destructive' });
      return;
    }

    try {
      await saveMedication(firestore, user.uid, medData);
      toast({ 
        title: medData.id ? 'Updated' : 'Added', 
        description: `${medData.name} has been ${medData.id ? 'updated' : 'added to inventory'}` 
      });
      closeDetailSheet();
    } catch (error) {
      console.error('Error saving medication:', error);
      toast({ title: 'Save Failed', description: 'Could not save medication', variant: 'destructive' });
    }
  }, [firestore, user, toast, closeDetailSheet]);

  const onRemove = useCallback(async (medId: string) => {
    if (!firestore || !user) return;

    try {
      await deleteMedication(firestore, user.uid, medId);
      toast({ title: 'Removed', description: 'Medication removed from inventory' });
      closeDetailSheet();
    } catch (error) {
      console.error('Error removing medication:', error);
      toast({ title: 'Remove Failed', description: 'Could not remove medication', variant: 'destructive' });
    }
  }, [firestore, user, toast, closeDetailSheet]);

  const handleLoadSampleData = useCallback(async () => {
    if (!firestore || !user || isLoadingSample) return;

    setIsLoadingSample(true);
    try {
      const sampleMeds = generateSampleMedications();
      
      // Save all sample medications
      for (const med of sampleMeds) {
        await saveMedication(firestore, user.uid, med);
      }
      
      toast({ 
        title: 'Sample Data Loaded', 
        description: `${sampleMeds.length} medications added to your inventory` 
      });
    } catch (error) {
      console.error('Error loading sample data:', error);
      toast({ 
        title: 'Load Failed', 
        description: 'Could not load sample data', 
        variant: 'destructive' 
      });
    } finally {
      setIsLoadingSample(false);
    }
  }, [firestore, user, isLoadingSample, toast]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading || isLoadingMeds) {
    return <LoadingSpinner />;
  }

  if (medsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-red-600">Error loading medications</p>
        <Button onClick={() => router.push('/login')} className="mt-4">Back to Login</Button>
      </div>
    );
  }

  if (!user || user.role !== 'pharmacist') {
    return null;
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col relative overflow-hidden">
          {/* Logout Button */}
          <div className="absolute top-4 right-4 z-30">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {activeView === 'inventory' ? (
              <InventoryView 
                meds={meds || []} 
                onOpenDetailSheet={openDetailSheet}
                onLoadSampleData={!isLoadingSample ? handleLoadSampleData : undefined}
              />
          ) : (
              <DashboardView meds={meds || []} />
          )}

          <BottomNavBar
              activeView={activeView}
              onNavigate={setActiveView}
              onAdd={() => openDetailSheet(null)}
          />

          <MedicationDetailSheet
              isOpen={isDetailSheetOpen}
              med={selectedMed}
              onSave={onSave}
              onRemove={onRemove}
              onClose={closeDetailSheet}
          />
      </div>
    </div>
  );
}
