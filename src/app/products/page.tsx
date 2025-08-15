'use client'

import { useState } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

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
        // title: "Q2000 1φ",
        title: "Quad2",
        description: "Single-phase microinverters for residential installations",
        href: "/products/quad2",
        image: "/q2000.webp",
        category: "Microinverters",
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "quad3",
        // title: "Q2000 3ϕ",
        title: "Quad3",
        description: "Three-phase microinverters for commercial applications",
        href: "/products/quad3",
        image: "/quad3.webp",
        category: "Microinverters",
        accentColor: "bg-gradient-to-b from-brand-logo via-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "legacy",
        title: "Q1200 (Legacy)",
        description: "Documentation & data sheet for the discontinued Q1200",
        href: "/products/legacy",
        image: "/q2000.webp",
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
        title: "Cables & Tools",
        description: "Complete range of installation accessories and components",
        href: "/products/accessories",
        image: "/Accessories/cables-t.png",
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
                    rotateX: 0
                } : {}}
                transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.320, 1]
                }}
                className="relative group cursor-pointer w-full rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ perspective: '1000px' }}
            >
                <Card className="h-full w-full overflow-hidden border border-brand-maroon/20 dark:border-gray-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white dark:bg-gray-800/90 backdrop-blur-sm py-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                        {product.id === 'accessories' ? (
                            <>
                                {/* Light mode image */}
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className={`${product.category === 'Microinverters' ? 'object-contain scale-90' : 'object-cover scale-100'} transition-all duration-500 ease-out ${product.title === 'SparqLinq' ? 'object-left' : 'object-center'} ${product.title === 'Cables & Tools' ? 'object-fill' : ''} dark:hidden`}
                                    style={{
                                        filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                                    }}
                                />
                                {/* Dark mode image */}
                                <Image
                                    src="/Accessories/cables-td.png"
                                    alt={product.title}
                                    fill
                                    className={`${product.category === 'Microinverters' ? 'object-contain scale-90' : 'object-cover scale-100'} transition-all duration-500 ease-out ${product.title === 'SparqLinq' ? 'object-left' : 'object-center'} ${product.title === 'Cables & Tools' ? 'object-fill' : ''} hidden dark:block`}
                                    style={{
                                        filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                                    }}
                                />
                            </>
                        ) : (
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className={`${product.category === 'Microinverters' ? 'object-contain scale-90' : 'object-cover scale-100'} transition-all duration-500 ease-out ${product.title === 'SparqLinq' ? 'object-left' : 'object-center'} ${product.title === 'Cables & Tools' ? 'object-fill' : ''}`}
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                                }}
                            />
                        )}
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-6">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow leading-tight mb-3">
                                {product.title}
                            </h2>
                            <p className="text-brand-graytext dark:text-gray-200 text-base md:text-lg font-medium mb-6 leading-relaxed">
                                {product.description}
                            </p>
                            
                            <motion.div
                                whileHover={{ scale: 1.1, x: 4 }}
                                whileTap={{ scale: 0.9 }}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-maroon/10 hover:bg-brand-maroon hover:text-white text-brand-maroon dark:bg-brand-yellow/10 dark:hover:bg-brand-yellow dark:hover:text-black dark:text-brand-yellow transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


export default function ProductsPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const microinverterProducts = productCards.filter(p => p.category === 'Microinverters')
    const monitoringProducts = productCards.filter(p => p.category === 'Monitoring')
    const accessoryProducts = productCards.filter(p => p.category === 'Accessories')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />

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
                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
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
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-maroon text-center mb-12"
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
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-maroon text-center mb-12"
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
                        className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-maroon text-center mb-12"
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

                <section className="container mx-auto px-6 pb-20 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Ready to transform your solar installation?
                        </h2>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
                            Explore our comprehensive solutions and discover how Sparq Systems can optimize your solar energy system.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/homeowners">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    For Homeowners
                                </motion.button>
                            </Link>
                            <Link href="/installers">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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