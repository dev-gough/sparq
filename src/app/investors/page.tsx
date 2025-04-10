'use client'

import InvestorSlider from "@/components/Sliders/InvestorSlider";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useState } from 'react';

interface CardProps {
    value: string;
    label: string;
    footnote?: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ value, label, footnote, link }) => {
    return (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-lg mt-2">{label}</div>
            {footnote && <div className="text-sm text-gray-600 mt-1">{footnote}</div>}
            <a href={link} className="text-blue-500 hover:underline mt-4 block">MORE →</a>
        </div>
    );
};

const cards = [
    {
        value: 'Innovation',
        label: 'Total Revenue',
        link: '#',
    },
    {
        value: '$-1,066,296',
        label: 'Gross Profit',
        link: '#',
    },
    {
        value: '$-0.08',
        label: 'EPS',
        link: '#',
    },
    {
        value: '$-6,377,103',
        label: 'EBITDA',
        link: '#',
    },
];


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
            <section id="4.i)" className="items-center justify-center">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">News (NYI)</h1>
                <ul className="list-disc list-inside">
                    <li>Icorporate automated news feeds</li>
                    <li>Top 10 news will scroll right to left</li>
                    <li>More detail option + see all news option</li>
                </ul>
            </section>
            <section id="4.ii)">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">Events (NYI)</h1>
                <ul className="list-disc list-inside">
                    <li>Top events scroll right to left</li>
                    <li>More detail option + see all news option</li>
                </ul>
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