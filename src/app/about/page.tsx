'use client'

import { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Zap, Package, Trophy, Target, Eye, Award } from "lucide-react"

interface TimelineEvent {
    year: string
    date?: string
    title: string
    description: string
    category: 'foundation' | 'innovation' | 'product' | 'growth' | 'future'
    image?: string
    details?: string[]
    achievements?: string[]
}

const timelineEvents: TimelineEvent[] = [
    {
        year: "2009",
        title: "The Problem & The Vision",
        description: "Dr. Praveen Jain identified critical flaws in traditional solar technology and founded SPARQ to revolutionize the industry.",
        category: "foundation",
        image: "/thumbnail_image.png",
        details: [
            "Fossil fuel causing global warming",
            "Unsafe components with short lifetimes",
            "Fire risk and high voltage arcing",
            "High electricity bills due to centralized power generation"
        ]
    },
    {
        year: "2009-2018",
        title: "Innovation & Development",
        description: "Years of passionate R&D developing breakthrough microinverter technology with revolutionary HF soft-switching architecture.",
        category: "innovation",
        image: "/bg-2.jpg",
        details: [
            "HF soft-switching quad and duo architecture driven by real-time controls",
            "Elimination of electrolytic caps and short-life components",
            "Safe and highly reliable, without risk of high voltage DC arcing",
            "Best in-class performance, efficiency, and lowest cost per Watt"
        ],
        achievements: ["85+ patents awarded and pending", "Frost & Sullivan 2017 New Product Innovation Award"]
    },
    {
        year: "2018",
        title: "Manufacturing Breakthrough",
        description: "Began manufacturing in North America, bringing revolutionary microinverter technology to market.",
        category: "growth",
        image: "/SLC/009.JPG"
    },
    {
        year: "2020",
        title: "Product Launch Era",
        description: "Launched complete solar solution ecosystem with Q2000 microinverter and comprehensive monitoring systems.",
        category: "product",
        image: "/q2000.webp",
        details: [
            "Q2000 single-phase microinverter",
            "SparqLinq energy management system",
            "SparqVu cloud-based monitoring platform"
        ]
    },
    {
        year: "2021",
        title: "Going Public & Global Expansion",
        description: "Raised $64M in venture funding and went public on TSXV, accelerating global market penetration.",
        category: "growth",
        image: "/bg-4.jpg"
    },
    {
        year: "2022",
        title: "Global Manufacturing",
        description: "Expanded manufacturing to China, dramatically reducing costs and increasing global accessibility.",
        category: "growth"
    },
    {
        year: "2024",
        title: "Strategic Partnerships & Innovation",
        description: "Formed partnership with Jio Reliance and launched next-generation three-phase microinverter technology.",
        category: "growth",
        details: [
            "Partnership with Jio Reliance, India's largest IoT company",
            "Q2000 Dual-mode microinverter launch",
            "Grid-tied three-phase microinverter (Quad3)"
        ]
    },
    {
        year: "2025",
        title: "Industry Leadership & Future Vision",
        description: "Recognized in TSX Venture 50 and launching integrated PV-battery solutions for complete energy independence.",
        category: "future",
        image: "/testing2.jpg",
        details: [
            "TSX Venture 50 recognition in Clean Technology",
            "Integrated PV and Battery Quad microinverter",
            "SparqSync mobile app for Android and iOS"
        ],
        achievements: [
            "Reduce energy consumption",
            "Cut carbon footprint",
            "Enable self-sufficiency with solar power"
        ]
    }
]

const categoryConfig = {
    foundation: {
        color: "from-red-500 to-red-700",
        bgColor: "from-red-50 to-red-100",
        icon: Target,
        label: "Foundation"
    },
    innovation: {
        color: "from-blue-500 to-blue-700",
        bgColor: "from-blue-50 to-blue-100",
        icon: Zap,
        label: "Innovation"
    },
    product: {
        color: "from-green-500 to-green-700",
        bgColor: "from-green-50 to-green-100",
        icon: Package,
        label: "Products"
    },
    growth: {
        color: "from-purple-500 to-purple-700",
        bgColor: "from-purple-50 to-purple-100",
        icon: Trophy,
        label: "Growth"
    },
    future: {
        color: "from-brand-yellow to-brand-logo",
        bgColor: "from-yellow-50 to-orange-100",
        icon: Eye,
        label: "Future"
    }
}

