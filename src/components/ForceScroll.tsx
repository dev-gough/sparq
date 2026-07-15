'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll to top on client-side route changes (except hash / browser back-forward).
 * Kept deliberately — Next soft navigations do not always reset scroll.
 */
export default function ForceScroll() {
  const pathname = usePathname();
  const isPop = useRef(false);

  // turn off auto restoration so we can control everything
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const onPop = () => { isPop.current = true };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    if (isPop.current) {
      isPop.current = false;
      return; // let browser restore
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
