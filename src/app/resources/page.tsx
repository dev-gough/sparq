'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'

const videos = [
    { id: 1, title: 'PV Systems 101', thumbnail: '/pv101_thumbnail.jpg', url: 'gl5tY5Noacc', iFrame: true },
    { id: 2, title: 'Global Warming 101', thumbnail: '/globalwarming101_thumbnail.jpg', url: 'oJAbATJCugs', iFrame: true },
    { id: 3, title: 'Climate Change 101', thumbnail: '/climatechange101_thumbnail.jpg', url: 'jAa58N4Jlos', iFrame: true },
    { id: 4, title: "Learn More About Sparq Products", thumbnail: "/hassan_presentation_thumbnail.png", url: "/hassan_presentation.mp4", iFrame: false },
    { id: 5, title: "JioThings Sparq Microinverter Overview", thumbnail: "/jio_thumbnail.jpg", url: "a9tKIsI6t4I", iFrame: true}
]

interface VideoPopupProps {
    url: string;
    onClose: () => void;
    iFrame: boolean
}

function VideoPopup({ url, onClose, iFrame }: VideoPopupProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Wrapper to position close outside iframe container */}
            <div className="relative w-full max-w-7xl mx-4">
                {/* Close Button outside video div */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute -top-4 -right-4 z-20 bg-gray-800 rounded-full p-2 shadow-lg text-gray-300 hover:text-white hover:bg-gray-900 focus:outline-none cursor-pointer"
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
    )
}


export default function LearningPage() {
    const [showingID, setShowingID] = useState<number | null>(null)

    const handleShow = (id: number) => {
        setShowingID(id)
    }

    const handleClose = () => {
        setShowingID(null)
    }

    const selectedVideo = videos.find((video) => video.id === showingID)

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Learning Hub</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Explore our collection of videos to enhance your knowledge.
                    </p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => handleShow(video.id)}
                            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <div className="relative">
                                <Image
                                    height={1920}
                                    width={1080}
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-opacity duration-300 bg-black/60">
                                    <svg
                                        className="w-12 h-12 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                    {video.title}
                                </h3>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-gray-600">More content coming soon, including documents and interactive tools!</p>
                </div>
            </main>

            {selectedVideo && (
                <VideoPopup url={selectedVideo.url} onClose={handleClose} iFrame={selectedVideo.iFrame} />
            )}
        </div>
    )
}