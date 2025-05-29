'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import VideoPlayer from "@/components/VideoPlayer"
import AccordionItem from "@/components/AccordionItem"
import GridDiv from "@/components/GridDiv"
import FAQs from './home_faq.json'

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string }[];
}

const FAQ: FAQData[] = FAQs.faqs


interface SolarTool {
    title: string
    description: string
    url: string
}

interface DropdownButtonProps {
    index: number
    title: string
}

const solarTools: SolarTool[] = [
    {
        title: "Google Project Sunroof",
        description: "Uses satellite imagery to analyze roof size, shading, and local climate.",
        url: "https://sunroof.withgoogle.com/"
    },
    {
        title: "PVWatts Calculator (NREL)",
        description: "Offers a detailed estimate of system output based on location, system size, tilt, and more.",
        url: "https://pvwatts.nrel.gov/"
    },
    {
        title: "EnergySage Solar Calculator",
        description: "Estimates optimal system size, cost, and savings based on utility rates and location.",
        url: "https://www.energysage.com/solar/calculator/"
    },
    {
        title: "Solar-Estimate.org",
        description: "Provides system sizing, savings projections, and can match homeowners with installers.",
        url: "https://www.solar-estimate.org/"
    }
]

const cols = [
    "Best In-Class Performance",
    "Safe & Reliable Products",
    "Cost-Effective and Maintenance-Free"
]

const performanceItems = [
    "High Frequency, soft-switching power electronics",
    "Advanced real-time control",
    "Individual MPPT for each panel",
    "No HV DC cabling on the roof",
    "Lowest weight of microinverters on the roof",
    "Maximum Energy Harvesting",
    "Dual Mode Operation (On-grid & Off-grid)",
    "Grid independence",
    "Energy self-sufficiency",
    "Future ready for being flexible and scalable",
    "Robust IOT gateway for health monitoring & control",
    "Web monitoring with Intuitive displays",
    "User-Friendly mobile app",
    "Accessible and expert technical support",
]

const safetyItems = [
    "No Electrolytic Capacitor",
    "No other low-life components",
    "All-AC cabling with inherent Rapid-Shut-Down (RSD) compliance",
    "No risk of HV DC arcing",
    "No Risk of HV electric shock hazard for first responders",
    "High reliability",
    "High system availability",
    "No PV system single point failure",
    "Minimize number of system components to install and maintain results for high MTBF",
    "Longlasting",
    "Comprehensive warranty",
]

const costItems = [
    "Quad Architecture",
    "Reduced manufacturing BOM",
    "Reduced Balance of System (cabling, grounding, junction boxes etc)",
    "Reduced manufacturing cost",
    "Reduced installation cost",
    "Maintenance-free",
    "Lowest cycle-life-cost",
    "Outlier on Performance-Cost Curve",
]



