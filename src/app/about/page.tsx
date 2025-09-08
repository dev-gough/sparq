'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Target, Lightbulb, Award } from "lucide-react"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

export default function AboutPage() {
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const valuesRef = useRef(null)
    const titleInView = useInView(titleRef, { once: true })
    const contentInView = useInView(contentRef, { once: true })
    const valuesInView = useInView(valuesRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />
            <div className="relative container mx-auto px-6 py-8 sm:py-16 max-w-6xl">
                {/* Hero Section */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            About Sparq Systems
                        </span>
                    </h1>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="space-y-8 text-brand-graytext dark:text-dark-text-secondary leading-relaxed text-lg sm:text-xl lg:text-2xl">
                        <p>
                            Founded in 2009, Sparq Systems emerged from a critical observation: traditional solar technology was fundamentally flawed. With issues ranging from unsafe components and fire risks to inefficient centralized power generation, the industry needed a complete rethink.
                        </p>

                        <p>
                            The vision was clear - create a solar solution that would be safe, reliable, and truly cost-effective. This led to years of passionate research and development, culminating in our revolutionary high frequency soft-switching microinverter technology. Our breakthrough eliminates the electrolytic capacitors and short-life components that plague traditional systems, while delivering industry-leading performance and efficiency.
                        </p>

                        <p>
                            Today, we&apos;re a publicly traded company (TSXV: SPRQ) with global manufacturing capabilities and strategic partnerships, including our collaboration with Jio Reliance, India&apos;s largest IoT company. From our initial Quad2 single-phase microinverter to our latest three-phase Quad3 technology, we continue to push the boundaries of what&apos;s possible in solar energy conversion.
                        </p>

                        <p>
                            Our culture is built on six core principles: <strong>Integrity</strong>, <strong>Collaboration</strong>, <strong>Innovation</strong>, <strong>Quality</strong>, <strong>Social Responsibility</strong>, and <strong>Teamwork</strong>. These aren&apos;t just values on paper - they guide every decision we make, every product we design, and every relationship we build.
                        </p>
                    </div>
                </motion.div>

                {/* Company Values */}
                <motion.div
                    ref={valuesRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <div className="text-center p-6 sm:p-8 bg-white/50 dark:bg-gray-800/30 rounded-xl border-3 border-brand-maroon/10 dark:border-brand-logo/10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                            <Target size={24} className="sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3 sm:mb-4">
                            Our Mission
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.
                        </p>
                    </div>

                    <div className="text-center p-6 sm:p-8 bg-white/50 dark:bg-gray-800/30 rounded-xl border-3 border-brand-maroon/10 dark:border-brand-logo/10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                            <Lightbulb size={24} className="sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3 sm:mb-4">
                            Our Vision
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.
                        </p>
                    </div>

                    <div className="text-center p-6 sm:p-8 bg-white/50 dark:bg-gray-800/30 rounded-xl border-3 border-brand-maroon/10 dark:border-brand-logo/10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                            <Award size={24} className="sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3 sm:mb-4">
                            Our Promise
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}