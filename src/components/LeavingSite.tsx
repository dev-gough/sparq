'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LeavingSite() {
    const [shown, setShown] = useState(false);
    const [href, setHref] = useState('');

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log('leavingsite handleclick')
            const anchor = (e.target as HTMLElement).closest('a');
            if (!anchor?.href) return;
            if (anchor.id === "proceed") return
            const url = new URL(anchor.href, location.href);
            if (url.origin !== location.origin) {
                e.preventDefault();
                setHref(anchor.href);
                setShown(true);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    if (!shown) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
            onClick={() => setShown(false)}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-maroon max-w-md w-full"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-brand-maroon">
                    Third-Party Content Disclaimer
                </h2>
                <p className="mt-4 text-gray-700">
                    Sparqsys.com is not responsible for content or privacy practices on
                    third-party sites. You’re about to visit:
                </p>
                <p className="mt-2 font-mono text-sm text-gray-600 break-all">{href}</p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setShown(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <Link
                        id="proceed" 
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-maroon text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Proceed
                    </Link>
                </div>
            </div>
        </div>
    );
}
