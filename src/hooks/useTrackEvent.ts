import { useCallback, useEffect, useState } from 'react';
import { logEvent } from 'firebase/analytics';
import { useAnalytics } from '@/lib/firebaseAnalytics';

export const useTrackEvent = () => {
    const analytics = useAnalytics();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [queue, setQueue] = useState<{ eventName: string; eventParams?: { [key: string]: any } }[]>([]);

    // Flush the queue when analytics becomes available
    useEffect(() => {
        if (analytics && queue.length > 0) {
            queue.forEach(({ eventName, eventParams }) => {
                logEvent(analytics, eventName, eventParams);
            });
            setQueue([]); // Clear the queue
        }
    }, [analytics, queue]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useCallback((eventName: string, eventParams?: { [key: string]: any }) => {
        if (analytics) {
            logEvent(analytics, eventName, eventParams);
        } else {
            setQueue(prev => [...prev, { eventName, eventParams }]);
        }
    }, [analytics]);
};