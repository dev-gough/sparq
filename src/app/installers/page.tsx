'use client'

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import InstallerFAQData from "./installer_faq.json"

import BoMCalc from "@/components/BomCalc"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string | Array<string | string[]> }[];
}

const FAQ: FAQData[] = InstallerFAQData.faqs

const quad_advantage = ["One Microinverter for Four panels", "Safe, reliable, and long-lasting", "All AC cabling", "Rapid Shutdown Compatible", "Lowest weight, volume, and cost", "Fewer parts to install", "Installation takes less time on the roof", "Maitenance-free", "Higher profit margin", "User-friendly app"]
const quad_items = ["Quick and Easy to install", "Maximum energy harvest", "Per-Panel MPPT", "12 yr. standard - 25 yr. extended warranty"]

interface BenefitCard {
    icon: React.ReactNode
    title: string
    description: string
    accentColor: string
}

const benefitCards: BenefitCard[] = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Best In-Class Performance",
        description: "Achieve maximum energy harvest with our revolutionary Quad microinverter technology featuring individual MPPT for each panel.",
        accentColor: "bg-gradient-to-br from-brand-darkmaroon via-brand-maroon to-brand-logo"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
        ),
        title: "Higher Profit Margins",
        description: "Competitive pricing and efficient installation translate to better profit margins for your business.",
        accentColor: "bg-gradient-to-b from-brand-maroon via-brand-logo to-brand-yellow"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Safe & Long-Lasting Products",
        description: "No failure-prone electrolytic capacitors and best-in-class longevity ensure reliable performance for decades.",
        accentColor: "bg-gradient-to-bl from-brand-darkmaroon via-brand-maroon to-brand-logo"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
        ),
        title: "Cost-Effective & Maintenance-Free",
        description: "Lowest cost per Watt in the industry with reduced installation costs and zero maintenance requirements.",
        accentColor: "bg-gradient-to-bl from-brand-logo via-brand-maroon to-brand-darkmaroon"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        title: "Easy Installation & Monitoring",
        description: "Streamlined installation process with comprehensive remote monitoring and expert technical support.",
        accentColor: "bg-gradient-to-b from-brand-yellow to-brand-logo"
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: "Expert Technical Support",
        description: "Comprehensive training, responsive field support, and ongoing technical assistance to ensure successful installations every time.",
        accentColor: "bg-gradient-to-br from-brand-logo via-brand-maroon to-brand-darkmaroon"
    }
]

export default function InstallersPage() {
    const trackEvent = useTrackEvent()
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    // Animation variants for the cards
    const leftCardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            x: 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0
        }
    }

    const rightCardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            x: 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0
        }
    }

    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
        if (!dropdownExpanded[i]) {
            trackEvent("dropdown_opened", {
                "parent": "installer_faq",
                "dropdown": FAQ[i].questionBrand,
            })
        }
    }

    const handleCtaClick = (action: string) => {
        trackEvent("button_click", {
            "btn_name": `installer_${action}`
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 pb-4 sm:pb-16">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Maximize Your Profits
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            With Sparq Technology
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Revolutionize your solar installations with Sparq Systems&apos; Quad microinverter technology.
                        Faster installations, higher margins, and satisfied customers.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto"
                    >
                        <Link href="/installer_ppt.pdf" target="_blank" onClick={() => handleCtaClick('presentation')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                View Installer Presentation
                            </motion.button>
                        </Link>
                        <Link href="#bom" onClick={() => handleCtaClick('bom_calculator')}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 dark:border-brand-yellow/30 cursor-pointer"
                            >
                                BOM Calculator
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Sparq Section */}
            <section id="whysparq" className="relative container mx-auto px-6 pb-10 sm:py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Why Installers Choose Sparq
                    </h2>
                    <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                        Revolutionary technology that delivers unmatched performance, reliability, and profitability for your business.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {benefitCards.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                            className="group"
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 dark:bg-gray-800">
                                <CardContent className="p-0">
                                    <div className={`${benefit.accentColor} p-6 text-white`}>
                                        <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-center mb-4">{benefit.title}</h3>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-gray-800">
                                        <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">{benefit.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Quad Architecture Features */}
            <section id="discover" className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-logo">
                                Quad Architecture Advantage
                            </span>
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Revolutionary technology that transforms the solar installation experience with unmatched efficiency and reliability.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 h-full">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-2xl mb-6">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
                                        Quad Architecture Benefits
                                    </h3>
                                    <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                                        Experience the power of our revolutionary 4-in-1 microinverter design
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {quad_items.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-600"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-brand-logo to-brand-yellow rounded-full flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-brand-graytext dark:text-dark-text-secondary font-medium leading-relaxed">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 h-full">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-logo to-brand-yellow rounded-2xl mb-6">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
                                        4-In-1 Installation Advantages
                                    </h3>
                                    <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                                        Streamlined installation process with superior performance benefits
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {quad_advantage.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-600"
                                        >
                                            <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-full flex-shrink-0 mt-0.5">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            <span className="text-brand-graytext dark:text-dark-text-secondary font-medium text-sm leading-relaxed">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            variants={leftCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300 py-0 dark:bg-gray-800">
                                <div className="relative h-64 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">Sparq Product Family</h3>
                                        <p className="text-white/90">
                                            Discover our robust microinverters engineered for commercial solar arrays, delivering maximum ROI and minimal maintenance.
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
                            variants={rightCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300 py-0 dark:bg-gray-800">
                                <div className="relative h-64 bg-gradient-to-br from-brand-logo to-brand-yellow">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">Learning Hub</h3>
                                        <p className="text-white/90">
                                            Access in-depth installation guides, commissioning tutorials, and best practices for commercial-scale deployments.
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

            {/* BOM Calculator Section */}
            <section id="bom" className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-logo">
                            BOM Calculator
                        </span>
                    </h2>
                    <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto">
                        Calculate your Bill of Materials and system requirements with our planning tool.
                    </p>
                </motion.div>
                <BoMCalc />
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
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                        Get answers to common questions about our products, installation process, and technical specifications.
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
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-0 dark:bg-gray-800">
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
                                        <div className="p-6 bg-white dark:bg-gray-800">
                                            <div className="space-y-6">
                                                {faqCategory.subQuestions.map((subItem) => (
                                                    <div key={subItem.id} className="border-b border-gray-100 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
                                                        <h4 className="font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3">{subItem.question}</h4>
                                                        <div className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
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
                            Ready to Partner with Sparq?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Join hundreds of successful installers who have chosen Sparq Systems for their commercial solar projects.
                            Start maximizing your profits today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/contact" onClick={() => handleCtaClick('final_contact')}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                            <Link href="/installer_ppt.pdf" target="_blank" onClick={() => handleCtaClick('final_presentation')}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Download Presentation
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
