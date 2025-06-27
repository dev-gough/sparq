'use client'

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import Image from "next/image"
import FAQs from './home_faq.json'

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string | Array<string | string[]> }[];
}

const FAQ: FAQData[] = FAQs.faqs

interface BenefitCard {
    icon: React.ReactNode
    title: string
    description: string
    accentColor: string
}

interface TechFeature {
    title: string
    description: string
    benefits: string[]
    icon: React.ReactNode
}

const benefitCards: BenefitCard[] = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Best In-Class Performance",
        description: "Experience maximum energy harvest with our revolutionary Quad microinverter technology featuring individual MPPT for each panel.",
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Safe & Reliable Products",
        description: "No failure-prone electrolytic capacitors and best-in-class longevity ensure your investment is protected for decades.",
        accentColor: "bg-gradient-to-br from-brand-midmaroon to-brand-logo"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
        ),
        title: "Cost-Effective & Maintenance-Free",
        description: "Lowest cost per Watt in the industry with reduced installation costs and zero maintenance requirements.",
        accentColor: "bg-gradient-to-br from-brand-logo to-brand-yellow"
    }
]

const techFeatures: TechFeature[] = [
    {
        title: "Quad Architecture",
        description: "Revolutionary design connects four PV panels to a single microinverter, reducing installation complexity by 75%.",
        benefits: ["4x fewer inverters needed", "Simplified wiring", "Faster installation", "Lower system cost"],
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        )
    },
    {
        title: "Individual MPPT",
        description: "Each panel operates independently with maximum power point tracking, ensuring optimal energy harvest even with shading.",
        benefits: ["Maximum energy harvest", "Shade tolerance", "Panel-level optimization", "Superior performance"],
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: "Dual-Mode Operation",
        description: "Seamlessly operate on-grid for maximum efficiency or off-grid during outages with integrated grid independence.",
        benefits: ["Grid-tied operation", "Off-grid capability", "Energy independence", "Backup power ready"],
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    }
]

const solarSteps = [
    "Conduct a pre-installation audit and develop a plan",
    "Check regional compliance requirements",
    "Research incentives and eligibility criteria",
    "Obtain quotes from certified, experienced installers",
    "Coordinate with your local utility company to obtain permits",
    "Award the contract and proceed with installation",
    "Schedule post-installation audit",
    "Enjoy the benefits of your new PV system"
]

