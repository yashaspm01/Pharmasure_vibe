
'use client';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronLeft, CalendarDays, Clock, PackageOpen, Trash2, MessageSquareQuote, Stethoscope, User, FileScan, Info, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn, getDynamicStatus } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { deleteMedication } from '@/services/medication-service';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'Ongoing': return 'default';
        case 'Completed': return 'secondary';
        case 'Missed': return 'destructive';
        default: return 'outline';
    }
}

const MedicineDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { user } = useUser();
  const firestore = useFirestore();

  const medDocRef = useMemoFirebase(() => {
    if (user && firestore && id) {
      return doc(firestore, 'users', user.uid, 'meds', id as string);
    }
    return null;
  }, [user, firestore, id]);

  const { data: product, isLoading: isLoadingMed } = useDoc<Product>(medDocRef);

  const handleDelete = async () => {
    if (!user || !firestore || !id) return;
    
    setIsDeleting(true);
    try {
      await deleteMedication(firestore, user.uid, id as string);
      toast({
        title: 'Medication Deleted',
        description: 'The medication has been removed from your list.',
      });
      router.push('/products');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: error.message || 'Could not delete medication.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoadingMed) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className='w-10 h-10 animate-spin text-primary' />
        </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-4">
         <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the medicine you're looking for.</p>
        <Button asChild>
          <Link href="/products">Go Back to My Meds</Link>
        </Button>
      </div>
    );
  }

  const dynamicStatus = getDynamicStatus(product);

  return (
    <div className="bg-background min-h-screen">
      <header className="p-4 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <Button variant="ghost" size="icon" asChild className='rounded-full'>
            <Link href="/products">
                <ChevronLeft className="w-6 h-6" />
            </Link>
        </Button>
        <h1 className="text-xl font-bold text-center flex-1">Medicine Details</h1>
        <div className='w-10'></div>
      </header>

      <div className="p-4 space-y-6 pb-20">
        <Card className="bg-card shadow-lg rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            {product.imageUrl && (
                <div className='relative w-20 h-20 bg-slate-100 rounded-lg overflow-hidden'>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-muted-foreground">{product.brand}</p>
              {dynamicStatus && <Badge variant={dynamicStatus === 'Active' ? 'default' : dynamicStatus === 'Completed' ? 'secondary' : 'destructive'} className='mt-2'>{dynamicStatus}</Badge>}
            </div>
          </CardContent>
        </Card>

        {product.duration && (
            <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><CalendarDays /> Medication Duration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Start Date</span>
                        <span className='font-semibold'>{product.duration.startDate}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Expected End Date</span>
                        <span className='font-semibold'>{product.duration.endDate}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Total Duration</span>
                        <span className='font-semibold'>{product.duration.totalDays} Days Course</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Completion Status</span>
                        <Badge variant={getStatusBadgeVariant(product.duration.status)}>{product.duration.status}</Badge>
                    </div>
                </CardContent>
            </Card>
        )}

        {product.reminderActivity && (
            <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><Clock/> Reminder & Tick Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Reminders Sent</span>
                        <span className='font-semibold'>{product.reminderActivity.totalRemindersSent} times</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Last Reminder Sent</span>
                        <span className='font-semibold'>{product.reminderActivity.lastTicked}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Next Reminder Scheduled</span>
                        <span className='font-semibold'>{product.reminderActivity.nextReminder}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Reminder Status</span>
                        <div className='flex items-center gap-2'>
                            <div className={cn("h-2 w-2 rounded-full", product.reminderActivity.reminderStatus ? 'bg-green-500' : 'bg-muted-foreground')}></div>
                            <span className='font-semibold'>{product.reminderActivity.reminderStatus ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
        
        {product.stockTracking && (
             <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><PackageOpen /> Stock & Consumption</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className='font-semibold'>{product.stockTracking.countLeft} left</span>
                            <span className='text-muted-foreground'>of {product.stockTracking.totalCount} total</span>
                        </div>
                        <Progress value={(product.stockTracking.countLeft / product.stockTracking.totalCount) * 100} />
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Predicted Finish Date</span>
                        <span className='font-semibold'>{product.stockTracking.predictedFinishDate}</span>
                    </div>
                    {product.stockTracking.lowStockAlert && (
                         <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-400/20">
                            <div className={`p-2 rounded-full bg-yellow-400/30`}>
                                <Info className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className={`font-bold text-yellow-700`}>Low Stock</p>
                                <p className="text-sm text-muted-foreground">You are running low on this medication. Plan a refill soon.</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}

        {product.scanDetails && (
            <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><FileScan /> Scan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><span className='font-semibold text-muted-foreground'>Scanned On:</span> {product.scanDetails.scannedOn}</div>
                        <div><span className='font-semibold text-muted-foreground'>Source:</span> {product.scanDetails.source}</div>
                        <div><span className='font-semibold'>Batch No:</span> {product.scanDetails.batchNumber}</div>
                        <div><span className='font-semibold text-muted-foreground'>Mfg. Date:</span> {product.scanDetails.manufactureDate}</div>
                         <div><span className='font-semibold text-muted-foreground'>Manufacturer:</span> {product.scanDetails.manufacturer}</div>
                    </div>
                </CardContent>
            </Card>
        )}


        {product.expiryAndDisposal && (
            <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><Trash2 /> Expiry & Disposal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Expiry Date</span>
                        <span className='font-semibold'>{product.expiryAndDisposal.expiryDate}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Days Remaining</span>
                        <span className={cn('font-semibold', product.expiryAndDisposal.daysRemaining < 30 ? 'text-destructive' : 'text-foreground')}>{product.expiryAndDisposal.daysRemaining} days</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Disposal Reminder</span>
                        <div className='flex items-center gap-2'>
                            <div className={cn("h-2 w-2 rounded-full", product.expiryAndDisposal.disposalReminderSet ? 'bg-green-500' : 'bg-muted-foreground')}></div>
                            <span className='font-semibold'>{product.expiryAndDisposal.disposalReminderSet ? 'Set' : 'Not Set'}</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className='text-muted-foreground'>Disposal Status</span>
                        <Badge variant={product.expiryAndDisposal.disposalStatus === 'Completed' ? 'secondary' : 'outline'}>{product.expiryAndDisposal.disposalStatus}</Badge>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button variant='destructive' className='w-full' disabled={product.expiryAndDisposal.disposalStatus === 'Completed'}>
                        <Trash2 className='mr-2' /> Dispose Now
                    </Button>
                </CardFooter>
            </Card>
        )}

        {product.notes && (
             <Card className="bg-card shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2"><MessageSquareQuote /> Notes & Observations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {product.notes.doctorNote && (
                        <div className="p-3 bg-secondary/50 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Stethoscope className='w-5 h-5 text-primary' /> Doctor's Note</h4>
                            <p className="text-sm text-muted-foreground italic">"{product.notes.doctorNote}"</p>
                        </div>
                    )}
                     {product.notes.userFeedback && (
                        <div className="p-3 bg-secondary/50 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2"><User className='w-5 h-5 text-primary' /> Your Remarks</h4>
                            <p className="text-sm text-muted-foreground italic">"{product.notes.userFeedback}"</p>
                        </div>
                    )}
                    {(!product.notes.doctorNote && !product.notes.userFeedback) && (
                        <p className='text-sm text-muted-foreground text-center py-4'>No notes available for this medication.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button variant='outline' className='w-full'>
                        Add / Edit Notes
                    </Button>
                </CardFooter>
            </Card>
        )}
        
        <div className="text-center pt-4">
            <Button variant="outline" asChild>
                <Link href="/profile">View Full Health Report</Link>
            </Button>
        </div>

        <Card className="bg-card shadow-lg rounded-2xl border-destructive/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete this medication, it cannot be recovered.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                  Delete Medication
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete <strong>{product?.name}</strong> from your medication list. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
