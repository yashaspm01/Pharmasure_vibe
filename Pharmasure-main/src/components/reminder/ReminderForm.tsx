'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, X, Bell, Repeat, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reminder } from '@/services/reminder-service';
import { notificationService } from '@/services/notification-service';

const reminderSchema = z.object({
  medicationName: z.string().min(1, 'Medication name is required'),
  medicationId: z.string().optional(),
  dosage: z.string().optional(),
  time: z.string().min(1, 'Time is required'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  recurring: z.boolean().default(false),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']).optional(),
  daysOfWeek: z.array(z.number()).optional(),
  notes: z.string().optional(),
  enabled: z.boolean().default(true),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

interface ReminderFormProps {
  initialData?: Reminder;
  onSave: (reminder: Reminder) => void;
  onCancel: () => void;
}

export function ReminderForm({ initialData, onSave, onCancel }: ReminderFormProps) {
  const [isRecurring, setIsRecurring] = useState(initialData?.recurring || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [time, setTime] = useState(initialData ? format(new Date(initialData.time), 'HH:mm') : '');
  
  const defaultValues = initialData ? {
    ...initialData,
    date: new Date(initialData.time),
    time: format(new Date(initialData.time), 'HH:mm'),
    daysOfWeek: initialData.daysOfWeek || [],
  } : {
    medicationName: '',
    medicationId: '',
    dosage: '',
    time: '',
    date: new Date(),
    recurring: false,
    frequency: 'daily',
    daysOfWeek: [],
    notes: '',
    enabled: true,
  };

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues,
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  const selectedDate = watch('date');

  useEffect(() => {
    if (initialData) {
      setTime(format(new Date(initialData.time), 'HH:mm'));
    }
  }, [initialData]);

  const onSubmit = async (data: ReminderFormValues) => {
    setIsSubmitting(true);
    try {
      const reminderTime = new Date(data.date);
      const [hours, minutes] = data.time.split(':').map(Number);
      reminderTime.setHours(hours, minutes, 0, 0);

      const reminderData: Reminder = {
        ...initialData,
        ...data,
        time: reminderTime.toISOString(),
        date: reminderTime,
        frequency: data.recurring ? (data.frequency as 'daily' | 'weekly' | 'monthly' | 'custom') : undefined,
        userId: initialData?.userId || '',
        medicationId: initialData?.medicationId || '',
        enabled: data.enabled ?? true,
        recurring: data.recurring ?? false,
      };

      await onSave(reminderData);
      
    } catch (error) {
      console.error('Error saving reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestNotification = () => {
    notificationService.showNotification({
      title: 'Test Notification',
      body: 'This is a test notification from PharmaSure',
      requireInteraction: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Medication Name */}
        <div className="space-y-2">
          <Label htmlFor="medicationName">Medication Name *</Label>
          <Input
            id="medicationName"
            placeholder="e.g., Ibuprofen"
            {...register('medicationName')}
            className={errors.medicationName ? 'border-red-500' : ''}
          />
          {errors.medicationName && (
            <p className="text-sm text-red-500">{errors.medicationName.message}</p>
          )}
        </div>

        {/* Dosage */}
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage (optional)</Label>
          <Input
            id="dosage"
            placeholder="e.g., 200mg"
            {...register('dosage')}
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setValue('date', date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setValue('time', e.target.value);
                }}
                className={cn('pl-10', errors.time ? 'border-red-500' : '')}
              />
            </div>
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Recurring */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => {
                setIsRecurring(e.target.checked);
                setValue('recurring', e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="recurring">Recurring</Label>
          </div>

          {isRecurring && (
            <div className="ml-6 space-y-2">
              <Label>Frequency</Label>
              <div className="flex flex-wrap gap-2">
                {['daily', 'weekly', 'monthly'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setValue('frequency', freq as 'daily' | 'weekly' | 'monthly')}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md border',
                      watch('frequency') === freq
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <textarea
            id="notes"
            rows={3}
            {...register('notes')}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any additional notes about this reminder"
          />
        </div>

        {/* Test Notification Button */}
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestNotification}
            className="text-sm"
          >
            <Bell className="mr-2 h-4 w-4" />
            Test Notification
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              {initialData ? 'Update Reminder' : 'Create Reminder'}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
