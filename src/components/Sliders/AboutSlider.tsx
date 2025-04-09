'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import Link from 'next/link';

export default function AboutSlider() {
    return (
        <div
            className="w-full h-192 bg-cover bg-center relative bg-[url(/tmp.jpg)] mt-12 rounded-xl">
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
                >
                    <SwiperSlide>
                        <div>
                            <h2 className="text-3xl font-extrabold text-brand-maroon">
                                Passion
                            </h2>
                            <p className='text-lg mb-4'>SPARQ was born out of a passion to create leading edge solar energy solutions that support a greener future for our planet. Founder Dr. Praveen Jain is a world-leader in energy research, holding over 100 patents. His advanced research at ePower, the Centre for Energy and Power Electronics Research at Queen&apos;s University in Kingston, Canada, resulted in the development of SPARQ&apos;s innovative and versatile microinverter design.</p>
                            <p className='text-lg'>Today SPARQ&apos;s microinverter system is resetting the industry standard for solar energy systems, delivering greater energy harvest over traditional string inverters. It can be used in any power grid, conventional or smart, around the globe.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className="text-2xl font-extrabold text-brand-maroon">
                                Vision
                            </h2>
                            <p className='text-lg'>Driven by Sparq&apos;s unwavering commitment to innovation, customer satisfaction, and continuous improvement, our vision is to lead the clean energy revolution by consistently developing and introducing the next generation of energy-efficient, cost-effective, and environmentally sustainable power electronics, energy storage, and management technologies—paving the way for a greener, more sustainable future.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-2xl font-extrabold text-brand-maroon'>Mission</h2>
                            <p className='text-lg'>Our mission is to develop and advance state of the art technologies in energy harvesting, conversion, storage, and digital controls to resolve longstanding environmental, social, and governance (ESG) challenges of our planet through innovation, collaboration, and experience.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-brand-maroon text-2xl font-extrabold'>Value Proposition</h2>
                            <p className='text-lg'>Sparq&apos;s value proposition is to provide safe, highly reliable, cost-effective, and easy-to-install and maintain portfolio of solar energy generation, storage, and management products, which seamlessly can integrate into one platform to deliver affordable, resilient, long-lasting, and sustainable grid-tied and offgrid energy solutions, to reduce adverse effects of growing energy demand on our ecosystem, including air, water, soil, biodiversity, and carbon footprint.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-brand-maroon text-2xl font-extrabold'>Leadership</h2>
                            <Link href="/about#leadership" className='text-blue-400 text-lg'>Meet the members of our excellent team</Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <h2 className='text-brand-maroon text-2xl font-extrabold'>Board of Directors</h2>
                            <Link href="/about#bod" className='text-lg text-blue-400'>Get to know our experienced board members</Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
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
