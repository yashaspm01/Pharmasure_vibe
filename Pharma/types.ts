
export interface Medication {
  id: string;
  name: string;
  expiryDate: string; // ISO string format
  stock: number;
}

export type MedicationStatus = 'Expired' | 'Expiring soon' | 'Safe';

export interface StatusInfo {
    text: MedicationStatus;
    color: string; // Tailwind color class
}

export type ViewType = 'inventory' | 'dashboard';

export interface ScannedMedicationData {
    name: string | null;
    expiryDate: string | null;
    stock: number | null;
}
