'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useState } from 'react';

import Link from 'next/link';

export default function HomeSlider() {

    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div
            className="w-full h-192 bg-cover bg-center relative bg-[url(/tmp.jpg)]">
            {/* Heading Section */}
            <div className="flex justify-between items-center p-6">
                <p className="text-4xl text-right font-semibold text-brand-yellow">Sparq Systems</p>
            </div>
            {/* Sliding Window Component */}
            <div className="mt-8 px-6 max-w-[60%]">
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 15000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className='text-white h-96'
                    onSlideChange={() => setExpanded(false)}
                >
                    <SwiperSlide>
                        <div>
                            <h2 className="text-2xl font-extrabold text-brand-maroon">
                                Introducing the Q2000: The most powerful microinverter in the industry!
                            </h2>
                            <p className='text-lg'>SPARQ is pleased to introduce the Quad 2000, the industry&apos;s most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, without any power clipping. Our advanced software allows the Q2000 to operate seamlessly in grid-tied, standalone and dual-mode solar panel applications.</p>
                            <ul className="mt-4">
                                <li>
                                    <Link href="https://www.youtube.com/watch?v=3LPu1w_Qj1I" className="text-blue-400 hover:underline" target='_blank'>
                                        See Video
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className="text-2xl font-extrabold text-brand-maroon">
                                The most advanced Single phase and three phase microinverter in the industry
                            </h2>
                            <p className='text-lg'>Sparq Systems Q2000 product family of single and three phase microinverters not only resolve the longstanding safety, partial shading, low reliability problems and high cost of String Photovoltaic-Systems but also further advance state of the art of the single channel microinverter industry leader by eliminating the low reliability electrolytic capacitors and integrating four independently controlled DC-DC channels in one enclose resulting in best in class reliability, highest weigh and power density and lowest life-cycle cost.</p>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" className="text-blue-400 hover:underline" target='_blank'>
                                        Q2000-4102 vs. IQ8H
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" className='text-blue-400 hover:underline' target='_blank'>
                                        Q2000-4302 vs. IQ8H-3p
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-2xl font-extrabold text-brand-maroon'>Be part of a greener future</h2>
                            <p className='text-lg'>Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you&apos;ll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.</p>
                            <button onClick={() => setExpanded(!expanded)} className="text-blue-400 hover:underline mt-2 inline-block cursor-pointer">
                                {expanded ? "See less" : "See more"}
                            </button>
                            {expanded && (
                                <div>
                                    <ul className="list-disc list-inside">
                                        <li>4 panels - 1 inverter</li>
                                        <li>Best in-class reliability</li>
                                        <li>Quick and easy installation</li>
                                        <li>Maximum energy harvest</li>
                                        <li>Cloud-based performance monitoring</li>
                                        <li>12 standard or 25-year extended warranty</li>
                                        <li>Clean energy solutions</li>
                                        <li>Dedicated support</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="mt-4 text-left">
                    <a href="#" className="text-white hover:underline">
                        VIEW ALL →
                    </a>
                </div>
            </div>
            {/* Stock Information Div */}
            {/* To be filled via api call */}
            <Link href="https://ca.finance.yahoo.com/quote/SPRQ.V/" target='_blank' className=' cursor-pointer'>
                <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 p-4 rounded">
                    <p className="text-white text-sm">TSXV: SPRQ</p>
                    <p className="text-white text-2xl font-semibold">$0.89</p>
                    <p className="text-white text-sm">-0.03 -(3.26%)</p>
                    <p className="text-white text-xs">Apr 08, 2025 10:30 AM EDT</p>
                </div>
            </Link>
        </div>
    );
};
