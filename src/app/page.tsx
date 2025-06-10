'use client'

import { useState } from "react"
import { motion, useInView } from "motion/react"
import { Card } from "@/components/ui/card"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTrackEvent } from "@/hooks/useTrackEvent"

interface FeaturedProduct {
    id: string
    title: string
    tagline: string
    description: string
    href: string
    image: string
    features: string[]
    accentColor: string
}

const featuredProducts: FeaturedProduct[] = [
    {
        id: "quad2",
        title: "Quad2 Microinverters",
        tagline: "Next-Generation Power Optimization",
        description: "Revolutionary microinverter technology with advanced monitoring and superior efficiency for residential and commercial solar installations.",
        href: "/products/quad2",
        image: "/q2000.webp",
        features: ["Advanced MPPT Technology", "Real-time Monitoring", "Weather Resistant Design", "Easy Installation"],
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-midmaroon"
    },
    {
        id: "quad3",
        title: "Quad3",
        tagline: "The Future of Solar Technology",
        description: "Cutting-edge microinverter innovation delivering maximum performance, reliability, and efficiency for modern solar energy systems.",
        href: "/products/quad3",
        image: "/quad3.webp",
        features: ["Superior Performance", "Compact Design", "Intelligent Control", "Proven Reliability"],
        accentColor: "bg-gradient-to-br from-brand-midmaroon to-brand-logo"
    }
]

interface FloatingProductHeroProps {
    product: FeaturedProduct
    index: number
    isReversed?: boolean
}

function FloatingProductHero({ product, index, isReversed = false }: FloatingProductHeroProps) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3, ease: [0.23, 1, 0.320, 1] }}
            className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 mb-32`}
        >
            <div className="flex-1 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                            {product.title}
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl font-semibold text-brand-darkmaroon mb-6">
                        {product.tagline}
                    </p>
                    <p className="text-lg text-brand-graytext mb-8 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {product.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.3 + 0.4 + i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo" />
                                <span className="text-brand-graytext font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                    <Link href={product.href}>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            Explore {product.title}
                            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <div className="flex-1 max-w-lg">
                <motion.div
                    initial={{ opacity: 0, x: isReversed ? -50 : 50, rotateY: isReversed ? -15 : 15 }}
                    animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.1 }}
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ perspective: '1000px' }}
                >
                    <Card className="overflow-hidden border-0 shadow-2xl rounded-2xl h-96">
                        <div className="absolute inset-0 bg-neutral-100">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain transition-all duration-500 ease-out"
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                                }}
                            />
                        </div>
                        <motion.div
                            className={`absolute inset-0 ${product.accentColor} rounded-2xl`}
                            animate={{
                                opacity: isHovered ? 0.3 : 0.4
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 transform rotate-45 translate-x-12 -translate-y-12" />
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}

const backgroundShapes = [
    { width: 220, height: 160, left: 5, top: 10, duration: 18, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 140, height: 200, left: 85, top: 20, duration: 20, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 280, height: 120, left: 45, top: 30, duration: 17, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 160, height: 160, left: 90, top: 60, duration: 19, delay: 0.8, borderRadius: '50%' },
    { width: 180, height: 240, left: 15, top: 70, duration: 21, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 120, height: 120, left: 75, top: 85, duration: 16, delay: 2.5, borderRadius: '50%' },
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/4 via-brand-logo/3 to-brand-yellow/2"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 25, 0],
                        scale: [1, 1.2, 1],
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

export default function Home() {
    const trackEvent = useTrackEvent()
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const handleCtaClick = (action: string) => {
        trackEvent("button_click", {
            "btn_name": `home_${action}`
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
            <BackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-20 pb-32">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-brand-maroon/10 to-brand-logo/10 rounded-full text-brand-darkmaroon font-semibold mb-8"
                    >
                        ⚡ Revolutionizing Solar Energy Technology
                    </motion.div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                            Power the Future
                        </span>
                        <br />
                        <span className="text-brand-darkmaroon">
                            With Sparq Systems
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Discover our revolutionary microinverter technology that&apos;s transforming solar energy
                        with unmatched efficiency, reliability, and innovation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto"
                    >
                        <Link href="/products" onClick={() => handleCtaClick('explore_products')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Explore Our Products
                            </motion.button>
                        </Link>
                        <Link href="/about" onClick={() => handleCtaClick('learn_more')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-darkmaroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 cursor-pointer"
                            >
                                Learn More
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Products */}
            <section className="relative container mx-auto px-6 py-20">
                {featuredProducts.map((product, index) => (
                    <FloatingProductHero
                        key={product.id}
                        product={product}
                        index={index}
                        isReversed={index % 2 === 1}
                    />
                ))}
            </section>

            {/* Call to Action */}
            <section className="relative container mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-8">
                        Ready to Transform Your Solar Future?
                    </h2>
                    <p className="text-xl text-brand-graytext mb-12 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who have chosen Sparq Systems for their solar energy needs.
                        Experience the difference that cutting-edge technology makes.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        <Link href="/homeowners" className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-6 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleCtaClick('homeowners')}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-lg">For Homeowners</span>
                                    <span className="text-sm opacity-90">Discover Solar Benefits</span>
                                </div>
                            </motion.button>
                        </Link>
                        <Link href="/installers" className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-6 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleCtaClick('installers')}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-lg">For Installers</span>
                                    <span className="text-sm opacity-90">Professional Solutions</span>
                                </div>
                            </motion.button>
                        </Link>
                        <Link href="/investors" className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-6 bg-gradient-to-r from-brand-gray to-brand-graytext text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleCtaClick('investors')}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-lg">For Investors</span>
                                    <span className="text-sm opacity-90">Financial Information</span>
                                </div>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
