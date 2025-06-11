'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import StockChart, { RawBar } from "@/components/StockChart"
import ChartControls, { ChartSettings } from "@/components/ChartControls"
import useSWR from 'swr'
import { FaChartLine, FaInfoCircle, FaClock, FaExternalLinkAlt } from 'react-icons/fa'

const fetcher = (url: string) =>
    fetch(url).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<{ values: RawBar[] }>
    })

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

export default function StockPage() {
    const [chartSettings, setChartSettings] = useState<ChartSettings>({
        interval: '1h',
        startDate: '2020-01-01 08:00:00',
        endDate: ''
    })

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const buildApiUrl = (settings: ChartSettings) => {
        const params = new URLSearchParams({
            interval: settings.interval,
            start_date: settings.startDate
        })

        if (settings.endDate) {
            params.append('end_date', settings.endDate)
        }

        return `/api/stockData?${params.toString()}`
    }

    const { data, error, isLoading } = useSWR(buildApiUrl(chartSettings), fetcher, {
        refreshInterval: 15 * 60_000
    })

    const handleSettingsChange = (newSettings: ChartSettings) => {
        setChartSettings(newSettings)
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative flex items-center justify-center">
                <BackgroundElements />
                <Card className="max-w-md mx-6 border-0 shadow-2xl py-0">
                    <CardContent className="p-8 text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mx-auto mb-6">
                            <FaInfoCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-darkmaroon mb-4">Data Unavailable</h3>
                        <p className="text-brand-graytext">Unable to load stock data. Please try again later.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative flex items-center justify-center">
                <BackgroundElements />
                <Card className="max-w-md mx-6 border-0 shadow-2xl py-0">
                    <CardContent className="p-8 text-center">
                        <div className="flex justify-center items-center mb-6">
                            <div className="flex space-x-2">
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                    className="w-3 h-3 bg-brand-maroon rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                    className="w-3 h-3 bg-brand-logo rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                    className="w-3 h-3 bg-brand-yellow rounded-full"
                                />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-darkmaroon mb-4">Loading Stock Data</h3>
                        <p className="text-brand-graytext">Fetching the latest market information...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
            <BackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-20 pb-16">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                            SPRQ
                        </span>
                        <br />
                        <span className="text-brand-darkmaroon">
                            Stock Performance
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Track Sparq Systems' real-time stock performance with interactive charts
                        and comprehensive market data from the TSX Venture Exchange.
                    </motion.p>
                </motion.div>
            </section>

            {/* Chart Section */}
            <section className="relative bg-white">
                <div className="container mx-auto px-6 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Card className="overflow-hidden border-0 shadow-2xl py-0 mb-8">
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-r from-brand-maroon to-brand-logo p-6">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                                            <FaChartLine className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Interactive Stock Chart</h2>
                                            <div className="flex items-center gap-2 text-white/90">
                                                <FaClock className="w-4 h-4" />
                                                <span className="text-sm">Updates every 15 minutes during market hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white relative" style={{ height: '700px' }}>
                                    <ChartControls onSettingsChange={handleSettingsChange} />
                                    {data && data.values && (
                                        <StockChart data={data.values} symbol="SPRQ" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Additional Information */}
            <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                            Market Information
                        </h2>
                        <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                            Comprehensive market data and trading information for informed investment decisions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
                                <CardContent className="p-6 text-center h-full flex flex-col">
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
                                        <FaChartLine className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">TSX Venture Exchange</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">Trading on Canada's premier venture capital marketplace for emerging companies.</p>
                                    <a
                                        href="https://www.tsx.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200"
                                    >
                                        <span>Visit TSX</span>
                                        <FaExternalLinkAlt className="w-4 h-4" />
                                    </a>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
                                <CardContent className="p-6 text-center h-full flex flex-col">
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
                                        <FaInfoCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Symbol: SPRQ</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">Our ticker symbol on the TSX Venture Exchange for easy identification and trading.</p>
                                    <div className="text-2xl font-bold text-brand-maroon">SPRQ</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
                                <CardContent className="p-6 text-center h-full flex flex-col">
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
                                        <FaClock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Real-Time Data</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">Live market data updates every 15 minutes during trading hours for accurate tracking.</p>
                                    <div className="text-sm text-brand-graytext">
                                        <strong>Market Hours:</strong><br />
                                        9:30 AM - 4:00 PM EST
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Investment Opportunities
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Explore our investment highlights and connect with our investor relations team
                            to learn more about opportunities with Sparq Systems.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <a href="/investors">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Investor Overview
                                </motion.button>
                            </a>
                            <a href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Contact IR Team
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}