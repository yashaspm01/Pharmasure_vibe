
import type { StatusInfo } from './types';
import { EXPIRING_SOON_DAYS } from './constants';

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "";
  try {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split('T')[0];
  } catch (error) {
    return "";
  }
};

export const getDaysDiff = (expiryDate: string): number => {
  if (!expiryDate) return Infinity;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return Infinity;
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getStatus = (expiryDate: string): StatusInfo => {
  const diffDays = getDaysDiff(expiryDate);
  if (diffDays === Infinity) return { text: 'Safe', color: 'text-green-500' };
  if (diffDays < 0) return { text: 'Expired', color: 'text-red-500' };
  if (diffDays <= EXPIRING_SOON_DAYS) return { text: 'Expiring soon', color: 'text-orange-500' };
  return { text: 'Safe', color: 'text-green-500' };
};
