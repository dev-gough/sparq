'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import NewsItems from "@/components/NewsItems"

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

export default function NewsPage() {
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
            <BackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-20 pb-32">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                            Company
                        </span>
                        <br />
                        <span className="text-brand-darkmaroon">
                            News & Updates
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Stay informed with the latest developments, announcements, and milestones
                        from Sparq Systems as we advance solar technology innovation.
                    </motion.p>
                </motion.div>
            </section>

            {/* News Content Section */}
            <section className="relative bg-white py-20">
                <div className="container mx-auto px-6">
                    <NewsItems />
                </div>
            </section>
        </div>
    )
}