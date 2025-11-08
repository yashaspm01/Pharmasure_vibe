
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { saveMedicationFromScan } from '@/services/medication-service';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FileCheck2, Trash2, Pencil, PlusCircle, BellPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Scan } from '@/lib/types';

type ExpiryStatus = {
  text: string;
  color: string;
};

const monthMap: { [key: string]: number } = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
};

const parseExpiryDate = (expiryDate?: string): Date | null => {
    if (!expiryDate) return null;

    // Normalize the date string, e.g., "JUN.2025" -> "JUN 2025"
    const dateStr = expiryDate.toUpperCase().replace(/[./-]/g, ' ');
    const parts = dateStr.split(' ');

    let date: Date;

    if (parts.length === 2) {
        const [monthStr, yearStr] = parts;
        const year = parseInt(yearStr.length === 2 ? '20' + yearStr : yearStr);
        
        let monthIndex: number | undefined;
        const monthNum = parseInt(monthStr);

        if (monthStr in monthMap) { // Check for "JUN"
            monthIndex = monthMap[monthStr];
        } else if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) { // Check for "06"
            monthIndex = monthNum - 1;
        }

        if (year && monthIndex !== undefined && monthIndex >= 0 && monthIndex < 12) {
            // Set to the last day of the given month for safety
            date = new Date(year, monthIndex + 1, 0);
        } else {
            return null; // Invalid format
        }
    } else {
        // Fallback for standard parsable date formats
        date = new Date(expiryDate);
    }
  
    // Check if the resulting date is valid
    if (isNaN(date.getTime())) {
      return null;
    }
  
    return date;
};


export const ScanItem = ({ scan, onDelete }: { scan: Scan & {imageUrl?: string}; onDelete: (id: string) => void }) => {
  const [expiryStatus, setExpiryStatus] = useState<ExpiryStatus>({ text: 'Checking...', color: 'text-muted-foreground' });
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    const getExpiryStatus = (expiryDate?: string): ExpiryStatus => {
      const date = parseExpiryDate(expiryDate);
      if (!date) return { text: 'Invalid Date', color: 'text-destructive' };
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Compare date part only
      
      if (date < today) {
        return { text: 'Expired', color: 'text-destructive' };
      }

      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 30) return { text: `Expires in ${diffDays}d`, color: 'text-yellow-600' };
      
      return { text: `Expires on ${date.toLocaleDateString()}`, color: 'text-green-600' };
    };

    setExpiryStatus(getExpiryStatus(scan.expiryDate));
  }, [scan.expiryDate]);

  const handleAddToMeds = async () => {
    if (!firestore || !user) {
        toast({ title: "Error", description: "You must be logged in.", variant: "destructive"});
        return;
    }
    if (!scan.expiryDate) {
        toast({
            title: "Missing Expiry Date",
            description: "Please edit the scan and add an expiry date before adding to your medications.",
            variant: "destructive"
        });
        return;
    }
    setIsAdding(true);
    try {
        await saveMedicationFromScan(firestore, user.uid, scan);
        toast({
            title: "Medication Added",
            description: `${scan.name} has been added to My Meds.`,
        });
        router.push('/products');
    } catch (error) {
        console.error("Failed to add medication:", error);
        toast({ title: "Error", description: "Could not add medication. Please try again.", variant: "destructive" });
    } finally {
        setIsAdding(false);
    }
  };

  const handleSetReminder = () => {
    router.push(`/reminders?medication=${encodeURIComponent(scan.name)}`);
  };

  const scannedAtDate = scan.scannedAt instanceof Timestamp ? scan.scannedAt.toDate() : (scan.scannedAt ? new Date(scan.scannedAt) : null);

  return (
    <AccordionItem value={scan.id}>
      <AccordionTrigger>
        <div className='flex justify-between items-center w-full pr-4'>
          <div className="flex items-center gap-3">
            {scan.imageUrl ? (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                <Image src={scan.imageUrl} alt={scan.name} fill className="object-contain" />
              </div>
            ) : (
              <div className="p-2 bg-white rounded-full shadow-sm">
                  <FileCheck2 className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <p className="font-semibold text-left">{scan.name}</p>
              {scannedAtDate && !isNaN(scannedAtDate.getTime()) && (
                <p className="text-xs text-muted-foreground text-left">
                  Scanned {formatDistanceToNow(scannedAtDate, { addSuffix: true })}
                </p>
              )}
            </div>
          </div>
          <p className={cn("text-sm font-semibold", expiryStatus.color)}>{expiryStatus.text}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3 px-2 pt-2 border-t">
          <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
            <div><span className='font-semibold'>Strength:</span> {scan.strength}</div>
            <div><span className='font-semibold'>Batch No:</span> {scan.batchNumber}</div>
            <div><span className='font-semibold'>Mfg. Date:</span> {scan.mfgDate}</div>
            <div><span className='font-semibold'>Expiry Date:</span> {scan.expiryDate}</div>
            <div className='col-span-2'><span className='font-semibold'>Manufacturer:</span> {scan.manufacturer}</div>
          </div>
          <div className='flex flex-wrap justify-end gap-2 pt-2'>
            <Button variant='ghost' size='sm' className='text-destructive hover:text-destructive' onClick={() => onDelete(scan.id)}><Trash2 className='mr-2 h-4 w-4' /> Remove</Button>
            <Button variant='outline' size='sm'><Pencil className='mr-2 h-4 w-4' /> Edit</Button>
            <Button size='sm' className='bg-green-600 hover:bg-green-700' onClick={handleAddToMeds} disabled={isAdding}>
                <PlusCircle className='mr-2 h-4 w-4' /> {isAdding ? 'Adding...' : 'Add to My Meds'}
            </Button>
            <Button size='sm' onClick={handleSetReminder}><BellPlus className='mr-2 h-4 w-4' /> Set Reminder</Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
