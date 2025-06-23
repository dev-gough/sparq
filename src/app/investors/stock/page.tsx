'use client'

import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import StockChart, { RawBar } from "@/components/StockChart"
import ChartControls, { ChartSettings } from "@/components/ChartControls"
import ExchangeSelector, { exchanges } from "@/components/ExchangeSelector"
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
        interval: '1day',
        startDate: '2020-01-01 08:00:00',
        endDate: ''
    })

    const [selectedExchange, setSelectedExchange] = useState<string>('TSXV')

    const heroRef = useRef(null)

    const buildApiUrl = (settings: ChartSettings, exchange: string) => {
        const params = new URLSearchParams({
            interval: settings.interval,
            start_date: settings.startDate,
            exchange: exchange
        })

        if (settings.endDate) {
            params.append('end_date', settings.endDate)
        }

        return `/api/stockData?${params.toString()}`
    }

    const { data, error, isLoading } = useSWR(buildApiUrl(chartSettings, selectedExchange), fetcher, {
        refreshInterval: 15 * 60_000
    })

    const handleSettingsChange = (newSettings: ChartSettings) => {
        setChartSettings(newSettings)
    }

    const handleExchangeChange = (exchange: string) => {
        setSelectedExchange(exchange)
    }

    const currentExchangeData = exchanges.find(ex => ex.code === selectedExchange) || exchanges[0]

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
                        Track Sparq Systems&apos; real-time stock performance with interactive charts
                        and comprehensive market data from the {currentExchangeData.name}.
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
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                                                <FaChartLine className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">Interactive Stock Chart</h2>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <FaClock className="w-4 h-4" />
                                                    <span className="text-sm">Updates every 15 minutes during market hours</span>
                                                    <span className="text-sm">• {currentExchangeData.currency}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ExchangeSelector
                                            currentExchange={selectedExchange}
                                            onExchangeChange={handleExchangeChange}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white relative" style={{ height: '700px' }}>
                                    <ChartControls onSettingsChange={handleSettingsChange} />
                                    {data && data.values && (
                                        <StockChart data={data.values} symbol={currentExchangeData.symbol} />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Additional Information */}
            <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 py-10">
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
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">{currentExchangeData.name}</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">
                                        {currentExchangeData.code === 'TSXV' && "Trading on Canada's premier venture capital marketplace for emerging companies."}
                                        {currentExchangeData.code === 'FSX' && "Trading on Germany's leading stock exchange, providing European market access."}
                                        {currentExchangeData.code === 'NEO' && "Trading on Canada's innovative exchange designed for modern capital markets."}
                                        {currentExchangeData.code === 'OTC' && "Trading on the US over-the-counter markets for international securities access."}
                                    </p>
                                    <a
                                        href={
                                            currentExchangeData.code === 'TSXV' ? "https://www.tsx.com" :
                                                currentExchangeData.code === 'FSX' ? "https://www.deutsche-boerse.com" :
                                                    currentExchangeData.code === 'NEO' ? "https://www.neo.inc" :
                                                        "https://www.otcmarkets.com"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200"
                                    >
                                        <span>Visit Exchange</span>
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
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Symbol: {currentExchangeData.symbol}</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">Our ticker symbol on the {currentExchangeData.name} for easy identification and trading.</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="text-2xl font-bold text-brand-maroon">{currentExchangeData.symbol}</div>
                                        <div className="text-sm text-brand-graytext bg-gray-100 px-2 py-1 rounded">
                                            {currentExchangeData.currency}
                                        </div>
                                    </div>
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
                                    <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Market Information</h3>
                                    <p className="text-brand-graytext flex-grow mb-6">Live market data updates every 15 minutes during trading hours for accurate tracking.</p>
                                    <div className="text-sm text-brand-graytext">
                                        <strong>Trading Hours:</strong><br />
                                        {currentExchangeData.code === 'TSXV' && "9:30 AM - 4:00 PM EST"}
                                        {currentExchangeData.code === 'FSX' && "9:00 AM - 5:30 PM CET"}
                                        {currentExchangeData.code === 'NEO' && "9:30 AM - 4:00 PM EST"}
                                        {currentExchangeData.code === 'OTC' && "9:30 AM - 4:00 PM EST"}
                                        <br />
                                        <strong>Country:</strong> {currentExchangeData.country}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
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