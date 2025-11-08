'use client';

import { collection, addDoc, serverTimestamp, type Firestore, Timestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { Scan, Product } from '@/lib/types';

/**
 * Parses a potentially ambiguous date string (e.g., "12/25", "Dec 2025") into a valid Date object.
 * @param expiryDate The date string to parse.
 * @returns A Date object or null if parsing fails.
 */
const parseExpiryDate = (expiryDate: string): Date | null => {
    if (!expiryDate) return null;

    // Normalize date string by replacing separators with spaces
    const dateStr = expiryDate.replace(/[./-]/g, ' ');
    const parts = dateStr.split(' ');

    let date: Date;

    // Handles "MM YYYY" or "Month YYYY" formats
    if (parts.length === 2) {
        const [monthStr, yearStr] = parts;
        const year = parseInt(yearStr.length === 2 ? '20' + yearStr : yearStr);
        
        // Attempt to parse month from name or number
        const monthIndex = isNaN(parseInt(monthStr))
            ? new Date(Date.parse(monthStr + " 1, 2012")).getMonth()
            : parseInt(monthStr) - 1;

        if (!isNaN(year) && !isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
            // Set to the last day of the given month for safety
            date = new Date(year, monthIndex + 1, 0);
        } else {
            return null; // Invalid format
        }
    } else {
        // Fallback for more standard, directly parsable date formats
        date = new Date(expiryDate);
    }
  
    // Final check if the resulting date is valid
    if (isNaN(date.getTime())) {
      return null;
    }
  
    return date;
};


/**
 * Saves a new medication document from a scan to the user's subcollection in Firestore.
 * This is now an async operation that can be awaited.
 * @param firestore The Firestore instance.
 * @param userId The ID of the authenticated user.
 * @param scan The scan data to convert and save as a medication.
 */
export const saveMedicationFromScan = async (
  firestore: Firestore,
  userId: string,
  scan: Scan
): Promise<void> => {
  if (!userId) {
    throw new Error('User must be authenticated to save a medication.');
  }

  const medsCollectionRef = collection(firestore, 'users', userId, 'meds');
  
  const parsedDate = parseExpiryDate(scan.expiryDate);
  if (!parsedDate) {
    throw new Error(`Could not parse expiry date: ${scan.expiryDate}`);
  }
  const isoExpiryDate = parsedDate.toISOString();

  // Convert Scan data to a simplified Product/Medication structure
  const medicationData: Partial<Product> = {
    name: scan.name,
    dosage: scan.strength,
    status: 'Active',
    scanDetails: {
        scannedOn: scan.scannedAt instanceof Timestamp ? scan.scannedAt.toDate().toISOString() : scan.scannedAt.toString(),
        batchNumber: scan.batchNumber,
        manufactureDate: scan.mfgDate,
        expiryDate: scan.expiryDate,
        source: 'Scan',
        manufacturer: scan.manufacturer,
    },
    expiry: isoExpiryDate,
    imageUrl: scan.imageUrl,
  };
  
  const dataToSave = {
    ...medicationData,
    addedOn: serverTimestamp(),
  };

  try {
    await addDoc(medsCollectionRef, dataToSave);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: medsCollectionRef.path,
      operation: 'create',
      requestResourceData: dataToSave,
    });
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the error to be caught by the calling function in the UI
    throw serverError;
  }
};

/**
 * Updates an existing medication document in Firestore.
 * @param firestore The Firestore instance.
 * @param userId The ID of the authenticated user.
 * @param medId The ID of the medication to update.
 * @param updates The fields to update.
 */
export const updateMedication = async (
  firestore: Firestore,
  userId: string,
  medId: string,
  updates: Partial<Product>
): Promise<void> => {
  if (!userId || !medId) {
    throw new Error('User ID and Medication ID are required.');
  }

  const { doc: docImport, updateDoc } = await import('firebase/firestore');
  const medDocRef = docImport(firestore, 'users', userId, 'meds', medId);
  
  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(medDocRef, dataToUpdate);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: medDocRef.path,
      operation: 'update',
      requestResourceData: dataToUpdate,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

/**
 * Deletes a medication document from Firestore.
 * @param firestore The Firestore instance.
 * @param userId The ID of the authenticated user.
 * @param medId The ID of the medication to delete.
 */
export const deleteMedication = async (
  firestore: Firestore,
  userId: string,
  medId: string
): Promise<void> => {
  if (!userId || !medId) {
    throw new Error('User ID and Medication ID are required.');
  }

  const { doc: docImport, deleteDoc } = await import('firebase/firestore');
  const medDocRef = docImport(firestore, 'users', userId, 'meds', medId);
  
  try {
    await deleteDoc(medDocRef);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: medDocRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};
