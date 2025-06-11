'use client'

import Link from "next/link"
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import AccordionItem from "@/components/AccordionItem"
import { useTrackEvent } from '@/hooks/useTrackEvent'
import FAQs from './investor_faq.json'
import { FaChartLine, FaNewspaper, FaCalendarAlt, FaShieldAlt, FaFileAlt, FaExternalLinkAlt, FaHandshake, FaRocket, FaAward, FaTrophy, FaPlay } from 'react-icons/fa'

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string | Array<string | string[]> }[];
}

const FAQ: FAQData[] = FAQs.faqs

const investorSections = [
    {
        title: "Stock Performance",
        description: "Real-time stock data and interactive charts for SPRQ on TSX Venture Exchange.",
        href: "/investors/stock",
        icon: <FaChartLine className="w-6 h-6" />,
        gradient: "from-brand-maroon to-brand-logo"
    },
    {
        title: "Latest News",
        description: "Stay updated with our latest announcements, press releases, and company updates.",
        href: "/investors/news",
        icon: <FaNewspaper className="w-6 h-6" />,
        gradient: "from-brand-logo to-brand-yellow"
    },
    {
        title: "Upcoming Events",
        description: "Investor meetings, earnings calls, and important corporate events calendar.",
        href: "/investors/events",
        icon: <FaCalendarAlt className="w-6 h-6" />,
        gradient: "from-brand-yellow to-brand-maroon"
    },
    {
        title: "Governance",
        description: "Corporate governance documents, policies, and committee charters.",
        href: "/investors/governance",
        icon: <FaShieldAlt className="w-6 h-6" />,
        gradient: "from-brand-darkmaroon to-brand-maroon"
    }
]

