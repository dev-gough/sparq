'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Zap, Cpu, Shield, Smartphone, BarChart3, Layers, Award } from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

interface TechFeature {
    title: string
    description: string
    benefits: string[]
    icon: React.ReactNode
    details?: string
    img?: string
}

const coreInnovations: TechFeature[] = [
    {
        title: "High Frequency Soft-Switching Architecture",
        description: "Proprietary HF soft-switching power electronics that eliminate electrolytic capacitors - the primary failure point in conventional microinverters - achieving 97.5% maximum efficiency and 25+ year operational life.",
        benefits: ["No electrolytic capacitors", "97.5% maximum efficiency", "25+ year lifespan", "Maintenance-free operation"],
        details: "Our patented soft-switching technology operates at higher frequencies to minimize switching losses while eliminating short-life electrolytic capacitors. Operating temperature range of -40°C to +65°C with power factor >0.99 and output THD <2%. This revolutionary approach eliminates single-point failures and delivers the highest power density and lowest weight in the industry.",
        icon: <Zap className="w-12 h-12" />
    },
    {
        title: "Quad Architecture",
        description: "Industry-first 4-in-1 microinverter design handling up to 2,000W total capacity (up to 680W panels) with four independent DC input channels, reducing inverter count by 75% and installation costs dramatically.",
        benefits: ["75% fewer inverters needed", "2,000W total capacity", "Independent channel isolation", "Lowest per-watt cost"],
        details: "Each Quad unit processes four independent PV panel inputs with 16A maximum DC current per channel. Features wide MPPT voltage range (20-60V extended, 34-45V full power) with MC4 compatible receptacles. NEMA 6/IP-67 rated enclosure weighs only 4kg while delivering the highest power output per unit in the microinverter industry.",
        icon: <Layers className="w-12 h-12" />,
        img: "/4in1-2.jpg"
    },
    {
        title: "Individual MPPT",
        description: "Four completely independent Maximum Power Point Tracking controllers achieve 99.85% static and 99.8% dynamic MPPT efficiency, with each panel optimized individually for maximum energy harvest even under partial shading conditions.",
        benefits: ["99.85% static MPPT efficiency", "Independent optimization", "Fast dynamic response", "Shade tolerance"],
        details: "Advanced real-time algorithms continuously track and optimize each panel's power output with dedicated MPPT controllers per channel. Wide voltage tracking range accommodates various panel types while maintaining peak performance. Eliminates power loss from series string effects and provides individual panel monitoring and diagnostics capabilities.",
        icon: <BarChart3 className="w-12 h-12" />,
        img: "/clouded-panels.png"
    },
    {
        title: "Native Three-Phase Technology",
        description: "True three-phase microinverter (Quad3) delivering balanced three-phase power directly without phase balancing solutions. Supports 380V/400V/480V grid systems.",
        benefits: ["Native three-phase output", "380V/400V/480V compatibility", "0.1% frequency tolerance", "Motor drive capability"],
        details: "Commercial-grade design supports induction, BLDC, and PMSM motors with tri-mode operation (grid-tied, off-grid, MPPT motor drive). Features programmable voltage/frequency ride-through for smart grid compliance, a programmable 0-130Hz output frequency with 0.1% tolerance for C&I applications, parallel operation capability for higher power applications, and comprehensive protection including over-current, over-voltage, dry run, and speed excessive protection.",
        icon: <Cpu className="w-12 h-12" />
    }
]

const digitalEcosystem = [
    {
        name: "SparqLinq",
        description: "Advanced energy management and monitoring system for real-time performance tracking.",
        features: ["Real-time monitoring", "Performance analytics", "System diagnostics", "Grid management"],
        icon: <Shield className="w-8 h-8" />
    },
    {
        name: "SparqVu",
        description: "Cloud-based monitoring platform providing comprehensive system insights and analytics.",
        features: ["Cloud-based dashboard", "Historical data", "Performance reports", "Alert notifications"],
        icon: <BarChart3 className="w-8 h-8" />
    },
    {
        name: "SparqSync",
        description: "Mobile application for Android and iOS providing on-the-go system monitoring and control.",
        features: ["Mobile monitoring", "System status", "Performance tracking", "Remote diagnostics"],
        icon: <Smartphone className="w-8 h-8" />
    }
]

