// lib/firebaseAnalytics.js
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase and Analytics only on the client side
let analytics: Analytics;
if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Custom hook to access Analytics
export const useAnalytics = () => {
  useEffect(() => {
    if (analytics) {
      // Optionally log page views or initialize tracking here
    }
  }, []);
  return analytics;
};