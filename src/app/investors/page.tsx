'use client'

import { SwiperSlide } from 'swiper/react'
import Link from "next/link"
import { useState } from 'react'

import Slider from "@/components/Slider"

export default function InvestorPage() {

    const [expanded, setExpanded] = useState<boolean>(false)

    const changeSlide = () => {
        setExpanded(false)
    }

    return (
        <div className="container mx-auto sm:px-4 pb-8">
            <Slider pause={true} onSlide={changeSlide}>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow mb-2'>Global Strategic Partnerships for R&D, Manufacturing and Distribution</h2>
                        <ul className="list-disc list-inside text-lg sm:text-2xl">
                            <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-blue-400 hover:underline">ePower</Link></li>
                            <li><Link href="https://www.jiothings.com/" target="_blank" className="text-blue-400 hover:underline">JioThings</Link></li>
                            <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-blue-400 hover:underline">Reliance</Link></li>
                            <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-blue-400 hover:underline">ILJIN Electronics</Link></li>
                        </ul>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h1 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow mb-2'>Multiple Strategic Test Sites for R&D with Leading Institutions and C&I Sites</h1>
                        <ul className="list-disc list-inside text-2xl">
                            <li><Link href="https://www.investkingston.ca/rd/#1643990910571-444406ce-b63e" target='_blank' className='text-blue-400 hover:underline'>Queen&apos;s University</Link></li>
                            <li><Link href="https://www.energy-manager.ca/st-lawrence-college-installs-largest-solar-system-for-post-secondary-facility-856/" target='_blank' className='text-blue-400 hover:underline'>St. Lawrence College</Link></li>
                            <li>Modern Niagara - Sparq Headquarter Office (WIP)</li>
                        </ul>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className="text-lg sm:text-3xl font-extrabold underline h-[72px]">
                            SPARQ Recieves Purchase Order for Additional 20MW Worth of Microinverters
                        </h2>
                        <button className={`text-2xl text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                        {expanded && (
                            <div>
                                <p className='text-sm sm:text-2xl pt-4'>SPARQ is pleased to announce that on August 27, 2024 the Company received a purchase order for supplying 10,000 Q2000 Quad Microinverters for the Indian market. This order is in addition to the order for 6,000 Q2000 Quad Microinverters announced in June 2024.</p>
                                <ul className="mt-4">
                                    <li>
                                        <Link href="https://finance.yahoo.com/news/sparq-receives-purchase-order-additional-211000433.html" className="text-blue-400 hover:underline text-xl sm:text-2xl" target='_blank'>
                                            Read More
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className="text-lg sm:text-3xl font-extrabold underline h-[72px]">
                            SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies
                        </h2>
                        <button className={`text-2xl text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                        {expanded && (
                            <div>
                                <p className='text-sm sm:text-2xl pt-4'>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" className="text-blue-400 hover:underline text-xl sm:text-2xl" target='_blank'>
                                            Read More
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-3xl font-extrabold underline'>SPARQ Receives 12 MW Worth of Purchase Orders</h2>
                        <button className={`text-2xl text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                        {expanded && (
                            <div>
                                <p className='text-sm sm:text-2xl pt-4'>is pleased to announce that on June 26, 2024 the Company received purchase orders for supplying over six-thousand Q2000 Quad Microinverters for the Indian market. </p>
                                <p>&quot;It is a major step forward for the Company to enter into the Indian PV market,&quot; commented Dr. Praveen Jain, Chief Executive Officer of SPARQ.</p>
                                <ul className='mt-4 space-y-2'>
                                    <li>
                                        <Link className='text-blue-400 hover:underline text-xl sm:text-2xl' href="https://finance.yahoo.com/news/sparq-receives-12-mw-worth-112000213.html" target='_blank'>Read More</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-3xl font-extrabold underline'>Sparq Systems CEO Interview - Dr. Praveen Jain</h2>
                        <button className={`text-2xl text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                        {expanded && (
                            <div>
                                <p className='text-sm sm:text-2xl pt-4'>In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters.</p>
                                <ul className='mt-4 space-y-2'>
                                    <li>
                                        <Link className='text-blue-400 hover:underline text-xl sm:text-2xl' href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target='_blank'>Watch Here</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            </Slider>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h1 className="text-2xl font-bold">Best in-class Performance</h1>
                    <ul className='flex flex-col list-inside list-disc items-start text-lg text-slate-700 mt-2'>
                        <li>Highest specific power and power density</li>
                        <li>Grid Resilience with Dual Mode operation</li>
                        <li>Maximum Energy Harvesting</li>
                        <li>Remote Monitoring and software updates</li>
                    </ul>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h1 className="text-2xl font-bold">Safety & Reliability</h1>
                    <ul className='flex flex-col list-inside list-disc items-start text-lg text-slate-700 mt-2'>
                        <li>No PV System Single Point of Failure</li>
                        <li>No Electrolytic Capacitor</li>
                        <li>Safe and Highly Reliable</li>
                        <li>Best in-class Longevity</li>
                    </ul>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h1 className="text-2xl font-bold">Cost-Effectiveness</h1>
                    <ul className='flex flex-col list-inside list-disc items-start text-lg text-slate-700 mt-2'>
                        <li>Reduced manufacturing BOM</li>
                        <li>Reduced Balance of System</li>
                        <li>Easy to Install & Maintain</li>
                        <li>Outlier on Performance-Cost Curve</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}