'use client'

import InvestorSlider from "@/components/Sliders/InvestorSlider";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import NewsItems from "@/components/NewsItems";
import Link from "next/link";
import { FaVideo } from "react-icons/fa";

export default function InvestorPage() {
    return (
        <div className="container mx-auto py-16 px-10 flex flex-col">
            <section>
                <InvestorSlider />
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
                <NewsItems/>
            </section>
            <section className="items-center justify-center">
                <h1 className="text-center text-5xl font-light mt-32 mb-16">Events (NYI)</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #1</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black"/>
                        </Link>
                    </div>
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #2</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black"/>
                        </Link>
                    </div>
                    <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                        <Link href="#" target="_blank">
                            <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #3</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                        <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black"/>
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