'use client'

import { useState } from "react"
import Link from "next/link"
import Slider from "@/components/Slider"
import { SwiperSlide } from "swiper/react"

import Subheader from "@/components/Subheader"

import { FaPeopleArrows, FaPeopleCarry } from "react-icons/fa"
import { TiDocument } from "react-icons/ti"
import { GrDocumentText } from "react-icons/gr"

export const items = [
    {icon: GrDocumentText, label: "Corporate Statements", href: "/about"},
    {icon: FaPeopleArrows, label: "Leadership", href: "/about/leadership"},
    {icon: FaPeopleCarry, label: "Board of Directors", href: "/about/board"},
    {icon: TiDocument, label: "Governance", href: "/about/governance"},
]

export default function AboutPage() {

    const [showStatement, setShowStatement] = useState<number>(0)

    return (
        <div>
            <Subheader items={items}/>
            <div id="corporatestatements" className="container mx-auto sm:py-8 sm:px-4 pb-4">
                <Slider>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className="text-lg sm:text-3xl font-extrabold text-brand-yellow underline">
                                Click to view our Statements
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 sm:mt-8 mt-2">
                                <div className="justify-start">
                                    <h3 className={`text-blue-400 font-bold py-2 text-xl sm:text-3xl cursor-pointer ${showStatement === 1 ? 'text-blue-600' : ''}`} onClick={() => showStatement === 1? setShowStatement(0) : setShowStatement(1)}>Passion</h3>
                                    <h3 className={`text-blue-400 font-bold py-2 text-xl sm:text-3xl cursor-pointer ${showStatement === 2 ? 'text-blue-600' : ''}`} onClick={() => showStatement === 2? setShowStatement(0) : setShowStatement(2)}>Vision</h3>
                                    <h3 className={`text-blue-400 font-bold py-2 text-xl sm:text-3xl cursor-pointer ${showStatement === 3 ? 'text-blue-600' : ''}`} onClick={() => showStatement === 3? setShowStatement(0) : setShowStatement(3)}>Mission</h3>
                                    <h3 className={`text-blue-400 font-bold py-2 text-xl sm:text-3xl cursor-pointer ${showStatement === 4? 'text-blue-600' : ''}`} onClick={() => showStatement === 4? setShowStatement(0) : setShowStatement(4)}>Value</h3>
                                </div>
                                {showStatement != 0 && (
                                <div className="justify-center border border-brand-maroon bg-brand-gray rounded-2xl col-span-2 sm:col-span-3">
                                    <div className="text-gray-300 sm:p-2 px-2">
                                        {showStatement === 1 && (
                                            <div>
                                                <p className='text-[11px] sm:text-xl'>SPARQ was born out of a passion to create leading edge solar energy solutions that support a greener future for our planet. Founder Dr. Praveen Jain is a world-leader in energy research, holding over 100 patents. His advanced research at ePower, the Centre for Energy and Power Electronics Research at Queen&apos;s University in Kingston, Canada, resulted in the development of SPARQ&apos;s innovative and versatile microinverter design.</p>
                                                <p className='text-[11px] sm:text-xl sm:mt-4'>Today, SPARQ&apos;s microinverter system is resetting the industry standard for solar energy systems, delivering greater energy harvest over traditional string inverters. It can be used in any power grid, conventional or smart, around the globe.</p>
                                            </div>
                                        )}
                                        {showStatement === 2 && (
                                            <div>
                                                <p className='sm:text-xl text-sm py-2 sm:py-0'>Driven by Sparq&apos;s unwavering commitment to innovation, customer satisfaction, and continuous improvement, our vision is to lead the clean energy revolution by consistently developing and introducing the next generation of energy-efficient, cost-effective, and environmentally sustainable power electronics, energy storage, and management technologies—paving the way for a greener, more sustainable future.</p>
                                            </div>
                                        )}
                                        {showStatement === 3 && (
                                            <div>
                                                <p className='sm:text-xl text-sm py-2 sm:py-0'>Our mission is to develop and advance state of the art technologies in energy harvesting, conversion, storage, and digital controls to resolve longstanding environmental, social, and governance (ESG) challenges of our planet through innovation, collaboration, and experience.</p>
                                            </div>
                                        )}
                                        {showStatement === 4 && (
                                            <div>
                                                <p className='sm:text-xl text-[13px] py-2 sm:py-0'>Sparq&apos;s value proposition is to provide safe, highly reliable, cost-effective, and easy-to-install and maintain portfolio of solar energy generation, storage, and management products, which seamlessly can integrate into one platform to deliver affordable, resilient, long-lasting, and sustainable grid-tied and offgrid energy solutions, to reduce adverse effects of growing energy demand on our ecosystem, including air, water, soil, biodiversity, and carbon footprint.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className='text-lg sm:text-3xl font-extrabold text-brand-yellow underline'>Meet Our People</h2>
                            <div className="flex flex-col gap-4">
                                <Link href="/about/leadership" className='text-blue-400 sm:text-2xl sm:pt-16 pt-4'>Meet the Leadership Team</Link>
                                <Link href="/about/board" className="text-blue-400 sm:text-2xl">Board of Directors</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='px-0 sm:px-64 sm:pt-8'>
                            <h2 className='text-lg sm:text-3xl font-extrabold text-brand-yellow underline'>Governance Documents</h2>
                            <div className="text-sm sm:text-2xl sm:pt-16 pt-4">
                                <Link href="/about/governance" className=' text-blue-400'>Legal Documents, Terms of Sercice, and Privacy Policy can be seen here:</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Slider>
            </div>
        </div>
    )
}