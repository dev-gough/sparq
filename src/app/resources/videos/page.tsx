'use client'

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import YTVideo from "@/components/YTVideo"
import SolarBackgroundElements from '@/components/SolarBackgroundElements'

interface VideoPopupProps {
    videoId: string;
    onClose: () => void;
}

// Helper function to determine if a video ID is for a local video
const isLocalVideo = (videoId: string): boolean => {
    return videoId.startsWith('/') || videoId.includes('.mp4') || videoId.includes('.webm') || videoId.includes('.mov')
}

function VideoPopup({ videoId, onClose }: VideoPopupProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const isLocal = isLocalVideo(videoId)

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                    top: '140px',
                    height: 'calc(100vh - 140px)',
                }}
                onClick={onClose}
            >
                <div className="relative w-full max-w-7xl mx-4" onClick={(e) => e.stopPropagation()}>
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

                    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                        <div className="relative pt-[56.25%]">
                            {isLocal ? (
                                <video
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    src={videoId}
                                    controls
                                    autoPlay
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface VideoCategory {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    videoIds: string[]
}

// Video titles mapping - add titles for your video IDs here
const videoTitles: Record<string, string> = {
    // Investor videos
    "gaFi_dPnYNk": "Sparq Systems Investor Presentation",
    "am7VzIpn5TI": "Sparq Technology Overview",
    "0sdcGgL9228": "CEO Interview - Market Strategy",

    // Installer videos
    "r05zC7wY7NQ": "Quad2/3 Installation Guide",
    "nhH8LrnONxs": "SparqLinq Installation Guide",
    "/external-sparq-app.mp4": "SparqSync Demo",

    // Homeowner videos
    "Ibs0snk6nH0": "Solar Energy Benefits for Homeowners",
    "5u3KVFYHfk0": "Sparq Microinverter Overview",
}

// Local video thumbnails mapping - add thumbnail paths for local videos
const localVideoThumbnails: Record<string, string> = {
    "/external-sparq-app.mp4": "/sparqsync_splash.jpg"
}

const videoCategories: VideoCategory[] = [
    {
        id: "investors",
        title: "For Investors",
        description: "Learn about Sparq's market opportunities, financial performance, and growth strategy.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        videoIds: [
            "gaFi_dPnYNk",
            "am7VzIpn5TI",
            "0sdcGgL9228",
        ]
    },
    {
        id: "installers",
        title: "For Installers",
        description: "Technical insights, installation guides, and product demonstrations for professional installers.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        videoIds: [
            "r05zC7wY7NQ",
            "nhH8LrnONxs",
            "/external-sparq-app.mp4",
        ]
    },
    {
        id: "homeowners",
        title: "For Homeowners",
        description: "Educational content to help homeowners understand solar energy and Sparq's benefits.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        videoIds: [
            "5u3KVFYHfk0",
            "Ibs0snk6nH0",
            "/external-sparq-app.mp4",
        ]
    }
]

export default function VideosPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string>(videoCategories[1]?.id || '')
    const [selectedVideo, setSelectedVideo] = useState<string>('')
    const [showPopup, setShowPopup] = useState<boolean>(false)

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    // Initialize from URL parameters
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        const videoParam = searchParams.get('video')

        if (categoryParam && videoCategories.some(cat => cat.id === categoryParam)) {
            setSelectedCategory(categoryParam)
        }
        if (videoParam) {
            setSelectedVideo(videoParam)
            setShowPopup(true) // Auto-open popup when video is in URL
        }
    }, [searchParams])

    // Update URL when category changes
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setSelectedVideo('') // Clear video selection when changing category
        setShowPopup(false) // Close popup when changing category

        const params = new URLSearchParams(searchParams.toString())
        params.set('category', categoryId)
        params.delete('video') // Remove video param when changing category
        router.push(`/resources/videos?${params.toString()}`, { scroll: false })
    }

    // Update URL when video is selected
    const handleVideoSelect = (videoId: string) => {
        setSelectedVideo(videoId)
        setShowPopup(true) // Open popup when video is selected

        const params = new URLSearchParams(searchParams.toString())
        params.set('video', videoId)
        if (!params.has('category')) {
            params.set('category', selectedCategory)
        }
        router.push(`/resources/videos?${params.toString()}`, { scroll: false })
    }

    // Close popup and remove video from URL
    const handleClosePopup = () => {
        setShowPopup(false)
        setSelectedVideo('')

        const params = new URLSearchParams(searchParams.toString())
        params.delete('video')
        router.push(`/resources/videos?${params.toString()}`, { scroll: false })
    }

    const currentCategory = videoCategories.find(cat => cat.id === selectedCategory) || videoCategories[0]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 pb-16">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Expert Insights
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Video Collection
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Watch our collection of technical presentations, market insights,
                        and educational content for investors, installers, and homeowners.
                    </motion.p>
                </motion.div>
            </section>

            {/* Category Selection */}
            <section className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Choose Your Category
                    </h2>
                    <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                        Select a category to explore relevant video content tailored to your interests and needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {videoCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                            className="group"
                        >
                            <Card
                                className={`overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700 ${selectedCategory === category.id ? 'ring-2 ring-brand-maroon' : ''
                                    }`}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
                                            {category.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow">{category.title}</h3>
                                            <p className="text-brand-graytext dark:text-dark-text-muted text-sm">{category.videoIds.length} videos</p>
                                        </div>
                                    </div>
                                    <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">{category.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Video Gallery */}
            <section className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    {currentCategory && (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                                    {currentCategory.title}
                                </h2>
                                <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                                    {currentCategory.description}
                                </p>
                            </div>
                            <YTVideo
                                videoIds={currentCategory.videoIds}
                                videoTitles={videoTitles}
                                localVideoThumbnails={localVideoThumbnails}
                                onVideoSelect={handleVideoSelect}
                            />
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon dark:from-gray-700 dark:to-gray-800 py-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Want to Learn More?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Explore our comprehensive resources or contact us directly to discuss
                            how Sparq technology can meet your specific needs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <a href="/resources">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    More Resources
                                </motion.button>
                            </a>
                            <a href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Contact Us
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {showPopup && selectedVideo && (
                <VideoPopup videoId={selectedVideo} onClose={handleClosePopup} />
            )}
        </div>
    )
}