'use client'

import { useEffect } from 'react'

interface VideoPopupProps {
    url: string;
    onClose: () => void;
    iFrame: boolean
}

export default function VideoPopup({ url, onClose, iFrame }: VideoPopupProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Wrapper to position popup between header and bottom */}
            <div
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                    top: '140px', // Clear space for header + subheader
                    height: 'calc(100vh - 140px)', // Use remaining viewport height
                }}
                onClick={onClose}
            >
                <div className="relative w-full max-w-7xl mx-4" onClick={(e) => e.stopPropagation()}>
                    {/* Close Button outside video div */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute -top-4 -right-4 z-20 bg-red-600 rounded-full p-2 shadow-lg text-white hover:text-white hover:bg-red-700 focus:outline-none cursor-pointer transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Modal Container */}
                    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                        {/* Video Embed */}
                        <div className="relative pt-[56.25%]">
                            {iFrame ? (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${url}?autoplay=1&modestbranding=1&rel=0`}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    className="absolute top-0 left-0 w-full h-full bg-black"
                                    controls
                                    autoPlay
                                >
                                    <source src={url} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}