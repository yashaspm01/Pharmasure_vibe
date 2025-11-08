'use client';

import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, type Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface Reminder {
  id?: string;
  userId?: string;
  medicationId: string;
  medicationName: string;
  time: string;
  date: Date;
  dosage?: string;
  notes?: string;
  recurring: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, etc.
  enabled: boolean;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Creates a new reminder for a medication
 */
export const createReminder = async (
  firestore: Firestore,
  userId: string,
  reminderData: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  if (!userId) {
    throw new Error('User must be authenticated to create a reminder.');
  }

  const remindersCollection = collection(firestore, 'users', userId, 'reminders');
  
  const dataToSave = {
    ...reminderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(remindersCollection, dataToSave);
    return docRef.id;
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: remindersCollection.path,
      operation: 'create',
      requestResourceData: dataToSave,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

/**
 * Updates an existing reminder
 */
export const updateReminder = async (
  firestore: Firestore,
  userId: string,
  reminderId: string,
  updates: Partial<Reminder>
): Promise<void> => {
  if (!userId || !reminderId) {
    throw new Error('User ID and Reminder ID are required.');
  }

  const reminderDocRef = doc(firestore, 'users', userId, 'reminders', reminderId);
  
  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(reminderDocRef, dataToUpdate);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: reminderDocRef.path,
      operation: 'update',
      requestResourceData: dataToUpdate,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

/**
 * Deletes a reminder
 */
export const deleteReminder = async (
  firestore: Firestore,
  userId: string,
  reminderId: string
): Promise<void> => {
  if (!userId || !reminderId) {
    throw new Error('User ID and Reminder ID are required.');
  }

  const reminderDocRef = doc(firestore, 'users', userId, 'reminders', reminderId);
  
  try {
    await deleteDoc(reminderDocRef);
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: reminderDocRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

/**
 * Create a default daily reminder when medication is added
 */
export const createDefaultReminder = async (
  firestore: Firestore,
  userId: string,
  medicationId: string,
  medicationName: string
): Promise<string> => {
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(9, 0, 0, 0); // Set to 9:00 AM
  
  return createReminder(firestore, userId, {
    medicationId,
    medicationName,
    time: reminderTime.toISOString(),
    date: reminderTime,
    recurring: true,
    frequency: 'daily',
    enabled: true,
    userId
  });
};
