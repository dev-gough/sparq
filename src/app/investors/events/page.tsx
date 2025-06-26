'use client'

import { useRef } from 'react'
import Link from "next/link"
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { FaArrowRight, FaCalendar, FaClock, FaArchive } from "react-icons/fa"

interface EventItem {
    id: number
    title: string
    summary: string
    date: Date
    url: string
}

const events: EventItem[] = [
    {
        id: 1,
        title: "Sparq Smartphone App Launch",
        summary: "We are proud to announce the launch of our new solar power system app. The platform provides users with real-time insights into their system's performance, including power generation data, current weather conditions, and more. This innovative tool empowers users to efficiently monitor and optimize their solar energy usage",
        date: new Date("2025-06-15"),
        url: "",
    },
    {
        id: 2,
        title: "Sparq Website Refresh",
        summary: "Our newly refreshed website introduces a faster, more seamless experience, built on a modern React framework. With significantly improved loading times and a clean, intuitive design, the upgrade ensures users can quickly access information, explore solutions, and stay connected with the latest updates.",
        date: new Date("2025-06-15"),
        url: "",
    },
    {
        id: 3,
        title: "Sparq Systems CEO Interview - Dr. Praveen Jain",
        summary: "In this interview, Justin from Blaze Capital sits down with Dr. Praveen Jain, CEO of Sparq Systems, a company revolutionizing solar energy with its next generation single-phase microinverters.",
        date: new Date("2025-01-22"),
        url: "https://www.youtube.com/watch?v=8OJ02vvC-Os",
    },
    {
        id: 4,
        title: "SPARQ Exhibits Its QUAD Microinverters at Intersolar India",
        summary: "Dr. Praveen Jain, the Company's Chief Executive Officer, commented, \"We are excited to walk the floors of one of the world's largest trade shows after a three year hiatus.  We are looking forward to meeting with our customers and suppliers to show off our latest microinverter products specifically designed for the Indian market\".",
        date: new Date("2022-12-02"),
        url: "https://finance.yahoo.com/news/sparq-exhibits-quad-microinverters-intersolar-122500923.html"
    },

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

function EventCard({ event, index, isUpcoming }: { event: EventItem, index: number, isUpcoming: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group"
        >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0">
                <CardContent className="p-0">
                    <div className="p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                                {event.url ? (
                                    <Link href={event.url} target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-2xl font-bold text-brand-darkmaroon group-hover:text-brand-maroon transition-colors duration-300 mb-3 line-clamp-2">
                                            {event.title}
                                        </h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-2xl font-bold text-brand-darkmaroon mb-3 line-clamp-2">
                                        {event.title}
                                    </h3>
                                )}
                                <div className="flex items-center gap-2 text-brand-graytext mb-4">
                                    <FaCalendar className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {event.date.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                                {isUpcoming ? <FaClock className="w-5 h-5" /> : <FaArchive className="w-5 h-5" />}
                            </div>
                        </div>

                        <p className="text-brand-graytext leading-relaxed mb-6 line-clamp-3">
                            {event.summary}
                        </p>

                        <div className="flex items-center justify-between">
                            {event.url ? (
                                <Link
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200 group/link"
                                >
                                    <span>Learn More</span>
                                    <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                                </Link>
                            ) : (
                                <span className="text-brand-graytext font-medium">More details coming soon</span>
                            )}
                            <div className="px-3 py-1 bg-gradient-to-r from-brand-maroon/10 to-brand-logo/10 rounded-full">
                                <span className="text-sm font-medium text-brand-darkmaroon">
                                    {isUpcoming ? 'Upcoming' : 'Past Event'}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default function EventPage() {
    const curDate = new Date()
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const upcomingEvents = events.filter(event => event.date > curDate)
    const pastEvents = events.filter(event => event.date <= curDate)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
            <BackgroundElements />

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
                            Company
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Events & Updates
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Discover upcoming events, product launches, and important company milestones
                        that shape the future of solar energy technology.
                    </motion.p>
                </motion.div>
            </section>

            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
                <section className="relative bg-white py-10">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-center mb-16"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
                                    <FaClock className="w-6 h-6" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon">
                                    Upcoming Events
                                </h2>
                            </div>
                            <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                                Stay informed about our upcoming product launches, events, and important announcements.
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {upcomingEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    isUpcoming={true}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
                <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 py-10">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-center mb-16"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
                                    <FaArchive className="w-6 h-6" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon">
                                    Past Events
                                </h2>
                            </div>
                            <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                                Explore our company&apos;s journey through key milestones and achievements.
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {pastEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    isUpcoming={false}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Stay Updated
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Don&apos;t miss our latest events and announcements. Connect with us to stay
                            informed about product launches and company developments.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/investors/news">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Latest News
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}