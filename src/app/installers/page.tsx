'use client'

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import InstallerFAQData from "./installer_faq.json"

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

import GridDiv from "@/components/GridDiv"
import AccordionItem from "@/components/AccordionItem"

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string }[];
}

interface SolarTool {
    title: string
    description: string
    url: string
}

const solarTools: SolarTool[] = [
    {
        title: "HelioScope",
        description: "Aurora Solar's HelioScope streamlines commercial PV design with web-based 3D modeling and fast performance simulations.",
        url: "https://helioscope.aurorasolar.com/"
    },
    {
        title: "OpenSolar",
        description: "OpenSolar offers free cloud-based tools for solar design, 3D modeling, and accurate energy estimates.",
        url: "https://www.opensolar.com/"
    },
    {
        title: "PVsyst",
        description: "PVsyst provides detailed photovoltaic analysis with precise energy yield and system optimization tools.",
        url: "https://www.pvsyst.com/"
    }
]

const FAQ: FAQData[] = InstallerFAQData.faqs
const quad_advantage = ["1 microinverter for 4 panels", "Safe, reliable, and long-lasting", "All AC cabling", "Rapid Shutdown Compatible", "Lowest weight, volume, and cost", "Fewer parts to install", "Installation takes less time on the roof", "Maitenance-free", "Higher profit margin", "User-friendly app"]

