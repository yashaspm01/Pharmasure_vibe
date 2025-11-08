'use client';

import { collection, doc, setDoc, serverTimestamp, type Firestore, deleteDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { Scan } from '@/lib/types';

/**
 * Saves a new scan document to Firestore. This is now an async operation that throws on error.
 * @param firestore The Firestore instance.
 * @param userId The ID of the authenticated user.
 * @param scanId The pre-generated ID for the scan document.
 * @param scanData The scan data to save.
 */
export const saveScan = async (
  firestore: Firestore,
  userId: string,
  scanId: string,
  scanData: Omit<Scan, 'id' | 'scannedAt'>
): Promise<void> => {
  if (!userId) {
    throw new Error('User must be authenticated to save a scan.');
  }
  const scanDocRef = doc(firestore, 'users', userId, 'scans', scanId);
  
  const dataToSave = {
    ...scanData,
    scannedAt: serverTimestamp(),
  };

  try {
    // This is now an async function, so we can await the result.
    await setDoc(scanDocRef, dataToSave);
  } catch(serverError: any) {
    // Create and emit a contextual error if the save fails.
    const permissionError = new FirestorePermissionError({
      path: scanDocRef.path,
      operation: 'create',
      requestResourceData: dataToSave,
    });
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original error so the component's catch block can handle it.
    throw serverError;
  };
};


/**
 * Deletes a scan document from Firestore. This is a non-blocking operation.
 * @param firestore The Firestore instance.
 * @param userId The ID of the authenticated user.
 * @param scanId The ID of the scan document to delete.
 */
export const deleteScan = async (
  firestore: Firestore,
  userId: string,
  scanId: string
): Promise<void> => {
  if (!userId || !scanId) {
    throw new Error('User ID and Scan ID are required to delete a scan.');
  }
  const scanDocRef = doc(firestore, 'users', userId, 'scans', scanId);
  
  try {
    await deleteDoc(scanDocRef);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: scanDocRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};