const highlights = [
    {
        id: 1,
        title: "Global Strategic Partnerships",
        subtitle: "for R&D, Manufacturing and Distribution",
        content: [
            { name: "ePower Lab", url: "https://www.queensu.ca/epower/", description: "Queen's University ePower Lab partnership" },
            { name: "JioThings", url: "https://www.jiothings.com/", description: "IoT and connectivity solutions" },
            { name: "Reliance", url: "https://www.ril.com/businesses/new-energy-materials", description: "New Energy Materials division" },
            { name: "ILJIN Electronics", url: "https://www.iljin.co.in/", description: "Electronics manufacturing partnership" }
        ],
        icon: <FaHandshake className="w-8 h-8" />
    },
    {
        id: 2,
        title: "Strategic Test Sites for R&D",
        subtitle: "with Leading Institutions and C&I Sites",
        content: [
            { name: "Queen's University", url: "https://www.investkingston.ca/rd/#1643990910571-444406ce-b63e", description: "Research and development facility" },
            { name: "St. Lawrence College", url: "https://www.energy-manager.ca/st-lawrence-college-installs-largest-solar-system-for-post-secondary-facility-856/", description: "Largest solar system for post-secondary facility" },
            { name: "Modern Niagara", url: "#", description: "Sparq Headquarter Office installation" }
        ],
        icon: <FaRocket className="w-8 h-8" />
    },
    {
        id: 3,
        title: "Additional 20MW Purchase Order",
        subtitle: "for Q2000 Quad Microinverters",
        content: [
            { description: "SPARQ received a purchase order for supplying 10,000 Q2000 Quad Microinverters for the Indian market. This order is in addition to the order for 6,000 Q2000 Quad Microinverters announced in June 2024." },
            { name: "Read More", url: "https://finance.yahoo.com/news/sparq-receives-purchase-order-additional-211000433.html", description: "Full announcement details" }
        ],
        icon: <FaAward className="w-8 h-8" />
    },
    {
        id: 4,
        title: "TSX Venture 50 Recognition",
        subtitle: "Top Performing Company in Clean Technology",
        content: [
            { description: "Sparq Systems Inc. has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector." },
            { name: "Read More", url: "https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html", description: "Full announcement details" }
        ],
        icon: <FaTrophy className="w-8 h-8" />
    },
    {
        id: 5,
        title: "12 MW Purchase Orders",
        subtitle: "Entry into Indian PV Market",
        content: [
            { description: "Sparq received purchase orders for supplying over six-thousand Q2000 Quad Microinverters for the Indian market." },
            { description: "\"It is a major step forward for the Company to enter into the Indian PV market,\" commented Dr. Praveen Jain, Chief Executive Officer of SPARQ." },
            { name: "Read More", url: "https://finance.yahoo.com/news/sparq-receives-12-mw-worth-112000213.html", description: "Full announcement details" }
        ],
        icon: <FaRocket className="w-8 h-8" />
    },
    {
        id: 6,
        title: "CEO Interview",
        subtitle: "Dr. Praveen Jain Discussion",
        content: [
            { description: "In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters." },
            { name: "Watch Here", url: "https://www.youtube.com/watch?v=8OJ02vvC-Os", description: "Video interview" }
        ],
        icon: <FaPlay className="w-8 h-8" />
    }
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

export default function InvestorsPage() {
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const trackEvent = useTrackEvent()
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})

    const handlePresentationClick = () => {
        trackEvent("button_click", {
            "btn_name": "investor_presentation"
        })
    }

    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
        if (!dropdownExpanded[i]) {
            trackEvent("dropdown_open", {
                "parent": "investor_faq",
                "dropdown": FAQ[i].questionBrand,
            })
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative'>
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
                            Investing in
                        </span>
                        <br />
                        <span className="text-brand-darkmaroon">
                            Solar Innovation
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Discover investment opportunities with Sparq Systems, a leader in next-generation
                        solar microinverter technology revolutionizing renewable energy solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto"
                    >
                        <Link href="/investors_ppt.pdf" onClick={handlePresentationClick} target="_blank">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-brand-maroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-darkmaroon transition-all duration-300 cursor-pointer flex items-center justify-center"
                            >
                                <FaPlay className="mr-2" />
                                View Investor Presentation
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon border-2 border-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-maroon hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Contact IR Team
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Investor Navigation Section */}
            <section className="relative bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                            Investor Resources
                        </h2>
                        <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                            Access comprehensive financial information, governance documents, and market data.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {investorSections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                            >
                                <Link href={section.href}>
                                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full group cursor-pointer">
                                        <CardContent className="p-6 text-center h-full flex flex-col">
                                            <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <div className="text-white">
                                                    {section.icon}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-brand-darkmaroon group-hover:text-brand-maroon transition-colors duration-300 mb-4">
                                                {section.title}
                                            </h3>
                                            <p className="text-brand-graytext leading-relaxed flex-grow mb-6">
                                                {section.description}
                                            </p>
                                            <div className="inline-flex items-center text-brand-maroon group-hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
                                                <span>Learn More</span>
                                                <motion.span
                                                    className="ml-2"
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    →
                                                </motion.span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                            Investment Highlights
                        </h2>
                        <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                            Key achievements, partnerships, and milestones that define our growth trajectory.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                            >
                                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 py-0 h-full">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white flex-shrink-0">
                                                {highlight.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-brand-darkmaroon mb-2">
                                                    {highlight.title}
                                                </h3>
                                                <p className="text-lg text-brand-maroon font-medium mb-4">
                                                    {highlight.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {highlight.content.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    {item.name ? (
                                                        item.url ? (
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block p-3 bg-brand-maroon/5 hover:bg-brand-maroon/10 rounded-lg border-l-4 border-brand-maroon transition-all duration-200 group"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <h4 className="font-semibold text-brand-darkmaroon group-hover:text-brand-maroon transition-colors duration-200">{item.name}</h4>
                                                                        {item.description && (
                                                                            <p className="text-sm text-brand-graytext">{item.description}</p>
                                                                        )}
                                                                    </div>
                                                                    <FaExternalLinkAlt className="w-4 h-4 text-brand-maroon group-hover:text-brand-darkmaroon transition-colors duration-200" />
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <div className="p-3 bg-brand-maroon/5 rounded-lg border-l-4 border-brand-maroon">
                                                                <h4 className="font-semibold text-brand-darkmaroon">{item.name}</h4>
                                                                {item.description && (
                                                                    <p className="text-sm text-brand-graytext">{item.description}</p>
                                                                )}
                                                            </div>
                                                        )
                                                    ) : (
                                                        <p className="text-brand-graytext leading-relaxed p-3 bg-white rounded-lg shadow-sm">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative bg-white py-20 scroll-mt-[66px]">
                <div className="container mx-auto px-6">
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
                            Find answers to common investor questions about Sparq Systems.
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
                                                                    <div className="leading-relaxed">
                                                                        {subItem.answer as string}
                                                                    </div>
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
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Invest?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Connect with our investor relations team to learn more about investment
                            opportunities with Sparq Systems and our revolutionary solar technology.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Contact Investor Relations
                                </motion.button>
                            </Link>
                            <Link href="/investors_ppt.pdf" target="_blank">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                                >
                                    <FaFileAlt className="mr-2" />
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