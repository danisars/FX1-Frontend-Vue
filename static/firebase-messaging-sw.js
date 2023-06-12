
    importScripts(
      'https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyCFB3O8-QKkDwOq7gTNGa3GHX7YKimWUC8","authDomain":"fx1-development.firebaseapp.com","projectId":"fx1-development","storageBucket":"fx1-development.appspot.com","messagingSenderId":"24532261886","appId":"1:24532261886:web:2924c01844a78098127eaf","measurementId":"G-PTKDG9TC7B"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

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

