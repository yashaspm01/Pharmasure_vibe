
'use client';

import { doc, setDoc, serverTimestamp, type Firestore } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const saveUserProfile = (
  firestore: Firestore,
  userId: string,
  profileData: Partial<UserProfile>
): void => {
  const userDocRef = doc(firestore, 'users', userId);

  // Sanitize data: Firestore does not accept `undefined`.
  const sanitizedProfileData: { [key: string]: any } = {};
  for (const key in profileData) {
    if (Object.prototype.hasOwnProperty.call(profileData, key)) {
        const value = profileData[key as keyof typeof profileData];
        sanitizedProfileData[key] = value === undefined ? null : value;
    }
  }
  
  const dataToSave = {
    ...sanitizedProfileData,
    updatedAt: serverTimestamp(),
  };

  // Use setDoc and return the promise. Chain a .catch for error handling.
  setDoc(userDocRef, dataToSave, { merge: true }).catch(async (serverError) => {
    // Create the rich, contextual error.
    const permissionError = new FirestorePermissionError({
      path: userDocRef.path,
      operation: 'write', // 'write' covers create and update with merge:true
      requestResourceData: dataToSave,
    });
    
    // Emit the error globally for the listener to catch.
    errorEmitter.emit('permission-error', permissionError);
  });
};
