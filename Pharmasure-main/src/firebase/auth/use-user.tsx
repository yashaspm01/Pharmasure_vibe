
'use client';

import { useFirebase, type UserHookResult } from '@/firebase/provider';

// This hook now returns the combined user object (Auth + Firestore data)
// and the loading/error state from the central provider.
export function useUser(): UserHookResult {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
}
