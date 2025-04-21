'use client'

import { SwiperSlide, Swiper } from "swiper/react"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Link from "next/link"
import Image from "next/image"

export default function Home() {
    return (
        <div className="relative h-screen overflow-x-hidden">
            <video className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                autoPlay
                loop
                muted
            >
                <source src="/vid.mp4" type="video/mp4" />
            </video>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl text-white text-center font-bold">
                    Welcome to Sparq
                </div>
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="max-w-screen text-white"
                >
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline ">
                                Introducing the Q2000: The most powerful microinverter in the industry!
                            </h2>
                            <p className='text-sm sm:text-2xl sm:pt-16 pt-4'>SPARQ is pleased to introduce the Quad 2000, the industry&apos;s most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, with no power clipping.</p>
                            <div className='sm:mt-8 mt-2'>
                                <Link href="https://www.youtube.com/watch?v=3LPu1w_Qj1I" className="text-blue-400 hover:underline text-md sm:text-2xl " target='_blank'>
                                    See Video
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline">
                                The most advanced Single Phase and Three Phase microinverter in the industry
                            </h2>
                            <p className='text-md sm:text-2xl sm:pt-16 pt-4'>See details and the comparison to Enphase&apos;s line of products below:</p>
                            <ul className="mt-4 space-y-2 sm:text-2xl">
                                <li>
                                    <Link href="#advanced" className="text-blue-400 hover:underline sm:text-2xl text-md">
                                        Read More
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" className='text-blue-400 hover:underline sm:text-2xl text-md' target='_blank'>
                                        Comparison with the IQ8H Single Phase
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" className='text-blue-400 hover:underline sm:text-2xl text-md' target='_blank'>
                                        Comparison with the IQ8H Three Phase
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="sm:px-64 px-0 sm:pt-8">
                            <h2 className="sm:text-3xl text-xl font-extrabold text-brand-yellow underline">Why Sparq?</h2>
                            <div className="flex flex-flex-row md:flex-row gap-4">
                                {/* First Column: Easy Install */}
                                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                                        <Image
                                            src="/1.png"
                                            alt="Easy Install"
                                            width={1080}
                                            height={1080}
                                            className="mb-4 object-contain w-full h-auto"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-3xl font-bold text-slate-200 mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                                        Easy Install
                                    </h3>
                                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                                    <p className="text-sm md:text-xl text-white">
                                        Save time and money with our 4 panel, 1 inverter technology
                                    </p>
                                </div>
                                {/* Second Column: High Power, Low Cost */}
                                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                                        <Image
                                            src="/2.png"
                                            alt="High Power, Low Cost"
                                            width={1080}
                                            height={1080}
                                            className="mb-4 object-contain w-full h-auto"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-3xl font-bold text-slate-200 mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                                        High Power, Low Cost
                                    </h3>
                                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                                    <p className="text-sm md:text-xl text-white">
                                        The highest power output for the lowest cost
                                    </p>
                                </div>
                                {/* Third Column: Industry Leader in Energy Solutions */}
                                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                                        <Image
                                            src="/3.png"
                                            alt="Industry Leader in Energy Solutions"
                                            width={1080}
                                            height={1080}
                                            className="mb-4 object-contain w-full h-auto"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-3xl font-bold text-slate-200 mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                                        Industry Leader in Energy Solutions
                                    </h3>
                                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                                    <p className="text-sm md:text-xl text-white">
                                        Reliable solar energy for a greener future
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

//bg-[url(/tmp.jpg)]