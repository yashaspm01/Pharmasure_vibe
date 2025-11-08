// Service Worker for handling push notifications

const CACHE_NAME = 'pharmasure-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/sounds/notification.mp3'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const title = data.title || 'PharmaSure';
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: data.tag || 'pharmasure-notification',
    data: data.data || {},
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Handle notification click action
  if (event.action) {
    // Handle custom actions if needed
    console.log('Action clicked:', event.action);
  } else {
    // Default click behavior
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((clientList) => {
          // Check if there's an open window
          for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) {
              return client.focus();
            }
          }
          // If no window is open, open a new one
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  }
});

// Background sync for offline support
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reminders') {
    // Handle background sync for reminders
    console.log('Background sync for reminders');
    // You can add your background sync logic here
  }
});
