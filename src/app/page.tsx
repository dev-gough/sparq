'use client'

import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/Slider";
import { SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

export default function Home() {

    const [expanded, setExpanded] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="container mx-auto sm:py-8 sm:px-4 pb-8">
                {/* Home Slider */}
                <Slider>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline">
                                Introducing the Q2000: The most powerful microinverter in the industry!
                            </h2>
                            <p className='text-sm sm:text-2xl sm:pt-16 pt-4'>SPARQ is pleased to introduce the Quad 2000, the industry&apos;s most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, without any power clipping.</p>
                            <div className='sm:mt-8 mt-2'>
                                <Link href="https://www.youtube.com/watch?v=3LPu1w_Qj1I" className="text-blue-400 hover:underline text-md sm:text-2xl " target='_blank'>
                                    See Video
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow border-b-brand-yellow sm:border-b-4 border-b-2">
                                The most advanced Single Phase and Three Phase microinverter in the industry
                            </h2>
                            <p className='text-md sm:text-2xl sm:pt-16 pt-4'>See details and the comparison to Enphase&apos;s line of products below:</p>
                            <ul className="mt-4 space-y-2 sm:text-2xl">
                                <li>
                                    <Link href="#advanced" className="text-blue-400 hover:underline sm:text-xl text-md">
                                        Read More
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" className='text-blue-400 hover:underline sm:text-xl text-md' target='_blank'>
                                        Comparison vs. the IQ8H product line
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
                                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
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
                                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
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
                                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                                        Industry Leader {!isMobile? "in Energy Solutions" : ""}
                                    </h3>
                                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                                    <p className="text-sm md:text-xl text-white">
                                        Reliable solar energy for a greener future
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Slider>
                {/* Product Info */}
                <section id="advanced" className="bg-white pt-20 px-4">
                    <h1 className="text-3xl font-bold text-brand-maroon">
                        Your cost-effective, reliable solar energy system.
                    </h1>
                    <p className="text-md text-black mt-2">
                        We&apos;re changing the industry standard for solar energy solutions with powerful power conversion that&apos;s smart-grid ready and the lowest cost per watt in the industry.
                    </p>
                    <p className='text-md pt-4'>The Sparq Systems Q2000 product family of single and three phase microinverters not only resolve the longstanding safety, partial shading, low reliability problems and high cost of String Photovoltaic-Systems but also further advance state of the art of the single channel microinverter industry leader by eliminating the low reliability electrolytic capacitors and integrating four independently controlled DC-DC channels in one enclosure resulting in best in class reliability, highest weight and power density and lowest life-cycle cost.</p>

                    {/* First Subheading and Paragraph */}
                    <h2 className="text-2xl font-bold text-brand-maroon sm:mt-6 sm:pt-0 pt-16">
                        Be part of a greener future.
                    </h2>
                    <p className="text-black mt-2">
                        Backed by advanced research, our microinverter systems are designed with cutting-edge technology for reliable energy solutions that are easy to install and offer more energy harvest compared to traditional string inverters. Save money and contribute to a lower carbon future.
                    </p>

                    {/* Second Subheading and Paragraph */}
                    <h2 id="q2000features" className="text-2xl font-bold text-brand-maroon sm:mt-6 sm:pt-0 pt-16">
                        4 panels - 1 inverter.
                    </h2>
                    <p className="text-black mt-2">
                        Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you&apos;ll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.
                    </p>

                    {/* Bullet Point List in Two Columns */}
                    <div className="grid grid-cols-2 gap-4 mt-6 px-4 justify-between">
                        <ul className="list-disc text-gray-800">
                            <li>Quick installation</li>
                            <li>Maximum energy harvest</li>
                            <li>Cloud-based performance monitoring</li>
                            <li>12 standard or 25-year extended warranty</li>
                        </ul>
                        <ul className="list-disc text-gray-800">
                            <li>Dedicated support</li>
                            <li>Best-in-class reliability</li>
                            <li>Clean energy solutions</li>
                        </ul>
                    </div>
                </section>
                {/* Selling Points Section */}
                <section>
                    <div className="container mx-auto py-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* First Column: Easy Install */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/1.png"
                                        alt="Easy Install"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    Easy Install
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    Save time and money with our 4 panel, 1 inverter technology
                                </p>
                            </div>
                            {/* Second Column: High Power, Low Cost */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/2.png"
                                        alt="High Power, Low Cost"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    High Power, Low Cost
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    The highest power output for the lowest cost
                                </p>
                            </div>

                            {/* Third Column: Industry Leader in Energy Solutions */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/3.png"
                                        alt="Industry Leader in Energy Solutions"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    Industry Leader in Energy Solutions
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    Reliable solar energy for a greener future
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Call to Action */}
                <div className="flex flex-col items-center gap-4">
                    <Link href="/resources#installers" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-4 py-2 rounded">Support for Installers & Distributers</Link>
                    <Link href="/contact" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-2 rounded">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}
