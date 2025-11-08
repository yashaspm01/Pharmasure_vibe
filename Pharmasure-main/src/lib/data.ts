
import { Product, Order, Notification, Medication, Alert, UpcomingReminder, NextDosage, RecentScan, DisposalRecord } from './types';

export const products: Product[] = [
  { 
    id: 'prod-001', 
    name: 'Aspirin', 
    brand: 'Bayer', 
    description: 'Effective relief from pain and fever.', 
    price: 5.99, 
    image: 'prod_aspirin_1', 
    category: 'Pain Relief', 
    stock: 'high', 
    rating: 4.5, 
    rxRequired: false, 
    expiry: '2025-08-01', 
    icon: 'Pill', 
    type: 'Tablet', 
    status: 'Active', 
    dosage: '1 tablet as needed',
    scanDetails: { scannedOn: 'Jul 1, 2025', batchNumber: 'BAY4589', manufactureDate: 'Jul 2023', expiryDate: 'Aug 2025', source: 'User Camera', manufacturer: 'Bayer'},
    duration: { startDate: "2025-07-01", endDate: "2025-07-10", totalDays: 10, status: 'Ongoing' },
    reminderActivity: { totalRemindersSent: 10, lastTicked: "2025-07-04 08:05", nextReminder: "2025-07-04 20:00", reminderStatus: true },
    stockTracking: { totalCount: 30, countLeft: 22, predictedFinishDate: "2025-07-15", lowStockAlert: false },
    expiryAndDisposal: { expiryDate: "2025-08-01", daysRemaining: 30, disposalReminderSet: true, disposalStatus: "Pending" },
    notes: { doctorNote: "Take with food to avoid stomach upset.", userFeedback: "Felt better after 30 minutes." }
  },
  { 
    id: 'prod-002', 
    name: 'Cough Syrup', 
    brand: 'Benylin', 
    description: 'Soothes coughs and chest congestion.', 
    price: 8.50, 
    image: 'prod_syrup_1', 
    category: 'Cold & Flu', 
    stock: 'medium', 
    rating: 4.2, 
    rxRequired: false, 
    expiry: '2025-01-01', 
    icon: 'Droplets' , 
    type: 'Liquid', 
    status: 'Active', 
    dosage: '10ml every 6 hours', 
    scanDetails: { scannedOn: 'Jun 15, 2025', batchNumber: 'BEN2344', manufactureDate: 'Jun 2023', expiryDate: 'Jan 2025', source: 'User Camera', manufacturer: 'Benylin'} ,
    duration: { startDate: "2025-06-15", endDate: "2025-06-22", totalDays: 7, status: 'Ongoing' },
    reminderActivity: { totalRemindersSent: 25, lastTicked: "2025-06-20 14:00", nextReminder: "2025-06-20 20:00", reminderStatus: true },
    stockTracking: { totalCount: 1, countLeft: 0.4, predictedFinishDate: "2025-06-22", lowStockAlert: false },
    expiryAndDisposal: { expiryDate: "2025-01-01", daysRemaining: 180, disposalReminderSet: true, disposalStatus: "Pending" }
  },
  { 
    id: 'prod-003', 
    name: 'Atorvastatin', 
    brand: 'Lipitor', 
    description: 'For managing cholesterol.', 
    price: 25.00, 
    image: 'prod_atorvastatin_1', 
    category: 'Statins', 
    stock: 'high', 
    rating: 4.8, 
    rxRequired: true, 
    expiry: '2026-12-01', 
    icon: 'Pill', 
    type: 'Tablet', 
    status: 'Active', 
    dosage: '1 tablet daily', 
    scanDetails: { scannedOn: 'May 20, 2025', batchNumber: 'LIP9876', manufactureDate: 'Dec 2024', expiryDate: 'Dec 2026', source: 'Imported', manufacturer: 'Lipitor'},
    duration: { startDate: "2025-05-20", endDate: "2025-08-20", totalDays: 90, status: 'Ongoing' },
    reminderActivity: { totalRemindersSent: 60, lastTicked: "2025-07-10 09:00", nextReminder: "2025-07-11 09:00", reminderStatus: true },
    stockTracking: { totalCount: 90, countLeft: 30, predictedFinishDate: "2025-08-10", lowStockAlert: true },
    expiryAndDisposal: { expiryDate: "2026-12-01", daysRemaining: 500, disposalReminderSet: true, disposalStatus: "Pending" },
    notes: { doctorNote: "Monitor for muscle pain and report immediately." }
  },
  { 
    id: 'prod-004', 
    name: 'MultiVitamin', 
    brand: 'Centrum', 
    description: 'Complete daily multivitamin for adults.', 
    price: 15.25, 
    image: 'prod_vitamins_1', 
    category: 'Vitamins & Supplements', 
    stock: 'high', 
    rating: 4.6, 
    rxRequired: false, 
    expiry: '2024-07-20', 
    icon: 'Pill', 
    type: 'Capsule', 
    status: 'Completed', 
    dosage: '1 capsule daily with food', 
    scanDetails: { scannedOn: 'Apr 10, 2025', batchNumber: 'CEN1234', manufactureDate: 'Jul 2023', expiryDate: 'Jul 2024', source: 'User Camera', manufacturer: 'Centrum'},
    duration: { startDate: "2024-04-10", endDate: "2024-07-10", totalDays: 90, status: 'Completed' },
    reminderActivity: { totalRemindersSent: 180, lastTicked: "2024-07-10 08:00", nextReminder: "N/A", reminderStatus: false },
    stockTracking: { totalCount: 90, countLeft: 0, predictedFinishDate: "2024-07-10", lowStockAlert: false },
    expiryAndDisposal: { expiryDate: "2024-07-20", daysRemaining: -10, disposalReminderSet: false, disposalStatus: "Completed" },
    notes: { userFeedback: "Felt more energetic throughout the day." }
  },
  { 
    id: 'prod-005', 
    name: 'Vitamin D', 
    brand: 'Nature Made', 
    description: 'Supports bone, teeth, muscle, and immune health.', 
    price: 12.50, 
    image: 'prod_vitamind_1', 
    category: 'Vitamins & Supplements', 
    stock: 'medium', 
    rating: 4.7, 
    rxRequired: false, 
    expiry: '2025-11-01', 
    icon: 'Sun', 
    type: 'Softgel', 
    status: 'Active', 
    dosage: '1 softgel daily' 
  },
  { 
    id: 'prod-006', 
    name: 'Lisinopril 10 mg', 
    brand: 'Zestril', 
    description: 'Treats high blood pressure.', 
    price: 9.75, 
    image: 'prod_lisinopril_1', 
    category: 'Cardiovascular', 
    stock: 'high', 
    rating: 4.8, 
    rxRequired: true, 
    expiry: '2024-06-15', 
    icon: 'Pill', 
    type: 'Tablet', 
    status: 'Expired', 
    dosage: '1 tablet daily in the morning'
  },
  { 
    id: 'prod-007', 
    name: 'Meftal Spas 5mg', 
    brand: 'Blue Cross', 
    description: 'Relief from menstrual pain and abdominal cramps.', 
    price: 4.50, 
    image: 'prod_meftal_1', 
    category: 'Pain Relief', 
    stock: 'low', 
    rating: 4.4, 
    rxRequired: true, 
    expiry: '2025-08-01', 
    icon: 'Pill', 
    type: 'Tablet', 
    status: 'Active', 
    dosage: '1 tablet when needed' 
  },
];

