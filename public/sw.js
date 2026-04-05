self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Nouvelle annonce', body: 'Une nouvelle annonce est disponible.' };
  
  const options = {
    body: data.body,
    icon: '/logo-lwm.jpeg',
    badge: '/logo-lwm.jpeg',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
