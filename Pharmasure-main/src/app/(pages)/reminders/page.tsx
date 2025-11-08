
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar as CalendarIcon, Search, Bell, AlertTriangle, MoreVertical, ChevronRight, Pill, Loader2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import type { Reminder } from '@/services/reminder-service';


export default function RemindersPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('medication') || '';
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [alertType, setAlertType] = useState('sound');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [modifiers, setModifiers] = useState({});
  
  const { user } = useUser();
  const firestore = useFirestore();

  // Fetch reminders from Firestore
  const remindersQuery = useMemoFirebase(() => {
    if (user && firestore) {
      return query(
        collection(firestore, 'users', user.uid, 'reminders'),
        where('enabled', '==', true),
        orderBy('createdAt', 'desc')
      );
    }
    return null;
  }, [user, firestore]);

  const { data: allReminders, isLoading: isLoadingReminders } = useCollection<Reminder>(remindersQuery);

  useEffect(() => {
    // Defer dynamic date calculation to the client side to prevent hydration errors.
    const today = new Date();
    const safeExpiry = new Date();
    safeExpiry.setDate(today.getDate() + 45);
    const nearExpiry = new Date();
    nearExpiry.setDate(today.getDate() + 10);
    
    setModifiers({
      safe: safeExpiry,
      near_expiry: nearExpiry,
      expired: today,
    });
  }, []);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const filteredReminders = (allReminders || []).filter(reminder => 
    reminder.medicationName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-background min-h-screen">
      <div className="p-4 space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Reminders</h1>
        </header>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className='text-lg font-bold flex items-center gap-2'><CalendarIcon /> Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-0"
              modifiers={modifiers}
              modifiersStyles={{
                safe: { color: 'hsl(var(--primary))', fontWeight: 'bold'},
                near_expiry: { color: 'hsl(var(--yellow-600))', fontWeight: 'bold'},
                expired: { color: 'hsl(var(--destructive))', textDecoration: 'line-through' }
              }}
              
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className='flex items-center gap-3'>
                    <Pill className="w-6 h-6 text-primary" />
                    <span className="font-semibold">Pill Alerts</span>
                </div>
                <Switch defaultChecked/>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className='flex items-center gap-3'>
                    <Bell className="w-6 h-6 text-primary" />
                    <span className="font-semibold">Alert Type</span>
                </div>
                <ToggleGroup type="single" value={alertType} onValueChange={(value) => { if(value) setAlertType(value) }} className='gap-1'>
                    <ToggleGroupItem value="sound" aria-label="Sound" className='px-3 text-xs h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'>
                        Sound
                    </ToggleGroupItem>
                    <ToggleGroupItem value="vibrate" aria-label="Vibrate" className='px-3 text-xs h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'>
                        Vibrate
                    </ToggleGroupItem>
                    <ToggleGroupItem value="silent" aria-label="Silent" className='px-3 text-xs h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'>
                        Silent
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className='flex items-center gap-3'>
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <div>
                        <p className="font-semibold">Disposal alert</p>
                        <p className="text-xs text-muted-foreground">Reminds you 1 week before expiry</p>
                    </div>
                </div>
                <Switch defaultChecked/>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Upcoming Reminders</CardTitle>
             <Button variant="link" size="sm">View All <ChevronRight className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search reminders..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isLoadingReminders ? (
              <div className='flex justify-center items-center py-8'>
                <Loader2 className='w-6 h-6 animate-spin text-primary' />
              </div>
            ) : (
              filteredReminders.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                       <Pill className="w-5 h-5 text-primary"/>
                    </div>
                    <div>
                      <p className="font-semibold">{reminder.medicationName}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time} - {reminder.frequency}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className='rounded-full'>
                      <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              ))
            )}
             {filteredReminders.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No reminders found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