export const featuredProducts = products.slice(0, 4);

export const nextDosage: NextDosage = {
  medicationId: 'prod-002',
  medication: 'Cough Syrup',
  instruction: 'Take 10ml',
  time: '2:30 PM'
};

export const activeMedications: Medication[] = [
  { id: 'prod-001', name: 'Aspirin', daysLeft: 5, icon: 'Pill', type: 'Tablet' },
  { id: 'prod-004', name: 'MultiVitamin', daysLeft: 15, icon: 'Pill', type: 'Capsule' },
  { id: 'prod-005', name: 'Vitamin D', daysLeft: 8, icon: 'Sun', type: 'Softgel' },
];

export const alerts: Alert[] = [
    { id: 'alert-1', title: 'Vitamin C Expired', subtitle: 'Expired 2 days ago', type: 'error'},
    { id: 'alert-2', title: 'Low Stock Alert', subtitle: 'Aspirin running low', type: 'warning'},
]

export const recentScans: Omit<RecentScan, 'imageUrl'>[] = [
    { 
        id: 'scan-1', 
        name: 'Lisinopril 10 mg', 
        date: 'July 25, 2025',
        strength: '10 mg',
        manufacturer: 'Zestril',
        mfgDate: '07/2023',
        expiryDate: '07/2025',
        batchNumber: 'AJDG5423'
    },
    { 
        id: 'scan-2', 
        name: 'Meftal Spas 5mg', 
        date: 'Aug 5, 2025',
        strength: '5 mg',
        manufacturer: 'Blue Cross',
        mfgDate: '08/2023',
        expiryDate: '08/2025',
        batchNumber: 'BCLF9871'
    },
];