interface TimelineNodeProps {
    event: TimelineEvent
    index: number
}

function TimelineNode({ event, index }: TimelineNodeProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const nodeRef = useRef(null)
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" })
    const isLeft = index % 2 === 0
    const config = categoryConfig[event.category]
    const IconComponent = config.icon

    return (
        <div ref={nodeRef} className="relative">


            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-start gap-8 mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
                {/* Content Side */}
                <div className={`flex-1 max-w-lg ${isLeft ? 'text-right' : 'text-left'}`}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <Card className={`bg-gradient-to-br ${config.bgColor} border-2 border-transparent hover:border-brand-maroon/20 shadow-lg transition-all duration-300`}>
                            <CardContent className="p-6">
                                <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-2 bg-gradient-to-br ${config.color} rounded-lg text-white`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <span className="text-sm font-medium text-brand-graytext uppercase tracking-wide">
                                        {config.label}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-brand-darkmaroon mb-2">
                                    {event.title}
                                </h3>

                                <p className="text-brand-graytext leading-relaxed mb-4">
                                    {event.description}
                                </p>

                                {/* Expandable Details */}
                                <motion.div
                                    initial={false}
                                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    {event.details && (
                                        <div className="space-y-2 mb-4">
                                            {event.details.map((detail, i) => (
                                                <div key={i} className={`flex items-start gap-2 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${config.color} mt-2 flex-shrink-0`} />
                                                    <p className="text-sm text-brand-graytext">{detail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {event.achievements && (
                                        <div className={`bg-white/60 rounded-lg p-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                                            <h4 className="font-semibold text-brand-darkmaroon mb-2 flex items-center gap-2 justify-start">
                                                <Award size={16} />
                                                Key Achievements
                                            </h4>
                                            <div className="space-y-1">
                                                {event.achievements.map((achievement, i) => (
                                                    <p key={i} className="text-sm text-brand-graytext">{achievement}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                <div className={`text-xs text-brand-graytext/60 ${isLeft ? 'text-right' : 'text-left'}`}>
                                    Click to {isExpanded ? 'collapse' : 'expand'}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Central Timeline Node */}
                <div className="relative flex-shrink-0">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-white font-bold text-xs text-center shadow-lg z-10 relative border-4 border-white`}
                    >
                        {event.year}
                    </motion.div>
                </div>

                {/* Image Side */}
                <div className="flex-1 max-w-lg">
                    {event.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                            className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

function TimelineProgress() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div ref={containerRef} className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-0.5">
            <div className="w-full h-full bg-brand-maroon/10 rounded-full" />
            <motion.div
                style={{ scaleY }}
                className="absolute top-0 left-0 w-full h-full bg-brand-maroon rounded-full origin-top"
            />
        </div>
    )
}

export default function AboutPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            {/* Hero Section */}
            <div className="relative container mx-auto px-6 pt-10 pb-8">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            The Sparq Story
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        From vision to reality - discover how we&apos;re revolutionizing solar energy
                        through innovation, passion, and a commitment to a sustainable future.
                    </p>
                </motion.div>
            </div>

            {/* Timeline Section */}
            <div className="relative container mx-auto px-6 py-10">
                <div className="max-w-6xl mx-auto relative">
                    <TimelineProgress />

                    {timelineEvents.map((event, index) => (
                        <TimelineNode
                            key={`${event.year}-${index}`}
                            event={event}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <section className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon mb-6">
                        Ready to be part of the solar revolution?
                    </h2>
                    <p className="text-lg text-brand-graytext mb-12 max-w-2xl mx-auto">
                        Join thousands who have chosen Sparq Systems to power their sustainable future.
                    </p>
                    <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        <Link href="/homeowners" className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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
                                className="w-full px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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
                                className="w-full px-8 py-4 bg-gradient-to-r from-brand-gray to-brand-graytext text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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
    )
}