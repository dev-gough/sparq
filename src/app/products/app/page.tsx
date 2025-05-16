'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianItem"
import VideoPlayer from "@/components/VideoPlayer"
import FAQs from "./faqs.json"
import { useTrackEvent } from "@/hooks/useTrackEvent"

export default function ProductPage() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const trackEvent = useTrackEvent()

    const handleClick = () => {
        setIsExpanded(!isExpanded)
        if (isExpanded) return // useState is async, so this checks old value
        trackEvent("read_more", {
            "parent": "app"
        })
    }

    return (
        <div className="bg-white container mx-auto py-4 px-4 sm:px-0">
            {/* Navigation Links */}
            <div className="flex justify-left items-center mb-6 text-sm text-brand-gray">
                <Link href="/products" className="hover:underline px-2">
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href="/products/app" className="hover:underline px-2">
                    Sparq Sync
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1 text-brand-gray">
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Sparq Sync Mobile App</h1>
                    <p className="text-xl mt-4">Now unveiling Sparq Synq, the all-new mobile monitoring solution designed exclusively for Sparq customers. With Sparq Synq, staying connected to your solar energy system has never been easier - or more powerful.</p>
                    <p className="font-bold mt-4 text-xl text-black">Coming to iOS and Android in May 2025.</p>
                    {isExpanded && (
                        <div className="text-brand-gray text-xl">
                            <p className="mt-4">Effortlessly track real-time energy data, monitor system health, and explore historical performance trends right from your smartphone. Sparq Synq gives you complete visibility over your installations, helping you make informed decisions and stay up to date.</p>
                            <p className="mt-4">Designed with a sleek, intuitive interface, Sparq Synq brings clarity and confidence to solar system monitoring.</p>
                            <p className="font-bold text-black mt-4">Stay in sync with your solar future - with Sparq Synq</p>
                        </div>
                    )}

                    <button onClick={handleClick} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    <div className="p-4 sm:mt-16 text-black">
                        <AccordionItem title="Features" className="sticky top-[58px] sm:relative sm:top-auto" parent="app">
                            <ul className="list-inside list-decimal text-brand-maroon">
                                <li className="mb-4"> <strong>Real-time insights</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Track energy data, grid voltage, and energy totals</li>
                                        <li>Alerts for system faults, inverter health, and more</li>
                                        <li>On-site current and future weather</li>
                                        <li className="font-bold">Per-inverter details:</li>
                                        <li>Power, Voltage, and Energy</li>
                                        <li>Temperature, lifetime energy, and VAr-Hours</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Control in the palm of your hand</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>View/Manage Ground Faults (GFDI)</li>
                                        <li>Set up new projects as they are built</li>
                                    </ul>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title="Watch the Demo" parent="app">
                            <div className="w-full aspect-video">
                                <VideoPlayer src="/external-sparq-app.mp4" />
                            </div>
                        </AccordionItem>
                        <AccordionItem title="SparqSync FAQs" parent="app">
                            {FAQs.subQuestions.map((item) => (
                                <div key={item.id} className="text-gray-700 my-4">
                                <strong className="text-brand-maroon">{item.question}</strong><br></br>{" "}
                                {item.answer}
                            </div>
                            ))}
                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-center gap-4">
                        <div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
                            <Image
                                src="/app1.jpg"
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                                priority
                            />
                        </div>
                        <div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
                            <Image
                                src="/app2.jpg"
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};