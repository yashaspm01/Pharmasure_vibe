import { Reminder } from './reminder-service';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  data?: any;
  tag?: string;
  requireInteraction?: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';
  private notificationSound = '/sounds/notification.mp3';
  private audio: HTMLAudioElement | null = null;
  private activeNotifications: Notification[] = [];
  private reminderTimers: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.requestPermission();
    this.setupServiceWorker();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registration successful');
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    }
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (this.permission === 'default') {
      this.permission = await Notification.requestPermission();
    }

    return this.permission;
  }

  public async showNotification(options: NotificationOptions): Promise<Notification | null> {
    if (this.permission !== 'granted') {
      this.permission = await this.requestPermission();
      if (this.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }
    }

    // Play notification sound
    this.playNotificationSound();

    // Show notification
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icons/icon-192x192.png',
      data: options.data,
      tag: options.tag,
      requireInteraction: options.requireInteraction || false,
    });

    // Add to active notifications
    this.activeNotifications.push(notification);

    // Remove from active notifications when closed
    notification.onclose = () => {
      this.activeNotifications = this.activeNotifications.filter(n => n !== notification);
    };

    return notification;
  }

  public scheduleReminder(reminder: Reminder) {
    if (!reminder.id) {
      console.warn('Cannot schedule reminder without an ID');
      return;
    }

    if (this.reminderTimers.has(reminder.id)) {
      this.cancelReminder(reminder.id);
    }

    const now = new Date();
    const reminderTime = new Date(reminder.time);
    
    // If the reminder time is in the past, don't schedule it
    if (reminderTime <= now) {
      console.warn(`Reminder time (${reminderTime}) is in the past`);
      return;
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    const timer = setTimeout(() => {
      this.showNotification({
        title: 'Medication Reminder',
        body: `Time to take ${reminder.medicationName}${reminder.dosage ? ` (${reminder.dosage})` : ''}`,
        requireInteraction: true,
        data: { reminderId: reminder.id }
      });
      
      // Schedule next occurrence if it's a recurring reminder
      if (reminder.recurring && reminder.frequency) {
        this.scheduleNextRecurringReminder(reminder);
      }
      
      if (reminder.id) {
        this.reminderTimers.delete(reminder.id);
      }
    }, timeUntilReminder);

    this.reminderTimers.set(reminder.id, timer);
  }

  private scheduleNextRecurringReminder(reminder: Reminder) {
    if (!reminder.recurring || !reminder.frequency || !reminder.id) return;

    const nextReminder = { ...reminder };
    const now = new Date();
    let nextTime = new Date(reminder.time);

    // Calculate next occurrence based on frequency
    switch (reminder.frequency) {
      case 'daily':
        nextTime.setDate(nextTime.getDate() + 1);
        break;
      case 'weekly':
        nextTime.setDate(nextTime.getDate() + 7);
        break;
      case 'monthly':
        nextTime.setMonth(nextTime.getMonth() + 1);
        break;
      case 'custom':
        // For custom frequency, we need to have daysOfWeek defined
        if (!reminder.daysOfWeek || reminder.daysOfWeek.length === 0) return;
        
        // Find the next day in daysOfWeek
        const currentDay = nextTime.getDay();
        const nextDay = reminder.daysOfWeek.find(day => day > currentDay) || 
                       Math.min(...reminder.daysOfWeek) + 7;
        const daysToAdd = nextDay - currentDay;
        nextTime.setDate(nextTime.getDate() + daysToAdd);
        break;
      default:
        return; // Not a supported frequency
    }

    // If the next occurrence is in the past, keep adding intervals until it's in the future
    while (nextTime <= now) {
      switch (reminder.frequency) {
        case 'daily':
          nextTime.setDate(nextTime.getDate() + 1);
          break;
        case 'weekly':
          nextTime.setDate(nextTime.getDate() + 7);
          break;
        case 'monthly':
          nextTime.setMonth(nextTime.getMonth() + 1);
          break;
      }
    }

    nextReminder.time = nextTime.toISOString();
    this.scheduleReminder(nextReminder);
  }

  public cancelReminder(reminderId: string) {
    const timer = this.reminderTimers.get(reminderId);
    if (timer) {
      clearTimeout(timer);
      this.reminderTimers.delete(reminderId);
    }
  }

  public cancelAllReminders() {
    for (const timer of this.reminderTimers.values()) {
      clearTimeout(timer);
    }
    this.reminderTimers.clear();
  }

  public closeAllNotifications() {
    this.activeNotifications.forEach(notification => notification.close());
    this.activeNotifications = [];
  }

  private playNotificationSound() {
    if (!this.audio) {
      this.audio = new Audio(this.notificationSound);
    }
    
    // Try to play the sound, but don't block if it fails
    this.audio.play().catch(error => {
      console.warn('Failed to play notification sound:', error);
    });
  }
}

export const notificationService = NotificationService.getInstance();
