'use client'

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Draggable from "react-draggable"

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import AccordionItem from "@/components/AccordionItem"
import VideoControls from "@/components/VideoControls"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import DesignPage from "../resources/design/page"
import FAQs from './home_faq.json'

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string | Array<string | string[]> }[];
}

const FAQ: FAQData[] = FAQs.faqs

// interface SolarTool {
//     title: string
//     description: string
//     url: string
// }

// const solarTools: SolarTool[] = [
//     {
//         title: "Google Project Sunroof",
//         description: "Uses satellite imagery to analyze roof size, shading, and local climate.",
//         url: "https://sunroof.withgoogle.com/"
//     },
//     {
//         title: "PVWatts Calculator (NREL)",
//         description: "Offers a detailed estimate of system output based on location, system size, tilt, and more.",
//         url: "https://pvwatts.nrel.gov/"
//     },
//     {
//         title: "EnergySage Solar Calculator",
//         description: "Estimates optimal system size, cost, and savings based on utility rates and location.",
//         url: "https://www.energysage.com/solar/calculator/"
//     },
//     {
//         title: "Solar-Estimate.org",
//         description: "Provides system sizing, savings projections, and can match homeowners with installers.",
//         url: "https://www.solar-estimate.org/"
//     }
// ]

export default function HomeownersPage() {

    const vidRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperRef>(null)
    const [isVidPaused, setIsVidPaused] = useState<boolean>(false)
    const trackEvent = useTrackEvent()

    const handleReplay = () => {
        if (vidRef.current) {
            vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidPaused(false)
            trackEvent("video_replay", {
                "video": "investors_video"
            })
        }
    }

    const handleRewind = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = Math.max(0, vidRef.current.currentTime - 10)
    }

    const handlePlayPause = () => {
        const epsilon = 0.05
        if (!vidRef.current) return
        if (vidRef.current.paused || vidRef.current.ended) {
            if (Math.abs(vidRef.current.currentTime - vidRef.current.duration) < epsilon) vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidPaused(false)
        } else {
            vidRef.current.pause()
            setIsVidPaused(true)
        }
    }

        const handleForward = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = Math.min(
            vidRef.current.duration,
            vidRef.current.currentTime + 10
        )
    }

    const handleSkipToEnd = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = vidRef.current.duration
        vidRef.current.pause()
        setIsVidPaused(true)
    }


    return (
        <div className="scroll-mt-[66px]">
            <section className="relative h-[calc(100vh-66px)] overflow-x-hidden">
                <div className="relative h-[calc(100vh-66px)] overflow-x-hidden ">
                    <Draggable bounds="parent" nodeRef={wrapperRef as React.RefObject<HTMLElement>} cancel=".inv_ctrl">
                        <div className='absolute top-4 right-4 p-2 border-white border ' ref={wrapperRef}>
                            <VideoControls
                                className="inv_ctrl z-10"
                                onRestart={handleReplay}
                                onRewind={handleRewind}
                                onPlayPause={handlePlayPause}
                                onForward={handleForward}
                                onSkipToEnd={handleSkipToEnd}
                                isPaused={isVidPaused}
                            />
                        </div>
                    </Draggable>
                    <video
                        className="absolute top-0 left-0 w-full h-full object-contain bg-black xl:object-cover z-[-1]"
                        ref={vidRef}
                        autoPlay
                        muted
                    >
                        <source src="/SPARQ_Quad_Microinverters.mp4" type="video/mp4" />
                    </video>
                </div>
            </section>
            <section id="whysparq" className="h-[calc(100vh-66px)] mx-auto pb-8 scroll-mt-[66px]">
                <div
                    className="w-full sm:h-[calc(100vh-66px)] bg-cover bg-top sm:bg-top relative bg-[url(/thumbnail_image.png)]">
                    <div className="max-w-full">
                        <Swiper
                            ref={swiperRef}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Autoplay, Navigation]}
                            navigation={true}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 20000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            className='text-white h-[calc(100vh-66px)] [--swiper-pagination-bullet-size:20px] sm:[--swiper-pagination-bullet-size:30px] sm:[--swiper-navigation-size:100px] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:#8C344E] [--swiper-pagination-bullet-inactive-color:#fcb900] [--swiper-navigation-color:#8C344E]'
                        >
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Why Sparq?</h1>
                                    <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] space-y-4">
                                        <li>Best In-Class Performance</li>
                                        <li>Safe & Reliable Products</li>
                                        <li>Cost-Effective & Maintenance-Free</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Steps for Going Solar</h1>
                                    <ul className="list-decimal list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] space-y-4">
                                        <li>Conduct a pre-installation audit and develop a plan</li>
                                        <li>Check regional compliance requirements</li>
                                        <li>Research incentives and eligibility criteria</li>
                                        <li>Obtain quotes from certified, experienced installers</li>
                                        <li>Coordinate with your local utility company to obtain permits</li>
                                        <li>Award the contract and proceed with installation</li>
                                        <li>Schedule post-installation audit</li>
                                        <li>Enjoy the benefits of your new PV system</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        Important Considerations
                                    </h1>
                                    <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 space-y-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        <li>Do your own research</li>
                                        <li>Ensure You Hire a Certified and Experienced Installer</li>
                                        <li>Buy Best In-Class Products</li>
                                    </ul>
                                    <div className="flex items-center justify-center mt-16">
                                        <Link className="cursor-pointer rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/homeowner_ppt.pdf" target="_blank">See Homeowner Presentation</Link>
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
                            Sparq Product Family
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Explore our solar microinverters engineered to maximize energy conversion efficiency and deliver unmatched reliability for any photovoltaic installation.
                    </p>
                </div>

                {/* 3. Right-aligned blurb + link */}
                <div className="w-full md:w-2/3 ml-auto text-right">
                    <h2 className="text-4xl font-semibold mb-2">
                        <Link href="/resources" className="text-brand-maroon hover:underline decoration-brand-logo">
                            Learning Hub
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Access in-depth tutorials and best practices for installing, configuring, and maintaining Sparq&apos;s microinverters to ensure optimal solar performance.
                    </p>
                </div>
            </section>
            <section id="design" className="mt-8">
                <DesignPage />
            </section>
            {/* <section id="useful-tools" className="container mx-auto mb-8 mt-32 2xl:px-32 scroll-mt-[66px]">
                <h1 className="text-4xl font-bold mb-6 text-brand-maroon">Solar Energy Tools</h1>
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
            </section> */}
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
                                            {subItem.answer && Array.isArray(subItem.answer) ? (
                                                <div>
                                                    {subItem.answer.map((block, i) =>
                                                        Array.isArray(block) ? (
                                                            <ul key={i} className="list-disc ml-6">
                                                                {block.map((li, j) => <li key={j}>{li}</li>)}
                                                            </ul>
                                                        ) : (
                                                            <p key={i} className="whitespace-pre-line">{block}</p>
                                                        ))}
                                                </div>
                                            ) : (
                                                <div>
                                                    {subItem.answer as string}
                                                </div>
                                            )}

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