'use client'

import { useRef } from 'react'
import Link from "next/link"
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { FaArrowRight, FaCalendar, FaClock, FaArchive } from "react-icons/fa"
import SolarBackgroundElements from '@/components/SolarBackgroundElements'

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


function EventCard({ event, index, isUpcoming }: { event: EventItem, index: number, isUpcoming: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group"
        >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 bg-white dark:bg-gray-700">
                <CardContent className="p-0">
                    <div className="p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                                {event.url ? (
                                    <Link href={event.url} target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon dark:group-hover:text-brand-logo transition-colors duration-300 mb-3 line-clamp-2">
                                            {event.title}
                                        </h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3 line-clamp-2">
                                        {event.title}
                                    </h3>
                                )}
                                <div className="flex items-center gap-2 text-brand-graytext dark:text-dark-text-muted mb-4">
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

                        <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-6 line-clamp-3">
                            {event.summary}
                        </p>

                        <div className="flex items-center justify-between">
                            {event.url ? (
                                <Link
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200 group/link"
                                >
                                    <span>Learn More</span>
                                    <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                                </Link>
                            ) : (
                                <span className="text-brand-graytext dark:text-dark-text-muted font-medium">More details coming soon</span>
                            )}
                            <div className="px-3 py-1 bg-gradient-to-r from-brand-maroon/10 to-brand-logo/10 dark:from-brand-logo/20 dark:to-brand-yellow/20 rounded-full">
                                <span className="text-sm font-medium text-brand-darkmaroon dark:text-brand-yellow">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
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
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Discover upcoming events, product launches, and important company milestones
                        that shape the future of solar energy technology.
                    </motion.p>
                </motion.div>
            </section>

            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
                <section className="relative bg-white dark:bg-gray-900 py-10">
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
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow">
                                    Upcoming Events
                                </h2>
                            </div>
                            <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
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
                <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-10">
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
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow">
                                    Past Events
                                </h2>
                            </div>
                            <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
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