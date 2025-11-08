'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';
import { Bell, Clock, Repeat, Check, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Reminder } from '@/services/reminder-service';
import { notificationService } from '@/services/notification-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReminderListProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
  isLoading?: boolean;
}

export function ReminderList({ reminders, onEdit, onDelete, onToggle, isLoading }: ReminderListProps) {
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState(new Date());

  // Update the current time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'h:mm a');
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getTimeUntil = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / 60000);
      
      if (diffInMinutes < 0) return 'Past due';
      if (diffInMinutes < 60) return `In ${diffInMinutes}m`;
      if (diffInMinutes < 1440) return `In ${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
      
      const days = Math.floor(diffInMinutes / 1440);
      return `In ${days} day${days > 1 ? 's' : ''}`;
    } catch (error) {
      console.error('Error calculating time until:', error);
      return 'Time error';
    }
  };

  const handleToggle = async (id: string | undefined, enabled: boolean) => {
    if (!id) return;
    
    try {
      setUpdating(prev => ({ ...prev, [id]: true }));
      await onToggle(id, !enabled);
    } catch (error) {
      console.error('Error toggling reminder:', error);
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleTestNotification = async (reminder: Reminder) => {
    if (!reminder.id) return;
    
    try {
      setUpdating(prev => ({ ...prev, [reminder.id!]: true }));
      await notificationService.showNotification({
        title: 'Test Reminder',
        body: `Time to take ${reminder.medicationName}${reminder.dosage ? ` (${reminder.dosage})` : ''}`,
        requireInteraction: true,
        data: { reminderId: reminder.id }
      });
    } catch (error) {
      console.error('Error testing notification:', error);
    } finally {
      setUpdating(prev => ({ ...prev, [reminder.id!]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">No reminders yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add a reminder to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => {
        const isPastDue = isBefore(parseISO(reminder.time), now);
        const isActive = reminder.enabled && !isPastDue;
        
        return (
          <Card 
            key={reminder.id}
            className={cn(
              'overflow-hidden transition-all',
              !reminder.enabled && 'opacity-70 bg-muted/30',
              isPastDue && reminder.enabled && 'border-destructive/30 bg-destructive/5'
            )}
          >
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center',
                    isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  )}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{reminder.medicationName}</h3>
                      {reminder.dosage && (
                        <Badge variant="outline" className="text-xs">
                          {reminder.dosage}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{formatTime(reminder.time)} • {formatDate(reminder.time)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Badge 
                    variant={isPastDue ? 'destructive' : isActive ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {isPastDue ? 'Past due' : getTimeUntil(reminder.time)}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(reminder)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTestNotification(reminder)}>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Test notification</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => reminder.id && handleToggle(reminder.id, reminder.enabled)}
                        disabled={!reminder.id || updating[reminder.id]}
                      >
                        {updating[reminder.id] ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </span>
                        ) : (
                          <>
                            <Check className={`mr-2 h-4 w-4 ${reminder.enabled ? 'text-green-500' : ''}`} />
                            <span>{reminder.enabled ? 'Disable' : 'Enable'}</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => reminder.id && onDelete(reminder.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {reminder.recurring && reminder.frequency && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Repeat className="mr-1 h-3 w-3" />
                  <span>Repeats {reminder.frequency}</span>
                </div>
              )}
              
              {reminder.notes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {reminder.notes}
                </p>
              )}
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