const technicalSpecs = [
    { label: "Patents Awarded & Pending", value: "85+" },
    { label: "Maximum Efficiency", value: "97.5%" },
    { label: "MPPT Efficiency (Static/Dynamic)", value: "99.85% / 99.8%" },
    { label: "Total Capacity per Unit", value: "2,000W" },
    { label: "Power Factor", value: ">0.99" },
    { label: "Output THD", value: "<2%" },
    { label: "Operating Temperature", value: "-40°C to +65°C" },
    { label: "Expected Lifespan", value: "25+ years" },
    { label: "Electrolytic Capacitors", value: "Zero" }
]

export default function TechnologyPage() {
    const titleRef = useRef(null)
    const coreRef = useRef(null)
    const ecosystemRef = useRef(null)
    const specsRef = useRef(null)

    const isMobile = useIsMobile()

    const titleInView = useInView(titleRef, { once: true })
    const coreInView = useInView(coreRef, { once: true })
    const ecosystemInView = useInView(ecosystemRef, { once: true })
    const specsInView = useInView(specsRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />

            <div className="relative container mx-auto px-6 py-16">
                {/* Hero Section */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Revolutionary Solar Technology
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
                        Breakthrough microinverter innovations that redefine solar energy conversion, reliability, and performance.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-brand-maroon dark:text-brand-yellow">
                        <Award className="w-6 h-6" />
                        <span className="text-lg font-semibold">85+ Patents Awarded & Pending</span>
                    </div>
                </motion.div>

                {/* Core Technologies */}
                <motion.div
                    ref={coreRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={coreInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Core Innovations
                        </h2>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Fundamental technological breakthroughs that set our microinverters apart from conventional solar solutions.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {coreInnovations.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={coreInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-2xl flex items-center justify-center text-white">
                                            {tech.icon}
                                        </div>
                                        <h3 className="text-xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow">
                                            {tech.title}
                                        </h3>
                                    </div>

                                    <p className="text-base md:text-lg text-brand-graytext dark:text-dark-text-secondary mb-6 leading-relaxed">
                                        {tech.description}
                                    </p>

                                    {tech.details && (
                                        <p className="text-sm md:text-base text-brand-graytext dark:text-dark-text-secondary mb-6 leading-relaxed italic">
                                            {tech.details}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {tech.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo" />
                                                <span className="text-brand-graytext dark:text-dark-text-secondary font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {!tech.img && !isMobile && (
                                    <div className="flex-1 max-w-lg">
                                        <Card className="overflow-hidden border-0 shadow-xl py-0">
                                            <div className="aspect-video bg-gradient-to-br from-brand-maroon/10 to-brand-logo/10 flex items-center justify-center">
                                                <div className="text-6xl text-brand-maroon dark:text-brand-logo opacity-50">
                                                    {tech.icon}
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}

                                {tech.img && (
                                    <div className="flex-1 max-w-lg">
                                        <Card className="overflow-hidden border-0 shadow-xl py-0">
                                            <div className="aspect-video bg-gradient-to-br from-brand-maroon/10 to-brand-logo/10 relative">
                                                <Image
                                                    src={tech.img}
                                                    fill
                                                    alt=""
                                                    className="object-cover"
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                )}

                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Digital Ecosystem */}
                <motion.div
                    ref={ecosystemRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={ecosystemInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Digital Ecosystem
                        </h2>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Comprehensive monitoring and management solutions that provide complete system visibility and control.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {digitalEcosystem.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={ecosystemInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                            >
                                <Card className="h-full p-6 bg-white/50 dark:bg-gray-800/30 border border-brand-maroon/10 hover:shadow-lg transition-all duration-300">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                                            {product.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-4">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        {product.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-maroon" />
                                                <span className="text-sm text-brand-graytext dark:text-dark-text-secondary">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technical Specifications */}
                <motion.div
                    ref={specsRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={specsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Technical Overview
                        </h2>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Key specifications that demonstrate our technological leadership in microinverter design.
                        </p>
                    </div>

                    <Card className="p-8 bg-white/50 dark:bg-gray-800/30 border border-brand-maroon/10 shadow-lg">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {technicalSpecs.map((spec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={specsInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                    className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                                >
                                    <div className="text-2xl font-bold text-brand-maroon dark:text-brand-logo mb-2">
                                        {spec.value}
                                    </div>
                                    <div className="text-sm text-brand-graytext dark:text-dark-text-secondary font-medium">
                                        {spec.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Call to Action */}
                <section className="container mx-auto px-6 pb-20 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center"
                    >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Experience Our Technology
                    </h2>
                    <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
                        Discover how our innovative microinverter solutions can transform your solar energy system.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Explore Products
                            </motion.button>
                        </Link>
                        <Link href="/resources">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                Technical Resources
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
            </div>
        </div>
    )
}