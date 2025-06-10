'use client'

import { useTrackEvent } from '@/hooks/useTrackEvent'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

export type ListEntry = {
    heading: string
    items: Array<string | React.ReactNode>
}

interface ProductProps {
    models?: Array<string>
    selectedModel?: string | null
    setSelectedModel?: (m: string) => void
    model?: string   // e.g. Q2000, Quad3
    heading: string // e.g. Q2000 Microinverter or 
    animated?: boolean
    parent: string  // e.g. "quad2" or "sparqlinq"
    href: string    // url after /products/
    animatedList?: ListEntry[]  // header: items[]
    bodyContent?: React.ReactNode   // <p> content, if no <motion.li> list
    expandedContent?: React.ReactNode
    accordianContent: React.ReactNode
    imageContent: React.ReactNode   // this needs to be a node to account for double image for SparqSync
}

export default function ProductPage({
    models,
    selectedModel,
    setSelectedModel,
    model,
    heading,
    animated,
    parent,
    href,
    animatedList,
    bodyContent,
    expandedContent,
    accordianContent,
    imageContent
}: ProductProps) {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const trackEvent = useTrackEvent()

    const handleClick = () => {
        setIsExpanded(!isExpanded)
        if (isExpanded) return
        trackEvent("read_more", {
            "parent": parent.toLowerCase()
        })
    }

    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
    }

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-50px" })

    const getAccentColor = (index: number) => {
        const colors = [
            "bg-gradient-to-br from-brand-maroon to-brand-darkmaroon",
            "bg-gradient-to-br from-brand-midmaroon to-brand-logo",
            "bg-gradient-to-br from-brand-logo to-brand-yellow"
        ]
        return colors[index % colors.length]
    }

    const getIconForCategory = (heading: string) => {
        if (heading.toLowerCase().includes('performance')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
        if (heading.toLowerCase().includes('safe') || heading.toLowerCase().includes('reliable')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
        if (heading.toLowerCase().includes('cost')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            )
        }
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        )
    }

    return (
        <div className='bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 min-h-screen'>
            <div className='container mx-auto py-6 px-4 lg:px-8'>
                <div className='flex justify-left items-center mb-8 text-sm md:text-base text-brand-graytext'>
                    <Link href="/products" className='hover:underline px-2 transition-colors duration-200'>
                        Products
                    </Link>{" "}
                    <span className="mx-1">/</span>{" "}
                    <Link href={`/products/${href}`} className='hover:underline px-2 transition-colors duration-200'>{parent}</Link>
                </div>

                {/* main content */}
                <div className='flex flex-col-reverse lg:flex-row gap-12' ref={containerRef}>
                    <div className='flex-1'>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className='text-3xl sm:text-4xl md:text-5xl font-bold mb-8'
                        >
                            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                                {heading}
                            </span>
                        </motion.h1>

                        {animated && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className='space-y-6 mb-8'
                            >
                                {animatedList?.map(({ heading, items }, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                    >
                                        <Card
                                            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer py-0 max-w-xl"
                                            onClick={() => toggleExpanded(index)}
                                        >
                                            <CardContent className="p-0">
                                                <div className={`${getAccentColor(index)} p-6 text-white`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-shrink-0">
                                                            {getIconForCategory(heading)}
                                                        </div>
                                                        <h3 className="text-xl md:text-2xl font-bold flex-1">{heading}</h3>
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
                                                        <div className="grid gap-3">
                                                            {items.map((item, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={dropdownExpanded[index] ? { opacity: 1, x: 0 } : {}}
                                                                    transition={{
                                                                        delay: i * 0.1,
                                                                        duration: 0.4,
                                                                        ease: [0.23, 1, 0.320, 1]
                                                                    }}
                                                                    className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 hover:from-slate-100 hover:to-neutral-100 transition-all duration-200"
                                                                >
                                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
                                                                    <span className="text-brand-graytext font-medium leading-relaxed">{item}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {!animated && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className='text-lg md:text-xl text-brand-graytext leading-relaxed'
                            >
                                {bodyContent}
                            </motion.div>
                        )}

                        {expandedContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-base md:text-lg text-brand-graytext leading-relaxed"
                                    >
                                        {expandedContent}
                                    </motion.div>
                                )}
                                <motion.button
                                    onClick={handleClick}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='mt-6 px-6 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
                                >
                                    {isExpanded ? "Read less" : "Read more"}
                                </motion.button>
                            </motion.div>
                        )}

                        {models && models.length > 1 && model && setSelectedModel && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className='mt-8'
                            >
                                <p className='text-base md:text-lg font-semibold text-brand-darkmaroon mb-4'>Model: {model}</p>
                                <div className='flex flex-wrap gap-3'>
                                    {models.map((m) => (
                                        <motion.button
                                            key={m}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium cursor-pointer transition-all duration-500 ${m === selectedModel
                                                ? "bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white shadow-lg"
                                                : "bg-white text-brand-graytext border-2 border-brand-maroon/20 hover:border-brand-maroon/40 hover:shadow-md"
                                            }`}
                                            onClick={() => setSelectedModel(m)}
                                        >
                                            {m}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {accordianContent}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className='flex-1'
                    >
                        {imageContent}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}