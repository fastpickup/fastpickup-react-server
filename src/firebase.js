import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { setCookie } from "./util/cookieUtil";

const firebaseConfig = {
  apiKey: "AIzaSyAHOtZVYBB8hnUq_SYKsEDQwifF0vuFKSM",
  authDomain: "fastpickup-12231.firebaseapp.com",
  projectId: "fastpickup-12231",
  storageBucket: "fastpickup-12231.appspot.com",
  messagingSenderId: "287215754000",
  appId: "1:287215754000:web:18c00a656f4c6443272395",
  measurementId: "G-TWRBB24Q37"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// // 토큰 삭제
// deleteToken(messaging).then(() => {
//   // 토큰 다시 가져오기
//   getToken(messaging, { vapidKey: `BM5dOQVKVrBlXo4fzzTzbAoY_2KbPLNl0Q2txRKBBVa69k5d0iP0Wxgip-1z9gNSqkI86VXcCQT7lMU9nHBqFDg` })
//     .then((newToken) => {
//       console.log('New token:', newToken);
//     })
//     .catch((err) => {
//       console.error('Error getting new token', err);
//     });
// });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
