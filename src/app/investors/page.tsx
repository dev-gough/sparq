'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Card, CardContent } from '@/components/ui/card'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import FAQs from './investor_faq.json'
import SedarDocs from '@/data/sedar-documents.json'
import VideoPopup from '@/components/VideoPopup'
import { allVideos } from '@/data/videos'
import { TrendingUp, Newspaper, Shield, ExternalLink, Play, FileText, Calendar } from 'lucide-react'
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

/**
 * Isolated useSearchParams consumer — only this subtree is Suspense-gated.
 * Renders nothing; opens the video popup when ?video= is present.
 * fallback={null} is safe here (no layout impact).
 */
function VideoDeepLink({ onOpen }: { onOpen: (id: number) => void }) {
	const searchParams = useSearchParams()

	useEffect(() => {
		const videoParam = searchParams.get('video')
		if (!videoParam) return
		const videoId = parseInt(videoParam, 10)
		if (!isNaN(videoId) && allVideos.some((video) => video.id === videoId)) {
			onOpen(videoId)
		}
	}, [searchParams, onOpen])

	return null
}

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string | Array<string | string[]> }[];
}

const FAQ: FAQData[] = FAQs.faqs

// Format date without timezone issues
const formatDate = (dateString: string) => {
    // Parse the date as local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Key news releases - filter for items marked as key
const keyNewsReleases = SedarDocs.documents
    .filter(doc => doc.key === true)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

const investorSections = [
    {
        title: "Stock Performance",
        description: "View SPRQ quote and market data on the TSX Venture Exchange (external).",
        href: "https://money.tmx.com/en/quote/SPRQ",
        icon: <TrendingUp className="w-6 h-6" />,
        gradient: "from-brand-maroon to-brand-logo"
    },
    {
        title: "Financial Reports",
        description: "Access our latest SEDAR+ filings, financial statements, and regulatory documents.",
        href: "/investors/reports",
        icon: <Newspaper className="w-6 h-6" />,
        gradient: "from-brand-logo to-brand-yellow"
    },
    {
        title: "Governance",
        description: "Corporate governance documents, policies, and committee charters.",
        href: "/investors/governance",
        icon: <Shield className="w-6 h-6" />,
        gradient: "from-brand-darkmaroon to-brand-maroon"
    }
]


export default function InvestorsPage() {
    const trackEvent = useTrackEvent()
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
    const [showingVideoID, setShowingVideoID] = useState<number | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    const openVideo = useCallback((id: number) => {
        setShowingVideoID(id)
    }, [])

    const handlePresentationClick = () => {
        trackEvent("button_click", {
            "btn_name": "investor_presentation"
        })
    }

    const handleVideoShow = (id: number) => {
        setShowingVideoID(id)
        // Next router — no window.*; preserves App Router navigation
        router.push(`${pathname}?video=${id}`, { scroll: false })
    }

    const handleVideoClose = () => {
        setShowingVideoID(null)
        router.push(pathname, { scroll: false })
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
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative z-10'>
            <SolarBackgroundElements />

            {/* Hero Section */}
            <section className="relative z-20 container mx-auto px-6 pt-10 pb-16">

                <div
                    
                    
                    
                    className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Investing in
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Solar Innovation
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12">
                        Discover investment opportunities with Sparq Systems, a leader in next-generation
                        solar microinverter technology revolutionizing renewable energy solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        <Link href="/investors_ppt.pdf" onClick={handlePresentationClick} target="_blank">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center">
                                <FileText className="mr-2" />
                                View Investor Presentation
                            </button>
                        </Link>
                        <button onClick={() => handleVideoShow(7)}
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 dark:border-brand-yellow/30 cursor-pointer flex items-center justify-center">
                            <Play className="mr-2" />
                            Watch CEO Interview
                        </button>
                        <button onClick={() => handleVideoShow(6)}
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 dark:border-brand-yellow/30 cursor-pointer flex items-center justify-center">
                            <Play className="mr-2" />
                            Watch TSXV 50 Listing
                        </button>
                    </div>
                </div>
            </section>

            {/* Investor Navigation Section */}
            <section className="relative z-20 bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Investor Resources
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Access comprehensive financial information, governance documents, and market data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {investorSections.map((section) => (
                            <div key={section.title}>
                                <Link href={section.href}
                                    target={section.href.startsWith('http') ? '_blank' : undefined}
                                    rel={section.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full group cursor-pointer dark:bg-gray-800">
                                        <CardContent className="p-6 text-center h-full flex flex-col">
                                            <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <div className="text-white">
                                                    {section.icon}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors duration-300 mb-4">
                                                {section.title}
                                            </h3>
                                            <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed flex-grow mb-6">
                                                {section.description}
                                            </p>
                                            <div className="inline-flex items-center text-brand-maroon group-hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
                                                <span>Learn More</span>
                                                <span className="ml-2">
                                                    →
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Strategic Partnerships Section */}
            <section id="partnerships" className="relative z-20 bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 scroll-mt-[75px]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Global Strategic Partnerships
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Building the future of solar energy through strategic alliances with world-class partners in research, manufacturing, and market development.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {/* Queen's University */}
                        <div>
                            <a href="https://www.queensu.ca/epower/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full">
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer dark:bg-gray-800">
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform p-2 shadow-sm">
                                                <Image src="/Logos/queens-c.jpg"
                                                    alt="Queen's University"
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg object-contain w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors">
                                                    Queen&apos;s University
                                                </h3>
                                                <p className="text-sm text-brand-maroon font-medium">Research Partnership</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary flex-1">
                                            ePower Lab advances our microinverter technology through cutting-edge research and development.
                                        </p>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>

                        {/* ILJIN Electronics */}
                        <div>
                            <a href="https://www.iljin.co.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full">
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer dark:bg-gray-800">
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform p-2 shadow-sm">
                                                <Image src="/Logos/iljin.png"
                                                    alt="ILJIN Electronics"
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg object-contain w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors">
                                                    ILJIN Electronics
                                                </h3>
                                                <p className="text-sm text-brand-maroon font-medium">Manufacturing Partner</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary flex-1">
                                            Expands production capabilities in key international markets.
                                        </p>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>

                        {/* JioThings */}
                        <div>
                            <a href="https://www.jiothings.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full">
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer dark:bg-gray-800">
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform p- shadow-sm">
                                                <Image src="/Logos/jiothings-c.jpeg"
                                                    alt="JioThings"
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg object-contain w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors">
                                                    JioThings
                                                </h3>
                                                <p className="text-sm text-brand-maroon font-medium">Market Partner</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary flex-1">
                                            Assists development, manufacturing, and distribution of our microinverters in the Indian market.
                                        </p>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>

                        {/* Reliance New Energy */}
                        <div>
                            <a href="https://www.ril.com/businesses/new-energy-materials"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full">
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer dark:bg-gray-800">
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform p-2 shadow-sm">
                                                <Image src="/Logos/rel-cir.png"
                                                    alt="Reliance New Energy"
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg object-contain w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors">
                                                    Reliance New Energy
                                                </h3>
                                                <p className="text-sm text-brand-maroon font-medium">Strategic Partner</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary flex-1">
                                            Provides market access and technology integration across India.
                                        </p>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>

                        {/* Modern Niagara */}
                    </div>
                </div>
            </section>

            {/* Key News Releases Section */}
            <section className="relative z-20 py-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Key News Releases
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto">
                            Stay informed with our latest significant announcements and corporate developments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keyNewsReleases.map((release) => (
                            <div key={release.id}>
                                <a href={release.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full">
                                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 py-0 h-full group cursor-pointer dark:bg-gray-800">
                                        <CardContent className="p-6 h-full flex flex-col">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white flex-shrink-0">
                                                    <Newspaper className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Calendar className="w-4 h-4 text-brand-maroon" />
                                                        <span className="text-sm text-brand-graytext dark:text-dark-text-muted font-medium">
                                                            {formatDate(release.publishDate)}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon transition-colors duration-300 mb-3">
                                                        {release.description}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="inline-flex items-center text-brand-maroon group-hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
                                                    <span>Read Full Release</span>
                                                    <span className="ml-2">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* View All Releases Link */}
                    <div className="text-center mt-12">
                        <Link href="/investors/reports">
                            <button className="px-8 py-4 bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-brand-maroon/20 dark:border-brand-yellow/30 cursor-pointer">
                                View All Reports & Filings
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative z-20 py-10 scroll-mt-[66px]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Find answers to common investor questions about Sparq Systems.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {FAQ.map((faqCategory, index) => (
                            <div key={faqCategory.id}>
                                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-0 dark:bg-gray-800">
                                    <CardContent className="p-0">
                                        <div className="bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80 p-6 text-white cursor-pointer"
                                            onClick={() => toggleExpanded(index)}>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold flex-1">{faqCategory.questionBrand}</h3>
                                                <div className="flex-shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-hidden">
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
                                                                    <div className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                                                                        {subItem.answer as string}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative z-20 container mx-auto px-6 pb-20 sm:py-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                        Ready to Invest?
                    </h2>
                    <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
                        Connect with our investor relations team to learn more about investment opportunities with Sparq Systems.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                        <Link href="/contact">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                                Contact Investor Relations
                            </button>
                        </Link>
                        <Link href="/investors_ppt.pdf" target="_blank">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center">
                                <FileText className="mr-2" />
                                View Presentation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Video deep-link island — only part that needs useSearchParams / Suspense */}
            <Suspense fallback={null}>
                <VideoDeepLink onOpen={openVideo} />
            </Suspense>

            {/* Video Popup */}
            {showingVideoID && (() => {
                const selectedVideo = allVideos.find(video => video.id === showingVideoID)
                return selectedVideo ? (
                    <VideoPopup url={selectedVideo.url}
                        onClose={handleVideoClose}
                        iFrame={selectedVideo.iFrame}
                    />
                ) : null
            })()}
        </div>
    )
}