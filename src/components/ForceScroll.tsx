'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ForceScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // If there’s a hash fragment (window.location.hash !== ''),
    // let the browser handle scrolling to that anchor.
    if (window.location.hash) return;

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}