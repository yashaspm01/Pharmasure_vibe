'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertCircle, ChevronRight, Pill, Sun, Sunset, Moon, Info, BarChart2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { weeklyAdherence, adherenceStats as initialAdherenceStats } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import type { Medication, Alert, NextDosage, Product } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { WeeklyAdherenceChart, AdherenceRadialChart } from './charts';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { getDynamicStatus } from '@/lib/utils';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sun': return <Sun className="w-6 h-6 text-yellow-500" />;
    case 'Sunset': return <Sunset className="w-6 h-6 text-orange-500" />;
    case 'Moon': return <Moon className="w-6 h-6 text-blue-500" />;
    default: return <Pill className="w-6 h-6 text-primary" />;
  }
}

function DosageTime({ time }: { time: string }) {
  const [hour, period] = time.split(' ');
  return (
    <div className="flex items-baseline">
      <span className="text-3xl font-bold">{hour}</span>
      <span className="text-sm font-medium text-muted-foreground">{period}</span>
    </div>
  );
}

function Countdown({ expiryDate }: { expiryDate: Date | undefined }) {
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        if (!expiryDate) return;

        const calculateTimeLeft = () => {
            const difference = +expiryDate - +new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                
                if (days > 0) return `${days}d left`;
                if (hours > 0) return `${hours}h left`;
                return `${minutes}m left`;
            }
            return 'Expired';
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000); // Update every minute

        return () => clearInterval(timer);
    }, [expiryDate]);
    
    if (timeLeft === null) {
        return null;
    }

    return (
        <div className="text-sm font-mono tracking-wider text-muted-foreground">
            <span>{timeLeft}</span>
        </div>
    );
}

export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [adherenceStats, setAdherenceStats] = useState(initialAdherenceStats);
  const [expiryDates, setExpiryDates] = useState<Map<string, Date>>(new Map());

  // Fetch active medications from Firestore
  const medsQuery = useMemoFirebase(() => {
    if (user && firestore) {
      return query(collection(firestore, 'users', user.uid, 'meds'), orderBy('addedOn', 'desc'));
    }
    return null;
  }, [user, firestore]);

  const { data: allMeds, isLoading: isLoadingMeds } = useCollection<Product>(medsQuery);
  
  // Filter to show only active medications
  const activeMedications = (allMeds || []).filter(med => getDynamicStatus(med) === 'Active').slice(0, 5);
  
  // Generate alerts from medications
  const alerts: Alert[] = [];
  (allMeds || []).forEach(med => {
    const status = getDynamicStatus(med);
    if (status === 'Expired') {
      alerts.push({
        id: `exp-${med.id}`,
        title: 'Medication Expired',
        subtitle: `${med.name} has expired`,
        type: 'error'
      });
    } else if (med.expiry) {
      const daysUntilExpiry = Math.ceil((new Date(med.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        alerts.push({
          id: `exp-soon-${med.id}`,
          title: 'Expiring Soon',
          subtitle: `${med.name} expires in ${daysUntilExpiry} days`,
          type: 'warning'
        });
      }
    }
  });


  useEffect(() => {
    const dates = new Map<string, Date>();
    activeMedications.forEach(med => {
      if (med.expiry) {
        dates.set(med.id, new Date(med.expiry));
      }
    });
    setExpiryDates(dates);
  }, [activeMedications]);

  const handleMedicationComplete = (medId: string) => {
    // Update adherence stats
    setAdherenceStats(prevStats => {
        const newTaken = prevStats.taken + 1;
        const newPercentage = Math.round((newTaken / prevStats.total) * 100);
        return {
            ...prevStats,
            taken: newTaken,
            percentage: newPercentage,
        }
    });
  };


  return (
    <div className="bg-background min-h-screen">
      <div className='bg-primary text-primary-foreground px-6 pt-8 pb-20 rounded-b-3xl'>
        <div className="text-left">
            {isUserLoading ? (
                <>
                    <Skeleton className="h-8 w-48 rounded-lg bg-primary/50" />
                    <Skeleton className="h-5 w-64 mt-2 rounded-lg bg-primary/50" />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">Hello, {user?.firstName || 'User'}!</h1>
                    <p className="opacity-80">Here is your health summary for today.</p>
                </>
            )}
        </div>
      </div>
      <div className="p-4 space-y-6 -mt-16">
        
        {activeMedications.length > 0 && activeMedications[0] && (
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-bold">Next Dosage</CardTitle>
                    <Button variant="link" size="sm" asChild>
                    <Link href="/reminders">View All <ChevronRight className="w-4 h-4" /></Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                        <div className='flex items-center gap-4'>
                            <div className="p-3 bg-white rounded-full shadow-md">
                                <Pill className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-foreground">{activeMedications[0].name}</p>
                                <p className="text-sm text-muted-foreground">{activeMedications[0].dosage || 'Take as prescribed'}</p>
                            </div>
                        </div>
                        <DosageTime time="9:00 AM" />
                    </div>
                </CardContent>
            </Card>
        )}

        <Card className="shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-muted-foreground">Progress</span>
                    <span><span className="text-foreground font-bold">{adherenceStats.taken}</span> of {adherenceStats.total} taken</span>
                </div>
                <Progress value={adherenceStats.percentage} className="h-2" />
            </CardContent>
            <CardFooter>
                 <p className='text-sm text-muted-foreground'>You've taken {adherenceStats.percentage}% of your doses today!</p>
            </CardFooter>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Weekly Adherence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div>
                    <h3 className="font-semibold text-center mb-2 flex items-center justify-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Adherence
                    </h3>
                    <AdherenceRadialChart />
                 </div>
                <div>
                    <h3 className="font-semibold text-center mb-2 flex items-center justify-center gap-2">
                        <BarChart2 className="w-5 h-5 text-primary" />
                        Daily Intake
                    </h3>
                    <WeeklyAdherenceChart />
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Active Medications</CardTitle>
            <Button variant="link" size="sm" asChild>
                <Link href="/products">View All <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoadingMeds ? (
              <div className='space-y-3'>
                <Skeleton className='h-20 w-full' />
                <Skeleton className='h-20 w-full' />
                <Skeleton className='h-20 w-full' />
              </div>
            ) : (
              activeMedications.map(med => (
                <div key={med.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Checkbox
                      id={`complete-${med.id}`}
                      onCheckedChange={() => handleMedicationComplete(med.id)}
                      className="h-5 w-5"
                  />
                  <Link href={`/products/${med.id}`} className='flex-grow'>
                      <div className="flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer w-full">
                          <div className='flex items-center gap-3'>
                              <div className="p-3 bg-white rounded-full shadow-sm">
                                  <Pill className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                  <p className="font-semibold text-foreground">{med.name}</p>
                                  <p className="text-xs text-muted-foreground">{med.dosage || 'Medication'}</p>
                              </div>
                          </div>
                          <Countdown expiryDate={expiryDates.get(med.id)} />
                      </div>
                  </Link>
                </div>
              ))
            )}
            {activeMedications.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No active medications.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Alerts</CardTitle>
            <Button variant="link" size="sm">View All <ChevronRight className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map(alert => (
                 <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg ${alert.type === 'error' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    <div className={`p-2 rounded-full ${alert.type === 'error' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                        {alert.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-600" /> : <Info className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div>
                        <p className={`font-bold ${alert.type === 'error' ? 'text-red-700' : 'text-yellow-800'}`}>{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.subtitle}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
