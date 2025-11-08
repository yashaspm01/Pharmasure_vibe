
import { getFirestore, collection, getDocs, writeBatch, doc, addDoc, updateDoc, deleteDoc, Firestore } from 'firebase/firestore';
import type { Medication } from '../types';

const generateSeedData = (): Omit<Medication, 'id'>[] => {
  const prefixes = ['Liso', 'Atorva', 'Metfor', 'Amlodi', 'Omepra', 'Sertra', 'Fluoxe', 'Citalo'];
  const suffixes = ['pril', 'statin', 'min', 'pine', 'zole', 'line', 'tine', 'pram'];
  const strengths = ['5mg', '10mg', '20mg', '40mg', '50mg', '80mg', '100mg'];
  let data: Omit<Medication, 'id'>[] = [];
  for (let i = 0; i < 25; i++) {
    const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]} ${strengths[Math.floor(Math.random() * strengths.length)]}`;
    const daysOffset = Math.floor(Math.random() * 730) - 180; // -6 months to +2 years
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysOffset);
    data.push({
      name,
      expiryDate: expiryDate.toISOString(),
      stock: Math.floor(Math.random() * 200) + 10,
    });
  }
  return data;
};

export const seedDatabase = async (db: Firestore, collectionPath: string) => {
  try {
    const medsCollection = collection(db, collectionPath);
    const snapshot = await getDocs(medsCollection);
    if (snapshot.empty) {
      console.log("Seeding database with sample entries...");
      const batch = writeBatch(db);
      const seedData = generateSeedData();
      seedData.forEach(med => {
        const docRef = doc(medsCollection);
        batch.set(docRef, med);
      });
      await batch.commit();
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export const handleAddOrUpdateMed = async (db: Firestore, userId: string, medData: Omit<Medication, 'id'> & { id?: string }) => {
    const medsCollectionPath = `medications/${userId}/items`;
    const { id, ...data } = medData;
    if (id) {
        await updateDoc(doc(db, medsCollectionPath, id), data);
    } else {
        await addDoc(collection(db, medsCollectionPath), data);
    }
};

export const handleRemoveMed = async (db: Firestore, userId: string, medId: string) => {
    const medsCollectionPath = `medications/${userId}/items`;
    await deleteDoc(doc(db, medsCollectionPath, medId));
};
