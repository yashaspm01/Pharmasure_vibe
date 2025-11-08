import React, { useState, useEffect, useCallback } from 'react';
import type { Medication, ViewType } from './types';
import InventoryView from './components/InventoryView';
import DashboardView from './components/DashboardView';
import BottomNavBar from './components/BottomNavBar';
import MedicationDetailSheet from './components/MedicationDetailSheet';

// --- Mock Data Generation ---
// Using local mock data instead of connecting to Firebase.
const generateSeedData = (): Medication[] => {
  const prefixes = ['Liso', 'Atorva', 'Metfor', 'Amlodi', 'Omepra', 'Sertra', 'Fluoxe', 'Citalo', 'Parace', 'Ibupro'];
  const suffixes = ['pril', 'statin', 'min', 'pine', 'zole', 'line', 'tine', 'pram', 'mol', 'fen'];
  const strengths = ['5mg', '10mg', '20mg', '40mg', '50mg', '80mg', '100mg', '250mg', '500mg'];
  let data: Medication[] = [];

  // --- Add guaranteed expired and expiring-soon items ---
  const createMed = (name: string, daysOffset: number, stock: number, id: number) => {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + daysOffset);
      return {
          id: `mock_id_special_${id}`,
          name,
          expiryDate: expiryDate.toISOString(),
          stock,
      };
  };
  // 3 Expired meds
  data.push(createMed('Expirophen 20mg', -15, 30, 1));
  data.push(createMed('Pastduecillin 50mg', -90, 15, 2));
  data.push(createMed('Gonebadazole 100mg', -4, 50, 3));
  // 4 Expiring-soon meds
  data.push(createMed('Almostix 10mg', 5, 45, 4));
  data.push(createMed('Soontogo 250mg', 25, 22, 5));
  data.push(createMed('Limitil 5mg', 1, 60, 6));
  data.push(createMed('Clocks ticking Forte', 12, 18, 7));


  // --- Generate the rest of the random data ---
  for (let i = 0; i < 43; i++) { // 50 total - 7 special cases
    const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]} ${strengths[Math.floor(Math.random() * strengths.length)]}`;
    const daysOffset = Math.floor(Math.random() * 600) + 31; // Guarantees 'Safe' status initially, from +1 month to ~2 years
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysOffset);
    data.push({
      id: `mock_id_${i}`,
      name,
      expiryDate: expiryDate.toISOString(),
      stock: Math.floor(Math.random() * 200) + 10,
    });
  }
  return data;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-600">Initializing Pharmasure...</p>
  </div>
);

export default function App() {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('inventory');

  // --- Initialize with Mock Data ---
  useEffect(() => {
    // Simulate a loading period and then set mock data
    const timer = setTimeout(() => {
      setMeds(generateSeedData());
      setIsLoading(false);
    }, 500); // 0.5 second delay to show loading spinner
    return () => clearTimeout(timer);
  }, []);

  const openDetailSheet = useCallback((med: Medication | null) => {
    setSelectedMed(med);
    setIsDetailSheetOpen(true);
  }, []);
  
  const closeDetailSheet = useCallback(() => {
    setIsDetailSheetOpen(false);
    setSelectedMed(null);
  }, []);

  const onSave = useCallback((medData: Omit<Medication, 'id'> & { id?: string }) => {
    setMeds(prevMeds => {
      if (medData.id) {
        // Update existing medication
        return prevMeds.map(m => m.id === medData.id ? { ...m, ...medData } as Medication : m);
      } else {
        // Add new medication with a temporary unique ID
        const newMed: Medication = {
          ...medData,
          id: `med_${Date.now()}`
        };
        return [...prevMeds, newMed];
      }
    });
    closeDetailSheet();
  }, [closeDetailSheet]);

  const onRemove = useCallback((medId: string) => {
    setMeds(prevMeds => prevMeds.filter(m => m.id !== medId));
    closeDetailSheet();
  }, [closeDetailSheet]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col relative overflow-hidden">
          {activeView === 'inventory' ? (
              <InventoryView meds={meds} onOpenDetailSheet={openDetailSheet} />
          ) : (
              <DashboardView meds={meds} />
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