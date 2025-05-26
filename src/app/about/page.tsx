'use client'

import { useState } from "react"
import AnimatedList from "@/components/AnimatedList"

const passion_items = ['Support a greener future', 'Create cutting-edge solar energy solutions', 'Advance state of the art technology', 'Delight customers with best-in-class products']

const goodbye_items = ["Fossil fuel causing global warming", "Unsafe components with short lifetimes", "Fire risk and high voltage arcing", "High electricity bills due to centralized power generation"]

const reset_items = ["Safe, reliable, and maitenance-free products", "Lowest cost, weight, and volume per Watt in the industry", "Best-in-class and high performance solutions"]

const green_items = ["Reduce energy consuption", "Cut your carbon footprint", "Enable self-sufficiency with solar power"]

const quad_items = ["Quick and Easy to install", "Maximum energy harvest", "Cloud-based performance monitoring", "12 yr. standard - 25 yr. extended warranty"]

const quad_toggled_items = ["1 microinverter for 4 panels", "Safe, reliable, and long-lasting", "All AC cabling", "Rapid Shutdown Compatible", "Lowest weight, volume, and cost", "Fewer parts to install", "Installation takes less time on the roof", "Maitenance-free", "Higher profit margin", "User-friendly app"]

interface SlideSectionProps {
    bgUrl: string
    bgPositionClass: string
    title: string
    items: string[]
    index: number
    expanded: Record<number, boolean>
    toggleExpanded: (i: number) => void
}

interface SlideData {
    bgUrl: string
    bgPositionClass: string
    title: string,
    items: string[]
}

const slides: SlideData[] = [
    {
        bgUrl: "/bg-4.jpg",
        bgPositionClass: "bg-top",
        title: "Say goodbye to past problems",
        items: goodbye_items
    },
    {
        bgUrl: "/thumbnail_image.png",
        bgPositionClass: "bg-center",
        title: "Born out of passion",
        items: passion_items
    },
    {
        bgUrl: "/bg-2.jpg",
        bgPositionClass: "bg-center",
        title: "Resetting the PV Industry",
        items: reset_items
    },
    {
        bgUrl: "/testing2.jpg",
        bgPositionClass: "bg-center",
        title: "Be part of a greener future",
        items: green_items
    }
]

export default function AboutPage() {

    const [expanded, setExpanded] = useState<Record<number, boolean>>({})
    const [toggled, setToggled] = useState<boolean>(false)
    const toggleExpanded = (i: number) => {
        setExpanded(prev => ({ ...prev, [i]: !prev[i] }))
    }
    const handleFlip = (i: number) => {
        setToggled(!toggled)
        setExpanded({ [i]: false })
    }

    const animateNext = (i: number) => {
        setTimeout(() => {
            const next = (i + 1) % (slides.length+1)    // account for the custom slide4 afterwards
            const element = document.getElementById(`slide${next}`)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
                setTimeout(() => {
                    toggleExpanded(i)
                    toggleExpanded(next)
                }, 1500)
            }
        }, 8000)
    }
    
    function SlideSection({ bgUrl, bgPositionClass, title, items, index, expanded, toggleExpanded }: SlideSectionProps) {
        return (
            <section
                id={`slide${index}`}
                className={`relative flex h-[calc(100vh-114px)] min-h-[400px] w-full bg-no-repeat bg-cover justify-center scroll-mt-[114px] ${bgPositionClass} `}
                style={{ backgroundImage: `url(${bgUrl})` }}
            >
                <div className="absolute inset-x-0 top-4 sm:top-1/5 flex flex-col bg-transparent w-full items-center">
                    {/* title */}
                    <h2
                        className="
                    text-xl
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                    xl:text-6xl
                    2xl:text-7xl 
                    3xl:text-8xl
                  text-white bg-brand-maroon rounded-lg font-bold p-3">
                        <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">{title}</span>
                    </h2>
                    {expanded[index] && (
                        <div className="mt-4 sm:mt-16">
                            <AnimatedList items={items} onComplete={() => animateNext(index)} />
                        </div>
                    )}
                </div>
                {/* ctrl */}
                <div
                    className="
                    bottom-2 
                    sm:bottom-10 sm:left-10 
                    absolute flex space-x-8">
                    <p
                        onClick={() => toggleExpanded(index)}
                        className="text-white text-xl lg:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[index] ? "close" : "Read More"}</p>
                </div>
            </section>
        )
    }

    return (
        <div id="corporatestatements" className="flex flex-col items-center bg-white scroll-mt-[115px]">
            {slides.map((config, idx) => (
                <SlideSection
                    key={idx}
                    {...config} //spread the config
                    index={idx}
                    expanded={expanded}
                    toggleExpanded={toggleExpanded}
                />
            ))}
            {/* somehow discuss that this is slc, front/back */}
            <section id="slide4" className={`relative flex h-[calc(100vh-114px)] min-h-[400px] w-full ${toggled ? "bg-[url(/SLC/007.JPG)] bg-center" : "bg-[url(/SLC/009.JPG)] bg-bottom"}  bg-no-repeat bg-cover justify-center scroll-mt-[114px]`}>
                <div className={`absolute inset-x-0 top-4 sm:top-1/5 flex flex-col bg-transparent w-full items-center`}>
                    <h2 className="
                    text-lg
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                    xl:text-6xl
                    2xl:text-7xl 
                    3xl:text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Quad architecture advantage</span></h2>

                    {(expanded[4] && !toggled) && (
                        <div className="mt-4 sm:mt-16">
                            <AnimatedList items={quad_items} />
                        </div>
                    )}
                    {(expanded[4] && toggled) && (
                        <div className="mt-4">
                            <AnimatedList items={quad_toggled_items} />
                        </div>
                    )}
                </div>
                <div className="
                    bottom-2 
                    sm:bottom-10 sm:left-10 
                    absolute flex space-x-8">
                    <p onClick={() => toggleExpanded(4)} className=" text-white text-xl lg:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[4] ? "Close" : "Read More"}</p>
                    <p onClick={() => handleFlip(4)} className=" text-white text-xl lg:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Flip Image</p>
                </div>
            </section>
        </div>
    )
}