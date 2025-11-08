

import type { Timestamp } from 'firebase/firestore';

export type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  stock: 'low' | 'medium' | 'high' | 'none';
  rating: number;
  rxRequired: boolean;
  expiry?: string;
  icon?: string;
  type?: string;
  status?: 'Active' | 'Completed' | 'Expired';
  dosage?: string;
  scanDetails?: ScanDetails;
  duration?: MedicationDuration;
  reminderActivity?: ReminderActivity;
  stockTracking?: StockTracking;
  expiryAndDisposal?: ExpiryAndDisposal;
  notes?: {
    doctorNote?: string;
    userFeedback?: string;
  }
  imageUrl?: string;
};

export type MedicationDuration = {
  startDate: string;
  endDate: string;
  totalDays: number;
  status: 'Ongoing' | 'Completed' | 'Missed';
};

export type ReminderActivity = {
  totalRemindersSent: number;
  lastTicked: string;
  nextReminder: string;
  reminderStatus: boolean;
};

export type StockTracking = {
    totalCount: number;
    countLeft: number;
    predictedFinishDate: string;
    lowStockAlert: boolean;
};

export type ExpiryAndDisposal = {
    expiryDate: string;
    daysRemaining: number;
    disposalReminderSet: boolean;
    disposalStatus: 'Pending' | 'Completed';
}

export type ScanDetails = {
    scannedOn: string;
    batchNumber: string;
    manufactureDate: string;
    expiryDate: string;
    source: string;
    manufacturer: string;
}

export type UserProfile = {
  uid: string;
  username: string;
  email: string | null;
  firstName: string | null;
  middleName?: string | null;
  lastName: string | null;
  photoURL: string | null;
  countryCode: string | null;
  phoneNumber: string | null;
  age?: number;
  gender: 'male' | 'female' | 'prefer-not-to-say' | null;
  bloodGroup?: string;
  healthIssues?: string[];
  profileComplete?: boolean;
  language?: string;
  role?: 'user' | 'pharmacist';
};

export type CartItem = {
  product: Product;
  quantity: number;
  prescriptionId?: string;
};

export type Order = {
  orderId: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'packed' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderDate: number; // timestamp
  deliveryAddress: string;
  deliverySlot: string;
  prescriptionIds: string[];
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  date: number; // timestamp
  read: boolean;
  category: 'orders' | 'promotions' | 'reminders';
};

export type Medication = {
    id: string;
    name: string;
    daysLeft: number;
    icon: string;
    type: string;
}

export type Alert = {
    id: string;
    title: string;
    subtitle: string;
    type: 'error' | 'warning';
}

export type UpcomingReminder = {
    id: string;
    name: string;
    time: string;
}
    
export type NextDosage = {
    medicationId: string;
    medication: string;
    instruction: string;
    time: string;
}

export type Scan = {
    id: string;
    name: string;
    scannedAt: Timestamp | string; // Allow both for type safety
    strength: string;
    manufacturer: string;
    mfgDate: string;
    expiryDate: string;
    batchNumber: string;
    imageUrl?: string;
};

export type RecentScan = {
    id: string;
    name: string;
    date: string;
    strength: string;
    manufacturer: string;
    mfgDate: string;
    expiryDate: string;
    batchNumber: string;
    imageUrl?: string;
};

export type DisposalRecord = {
    id: string;
    medName: string;
    disposalDate: string;
    method: 'Returned to Pharmacy' | 'Self-Discarded';
    status: 'Verified' | 'Pending';
};