export default function HomeownersPage() {

    const swiperRef = useRef<SwiperRef>(null)
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const toggleDropdown = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    useEffect(() => {
        // Load the YouTube IFrame API script
        const tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName('script')[0]
        if (firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        window.onYouTubeIframeAPIReady = () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const player = new YT.Player("youtube-player", {
                events: {
                    'onStateChange': (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            const anchor = document.getElementById('whysparq')
                            if (anchor) anchor.scrollIntoView({ behavior: "smooth" })
                            console.log(anchor)
                        }
                    }
                }
            })
        }

        // Clean up the global function when the component unmounts
        return () => {
            const tmp = { ...window } as Partial<Window>
            delete tmp.onYouTubeIframeAPIReady
        }
    }, [])

    function DropdownButton({ index, title }: DropdownButtonProps) {
        return (
            <div className='md:w-1/3 lg:p-2 pb-2 mx-0.5'>
                <button
                    className={`w-full bg-brand-maroon text-white p-1 sm:p-2 lg:p-3 rounded-lg flex items-center justify-center hover:bg-brand-darkmaroon transition-colors cursor-pointer ${openIndex === index ? "border-2 sm:border-4 border-brand-logo" : "border-none"}`}
                    onClick={() => toggleDropdown(index)}
                >
                    <span className="md:text-lg lg:text-xl xl:text-2xl font-bold whitespace-nowrap">{title}</span>
                </button>
            </div>
        )
    }

    return (
        <div className="scroll-mt-[66px]">
            <section className="relative h-[calc(100vh-66px)] overflow-x-hidden">
                <iframe
                    id="youtube-player"
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/oJAbATJCugs?autoplay=1&loop=1&controls=1&rel=0&mute=1&enablejsapi=1`}
                    allowFullScreen
                    title="YouTube Background Video"
                ></iframe>
            </section>
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
                            onSlideChangeTransitionEnd={() => setOpenIndex(null)}
                        >
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>What Homeowners Should Demand</h1>
                                    <div className="flex justify-between mt-4 overflow-x-auto">
                                        {cols.map((title, index) => (
                                            <DropdownButton key={index} index={index} title={title} />
                                        ))}
                                    </div>
                                    {openIndex === null && (
                                        <div className='flex justify-center items-center'>
                                            <p className='text-lg md:text-xl md:mt-16'>Click on a label to see more</p>
                                        </div>
                                    )}
                                    {openIndex === 0 && (
                                        <div className="mt-4 w-full p-4 pt-12 bg-neutral-600/50 rounded-md">
                                            <ul className="list-none space-y-8 grid grid-cols-2">
                                                {performanceItems.map((item, index) => (
                                                    <li key={index} className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                        ✓ {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {openIndex === 1 && (
                                        <div className="mt-4 w-full p-4 pt-12 bg-neutral-600/50 rounded-md">
                                            <ul className="list-none space-y-8">
                                                {safetyItems.map((item, index) => (
                                                    <li key={index} className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                        ✓ {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {openIndex === 2 && (
                                        <div className="mt-4 w-full p-4 pt-12 bg-neutral-600/50 rounded-md">
                                            <ul className="list-none space-y-8">
                                                {costItems.map((item, index) => (
                                                    <li key={index} className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                        ✓ {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full'>
                                    <h1 className='text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Check Your Region&apos;s Going-Solar Guidelines</h1>
                                    <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] space-y-4">
                                        <li>Planning</li>
                                        <li>Incentives & Eligibility</li>
                                        <li>Permits and Audits</li>
                                        <li>Utility Coordination</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='px-4 pt-4 lg:px-20 xl:px-40 sm:pt-8 flex flex-col h-full justify-between'>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold border-b-2 border-brand-yellow b-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                            What Homeowners Should Consider
                                        </h1>
                                        <ul className="list-disc list-inside text-lg sm:text-xl lg:text-2xl xl:text-4xl mt-4 space-y-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                            <li>Do your homework</li>
                                            <li>Ensure You Hire a Certified Installer</li>
                                            <li>Buy Best In-Class Products</li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center justify-center mb-64">
                                        <p className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] mr-4">For more details, read &quot;SPARQ For Homeowners&quot;:
                                        </p>
                                        <Link className="cursor-pointer rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/sparq_ppt.pdf" target="_blank">See Homeowner Presentation</Link>
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
                        <VideoPlayer
                            src="/hassan_presentation.mp4"
                            className="rounded-xl shadow-lg transition-transform hover:scale-105"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
                        <h2 className="text-4xl font-semibold mb-2 text-brand-maroon">
                            Learn More About Sparq Products
                        </h2>
                        {/* <p className="text-2xl">
                            Hear from Dr. Kojori about the cutting-edge innovations that power Sparq Products. Dive in to see how we&apos;re redefining the PV industry.
                        </p> */}
                    </div>
                </div>

                {/* 2. Left-aligned blurb + link */}
                <div className="w-full md:w-2/3 text-left">
                    <h2 className="text-4xl font-semibold mb-2">
                        <Link href="/products" className="text-brand-maroon hover:underline decoration-brand-logo">
                            Our Microinverter Lineup
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Explore our solar microinverters engineered to maximize energy conversion efficiency and deliver unmatched reliability for any photovoltaic installation.
                    </p>
                    <div className='flex flex-wrap justify-start mt-8'>
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
                </div>

                {/* 3. Right-aligned blurb + link */}
                <div className="w-full md:w-2/3 ml-auto text-right">
                    <h2 className="text-4xl font-semibold mb-2">
                        <Link href="/resources" className="text-brand-maroon hover:underline decoration-brand-logo">
                            Learning
                        </Link>
                    </h2>
                    <p className="text-2xl">
                        Access in-depth tutorials and best practices for installing, configuring, and maintaining Sparq&apos;s microinverters to ensure optimal solar performance.
                    </p>
                </div>
            </section>
            <section id="useful-links" className="container mx-auto mb-8 mt-32 2xl:px-32 scroll-mt-[66px]">
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