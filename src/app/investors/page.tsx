'use client'

import InvestorSlider from "@/components/Sliders/InvestorSlider";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";

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
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-center text-5xl font-light mt-32 mb-4">Recent News</h1>
                <div className="relative pb-8 mt-8">
                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-cve-sprq-good-115233702.html" target="_blank">
                        <h1 className="text-brand-maroon font-mono text-2xl hover:underline">SPARQ Systems (CVE:SPRQ) Is In A Good Position To Deliver On Growth Plans</h1>
                    </Link>
                    <p>Even when a business is losing money, it&apos;s possible for shareholders to make money if they buy a good business at the right price. Indeed, SPARQ Systems (CVE:SPRQ) stock is up 159% in the last year, providing strong gains for shareholders. But while the successes are well known, investors should not ignore the very many unprofitable companies that simply burn through all their cash and collapse.</p>
                    <p className="mt-4">In light of its strong share price run, we think now is a good time to investigate how risky SPARQ Systems&apos; cash burn is. For the purpose of this article, we&aos;ll define cash burn as the amount of cash the company is spending each year to fund its growth (also called its negative free cash flow). First, we&apos;ll determine its cash runway by comparing its cash burn with its cash reserves.</p>
                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-cve-sprq-good-115233702.html" className="absolute bottom-0 right-0 flex cursor-pointer text-blue-400 hover:underline" target="_blank">Read More<FaArrowRight className="ml-2 text-black"/></Link>
                </div>
                <div className="relative pb-8 mt-8">
                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" target="_blank">
                        <h1 className="text-brand-maroon font-mono text-2xl hover:underline">SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies</h1>
                    </Link>
                    <p>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
                    <p className="mt-4">TSX Venture 50 is a ranking of the 50 top-performing companies on the TSX Venture Exchange over the last year. Companies are ranked based on three equally-weighted criteria of one-year share price appreciation, market capitalization increase, and Canadian consolidated trading value.</p>
                    <p className="mt-4">Praveen Jain, Chief Executive Officer of the Company, commented: &quot;Being named to the TSX Venture 50 is an incredible honor and a reflection of our company&apos;s momentum. Our share price appreciation and market cap growth underscore the strength of our strategy, execution, and confidence of our investors. We remain committed to driving innovation, delivering long term value, and building on this success.&quot;</p>
                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" className="absolute bottom-0 right-0 flex cursor-pointer text-blue-400 hover:underline" target="_blank">Read More<FaArrowRight className="ml-2 text-black"/></Link>
                </div>
                <div className="relative pb-8 mt-8">
                    <Link href="https://ca.finance.yahoo.com/news/sparq-introduces-unique-integrated-pv-220500864.html" target="_blank">
                        <h1 className="text-brand-maroon font-mono text-2xl hover:underline">SPARQ Introduces Unique Integrated PV and Battery Quad Microinverter</h1>
                    </Link>
                    <p>Sparq Systems Inc. is pleased to announce that it has developed a unique integrated PV and battery Quad microinverter with energy storage capability for residential and commercial applications.</p>
                    <p className="mt-4">This revolutionary product is versatile and compatible with existing technologies, capable of working on-grid, off-grid, and with any types of battery technology, such as Lithium-Ion and Lead Acid, among others. Incorporating energy storage into the Quad microinverter is instrumental towards creating resilient solar energy harvesting systems, fully eliminating the dependency on the utility grid. The newly developed Quad microinverter is being introduced at the 2025 India Energy Week being held this week in New Delhi, India.</p>
                    <Link href="https://ca.finance.yahoo.com/news/sparq-introduces-unique-integrated-pv-220500864.html" className="absolute bottom-0 right-0 flex cursor-pointer text-blue-400 hover:underline" target="_blank">Read More<FaArrowRight className="ml-2 text-black"/></Link>
                </div>
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