export default function InstallersPage() {
    const [flipped, set] = useState(false)
    const frontSrc = "/SLC/009.JPG"
    const backSrc = "/SLC/007.JPG"
    const highlight = { x: 27, y: 33, size: 50 }
    const swiperRef = useRef<SwiperRef>(null)


    return (
        <div className="scroll-mt-[66px]">
            {/* flippable image */}
            <section className="relative w-full h-[calc(100vh-66px)]">
                <div className="relative w-full h-full">
                    <Image
                        src={frontSrc}
                        height={1080}
                        width={1920}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                        style={{ display: flipped ? 'none' : 'block' }}
                    />
                    <Image
                        src={backSrc}
                        height={1080}
                        width={1920}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                        style={{
                            display: flipped ? 'block' : 'none',
                            objectPosition: "75% 50%"
                        }}
                    />
                    {!flipped && (
                        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            See Why Installers Choose Sparq
                        </h1>
                    )}
                    {flipped && (
                        <div>
                            <h1 className="absolute top-16 sm:top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl text-center font-bold z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                4-In-1 Advantage
                            </h1>
                            <div
                                className="absolute"
                                style={{
                                    top: `${highlight.y}%`,
                                    left: `${100 - highlight.x}%`,
                                    width: `${highlight.size}%`,
                                    height: `${highlight.size}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="#8c334d" strokeWidth="4"
                                        strokeDasharray="283" strokeDashoffset="283"
                                    >
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            to="0"
                                            dur="2s"
                                            fill="freeze"
                                        />
                                    </circle>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
                <p onClick={() => set(!flipped)} className="absolute left-4 bottom-4 text-white text-xl lg:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{flipped ? 'Show Front' : 'Show Back'}</p>
            </section>
            {/* highlights */}
            <section id="whysparq" className="h-[calc(100vh-66px)] mx-auto pb-8 scroll-mt-[66px]">
                <div
                    className="w-full sm:h-[calc(100vh-66px)] bg-cover bg-top sm:bg-top relative bg-[url(/thumbnail_image.png)]">
                    <div className="max-w-full">
                        <Swiper
                            ref={swiperRef}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 20000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            className='text-white h-[calc(100vh-66px)] [--swiper-pagination-bullet-size:20px] sm:[--swiper-pagination-bullet-size:30px] sm:[--swiper-navigation-size:70px] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:#8C344E] [--swiper-pagination-bullet-inactive-color:#fcb900]'
                        >
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Why Installers Should Choose Sparq Products</h1>
                                    <ul className="list-[lower-roman] list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 space-y-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        <li>Best In-Class Performance</li>
                                        <li>Safe & Long-Lasting Products</li>
                                        <li>Cost-Effective and Maintenance Free</li>
                                        <li>Easy to Install and Remotely Monitor</li>
                                        <li>Expert Technical Support</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full justify-between'>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                            Sparq Differentiation
                                        </h1>
                                        <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 space-y-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                            {quad_advantage.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex items-center justify-center mb-64">
                                        <p className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] mr-4">For more details, read &quot;SPARQ For Installers&quot;:
                                        </p>
                                        <Link className="cursor-pointer rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/installer_ppt.pdf" target="_blank">See Installer Presentation</Link>
                                    </div>
                                </div>

                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section id="discover" className="container mx-auto 2xl:px-32 py-8 space-y-32 scroll-mt-[66px]">
                {/* 1. Full-width video + blurb */}
                <div className="flex flex-col md:flex-row items-center text-right">
                    <div className="md:w-1/2">
                        <Link href="/resources">
                            <Image
                                src="/hassan_presentation_thumbnail.png"
                                width={806}
                                height={452}
                                alt="Hassan's Presentation Thumbnail"
                                className="rounded-xl shadow-lg transition-transform hover:scale-105"
                            />

                        </Link>
                    </div>
                    <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
                        <h2 className="text-4xl font-semibold mb-2 text-brand-maroon text-left">
                            Learn More About Sparq Products
                        </h2>
                    </div>
                </div>

                {/* 2. Left-aligned blurb + link */}
                <div className="w-full md:w-2/3 text-left">
                    <h2 className="text-4xl font-semibold mb-2">
                        <Link href="/products" className="text-brand-maroon hover:underline decoration-brand-logo">
                            Sparq Products
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Discover our robust microinverters engineered for commercial solar arrays, delivering maximum ROI, minimal maintenance, and unmatched uptime.
                    </p>
                    <div className='flex flex-wrap justify-start mt-8 space-x-8'>
                        <Link href="products/quad2" className='flex items-center justify-center'>
                            <GridDiv id="q2000">
                                <Image className='w-2/3 h-2/3 object-cover' width={1920} height={1084} src='/q2000.webp' alt='q2000 Microinverters' />
                                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold text-brand-maroon mt-8'>Quad2</h2>
                            </GridDiv>
                        </Link>
                        <Link href="products/quad3" className='flex items-center justify-center'>
                            <GridDiv>
                                <Image className='w-2/3 h-2/3 object-cover' width={1920} height={1084} src='/quad3.webp' alt='Quad 3 Microinverter' />
                                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold text-brand-maroon mt-8'>Quad3</h2>
                            </GridDiv>
                        </Link>
                    </div>
                    <div className='flex flex-wrap justify-start mt-8 space-x-8'>
                        <Link href="products/sparqlinq">
                            <GridDiv id='#sparqlinq'>
                                <Image className='w-full h-full rounded-xl shadow-lg' width={768} height={512} src="/SparqLinq.jpg" alt="SparqLinq Monitoring Interface" />
                                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold text-brand-maroon mt-8'>SparqLinq</h2>
                            </GridDiv>
                        </Link>
                        <Link href="products/accessories">
                            <GridDiv id="cables">
                                <Image src="/Accessories/cables.png" width={671} height={409} alt="Types of Cables Offered" />
                                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold text-brand-maroon mt-8'>Cables</h2>
                            </GridDiv>
                        </Link>
                    </div>
                </div>

                {/* 3. Right-aligned blurb + link */}
                <div className="w-full md:w-2/3 ml-auto text-right">
                    <h2 className="text-4xl font-semibold mb-2">
                        <Link href="/resources" className="text-brand-maroon hover:underline decoration-brand-logo">
                            Learning
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Access in-depth installation guides, commissioning tutorials, and best practices tailored for installers deploying Sparq microinverters at commercial scale.                    </p>
                </div>
            </section>
            <section id="useful-tools" className="container mx-auto mb-8 mt-32 2xl:px-32 scroll-mt-[66px]">
                <h1 className="text-4xl font-bold mb-6 text-brand-maroon">C&I PV System Tools</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {solarTools.map((tool) => (
                        <div
                            key={tool.title}
                            className="bg-white shadow-lg rounded-lg p-4 transform hover:scale-105 transition duration-300"
                        >
                            <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
                            <p className="text-gray-600 mb-4">{tool.description}</p>
                            <Link
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-brand-maroon text-white px-4 py-2 rounded hover:bg-brand-darkmaroon"
                            >
                                Visit Site
                            </Link>
                        </div>
                    ))}
                </div>
                <span className="text-xs mt-4">
                    The links provided on this page are offered solely for your convenience and informational purposes. Sparq Systems Inc. is not affiliated with, endorsed by, or responsible for the content, accuracy, or reliability of these external websites. We provide these links as a courtesy and make no guarantees about the information or services they contain. Use of these links is at your own discretion, and Sparq Systems Inc. bears no liability for any issues arising from them.
                </span>
            </section>
            <section id="faq" className="bg-white container mx-auto py-8 px-4 sm:px-32 scroll-mt-[66px]">
                <h1 className="text-2xl font-bold text-brand-maroon text-left mt-12">
                    Frequently Asked Questions
                </h1>
                <div className="flex flex-col space-y-6">
                    {FAQ.map((item) => (
                        <AccordionItem title={item.questionBrand} key={item.id} parent="installer_faq">
                            <div>
                                <h2 className="text-xl font-bold text-brand-maroon text-center mb-4">
                                    {item.questionBrand}
                                </h2>
                                <div className="space-y-2">
                                    {item.subQuestions.map((subItem) => (
                                        <div key={subItem.id} className="text-gray-700">
                                            <strong className="text-brand-maroon">{subItem.question}</strong><br></br>{" "}
                                            {subItem.answer}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionItem>
                    ))}
                </div>
            </section>
        </div>
    )
}
