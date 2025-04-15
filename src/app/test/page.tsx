'use client'

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';

export default function Home() {

    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div className="h-full w-full bg-cover bg-center relative">
            <div className="aspect-video w-full h-full bg-[url(/tmp.jpg)]">
                <div className="container mx-auto pt-16">
                    <div
                        className="w-full bg-cover bg-center relative bg-transparent">
                        {/* Sliding Window Component */}
                        <div className="mt-2 sm:mt-8 px-6 max-w-full">
                            <Swiper
                                pagination={{ clickable: true }}
                                modules={[Pagination, Autoplay, Navigation]}
                                navigation={{
                                    enabled: false
                                }}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                className='text-white h-fit'
                                onSlideChange={() => setExpanded(false)}
                                breakpoints={{
                                    640: {
                                        navigation: {
                                            enabled: true
                                        }
                                    }
                                }}
                            >
                                <SwiperSlide>
                                    <div className='px-0 sm:px-32'>
                                        <h2 className="text-lg sm:text-3xl font-extrabold text-brand-maroon">
                                            Introducing the Q2000: The most powerful microinverter in the industry!
                                        </h2>
                                        <p className='text-md sm:text-2xl'>SPARQ is pleased to introduce the Quad 2000, the industry&apos;s most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, without any power clipping. Our advanced software allows the Q2000 to operate seamlessly in grid-tied, standalone and dual-mode solar panel applications.</p>
                                        <ul className="mt-4">
                                            <li>
                                                <Link href="https://www.youtube.com/watch?v=3LPu1w_Qj1I" className="text-blue-400 hover:underline text-md sm:text-2xl" target='_blank'>
                                                    See Video
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='px-0 sm:px-32'>
                                        <h2 className="text-lg sm:text-3xl font-extrabold text-brand-maroon">
                                            The most advanced Single phase and three phase microinverter in the industry
                                        </h2>
                                        <p className='sm:text-2xl text-md'>Sparq Systems Q2000 product family of single and three phase microinverters not only resolve the longstanding safety, partial shading, low reliability problems and high cost of String Photovoltaic-Systems but also further advance state of the art of the single channel microinverter industry leader by eliminating the low reliability electrolytic capacitors and integrating four independently controlled DC-DC channels in one enclosure resulting in best in class reliability, highest weigh and power density and lowest life-cycle cost.</p>
                                        <ul className="mt-4 space-y-2">
                                            <li>
                                                <Link href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" className="text-blue-400 hover:underline sm:text-xl text-md" target='_blank'>
                                                    Q2000-4102 vs. IQ8H
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" className='text-blue-400 hover:underline sm:text-xl text-md' target='_blank'>
                                                    Q2000-4302 vs. IQ8H-3p
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='sm:px-32 px-0'>
                                        <h2 className='sm:text-3xl text-xl font-extrabold text-brand-maroon'>Be part of a greener future</h2>
                                        <p className='sm:text-2xl text-md'>Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you&apos;ll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.</p>
                                        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 hover:underline mt-2 inline-block cursor-pointer sm:text-2xl text-md">
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
                                <SwiperSlide>
                                    <div className='sm:px-32 px-0'>
                                        <h2 className='text-brand-maroon sm:text-3xl text-lg font-extrabold'>Biodiversity</h2>
                                        <p className='sm:text-2xl text-md'>Biodiversity, short for biological diversity, refers to the variety of life on Earth, encompassing everything from genes and species to ecosystems and their functions. It&apos;s the richness and complexity of life that sustains our planet and is crucial for a healthy environment and human well-being.</p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//bg-[url(/tmp.jpg)]