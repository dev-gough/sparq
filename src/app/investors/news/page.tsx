'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import NewsItems from "@/components/NewsItems"
import SolarBackgroundElements from '@/components/SolarBackgroundElements'


export default function NewsPage() {
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

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
                            News & Updates
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Stay informed with the latest developments, announcements, and milestones
                        from Sparq Systems as we advance solar technology innovation.
                    </motion.p>
                </motion.div>
            </section>

            {/* News Content Section */}
            <section className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    <NewsItems />
                </div>
            </section>
        </div>
    )
}