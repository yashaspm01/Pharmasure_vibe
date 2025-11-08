import type { Medication } from './types';

export const generateSampleMedications = (): Omit<Medication, 'id'>[] => {
  const prefixes = ['Liso', 'Atorva', 'Metfor', 'Amlodi', 'Omepra', 'Sertra', 'Fluoxe', 'Citalo', 'Parace', 'Ibupro'];
  const suffixes = ['pril', 'statin', 'min', 'pine', 'zole', 'line', 'tine', 'pram', 'mol', 'fen'];
  const strengths = ['5mg', '10mg', '20mg', '40mg', '50mg', '80mg', '100mg', '250mg', '500mg'];
  const medications: Omit<Medication, 'id'>[] = [];

  // Create sample medications with guaranteed diversity
  const createMed = (name: string, daysOffset: number, stock: number): Omit<Medication, 'id'> => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysOffset);
    return {
      name,
      expiryDate: expiryDate.toISOString(),
      stock,
    };
  };

  // Add expired medications
  medications.push(createMed('Expirophen 20mg', -15, 30));
  medications.push(createMed('Pastduecillin 50mg', -90, 15));
  medications.push(createMed('Gonebadazole 100mg', -4, 50));

  // Add expiring-soon medications
  medications.push(createMed('Almostix 10mg', 5, 45));
  medications.push(createMed('Soontogo 250mg', 25, 22));
  medications.push(createMed('Limitil 5mg', 1, 60));
  medications.push(createMed('Clocks ticking Forte', 12, 18));

  // Generate additional safe medications
  for (let i = 0; i < 13; i++) {
    const name = `${prefixes[i % prefixes.length]}${suffixes[i % suffixes.length]} ${strengths[i % strengths.length]}`;
    const daysOffset = Math.floor(Math.random() * 600) + 60; // 2 months to 2 years
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysOffset);
    medications.push({
      name,
      expiryDate: expiryDate.toISOString(),
      stock: Math.floor(Math.random() * 200) + 10,
    });
  }

  return medications;
};
