'use client'

import { useState } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import Link from "next/link"

const passion_items = ['Support a greener future', 'Create cutting-edge solar energy solutions', 'Advance state of the art technology', 'Delight customers with best-in-class products']

const goodbye_items = ["Fossil fuel causing global warming", "Unsafe components with short lifetimes", "Fire risk and high voltage arcing", "High electricity bills due to centralized power generation"]

const reset_items = ["Safe, reliable, and maitenance-free products", "Lowest cost, weight, and volume per Watt in the industry", "Best-in-class and high performance solutions"]

const green_items = ["Reduce energy consuption", "Cut your carbon footprint", "Enable self-sufficiency with solar power"]

interface StoryCard {
    id: string
    title: string
    items: string[]
    bgImage: string
    accentColor: string
    size: 'large' | 'medium' | 'small'
    position: { row: number; col: number; span: number }
}

const storyCards: StoryCard[] = [
    {
        id: "goodbye",
        title: "Say goodbye to past problems",
        items: goodbye_items,
        bgImage: "/bg-4.jpg",
        accentColor: "bg-gradient-to-br from-mission to-brand-maroon",
        size: "large",
        position: { row: 1, col: 1, span: 2 }
    },
    {
        id: "passion",
        title: "Born out of passion",
        items: passion_items,
        bgImage: "/thumbnail_image.png",
        accentColor: "bg-gradient-to-br from-brand-yellow to-brand-logo",
        size: "medium",
        position: { row: 1, col: 3, span: 1 }
    },
    {
        id: "reset",
        title: "Resetting the PV Industry",
        items: reset_items,
        bgImage: "/bg-2.jpg",
        accentColor: "bg-gradient-to-br from-vision to-brand-maroon",
        size: "medium",
        position: { row: 2, col: 2, span: 1 }
    },
    {
        id: "future",
        title: "Be part of a greener future",
        items: green_items,
        bgImage: "/testing2.jpg",
        accentColor: "bg-gradient-to-br from-values to-brand-logo",
        size: "large",
        position: { row: 2, col: 3, span: 2 }
    }
]

interface FloatingCardProps {
    card: StoryCard
    index: number
}

function FloatingCard({ card, index }: FloatingCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })


    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100, rotateX: -15 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: isHovered ? 1.01 : 1
            } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.23, 1, 0.320, 1]
            }}
            className="relative group cursor-pointer h-96 md:h-[500px] w-full rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ perspective: '1000px' }}
        >
            <Card className="h-full w-full overflow-hidden border-0 shadow-2xl rounded-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
                    style={{
                        backgroundImage: `url(${card.bgImage})`,
                        filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                    }}
                />

                {/* Gradient overlay */}
                <motion.div
                    className={`absolute inset-0 ${card.accentColor}`}
                    animate={{
                        opacity: isHovered ? 0.75 : 0.85
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Diagonal accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 transform rotate-45 translate-x-12 -translate-y-12" />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                            {card.title}
                        </h2>
                    </div>

                    {/* Expandable content */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: isExpanded ? 'auto' : '0px',
                            opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.320, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mt-6 border border-white/20">
                            <ul className="space-y-4">
                                {card.items.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                                        transition={{
                                            delay: i * 0.15,
                                            duration: 0.5,
                                            ease: [0.23, 1, 0.320, 1]
                                        }}
                                        className="flex items-start gap-4 text-white text-base md:text-lg"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-white mt-3 flex-shrink-0" />
                                        <span className="leading-relaxed font-medium">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Expand indicator */}
                    <div className="flex items-center justify-start mt-6">
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40"
                        >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-white">
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Predefined positions and sizes to avoid hydration issues
const backgroundShapes = [
    { width: 180, height: 120, left: 15, top: 10, duration: 14, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 100, height: 160, left: 75, top: 20, duration: 16, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 220, height: 80, left: 45, top: 30, duration: 13, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 120, height: 120, left: 85, top: 60, duration: 15, delay: 0.8, borderRadius: '50%' },
    { width: 140, height: 200, left: 25, top: 70, duration: 17, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 90, height: 90, left: 65, top: 85, duration: 12, delay: 2.5, borderRadius: '50%' },
    { width: 160, height: 110, left: 5, top: 50, duration: 18, delay: 1.5, borderRadius: '50% 50% 70% 30%' },
    { width: 100, height: 180, left: 95, top: 35, duration: 14, delay: 0.3, borderRadius: '40% 60% 40% 60%' },
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating geometric shapes */}
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/8 via-brand-logo/6 to-brand-yellow/4"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
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

export default function AboutPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            <BackgroundElements />

            {/* Hero section */}
            <div className="relative container mx-auto px-6 pt-20">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Powering Tomorrow
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        Discover how we&apos;re revolutionizing solar energy through innovation,
                        passion, and a commitment to a sustainable future.
                    </p>
                </motion.div>
            </div>

            {/* Story Sections */}
            <div className="relative">
                {/* First Row - Single large card */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="max-w-6xl mx-auto">
                        <FloatingCard card={storyCards[0]} index={0} />
                    </div>
                </section>

                {/* Second Row - Two cards side by side */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <FloatingCard card={storyCards[1]} index={1} />
                        <FloatingCard card={storyCards[2]} index={2} />
                    </div>
                </section>

                {/* Third Row - Single large card */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="max-w-6xl mx-auto">
                        <FloatingCard card={storyCards[3]} index={3} />
                    </div>
                </section>

                {/* Call to action */}
                <section className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon mb-6">
                            Ready to join us in creating a sustainable future?
                        </h2>
                        <p className="text-lg text-brand-graytext mb-12 max-w-2xl mx-auto">
                            Together, we can build a cleaner, more efficient energy future for generations to come.
                        </p>
                        <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-4xl mx-auto">
                            <Link href="/homeowners" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">For Homeowners</span>
                                        <span className="text-sm opacity-90">Discover Solar Benefits</span>
                                    </div>
                                </motion.button>
                            </Link>
                            <Link href="/installers" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">For Installers</span>
                                        <span className="text-sm opacity-90">Professional Solutions</span>
                                    </div>
                                </motion.button>
                            </Link>
                            <Link href="/investors" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-brand-gray to-brand-graytext text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">For Investors</span>
                                        <span className="text-sm opacity-90">Financial Information</span>
                                    </div>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    )
}