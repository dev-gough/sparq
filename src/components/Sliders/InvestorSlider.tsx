'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { useState } from 'react'

import StockInfo from '@/components/StockInfo'
import Link from 'next/link'

export default function InvestorSlider() {

    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div
            className="w-full h-128 bg-cover bg-center relative bg-[url(/tmp.jpg)]">
            {/* Heading Section */}
            <div className="flex justify-between items-center p-6">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    Investor Relations
                </h1>
                <div className="text-white text-right">
                    <p className="text-2xl font-semibold text-brand-yellow">Sparq Systems</p>
                    <p className="text-sm">THE FUTURE IS BRIGHTER WITH SPARQ BREAKTHROUGH PRODUCTS</p>
                </div>
            </div>
            {/* Sliding Window Component */}
            <div className="mt-8 px-6 max-w-4/5">
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onSlideChange={() => setExpanded(false)}
                    className='text-white h-96'
                >
                    <SwiperSlide>
                        <div>
                            <h2 className="text-3xl font-bold capitalize mb-2">
                                SPARQ systems is in a good position to deliver on growth plans
                            </h2>
                            <p className='text-2xl'>Even when a business is losing money, it&apos;s possible for shareholders to make money if they buy a good business at the right price. Indeed, SPARQ Systems stock is up 159% in the last year, providing strong gains for shareholders. </p>
                            <p className='text-2xl'>The good news is that in our view SPARQ Systems&apos; cash burn situation gives shareholders real reason for optimism. Not only was its cash runway quite good, but its cash burn relative to its market cap was a real positive. </p>
                            <ul className="mt-4">
                                <li>
                                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-cve-sprq-good-115233702.html" className="text-blue-400 hover:underline text-2xl" target='_blank'>
                                        Read More
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies
                            </h2>
                            <p className='text-2xl mb-2'>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
                            <p className='text-2xl'>Dr. Praveen Jain, Chief Executive Officer of the Company, commented: &quot;Being named to the TSX Venture 50 is an incredible honor and a reflection of our company&apos;s momentum. Our share price appreciation and market cap growth underscore the strength of our strategy, execution, and confidence of our investors. We remain committed to driving innovation, delivering long term value, and building on this success.&quot;</p>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" className="text-blue-400 hover:underline text-2xl" target='_blank'>
                                        Read More
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-3xl font-bold mb-2'>Sparq Systems CEO Interview - Dr. Praveen Jain</h2>
                            <p className='text-2xl mb-2'>In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters. They discuss Dr. Jain&apos;s journey as a brilliant Canadian inventor, the innovative Quad Micro Inverter that optimizes four PV modules, and how Sparq&apos;s hardware-software integration offers a cost-effective, efficient alternative to competitors like Enphase. The conversation explores Sparq&apos;s global footprint, strategic advantages in markets like India, and partnerships, including with Jio and Reliance, while highlighting the company&apos;s role in advancing renewable energy conversion worldwide.</p>
                            <Link className='text-blue-400 hover:underline text-2xl' href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target='_blank'>Watch Here</Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-3xl font-bold mb-2'>Our Key Partners</h2>
                            <ul className="list-disc list-inside text-2xl">
                                <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-blue-400">ePower</Link></li>
                                <li><Link href="https://www.jiothings.com/" target="_blank" className="text-blue-400">JioThings</Link></li>
                                <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-blue-400">Reliance</Link></li>
                                <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-blue-400">ILJIN Electronics</Link></li>
                            </ul>
                            <button onClick={() => setExpanded(!expanded)} className="text-blue-400 hover:underline mt-2 inline-block cursor-pointer text-2xl">
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
                </Swiper>
            </div>
            <StockInfo/>
        </div>
    );
};
