'use client'

import { SwiperRef, SwiperSlide } from 'swiper/react'
import Link from "next/link"
import { useState, useRef } from 'react'

import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import PartnerLogoCarousel from '@/components/PartnerSlider'

import { MdOutlineReplay } from 'react-icons/md'

const partners = [
    { src: "/logo.png", alt: "logo1" },
    { src: "/Logos/epower.jpeg", alt: "QueensU Epower Lab" },
    { src: "/Logos/jiothings.jpeg", alt: "JioThings" },
    { src: "/Logos/reliance.png", alt: "Reliance" },
    { src: "/Logos/iljin.png", alt: "ILJIN" },
    { src: "/Logos/queens.jpg", alt: "QueensU" },
    { src: "/Logos/stlawrence.png", alt: "St. Lawrence College" },
    { src: "/Logos/modernniagara.jpg", alt: "logo1" }
]

export default function Test() {

    const [expanded, setExpanded] = useState<boolean>(false)
    const [isVidEnded, setIsVidEnded] = useState<boolean>(false)
    const vidRef = useRef<HTMLVideoElement>(null)
    const swiperRef = useRef<SwiperRef>(null)

    const handleReplay = () => {
        if (vidRef.current) {
            vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidEnded(false)
        }
    }

    const handleEnded = () => {
        setIsVidEnded(true)
        swiperRef.current?.swiper.autoplay.start()
    }

    return (
        <div>
            <div className="relative h-[calc(100vh-66px)] overflow-x-hidden">
                {isVidEnded && (
                    <MdOutlineReplay
                        onClick={handleReplay}
                        className='absolute top-4 right-4 text-white text-4xl cursor-pointer z-10' />

                )}
                <video
                    className="absolute top-0 left-0 w-full h-full object-contain bg-black sm:object-cover z-[-1]"
                    ref={vidRef}
                    autoPlay
                    muted
                    onEnded={handleEnded}
                >
                    <source src="/tsxv-desktop.mp4" type="video/mp4" />
                </video>
                <div className="flex flex-col items-center justify-center h-full transition-transform duration-200">
                    {isVidEnded && (
                        <div className="flex flex-row space-x-10 pt-8 mt-140">
                            <Link onClick={() => swiperRef.current?.swiper.slideTo(0, 0)} href="#highlights" className="bg-transparent border-white text-white hover:bg-gray-400 hover:text-white cursor-pointer font-black  text-xl py-3 px-5 border-3  rounded-4xl  transition-colors">Investor Highlights</Link>
                            <button className="bg-transparent border-white text-white hover:bg-gray-400 cursor-pointer font-black  text-xl py-3 px-5 border-3  rounded-4xl  transition-colors">Watch Presentation</button>
                        </div>
                    )}
                </div>
            </div>
            <div id="highlights" className="sm:h-[calc(100vh-67px)] mx-auto pb-8 scroll-mt-[67px]">
                <div
                    className="w-full sm:h-[calc(100vh-67px)] bg-cover bg-center sm:bg-top relative bg-[url(/thumbnail_image.png)]">
                    <div className="px-6 max-w-full">
                        <Swiper
                            ref={swiperRef}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 20000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            className='text-white sm:h-[calc(100vh-67px)] h-90 [--swiper-pagination-bullet-size:15px] sm:[--swiper-pagination-bullet-size:30px] sm:[--swiper-navigation-size:70px] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:#8C344E] [--swiper-pagination-bullet-inactive-color:#fcb900]'
                            onSlideChange={() => setExpanded(false)}
                        >
                            <SwiperSlide>
                                <div className='px-0 sm:px-40 sm:pt-8 flex flex-col h-full justify-between'>
                                    <div>
                                        <div>
                                            <h2 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Global Strategic Partnerships for R&D, Manufacturing and Distribution</h2>
                                            <ul className="list-disc list-inside text-lg sm:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-blue-400 hover:underline">ePower</Link></li>
                                                <li><Link href="https://www.jiothings.com/" target="_blank" className="text-blue-400 hover:underline">JioThings</Link></li>
                                                <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-blue-400 hover:underline">Reliance</Link></li>
                                                <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-blue-400 hover:underline">ILJIN Electronics</Link></li>
                                            </ul>
                                        </div>
                                        <div className='mt-16'>
                                            <h1 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Multiple Strategic Test Sites for R&D with Leading Institutions and C&I Sites</h1>
                                            <ul className="list-disc list-inside text-lg sm:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                <li><Link href="https://www.investkingston.ca/rd/#1643990910571-444406ce-b63e" target='_blank' className='text-blue-400 hover:underline'>Queen&apos;s University</Link></li>
                                                <li><Link href="https://www.energy-manager.ca/st-lawrence-college-installs-largest-solar-system-for-post-secondary-facility-856/" target='_blank' className='text-blue-400 hover:underline'>St. Lawrence College</Link></li>
                                                <li>Modern Niagara - Sparq Headquarter Office (WIP)</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='my-16 rounded-xl bg-gray-300'>
                                        <h1 className='text-3xl font-bold text-center text-black'>Our Partners</h1>
                                        <PartnerLogoCarousel logos={partners} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='px-0 sm:px-40 sm:pt-8'>
                                    <h2 className="text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow">
                                        SPARQ Recieves Purchase Order for Additional 20MW Worth of Microinverters
                                    </h2>
                                    <button className={`sm:text-2xl text-lg text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                                    {expanded && (
                                        <div>
                                            <p className='text-md sm:text-2xl pt-4'>SPARQ is pleased to announce that on August 27, 2024 the Company received a purchase order for supplying 10,000 Q2000 Quad Microinverters for the Indian market. This order is in addition to the order for 6,000 Q2000 Quad Microinverters announced in June 2024.</p>
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
                                <div className='px-0 sm:px-40 sm:pt-8'>
                                    <h2 className="text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow">
                                        SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies
                                    </h2>
                                    <button className={`sm:text-2xl text-lg text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                                    {expanded && (
                                        <div>
                                            <p className='text-md sm:text-2xl pt-4'>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
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
                                <div className='px-0 sm:px-40 sm:pt-8'>
                                    <h2 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow'>SPARQ Receives 12 MW Worth of Purchase Orders</h2>
                                    <button className={`sm:text-2xl text-lg text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                                    {expanded && (
                                        <div>
                                            <p className='text-md sm:text-2xl pt-4'>Sparq is pleased to announce that on June 26, 2024 the Company received purchase orders for supplying over six-thousand Q2000 Quad Microinverters for the Indian market. </p>
                                            <p className='text-md sm:text-2xl pt-4'>&quot;It is a major step forward for the Company to enter into the Indian PV market,&quot; commented Dr. Praveen Jain, Chief Executive Officer of SPARQ.</p>
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
                                <div className='px-0 sm:px-40 sm:pt-8'>
                                    <h2 className='text-lg sm:text-3xl font-extrabold border-b-2 border-brand-yellow'>Sparq Systems CEO Interview - Dr. Praveen Jain</h2>
                                    <button className={`text-lg sm:text-2xl text-blue-400 cursor-pointer mt-8 ${expanded ? "hidden" : ""}`} onClick={() => setExpanded(true)}>Show Details</button>
                                    {expanded && (
                                        <div>
                                            <p className='text-md sm:text-2xl pt-4'>In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters.</p>
                                            <ul className='mt-4 space-y-2'>
                                                <li>
                                                    <Link className='text-blue-400 hover:underline text-xl sm:text-2xl' href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target='_blank'>Watch Here</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-2">
                <div className="bg-gray-100 rounded-lg py-6 px-2 sm:p-6 text-center">
                    <h1 className="text-2xl font-bold">Best in-class Performance</h1>
                    <ul className='flex flex-col list-inside list-disc items-start sm:text-lg text-slate-700 mt-2'>
                        <li>Highest specific power/power density</li>
                        <li>Grid Resilience with Dual Mode operation</li>
                        <li>Maximum Energy Harvesting</li>
                        <li>Remote Monitoring and software updates</li>
                    </ul>
                </div>
                <div className="bg-gray-100 rounded-lg py-6 px-2 sm:p-6 text-center">
                    <h1 className="text-2xl font-bold">Safety & Reliability</h1>
                    <ul className='flex flex-col list-inside list-disc items-start sm:text-lg text-slate-700 mt-2'>
                        <li>No PV System Single Point of Failure</li>
                        <li>No Electrolytic Capacitor</li>
                        <li>Safe and Highly Reliable</li>
                        <li>Best in-class Longevity</li>
                    </ul>
                </div>
                <div className="bg-gray-100 rounded-lg py-6 px-2 sm:p-6 text-center">
                    <h1 className="text-2xl font-bold">Cost-Effectiveness</h1>
                    <ul className='flex flex-col list-inside list-disc items-start sm:text-lg text-slate-700 mt-2'>
                        <li>Reduced manufacturing BOM</li>
                        <li>Reduced Balance of System</li>
                        <li>Easy to Install & Maintain</li>
                        <li>Outlier on Performance-Cost Curve</li>
                    </ul>
                </div>
            </div> */}
            </div>
        </div>
    )
}