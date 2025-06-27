'use client'

import { useState } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface ProductCard {
    id: string
    title: string
    description: string
    href: string
    image: string
    category: string
    accentColor: string
}

const productCards: ProductCard[] = [
    {
        id: "quad2",
        title: "Q2000 1φ",
        description: "Single-phase microinverters for residential installations",
        href: "/products/quad2",
        image: "/q2000.webp",
        category: "Microinverters",
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "quad3",
        title: "Q2000 3ϕ",
        description: "Three-phase microinverters for commercial applications",
        href: "/products/quad3",
        image: "/quad3.webp",
        category: "Microinverters",
        accentColor: "bg-gradient-to-b from-brand-logo via-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "legacy",
        title: "Legacy Products",
        description: "Proven solutions with continued support and service",
        href: "/products/legacy",
        image: "/q1200-discontinued.png",
        category: "Microinverters",
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "sparqlinq",
        title: "SparqLinq",
        description: "Intelligent monitoring and management system",
        href: "/products/sparqlinq",
        image: "/SparqLinq.jpg",
        category: "Monitoring",
        accentColor: "bg-gradient-to-br from-vision to-brand-maroon"
    },
    {
        id: "sparqvu",
        title: "SparqVu",
        description: "Advanced performance management platform",
        href: "/products/sparqvu",
        image: "/sparqvu.png",
        category: "Monitoring",
        accentColor: "bg-gradient-to-br from-mission to-brand-logo"
    },
    {
        id: "sparqsync",
        title: "SparqSync App",
        description: "Mobile application for system monitoring and control",
        href: "/products/app",
        image: "/sparqsync_splash.jpg",
        category: "Monitoring",
        accentColor: "bg-gradient-to-br from-brand-yellow to-brand-gray"
    },
    {
        id: "accessories",
        title: "Cables & Accessories",
        description: "Complete range of installation accessories and components",
        href: "/products/accessories",
        image: "/Accessories/cables.png",
        category: "Accessories",
        accentColor: "bg-gradient-to-br from-values to-brand-darkmaroon"
    }
]

interface FloatingProductCardProps {
    product: ProductCard
    index: number
}

function FloatingProductCard({ product, index }: FloatingProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
        <Link href={product.href}>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: isHovered ? 1.02 : 1
                } : {}}
                transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.320, 1]
                }}
                className="relative group cursor-pointer h-[500px] md:h-[550px] w-full rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ perspective: '1000px' }}
            >
                <Card className="h-full w-full overflow-hidden border-0 shadow-2xl rounded-2xl">
                    <div className="absolute inset-0 bg-white">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-all duration-500 ease-out"
                            style={{
                                filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                            }}
                        />
                    </div>

                    <motion.div
                        className={`absolute inset-0 ${product.accentColor}`}
                        animate={{
                            opacity: isHovered ? 0.6 : 0.7
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 transform rotate-45 translate-x-12 -translate-y-12" />

                    <CardContent className="relative z-10 h-full flex flex-col justify-center p-8">
                        <div className="text-center">

                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                                {product.title}
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl font-medium max-w-md mx-auto">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                            >
                                Learn More
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}

const backgroundShapes = [
    { width: 200, height: 140, left: 10, top: 15, duration: 16, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 120, height: 180, left: 80, top: 25, duration: 18, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 240, height: 100, left: 50, top: 35, duration: 15, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 140, height: 140, left: 90, top: 65, duration: 17, delay: 0.8, borderRadius: '50%' },
    { width: 160, height: 220, left: 20, top: 75, duration: 19, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 100, height: 100, left: 70, top: 90, duration: 14, delay: 2.5, borderRadius: '50%' },
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/6 via-brand-logo/4 to-brand-yellow/3"
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

export default function ProductsPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const microinverterProducts = productCards.filter(p => p.category === 'Microinverters')
    const monitoringProducts = productCards.filter(p => p.category === 'Monitoring')
    const accessoryProducts = productCards.filter(p => p.category === 'Accessories')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            <BackgroundElements />

            <div className="relative container mx-auto px-6 pt-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Our Products
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        Discover our complete range of solar solutions designed to maximize efficiency,
                        reliability, and performance for every installation.
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                <section className="container mx-auto px-6 mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon text-center mb-12"
                    >
                        Microinverters
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {microinverterProducts.map((product, index) => (
                            <FloatingProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-6 mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon text-center mb-12"
                    >
                        Monitoring & Management
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {monitoringProducts.map((product, index) => (
                            <FloatingProductCard key={product.id} product={product} index={index + 3} />
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-6 mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon text-center mb-12"
                    >
                        Accessories
                    </motion.h2>
                    <div className="flex justify-center max-w-7xl mx-auto">
                        <div className="w-full max-w-md">
                            {accessoryProducts.map((product, index) => (
                                <FloatingProductCard key={product.id} product={product} index={index + 6} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon mb-6">
                            Ready to transform your solar installation?
                        </h2>
                        <p className="text-lg text-brand-graytext mb-12 max-w-2xl mx-auto">
                            Explore our comprehensive solutions and discover how Sparq Systems can optimize your solar energy system.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/homeowners">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    For Homeowners
                                </motion.button>
                            </Link>
                            <Link href="/installers">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    For Installers
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    )
}