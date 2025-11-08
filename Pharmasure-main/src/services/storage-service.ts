'use client';

import { ref, uploadBytes, getDownloadURL, type FirebaseStorage } from 'firebase/storage';

/**
 * Uploads an image file to Firebase Storage and returns its public download URL.
 * @param storage The Firebase Storage instance.
 * @param userId The ID of the current user.
 * @param scanId The unique ID for the scan, used as the image name.
 * @param file The image file to upload.
 * @returns A promise that resolves with the public URL of the uploaded image.
 */
export const uploadImageAndGetURL = async (
  storage: FirebaseStorage,
  userId: string,
  scanId: string,
  file: File
): Promise<string> => {
  if (!userId || !scanId || !file) {
    throw new Error('User ID, Scan ID, and a file are required for upload.');
  }

  // Create a storage reference
  const imagePath = `users/${userId}/scans/${scanId}.${file.name.split('.').pop()}`;
  const storageRef = ref(storage, imagePath);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    // Depending on requirements, you might want to handle different error codes
    // (e.g., 'storage/unauthorized', 'storage/canceled', 'storage/unknown')
    throw new Error('Failed to upload image.');
  }
};
