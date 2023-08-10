importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
  const firebaseConfig = {
    apiKey: "AIzaSyAHOtZVYBB8hnUq_SYKsEDQwifF0vuFKSM",
    authDomain: "fastpickup-12231.firebaseapp.com",
    projectId: "fastpickup-12231",
    storageBucket: "fastpickup-12231.appspot.com",
    messagingSenderId: "287215754000",
    appId: "1:287215754000:web:18c00a656f4c6443272395",
    measurementId: "G-TWRBB24Q37"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

messaging.onMessage(function (payload) {
  console.log("Received forground message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
