'use client'

import { useTrackEvent } from '@/hooks/useTrackEvent'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from "motion/react"

export type ListEntry = {
    heading: string
    items: Array<string | React.ReactNode>
}

interface ProductProps {
    models?: Array<string>
    selectedModel?: string | null
    setSelectedModel?: (m: string) => void
    model?: string   // e.g. Q2000, Quad 3
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

    return (
        <div className='bg-white container mx-auto py-4 px-4 2xl:px-16'>
            <div className='flex justify-left items-center mb-6 text-sm sm:text-base md:text-lg xl:text-xl text-brand-gray'>
                <Link href="/products" className='hover:underline px-2'>
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href={`/products/${href}`} className='hover:underline px-2'>{parent}</Link>
            </div>

            {/* main content */}
            <div className='flex flex-col-reverse lg:flex-row gap-8'>
                <div className='flex-1'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[44px] xl:text-6xl font-black text-gray-900 mt-1'>{heading}</h1>
                    {animated && (
                        <ul className='space-y-4 list-disc list-inside text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl mt-4 font-bold'>
                            {animatedList?.map(({ heading, items }, index) => (
                                <li key={index * 10}>
                                    <span
                                        className='hover:underline cursor-pointer text-brand-maroon'
                                        onClick={() => toggleExpanded(index)}>{heading}</span>
                                    {dropdownExpanded[index] && (
                                        <ol className='ps-5 mt-2 space-y-1 list-disc list-inside text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-normal'>
                                            {items.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: 0.5,
                                                        duration: 0.5,
                                                        ease: "easeOut"
                                                    }}>{item}
                                                </motion.li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {!animated && (
                        <div className='text-xl sm:text-2xl 2xl:text-3xl'>
                            {bodyContent}
                        </div>
                    )}
                    {expandedContent && (
                        <div>
                            {isExpanded && (
                                <div className="text-xl xl:text-2xl">
                                    {expandedContent}
                                </div>
                            )}
                            <button onClick={handleClick} className='text-blue-600 hover:underline mt-2 inline-block cursor-pointer sm:text-lg 2xl:text-xl'>
                                {isExpanded ? "Read less" : "Read more"}
                            </button>
                        </div>
                    )}

                    {models && models.length > 1 && model && setSelectedModel && (
                        <div className='mt-6'>
                            <p className='md:text-lg lg:text-base xl:text-lg 2xl:text-xl font-medium text-brand-gray'>Model: {model}</p>
                            <div className='flex flex-wrap gap-2 mt-2 '>
                                {models.map((m) => (
                                    <button
                                        key={m}
                                        className={`px-4 py-2 border rounded-md text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl cursor-pointer ${m === selectedModel
                                            ? "border-blue-600 text-blue-600"
                                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                                            }`}
                                        onClick={() => setSelectedModel(m)}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        {accordianContent}
                    </div>
                </div>
                <div className='flex-1'>
                    {imageContent}
                </div>
            </div>
        </div>
    )
}