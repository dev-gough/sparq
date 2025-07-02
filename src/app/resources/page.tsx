'use client'

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import AggregatedFAQ from '@/components/AggregatedFAQ'

import homeownersData from '@/app/homeowners/home_faq.json'
import installersData from '@/app/installers/installer_faq.json'
import investorsData from '@/app/investors/investor_faq.json'

const videos = [
    { id: 1, title: 'PV Systems 101', thumbnail: '/pv101_thumbnail.jpg', url: 'gl5tY5Noacc', iFrame: true },
    { id: 2, title: 'Global Warming 101', thumbnail: '/globalwarming101_thumbnail.jpg', url: 'oJAbATJCugs', iFrame: true },
    { id: 3, title: 'Climate Change 101', thumbnail: '/climatechange101_thumbnail.jpg', url: 'jAa58N4Jlos', iFrame: true },
    { id: 4, title: "Learn More About Sparq Products", thumbnail: "/hassan_presentation_thumbnail.png", url: "/hassan_presentation.mp4", iFrame: false },
    { id: 5, title: "JioThings Sparq Microinverter Overview", thumbnail: "/jio_thumbnail.jpg", url: "a9tKIsI6t4I", iFrame: true }
]

const backgroundShapes = [
    { width: 200, height: 140, left: 5, top: 15, duration: 18, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 120, height: 180, left: 85, top: 25, duration: 20, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 240, height: 100, left: 45, top: 35, duration: 17, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 140, height: 140, left: 90, top: 65, duration: 19, delay: 0.8, borderRadius: '50%' },
    { width: 160, height: 220, left: 15, top: 75, duration: 21, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 100, height: 100, left: 70, top: 90, duration: 16, delay: 2.5, borderRadius: '50%' }
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/5 via-brand-logo/3 to-brand-yellow/2"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.15, 1],
                        rotate: [0, 360],
                        borderRadius: [
                            shape.borderRadius,
                            shape.borderRadius === '50%' ? '30% 70% 70% 30%' : '50%',
                            shape.borderRadius
                        ]
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

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

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const handleShow = (id: number) => {
        setShowingID(id)
    }

    const handleClose = () => {
        setShowingID(null)
    }

    const selectedVideo = videos.find((video) => video.id === showingID)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <BackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Expand Your Knowledge
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            With Expert Resources
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Explore our comprehensive collection of educational videos, technical documentation,
                        and interactive tools designed to enhance your solar knowledge.
                    </motion.p>
                </motion.div>
            </section>

            {/* Videos Section */}
            <section className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Educational Videos
                    </h2>
                    <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                        Learn from our collection of expert presentations and educational content.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                            className="group"
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
                                <button
                                    onClick={() => handleShow(video.id)}
                                    className="w-full text-left"
                                >
                                    <div className="relative">
                                        <Image
                                            height={1920}
                                            width={1080}
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-64 object-cover group-hover:blur-sm transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                                                <svg
                                                    className="w-8 h-8 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon dark:group-hover:text-brand-logo transition-colors duration-300">
                                            {video.title}
                                        </h3>
                                    </CardContent>
                                </button>
                            </Card>
                        </motion.div>
                    ))}
                </div>


            </section>

            {/* Aggregated FAQ Section */}
            <AggregatedFAQ
                id="faq"
                homeownersData={homeownersData}
                installersData={installersData}
                investorsData={investorsData}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-center"
            >
                <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700 dark:to-gray-600/50 py-0 mb-8">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
                            More Content Coming Soon
                        </h3>
                        <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            We&apos;re continuously expanding our resource library with technical documentation,
                            interactive tools, and additional educational content to support your success.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {selectedVideo && (
                <VideoPopup url={selectedVideo.url} onClose={handleClose} iFrame={selectedVideo.iFrame} />
            )}
        </div>
    )
}