export const upcomingReminders: UpcomingReminder[] = [
    { id: 'rem-1', name: 'Lisinopril 10 mg', time: 'Today, 8:00 PM'},
    { id: 'rem-2', name: 'Atorvastatin 20 mg', time: 'Tomorrow, 7:00 AM'},
]

export const weeklyAdherence = [
    { day: 'Mon', doses: 4 },
    { day: 'Tue', doses: 5 },
    { day: 'Wed', doses: 3 },
    { day: 'Thu', doses: 5 },
    { day: 'Fri', doses: 4 },
    { day: 'Sat', doses: 5 },
    { day: 'Sun', doses: 2 },
  ];
  
export const adherenceStats = {
    taken: 3,
    total: 6,
    percentage: 50,
}

export const healthStats = {
    totalMeds: 12,
    activeMeds: 4,
    adherenceRate: 92,
    missedDoses: 3,
    disposals: 2,
    improvementScore: 78,
}

export const disposalHistory: DisposalRecord[] = [
    { id: 'disp-1', medName: 'Ibuprofen Expired', disposalDate: '2025-06-15', method: 'Returned to Pharmacy', status: 'Verified' },
    { id: 'disp-2', medName: 'Old Amoxicillin', disposalDate: '2025-05-20', method: 'Self-Discarded', status: 'Pending' },
];

export const orders: Order[] = [
  {
    orderId: 'ORD-001',
    userId: 'user-123',
    items: [
      { product: products[2], quantity: 1 },
      { product: products[0], quantity: 2 },
    ],
    total: 25.00 + (5.99 * 2),
    status: 'delivered',
    orderDate: new Date('2023-10-20T10:00:00Z').getTime(),
    deliveryAddress: '123 Health St, Wellness City, 10101',
    deliverySlot: 'Oct 20, 2023 - 2 PM to 4 PM',
    prescriptionIds: ['presc-abc'],
  },
  {
    orderId: 'ORD-002',
    userId: 'user-123',
    items: [
      { product: products[3], quantity: 1 },
    ],
    total: 15.25,
    status: 'packed',
    orderDate: new Date().getTime() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    deliveryAddress: '123 Health St, Wellness City, 10101',
    deliverySlot: 'Today - 6 PM to 8 PM',
    prescriptionIds: [],
  },
  {
    orderId: 'ORD-003',
    userId: 'user-123',
    items: [
      { product: products[5], quantity: 1 },
      { product: products[4], quantity: 1 },
    ],
    total: 3.50 + 4.75,
    status: 'cancelled',
    orderDate: new Date().getTime() - (10 * 24 * 60 * 60 * 1000), // 10 days ago
    deliveryAddress: '123 Health St, Wellness City, 10101',
    deliverySlot: 'N/A',
    prescriptionIds: [],
  },
];

export const notifications: Notification[] = [
    {
        id: 'notif-1',
        title: 'Order Delivered',
        message: 'Your order #ORD-001 has been successfully delivered.',
        date: new Date('2023-10-20T14:30:00Z').getTime(),
        read: true,
        category: 'orders'
    },
    {
        id: 'notif-2',
        title: 'Order is on its way!',
        message: 'Your order #ORD-002 is out for delivery. Expected today between 6 PM - 8 PM.',
        date: new Date().getTime() - (1 * 60 * 60 * 1000), // 1 hour ago
        read: false,
        category: 'orders'
    },
    {
        id: 'notif-3',
        title: 'Weekly Vitamin Sale',
        message: 'Get up to 20% off on all vitamins and supplements. This week only!',
        date: new Date().getTime() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: false,
        category: 'promotions'
    },
    {
        id: 'notif-4',
        title: 'Medication Reminder',
        message: 'Time to take your Paracetamol 500mg.',
        date: new Date().setHours(8, 0, 0, 0),
        read: true,
        category: 'reminders'
    }
]
