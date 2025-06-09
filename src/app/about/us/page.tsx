'use client'

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { FaCertificate, FaRocket, FaEye, FaStar } from "react-icons/fa"

interface CompanySection {
    id: string
    title: string
    content: string
    icon: React.ReactNode
    bgImage: string
    accentColor: string
}

const companySections: CompanySection[] = [
    {
        id: "values",
        title: "Core Values",
        content: "Integrity, Collaboration, Innovation, Quality, Social Responsibility, Teamwork",
        icon: <FaCertificate size={24} />,
        bgImage: "/bg-3.jpg",
        accentColor: "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon"
    },
    {
        id: "mission",
        title: "Mission",
        content: "Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.",
        icon: <FaRocket size={24} />,
        bgImage: "/SLC/009.JPG",
        accentColor: "bg-gradient-to-br from-brand-logo to-brand-yellow"
    },
    {
        id: "vision",
        title: "Vision",
        content: "Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.",
        icon: <FaEye size={24} />,
        bgImage: "/vision-1.jpg",
        accentColor: "bg-gradient-to-br from-vision to-brand-maroon"
    },
    {
        id: "promise",
        title: "Promise",
        content: "Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.",
        icon: <FaStar size={24} />,
        bgImage: "/SLC/007.JPG",
        accentColor: "bg-gradient-to-br from-values to-brand-logo"
    }
]

interface SectionCardProps {
    section: CompanySection
    index: number
}

function SectionCard({ section, index }: SectionCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, rotateX: -10 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: isHovered ? 1.01 : 1
            } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.23, 1, 0.320, 1]
            }}
            className="relative group cursor-pointer h-[450px] md:h-[550px] w-full rounded-2xl overflow-hidden max-w-6xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ perspective: '1000px' }}
        >
            <Card className="h-full w-full overflow-hidden border-0 shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
                    style={{
                        backgroundImage: `url(${section.bgImage})`,
                        filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                    }}
                />

                {/* Gradient overlay */}
                <motion.div
                    className={`absolute inset-0 ${section.accentColor}`}
                    animate={{
                        opacity: isHovered ? 0.75 : 0.85
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Diagonal accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 transform rotate-45 translate-x-12 -translate-y-12" />

                <CardContent className="relative z-10 h-full flex flex-col justify-between p-6">
                    {/* Header with icon and title */}
                    <div className="flex items-center gap-4 justify-start">
                        <div className="p-4 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40 shadow-lg">
                            <div className="text-white">
                                {section.icon}
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {section.title}
                        </h2>
                    </div>

                    {/* Expandable content area */}
                    <div className="flex-1 flex items-center overflow-hidden">
                        <div className="w-full flex justify-start">
                            <div className="max-w-2xl text-left">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isExpanded ? 'auto' : '0px',
                                        opacity: isExpanded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.320, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-6">
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isExpanded ? { opacity: 1, y: 0 } : {}}
                                            transition={{
                                                delay: isExpanded ? 0.2 : 0,
                                                duration: 0.3,
                                                ease: [0.23, 1, 0.320, 1]
                                            }}
                                            className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-medium"
                                        >
                                            {section.content}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

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

// Predefined background shapes to avoid hydration issues
const backgroundShapes = [
    { width: 160, height: 100, left: 10, top: 15, duration: 16, delay: 0.8, borderRadius: '50% 50% 70% 30%' },
    { width: 120, height: 140, left: 80, top: 25, duration: 14, delay: 1.5, borderRadius: '40% 60% 60% 40%' },
    { width: 200, height: 70, left: 40, top: 40, duration: 18, delay: 2.2, borderRadius: '30% 70% 70% 30%' },
    { width: 90, height: 90, left: 70, top: 70, duration: 13, delay: 0.5, borderRadius: '50%' },
    { width: 130, height: 180, left: 20, top: 80, duration: 15, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 80, height: 80, left: 90, top: 90, duration: 17, delay: 2.8, borderRadius: '50%' },
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
                        y: [0, -25, 0],
                        x: [0, 12, 0],
                        scale: [1, 1.08, 1],
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

export default function AboutUsPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            <BackgroundElements />

            {/* Hero section */}
            <div className="relative container mx-auto px-4 pt-20">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Our Foundation
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        The principles, purpose, and promise that drive everything we do at Sparq Systems.
                    </p>
                </motion.div>
            </div>

            {/* Company Sections */}
            <div className="relative container mx-auto px-4 pb-20">
                <div className="max-w-7xl mx-auto space-y-16">
                    {companySections.map((section, index) => (
                        <SectionCard key={section.id} section={section} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}