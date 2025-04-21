'use client'

import Link from "next/link"
import Slider from "@/components/Slider"
import { SwiperSlide } from "swiper/react"

import { useState } from "react"
import LeadershipPage from "./leadership/page"
import BoardPage from "./board/page"
import GovernancePage from "./governance/page"


export default function AboutPage() {

    const [viewAll, setViewAll] = useState<boolean>(false)

    const handleViewAll = () => {
        setViewAll(!viewAll)
    }

    return (
        <div id="corporatestatements" className="container mx-auto sm:py-8 sm:px-4 pb-4">
            <Slider viewAllOnClick={handleViewAll}>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8 relative'>
                        <h2 className='text-lg sm:text-5xl font-extrabold text-brand-maroon underline'>Passion</h2>
                        <p className="mt-16 text-sm sm:text-xl">brief passion statement</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-5xl font-extrabold text-brand-maroon underline'>Vision</h2>
                        <p className="mt-16 text-sm sm:text-xl">brief vision statement</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-5xl font-extrabold text-brand-maroon underline'>Mission</h2>
                        <p className="mt-16 text-sm sm:text-xl">brief mission statement</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='px-0 sm:px-64 sm:pt-8'>
                        <h2 className='text-lg sm:text-5xl font-extrabold text-brand-maroon underline'>Value</h2>
                        <p className="mt-16 text-sm sm:text-xl">brief value statement</p>
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
            </Slider>
            {viewAll && (
                <div>
                    <section id="statements">
                        <div className="my-16 bg-slate-100 rounded-2xl p-4 border border-slate-200">
                            <h1 className="sm:text-5xl text-brand-maroon font-bold text-center">Passion</h1>
                            <p className='text-sm sm:text-xl mt-8'>SPARQ was born out of a passion to create leading edge solar energy solutions that support a greener future for our planet. Founder Dr. Praveen Jain is a world-leader in energy research, holding over 100 patents. His advanced research at ePower, the Centre for Energy and Power Electronics Research at Queen&apos;s University in Kingston, Canada, resulted in the development of SPARQ&apos;s innovative and versatile microinverter design.</p>
                            <p className='text-sm sm:text-xl sm:mt-4'>Today, SPARQ&apos;s microinverter system is resetting the industry standard for solar energy systems, delivering greater energy harvest over traditional string inverters. It can be used in any power grid, conventional or smart, around the globe.</p>
                            <h1 className="sm:text-5xl text-brand-maroon font-bold text-center mt-16">Vision</h1>
                            <p className='sm:text-xl text-sm mt-8'>Driven by Sparq&apos;s unwavering commitment to innovation, customer satisfaction, and continuous improvement, our vision is to lead the clean energy revolution by consistently developing and introducing the next generation of energy-efficient, cost-effective, and environmentally sustainable power electronics, energy storage, and management technologies—paving the way for a greener, more sustainable future.</p>
                            <h1 className="sm:text-5xl text-brand-maroon font-bold text-center mt-16">Mission</h1>
                            <p className='sm:text-xl text-sm mt-8'>Our mission is to develop and advance state of the art technologies in energy harvesting, conversion, storage, and digital controls to resolve longstanding environmental, social, and governance (ESG) challenges of our planet through innovation, collaboration, and experience.</p>
                            <h1 className="sm:text-5xl text-brand-maroon font-bold text-center mt-16">Value</h1>
                            <p className='sm:text-xl text-sm mt-8'>Sparq&apos;s value proposition is to provide safe, highly reliable, cost-effective, and easy-to-install and maintain portfolio of solar energy generation, storage, and management products, which seamlessly can integrate into one platform to deliver affordable, resilient, long-lasting, and sustainable grid-tied and offgrid energy solutions, to reduce adverse effects of growing energy demand on our ecosystem, including air, water, soil, biodiversity, and carbon footprint.</p>
                        </div>
                    </section>
                    <LeadershipPage/>
                    <BoardPage/>
                    <GovernancePage/>
                </div>
            )}
        </div>
    )
}