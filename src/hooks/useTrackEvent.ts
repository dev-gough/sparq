import { useCallback } from 'react';
import { logEvent } from 'firebase/analytics';
import { useAnalytics } from '@/lib/firebaseAnalytics'; // Adjust the import path as needed

export const useTrackEvent = () => {
    const analytics = useAnalytics();
    return useCallback((eventName:string, eventParams?: { [key:string]:any }) => {
        if (analytics) {
            logEvent(analytics, eventName, eventParams);
        }
    }, [analytics]);
};