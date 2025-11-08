
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ListFilter, Search, Pencil, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge';
import { cn, getDynamicStatus } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';

const getExpiryStatus = (expiryDate?: string): { text: string; color: string; isNear: boolean; } => {
    if (!expiryDate) return { text: 'N/A', color: 'text-muted-foreground', isNear: false };
  
    const date = new Date(expiryDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) return { text: `Expired`, color: 'text-destructive', isNear: true };
    if (diffDays <= 30) return { text: `Expires in ${diffDays} days`, color: 'text-yellow-600', isNear: true };
    return { text: `Expires on ${date.toLocaleDateString()}`, color: 'text-muted-foreground', isNear: false };
};


export default function MyMedsPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filter, setFilter] = useState('all');

  const { user } = useUser();
  const firestore = useFirestore();

  const medsQuery = useMemoFirebase(() => {
    if (user && firestore) {
      return query(collection(firestore, 'users', user.uid, 'meds'), orderBy('addedOn', 'desc'));
    }
    return null;
  }, [user, firestore]);

  const { data: allProducts, isLoading: isLoadingMeds } = useCollection<Product>(medsQuery);

  const filteredProducts = (allProducts || [])
    .filter(product => {
        const dynamicStatus = getDynamicStatus(product);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || dynamicStatus?.toLowerCase() === filter;
        return matchesSearch && matchesFilter;
    });

  return (
    <div className="bg-background min-h-screen">
      <div className="p-4 space-y-4">
        <div className="relative w-full max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search your medications..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="flex items-center justify-between">
            <h2 className='font-bold text-lg'>All Medications</h2>
            <Select onValueChange={setFilter} defaultValue='all'>
                <SelectTrigger className="w-auto gap-2 font-semibold">
                    <ListFilter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
            </Select>
        </div>
        
        {isLoadingMeds ? (
            <div className='flex justify-center items-center h-64'>
                <Loader2 className='w-8 h-8 animate-spin text-primary' />
            </div>
        ) : (
            <>
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {filteredProducts.map(med => {
                        const expiry = getExpiryStatus(med.expiry);
                        const dynamicStatus = getDynamicStatus(med);
                        return (
                            <AccordionItem value={med.id} key={med.id} className="border-b-0">
                                <Card className="bg-card shadow-md rounded-xl hover:shadow-lg transition-shadow">
                                    <AccordionTrigger className="p-4 w-full hover:no-underline">
                                        <div className='flex items-center gap-4 w-full'>
                                            {med.imageUrl && (
                                                <div className='relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100'>
                                                    <Image src={med.imageUrl} alt={med.name} fill className='object-contain' />
                                                </div>
                                            )}
                                            <div className="flex-grow space-y-2 text-left w-full">
                                                <div className='flex justify-between items-start'>
                                                    <p className="font-bold text-foreground pr-2">{med.name}</p>
                                                    {dynamicStatus && <Badge variant={dynamicStatus === 'Active' ? 'default' : dynamicStatus === 'Completed' ? 'secondary' : 'destructive'}>{dynamicStatus}</Badge>}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                                <p className={cn("text-xs font-semibold", expiry.color)}>{expiry.text}</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="border-t pt-4 space-y-2">
                                            {med.scanDetails && (
                                                <div className='text-sm space-y-1'>
                                                    <p><span className='font-semibold'>Scanned:</span> {med.scanDetails.scannedOn}</p>
                                                    <p><span className='font-semibold'>Batch No:</span> {med.scanDetails.batchNumber}</p>
                                                    <p><span className='font-semibold'>Manufacturer:</span> {med.scanDetails.manufacturer}</p>
                                                </div>
                                            )}
                                            <div className='flex justify-end'>
                                                <Button asChild variant="link" size="sm">
                                                    <Link href={`/products/${med.id}`}>
                                                        <Pencil className="mr-2 h-4 w-4" /> View & Edit Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        )
                    })}
                </Accordion>

                {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No medications found.</p>
                </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}