const importantConsiderations = [
    "Do your own research",
    "Ensure You Hire a Certified and Experienced Installer",
    "Buy Best In-Class Products"
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



export default function HomeownersPage() {
    const trackEvent = useTrackEvent()
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const resourceRef = useRef(null)
    const isResourceInView = useInView(resourceRef, { once: true })


    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
        if (!dropdownExpanded[i]) {
            trackEvent("dropdown_opened", {
                "parent": "homeowner_faq",
                "dropdown": FAQ[i].questionBrand,
            })
        }
    }

    const handleCtaClick = (action: string) => {
        trackEvent("button_click", {
            "btn_name": `homeowner_${action}`
        })
    }

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
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Transform Your Home
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            With Solar Innovation
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Experience the future of solar energy with Sparq Systems&apos; revolutionary microinverter technology.
                        Cut your electricity bills, increase your home value, and contribute to a sustainable future.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto"
                    >
                        <Link href="#design" onClick={() => handleCtaClick('design_system')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Design My System
                            </motion.button>
                        </Link>
                        <Link href="/products" onClick={() => handleCtaClick('explore_products')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-darkmaroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 cursor-pointer"
                            >
                                Explore Products
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Sparq Section */}
            <section id="whysparq" className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                        Why Choose Sparq Systems?
                    </h2>
                    <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                        Revolutionary technology that delivers unmatched performance, safety, and value for your home solar investment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {benefitCards.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + (index * 0.2) }}
                            className="group"
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0">
                                <CardContent className="p-0">
                                    <div className={`${benefit.accentColor} p-6 text-white`}>
                                        <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-center mb-4">{benefit.title}</h3>
                                    </div>
                                    <div className="p-6 bg-white">
                                        <p className="text-brand-graytext leading-relaxed">{benefit.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Technology Showcase */}
            <section id="discover" className="relative bg-white py-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent">
                                Advanced Technology
                            </span>
                        </h2>
                        <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                            Experience cutting-edge innovations that set Sparq Systems apart from traditional solar solutions.
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {techFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-brand-darkmaroon">{feature.title}</h3>
                                    </div>
                                    <p className="text-lg text-brand-graytext mb-6 leading-relaxed">{feature.description}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {feature.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo" />
                                                <span className="text-brand-graytext font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 max-w-lg">
                                    <Card className="overflow-hidden border-0 shadow-xl py-0">
                                        <div className="aspect-video bg-gradient-to-br from-brand-maroon/10 to-brand-logo/10 flex items-center justify-center">
                                            <div className="text-6xl text-brand-maroon opacity-50">
                                                {feature.icon}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solar Steps Section */}
            <section className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                        Your Solar Journey
                    </h2>
                    <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                        Follow these simple steps to transform your home with clean, renewable solar energy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {solarSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-brand-graytext font-medium leading-relaxed">{step}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-brand-maroon/5 to-brand-logo/5">
                        <h3 className="text-2xl font-bold text-brand-darkmaroon mb-6 text-center">
                            Important Considerations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {importantConsiderations.map((consideration, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
                                    <span className="text-brand-graytext font-medium">{consideration}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/homeowner_ppt.pdf" target="_blank" onClick={() => handleCtaClick('presentation')}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Download Homeowner Presentation
                                </motion.button>
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </section>

            {/* Product & Resource Links */}
            <section className="relative bg-white py-10">
                <div className="container mx-auto px-6">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                        ref={resourceRef}>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300 py-0">
                                <div className="relative h-64 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">Sparq Product Family</h3>
                                        <p className="text-white/90">
                                            Explore our solar microinverters engineered to maximize energy conversion efficiency.
                                        </p>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <Link href="/products" onClick={() => handleCtaClick('products')}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            Explore Products
                                            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            variants={cardVariants}
                            animate={isResourceInView ? "visible" : "hidden"}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300 py-0">
                                <div className="relative h-64 bg-gradient-to-br from-brand-logo to-brand-yellow">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">Learning Hub</h3>
                                        <p className="text-white/90">
                                            Access tutorials and best practices for optimal solar performance.
                                        </p>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <Link href="/resources" onClick={() => handleCtaClick('resources')}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-brand-logo to-brand-yellow text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            Visit Learning Hub
                                            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Design System Section */}
            <section id="design" className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Card className="p-8 md:p-12 border-2 border-brand-logo bg-gradient-to-br from-neutral-50 to-stone-50 shadow-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-brand-maroon to-brand-darkmaroon bg-clip-text text-transparent">
                                    Design My System
                                </span>
                            </h2>
                            <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                                Calculate your energy needs and discover how many Q2000 units you&apos;ll need for optimal performance.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-lg text-brand-graytext mb-4">
                                    Use NREL&apos;s PVWatts calculator to estimate your energy production by entering your address:
                                    <Link href="https://pvwatts.nrel.gov/" target="_blank" className="text-brand-maroon hover:underline font-semibold ml-2">
                                        pvwatts.nrel.gov
                                    </Link>
                                </p>
                                <p className="text-lg text-brand-graytext">
                                    <strong>Important:</strong> Set the &quot;DC System Size (kW)&quot; field to 2.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold text-brand-darkmaroon mb-4">3 Easy Steps:</h3>
                                <ol className="list-decimal list-inside space-y-3 text-lg text-brand-graytext">
                                    <li>Follow the instructions above to receive your estimated energy generation.</li>
                                    <li>Sum the last 12 months of kWh energy usage from your utility provider.</li>
                                    <li>Divide the estimated generation by your yearly usage.</li>
                                </ol>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <p className="text-lg text-brand-graytext mb-6">
                                    Once you have a rough idea of your system,{' '}
                                    <Link href="/contact" className="text-brand-maroon hover:underline font-semibold">
                                        contact us
                                    </Link>
                                    {' '}to facilitate further refinement and other requirements.
                                </p>
                                <div className="flex justify-center">
                                    <Image src="/formula.png" alt="Q2000 calculation" width={400} height={400} className="max-w-full h-auto" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </section>
            {/* FAQ Section */}
            <section id="faq" className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                        Get answers to common questions about solar systems, our products, and the installation process.
                    </p>
                </motion.div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    {FAQ.map((faqCategory, index) => (
                        <motion.div
                            key={faqCategory.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-0">
                                <CardContent className="p-0">
                                    <div
                                        className="bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80 p-6 text-white cursor-pointer"
                                        onClick={() => toggleExpanded(index)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold flex-1">{faqCategory.questionBrand}</h3>
                                            <motion.div
                                                animate={{ rotate: dropdownExpanded[index] ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-shrink-0"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: dropdownExpanded[index] ? 'auto' : 0,
                                            opacity: dropdownExpanded[index] ? 1 : 0
                                        }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.320, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 bg-white">
                                            <div className="space-y-6">
                                                {faqCategory.subQuestions.map((subItem) => (
                                                    <div key={subItem.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                                                        <h4 className="font-bold text-brand-darkmaroon mb-3">{subItem.question}</h4>
                                                        <div className="text-brand-graytext leading-relaxed">
                                                            {subItem.answer && Array.isArray(subItem.answer) ? (
                                                                <div className="space-y-3">
                                                                    {subItem.answer.map((block, i) =>
                                                                        Array.isArray(block) ? (
                                                                            <ul key={i} className="list-disc ml-6 space-y-1">
                                                                                {block.map((li, j) => (
                                                                                    <li key={j} className="leading-relaxed">{li}</li>
                                                                                ))}
                                                                            </ul>
                                                                        ) : (
                                                                            <p key={i} className="whitespace-pre-line leading-relaxed">{block}</p>
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="leading-relaxed">{subItem.answer as string}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Go Solar?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Join thousands of satisfied homeowners who have chosen Sparq Systems for their solar energy needs.
                            Start your journey to energy independence today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="#design" onClick={() => handleCtaClick('final_design')}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                            <Link href="/contact" onClick={() => handleCtaClick('final_contact')}>
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