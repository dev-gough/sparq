'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianItem"
import VideoPlayer from "@/components/VideoPlayer"

export default function ProductPage() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="bg-white container mx-auto py-4 px-4 sm:px-10">
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
                        <div className="text-brand-gray text-lg">
                            <p className="mt-4">Effortlessly track real-time energy data, monitor system health, and explore historical performance trends right from your smartphone. Sparq Synq gives you complete visibility over your installations, helping you make informed decisions and stay up to date.</p>
                            <p className="mt-4">Designed with a sleek, intuitive interface, Sparq Synq brings clarity and confidence to solar system monitoring.</p>
                            <p className="font-bold text-black mt-4">Stay in sync with your solar future - with Sparq Synq</p>
                        </div>
                    )}

                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    <div className="p-4 sm:mt-16 text-black">
                        <AccordionItem title="Features" className="sticky top-[58px] sm:relative sm:top-auto">
                            <ul className="list-inside list-decimal text-brand-maroon">
                                <li className="mb-4"> <strong>Superior Value</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Low design/installation costs</li>
                                        <li>Lowest cost per Watt in the industry </li>
                                        <li>Electrolyte-free design for longer lifetime</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>High Energy Harvest</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Greater energy harvest compared to string inverters</li>
                                        <li>Advanced power electronics for low-light environments</li>
                                        <li>Independent maximum energy harvest for each module</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Best in-class reliability</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Smart-grid ready, works on any grid, anywhere</li>
                                        <li>No single point of failure</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Easy to Install</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Quad system design reduces the required number of conventional microinverters by a factor of 4</li>
                                        <li>&quot;All AC&quot; solution promotes safe installation and operation with low voltage</li>
                                        <li>Industry-standard Amphenol AC connectors, using Zigbee&apos;s open wireless communication protocol for individual node monitoring</li>
                                    </ul>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title="Watch the Demo">
                            <div className="w-full aspect-video">
                                <VideoPlayer src="/external-sparq-app.mp4" />
                            </div>
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