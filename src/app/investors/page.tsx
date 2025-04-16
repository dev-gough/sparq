'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Link from "next/link";
import { FaVideo } from "react-icons/fa";
import { useState } from 'react'

import NewsItems from "@/components/NewsItems";
import Slider from "@/components/Slider";

export default function InvestorPage() {

    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div className="container mx-auto py-16 px-10 flex flex-col">
            <section>
                <Slider>
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
                </Slider>
                <div
                    className="w-full h-32 bg-cover bg-center relative bg-gray-300 rounded-xl mt-8">
                    {/* Sliding Window Component */}
                    <div className="mt-8 px-6 w-full">
                        <Swiper
                            pagination={{ clickable: true }}
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={3}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            className='text-gray-500 h-32'
                        >
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-3xl">Best in-class Performance</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-4xl">Safety</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-4xl">Reliability</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-4xl">Innovation</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-4xl">Cost-Effectiveness</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-3xl">Quick and Easy Installation</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-3xl">Grid Resiliency</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-2xl">Advanced Cloud-Based Energy Monitoring</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-2xl">Real-time metrics, historical records and panel-by-panel info</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h1 className="text-2xl">Desktop and smartphone User and Installer App</h1>
                                    <button className="text-lg hover:underline hover:text-gray-700 cursor-pointer">More</button>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="items-center justify-center">
                <h1 className="text-center text-5xl font-light mt-32 mb-16">Recent News</h1>
                <NewsItems />
            </section>
            <section className="items-center justify-center">
                <h1 className="text-center text-5xl font-light mt-32 mb-16">Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">SPARQ Exhibits Its QUAD Microinverters at Intersolar India</h1>
                        </Link>
                        <p>Dr. Praveen Jain, the Company&apos;s Chief Executive Officer, commented, &quot;We are excited to walk the floors of one of the world&apos;s largest trade shows after a three year hiatus.  We are looking forward to meeting with our customers and suppliers to show off our latest microinverter products specifically designed for the Indian market&quot;.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                        </Link>
                    </div>
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #2</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                        </Link>
                    </div>
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #3</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                        </Link>
                    </div>
                </div>
            </section>
            <section id="4.iii)">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">Financials</h1>
                <ul className="list-disc list-inside">
                    <li className="font-mono">Investor Presentation</li>
                    <li className="font-mono">CEO letter to shareholders</li>
                    <li className="font-mono">Report?</li>
                    <li className="font-mono">ESG Report</li>
                </ul>
            </section>
        </div>
    )

    // bg-[url(/hero.webp)] bg-no-repeat bg-cover h-[800px]
}