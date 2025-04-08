'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import Link from 'next/link';

export default function InvestorSlider() {
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
                    <p className="text-sm">THE FUTURE IS WHAT WE MAKE IT</p>
                </div>
            </div>
            {/* Sliding Window Component */}
            <div className="mt-8 px-6 max-w-[60%]">
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
                    className='text-white h-64'
                >
                    <SwiperSlide>
                        <div>
                            <h2 className="text-2xl font-bold">
                                Sparq Announces Closing of Second Tranche of Private Placement
                            </h2>
                            <ul className="mt-4">
                                <li>
                                    <Link href="https://www.sparqsys.com/sparq-announces-closing-of-second-tranche-of-private-placement/" className="text-blue-400 hover:underline" target='_blank'>
                                        Press Release
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className="text-2xl font-bold">
                                Sparq Systems Enters into Partnership with Jio Things
                            </h2>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link href="https://www.sparqsys.com/sparq-systems-enters-into-technology-partnership-with-jio-things/" className="text-blue-400 hover:underline" target='_blank'>
                                        Press Release
                                    </Link>
                                </li>
                            </ul>
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
