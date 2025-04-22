'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import Link from "next/link"
import { useState } from 'react'

import Slider from "@/components/Slider"

export default function InvestorPage() {

    const [expanded, setExpanded] = useState<boolean>(false)
    const [showingMore, setShowingMore] = useState<boolean>(false)

    return (
        <div className="container mx-auto sm:px-4 pb-8">
            <Slider pause={true}>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline">
                            SPARQ systems is in a good position to deliver on growth plans
                        </h2>
                        <p className='text-sm sm:text-2xl pt-4'>The good news is that in our view SPARQ Systems&apos; cash burn situation gives shareholders real reason for optimism. Not only was its cash runway quite good, but its cash burn relative to its market cap was a real positive. </p>
                        <ul className="mt-4">
                            <li>
                                <Link href="https://ca.finance.yahoo.com/news/sparq-systems-cve-sprq-good-115233702.html" className="text-blue-400 hover:underline text-xl sm:text-2xl" target='_blank'>
                                    Read More
                                </Link>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline">
                            SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies
                        </h2>
                        <p className='text-sm sm:text-2xl sm:pt-10 pt-4'>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" className="text-blue-400 hover:underline text-xl sm:text-2xl" target='_blank'>
                                    Read More
                                </Link>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-3xl font-extrabold text-brand-yellow underline'>Sparq Systems CEO Interview - Dr. Praveen Jain</h2>
                        <p className='text-sm sm:text-2xl sm:pt-10 pt-4'>In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters.</p>
                        <ul className='mt-4 space-y-2'>
                            <li>
                                <Link className='text-blue-400 hover:underline text-xl sm:text-2xl' href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target='_blank'>Watch Here</Link>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-3xl font-extrabold text-brand-yellow underline'>Our Key Partners</h2>
                        <ul className="list-disc list-inside text-lg sm:text-2xl">
                            <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-blue-400">ePower</Link></li>
                            <li><Link href="https://www.jiothings.com/" target="_blank" className="text-blue-400">JioThings</Link></li>
                            <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-blue-400">Reliance</Link></li>
                            <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-blue-400">ILJIN Electronics</Link></li>
                        </ul>
                        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 hover:underline mt-2 inline-block cursor-pointer text-lg sm:text-2xl">
                            {expanded ? "See less" : "View our Test Sites"}
                        </button>
                        {expanded && (
                            <div>
                                <ul className="list-disc list-inside text-lg">
                                    <li>Queen&apos;s University</li>
                                    <li>St. Lawrence College</li>
                                    <li>Modern Niagara (WIP)</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            </Slider>
            <div
                className="h-40 relative sm:px-0 px-4 mt-8 items-center">
                {/* Sliding Window Component */}
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 7500,
                        disableOnInteraction: false,
                    }}
                    className='text-gray-500 bg-slate-200 rounded-xl h-40 w-2/3'

                    onSlideChangeTransitionStart={() => setShowingMore(false)}
                >
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className={`text-3xl ${showingMore ? "hidden" : ""}`}>Best in-class Performance</h1>
                            <button className={`text-lg hover:underline hover:text-gray-700 cursor-pointer ${showingMore ? "hidden" : ""}`} onClick={() => setShowingMore(true)}>More</button>
                            {showingMore && (
                                <div>
                                    <ul className='flex flex-col list-inside list-disc items-start text-2xl text-slate-700'>
                                        <li>Highest specific power and power density</li>
                                        <li>Grid Resilience with Dual Mode operation</li>
                                        <li>Maximum Energy Harvesting</li>
                                        <li>Remote Monitoring and software updates</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className={`text-3xl ${showingMore ? "hidden" : ""}`}>Safety & Reliability</h1>
                            <button className={`text-lg hover:underline hover:text-gray-700 cursor-pointer ${showingMore ? "hidden" : ""}`} onClick={() => setShowingMore(true)}>More</button>
                            {showingMore && (
                                <div>
                                    <ul className='flex flex-col list-inside list-disc items-start text-2xl text-slate-700'>
                                        <li>No PV System Single Point of Failure</li>
                                        <li>No Electrolytic Capacitor</li>
                                        <li>Safe and Highly Reliable</li>
                                        <li>Best in-class Longevity</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className={`text-3xl ${showingMore ? "hidden" : ""}`}>Innovation</h1>
                            <button className={`text-lg hover:underline hover:text-gray-700 cursor-pointer ${showingMore ? "hidden" : ""}`} onClick={() => setShowingMore(true)}>More</button>
                            {showingMore && (
                                <div>
                                    <h2 className='text-3xl font-bold text-black'>85+ Patents and Counting...</h2>
                                    <ul className='flex flex-col list-inside list-disc items-start text-2xl text-slate-700'>
                                        <li>65 Granted</li>
                                        <li>10 Pending</li>
                                        <li>12 Under Preparation</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className={`text-3xl ${showingMore ? "hidden" : ""}`}>Cost-Effectiveness</h1>
                            <button className={`text-lg hover:underline hover:text-gray-700 cursor-pointer ${showingMore ? "hidden" : ""}`} onClick={() => setShowingMore(true)}>More</button>
                            {showingMore && (
                                <div>
                                    <ul className='flex flex-col list-inside list-disc items-start text-2xl text-slate-700'>
                                        <li>Reduced manufacturing BOM</li>
                                        <li>Reduced Balance of System</li>
                                        <li>Easy to Install & Maintain</li>
                                        <li>Outlier on Performance-Cost Curve</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className={`text-3xl ${showingMore ? "hidden" : ""}`}>Advanced Cloud-Based Energy Monitoring</h1>
                            <button className={`text-lg hover:underline hover:text-gray-700 cursor-pointer ${showingMore ? "hidden" : ""}`} onClick={() => setShowingMore(true)}>More</button>
                            {showingMore && (
                                <div>
                                    <ul className='flex flex-col list-inside list-disc items-start text-2xl text-slate-700'>
                                        <li>Real-time Metrics</li>
                                        <li>Historical Records</li>
                                        <li>Panel-by-Panel information</li>
                                        <li><Link href="/products/sparqvu" className='text-blue-400 hover:underline cursor-pointer'>Learn More</Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )

    // bg-[url(/hero.webp)] bg-no-repeat bg-cover h-[800px]
}