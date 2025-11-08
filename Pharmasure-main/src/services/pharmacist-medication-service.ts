import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';
import type { Medication } from '@/lib/pharma/types';

export interface PharmacistMedication extends Medication {
  manufacturer?: string;
  batchNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export async function saveMedication(
  firestore: Firestore,
  userId: string,
  medData: Omit<Medication, 'id'> & { id?: string; manufacturer?: string; batchNumber?: string }
): Promise<string> {
  const medsCollection = collection(firestore, 'users', userId, 'pharmacist_inventory');
  
  if (medData.id) {
    // Update existing medication
    const medDocRef = doc(medsCollection, medData.id);
    await updateDoc(medDocRef, {
      ...medData,
      updatedAt: new Date().toISOString(),
    });
    return medData.id;
  } else {
    // Create new medication
    const newMedDocRef = doc(medsCollection);
    const medication: PharmacistMedication = {
      id: newMedDocRef.id,
      name: medData.name,
      expiryDate: medData.expiryDate,
      stock: medData.stock,
      manufacturer: medData.manufacturer,
      batchNumber: medData.batchNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await setDoc(newMedDocRef, medication);
    return newMedDocRef.id;
  }
}

export async function deleteMedication(
  firestore: Firestore,
  userId: string,
  medId: string
): Promise<void> {
  const medDocRef = doc(firestore, 'users', userId, 'pharmacist_inventory', medId);
  await deleteDoc(medDocRef);
}
