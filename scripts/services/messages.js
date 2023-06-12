self.addEventListener('push', function(e) {
  const data = e.data.json()
  const options = {
    body: data.notification.body, icon: data.notification.icon, vibrate: [100, 50, 100], data: {
      dateOfArrival: Date.now(), primaryKey: '2', customData: data.data
    }
  }
  e.waitUntil(self.registration.showNotification(data.notification.title, options))
})


self.addEventListener('notificationclick', function(event) {
  const link = event.notification?.data?.customData?.redirect
  event.notification.close()
  event.waitUntil(self.clients.matchAll({ type: 'window' }).then(windowClients => {
    // Check if there is already a window/tab open with the target URL
    console.log(windowClients)
    for (let i = 0; i < windowClients.length; i++) {
      const client = windowClients[i]
      // If so, just focus it.
      if (client.url === link && 'focus' in client) {
        return client.focus()
      }
    }
    if (self.clients.openWindow) {
      self.clients.openWindow(link)
    }
  }))
}, false)
