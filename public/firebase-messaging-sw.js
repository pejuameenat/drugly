 importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
)

const firebaseMessaging = initializeApp({
  apiKey: 'AIzaSyACMVqooq_nGbVbGYXsl9Mbp-TfDtny268',
  authDomain: 'drugly-215ad.firebaseapp.com',
  projectId: 'drugly-215ad',
  storageBucket: 'drugly-215ad.firebasestorage.app',
  messagingSenderId: '384458881651',
  appId: '1:384458881651:web:9a88f7ba47eb0d334ac806',
  measurementId: 'G-JGFE29HDY4',
})

const messaging = getMessaging(firebaseMessaging)

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  )
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})