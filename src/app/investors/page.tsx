'use client'

import Link from "next/link"
import { useState, useRef } from 'react'
import Draggable from 'react-draggable'

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

import LogoSlider from '@/components/PartnerSlider'
import VideoControls from '@/components/VideoControls'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import { useIsMobile } from "@/hooks/useIsMobile"

const partners = [
    { src: "/Logos/epower.png", alt: "QueensU Epower Lab", href: "https://www.queensu.ca/epower/" },
    { src: "/Logos/jiothings.jpeg", alt: "JioThings", href: "https://www.jiothings.com/" },
    { src: "/Logos/tmp.png", alt: "Reliance", href: "https://www.ril.com/" },
    { src: "/Logos/iljin.png", alt: "ILJIN", href: "https://www.iljin.com/" },
    { src: "/Logos/queens.jpg", alt: "QueensU", href: "https://www.queensu.ca/" },
    { src: "/Logos/stlawrence.png", alt: "St. Lawrence College", href: "https://www.stlawrencecollege.ca/" },
    { src: "/Logos/modernniagara.jpg", alt: "Modern Niagara Logo", href: "https://modernniagara.com/" }
]

export default function InvestorsPage() {

    const [expanded, setExpanded] = useState<boolean>(false)
    const [isVidEnded, setIsVidEnded] = useState<boolean>(false)
    const [isVidPaused, setIsVidPaused] = useState<boolean>(false)
    const vidRef = useRef<HTMLVideoElement>(null)
    const swiperRef = useRef<SwiperRef>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const trackEvent = useTrackEvent()
    const isMobile = useIsMobile()

    const handleReplay = () => {
        if (vidRef.current) {
            vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidEnded(false)
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
            setIsVidEnded(false)
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
        setIsVidEnded(true)
    }

    const handleEnded = () => {
        setIsVidEnded(true)
        setIsVidPaused(true)
        swiperRef.current?.swiper.autoplay.start()
    }

    const handleHighlightClick = () => {
        swiperRef.current?.swiper.slideTo(0, 0)
        trackEvent("button_click", {
            "btn_name": "investor_highlights"
        })
    }

    const handlePresentationClick = () => {
        trackEvent("button_click", {
            "btn_name": "investor_presentation"
        })
    }

    const handleShowDetailsClick = () => {
        setExpanded(true)
        trackEvent("button_click", {
            "btn_name": "investor_highlights_show"
        })
    }

    return (
        <div className='scroll-mt-[114px]'>
            <div className="relative h-[calc(100vh-114px)] overflow-x-hidden ">
                <Draggable bounds="parent" nodeRef={wrapperRef as React.RefObject<HTMLElement>} cancel=".inv_ctrl">
                    <div className='absolute top-4 right-4 p-2 md:p-0 border-white border md:border-none' ref={wrapperRef}>
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
                {!isMobile && (
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover object-bottom bg-black xl:object-cover z-[-1]"
                        ref={vidRef}
                        autoPlay
                        muted
                        onPlay={() => setIsVidEnded(false)}
                        onEnded={handleEnded}
                    >
                        <source src="/inv_dt.mp4" type="video/mp4" />
                    </video>
                )}
                {isMobile && (
                    <video
                        className="absolute top-0 left-0 w-full h-full object-fit bg-black z-[-1]"
                        ref={vidRef}
                        autoPlay
                        muted
                        onPlay={() => setIsVidEnded(false)}
                        onEnded={handleEnded}
                    >
                        <source src="/inv_mobile.mp4" type="video/mp4" />
                    </video>
                )}

                <div className="flex flex-col items-center justify-center h-full transition-transform duration-200">
                    {isVidEnded && (
                        <div className="flex flex-row space-x-10 pt-8 mt-80 sm:mt-120">
                            <Link onClick={handleHighlightClick} href="#highlights" className="bg-transparent border-white text-white hover:bg-gray-400 hover:text-white cursor-pointer font-black  text-base lg:text-lg xl:text-xl py-3 px-5 border-3  rounded-4xl  transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Highlights</Link>
                            <Link href="/investors_ppt.pdf" onClick={handlePresentationClick} target="_blank" className="bg-transparent border-white text-white hover:bg-gray-400 cursor-pointer font-black  text-base lg:text-lg xl:text-xl py-3 px-5 border-3  rounded-4xl  transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">View Presentation</Link>
                        </div>
                    )}
                </div>
            </div>
            <div id="highlights" className="h-[calc(100vh-114px)] mx-auto pb-8 scroll-mt-[114px]">
                <div
                    className="w-full sm:h-[calc(100vh-114px)] bg-cover bg-top sm:bg-top relative bg-[url(/thumbnail_image.png)]">
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
                            className='text-white h-[calc(100vh-114px)] [--swiper-pagination-bullet-size:20px] sm:[--swiper-pagination-bullet-size:30px] sm:[--swiper-navigation-size:70px] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:#8C344E] [--swiper-pagination-bullet-inactive-color:#fcb900]'
                            onSlideChangeTransitionStart={() => setExpanded(false)}
                        >
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full justify-between'>
                                    <div>
                                        <h2 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Global Strategic Partnerships for R&D, Manufacturing and Distribution</h2>
                                        <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                            <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-white hover:underline">ePower</Link></li>
                                            <li><Link href="https://www.jiothings.com/" target="_blank" className="text-white hover:underline">JioThings</Link></li>
                                            <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-white hover:underline">Reliance</Link></li>
                                            <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-white hover:underline">ILJIN Electronics</Link></li>
                                        </ul>
                                    </div>
                                    <div className='my-16'>
                                        <h1 className="text-center mb-2 underline underline-offset-2 text-xl sm:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Click to Find Out How We Power Success Together</h1>
                                        <LogoSlider logos={partners} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Multiple Strategic Test Sites for R&D with Leading Institutions and C&I Sites</h1>
                                    <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        <li><Link href="https://www.investkingston.ca/rd/#1643990910571-444406ce-b63e" target='_blank' className='text-white hover:underline'>Queen&apos;s University</Link></li>
                                        <li><Link href="https://www.energy-manager.ca/st-lawrence-college-installs-largest-solar-system-for-post-secondary-facility-856/" target='_blank' className='text-white hover:underline'>St. Lawrence College</Link></li>
                                        <li>Modern Niagara - Sparq Headquarter Office</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <button className={`absolute left-4 bottom-14 sm:text-2xl text-lg text-white  cursor-pointer ${expanded ? "hidden" : ""} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]`} onClick={handleShowDetailsClick}>Show Details</button>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h2 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        SPARQ Recieves Purchase Order for Additional 20MW Worth of Microinverters
                                    </h2>
                                    {expanded && (
                                        <div className="text-lg sm:text-xl lg:text-2xl xl:text-4xl">
                                            <p className='pt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>SPARQ is pleased to announce that on August 27, 2024 the Company received a purchase order for supplying 10,000 Q2000 Quad Microinverters for the Indian market. This order is in addition to the order for 6,000 Q2000 Quad Microinverters announced in June 2024.</p>
                                            <ul className="mt-4">
                                                <li>
                                                    <Link href="https://finance.yahoo.com/news/sparq-receives-purchase-order-additional-211000433.html" className="text-blue-400 hover:underline drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]" target='_blank'>
                                                        Read More
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <button className={`absolute left-4 bottom-14 sm:text-2xl text-lg text-white  cursor-pointer ${expanded ? "hidden" : ""} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]`} onClick={handleShowDetailsClick}>Show Details</button>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h2 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                        SPARQ Systems Named in TSX Venture 50 List of Top Performing Companies
                                    </h2>
                                    {expanded && (
                                        <div className="text-lg sm:text-xl lg:text-2xl xl:text-4xl">
                                            <p className=' pt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Sparq Systems Inc. is pleased to announce that it has been included in the TSX Venture 50 list in the Clean Technology and Renewable Energy sector.</p>
                                            <ul className="mt-4 space-y-2">
                                                <li>
                                                    <Link href="https://ca.finance.yahoo.com/news/sparq-systems-named-tsx-venture-220100985.html" className="text-blue-400 hover:underline drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]" target='_blank'>
                                                        Read More
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <button className={`absolute left-4 bottom-14 sm:text-2xl text-lg text-white  cursor-pointer ${expanded ? "hidden" : ""} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]`} onClick={handleShowDetailsClick}>Show Details</button>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h2 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>SPARQ Receives 12 MW Worth of Purchase Orders</h2>
                                    {expanded && (
                                        <div className="text-lg sm:text-xl lg:text-2xl xl:text-4xl">
                                            <p className='pt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Sparq is pleased to announce that on June 26, 2024 the Company received purchase orders for supplying over six-thousand Q2000 Quad Microinverters for the Indian market. </p>
                                            <p className='pt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>&quot;It is a major step forward for the Company to enter into the Indian PV market,&quot; commented Dr. Praveen Jain, Chief Executive Officer of SPARQ.</p>
                                            <ul className='mt-4 space-y-2'>
                                                <li>
                                                    <Link className='text-blue-400 hover:underline drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]' href="https://finance.yahoo.com/news/sparq-receives-12-mw-worth-112000213.html" target='_blank'>Read More</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <button className={`absolute left-4 bottom-14 sm:text-2xl text-lg text-white  cursor-pointer ${expanded ? "hidden" : ""} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]`} onClick={handleShowDetailsClick}>Show Details</button>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h2 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Sparq Systems CEO Interview - Dr. Praveen Jain</h2>
                                    {expanded && (
                                        <div className="text-lg sm:text-xl lg:text-2xl xl:text-4xl">
                                            <p className='pt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>In this interview, Justin sits down with Dr. Praveen Jain, CEO of Sparq Systems (TSXV:SPRQ, OTC:SPRQF), a company revolutionizing solar energy with its next-generation single-phase microinverters.</p>
                                            <ul className='mt-4 space-y-2'>
                                                <li>
                                                    <Link className='text-blue-400 hover:underline drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]' href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target='_blank'>Watch Here</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}