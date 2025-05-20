'use client'

import { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link";

const passion_items = ['Support a greener future', 'Create cutting-edge solar energy solutions', 'Advance state of the art technology', 'Delight customers with best-in-class products']

const goodbye_items = ["Fossil fuel causing global warming", "Unsafe components with short lifetimes", "Fire risk and high voltage arcing", "High electricity bills due to centralized power generation"]

const reset_items = ["Safe, reliable, and maitenance-free products", "Lowest cost, weight, and volume per Watt in the industry", "Best-in-class and high performance solutions"]

const green_items = ["Reduce energy consuption", "Cut your carbon footprint", "Enable self-sufficiency with solar power"]

const quad_items = ["Quick and Easy to install", "Maximum energy harvest", "Cloud-based performance monitoring", "12 yr. standard - 25 yr. extended warranty"]

const quad_toggled_items = ["1 microinverter for 4 panels", "Safe, reliable, and long-lasting", "All AC cabling", "Rapid Shutdown Compatible", "Lowest weight, volume, and cost", "Fewer parts to install", "Installation takes less time on the roof", "Maitenance-free", "No more truck rolls", "Higher profit margin", "User-friendly app", "24/7 expert support"]

interface AnimatedListProps {
    items: Array<string>
}

function AnimatedList({ items }: AnimatedListProps) {
    const listVariants = {
        hidden: { maxHeight: 0 },
        visible: { maxHeight: 1000 },
    };

    return (
        <motion.div
            className="overflow-hidden  bg-neutral-600/50 p-4 rounded-lg shadow-md mx-auto"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 16, ease: "easeOut" }}
        >
            <ul className="list-disc list-inside space-y-8">
                {items.map((item, index) => (
                    <motion.li
                        key={index}
                        className="text-6xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.5 + index * 1,
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}
export default function AboutPage() {

    const [expanded, setExpanded] = useState<Record<number, boolean>>({})
    const [toggled, setToggled] = useState<boolean>(false)
    const toggleExpanded = (i: number) => {
        setExpanded(prev => ({ ...prev, [i]: !prev[i] }))
    }
    const handleFlip = (i: number) => {
        setToggled(!toggled)
        setExpanded({[i]: false})
    }

    return (
        <div id="corporatestatements" className="flex flex-col items-center bg-white scroll-mt-[115px]">
            <section className="flex h-[calc(100vh-114px)] w-full bg-[url(/bg-4.jpg)] bg-top bg-no-repeat bg-cover justify-center">
                <div className="relative flex flex-col bg-transparent w-full items-center mt-64">
                    <h2 className="text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Say goodbye to past problems</span></h2>
                    <div className="absolute bottom-10 left-10 flex space-x-8">
                        <p onClick={() => toggleExpanded(0)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[0] ? "Close" : "Read More"}</p>
                        <Link href="/about#slide2" className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Next</Link>
                    </div>
                    {expanded[0] && (
                        <div className="mt-16">
                            <AnimatedList items={goodbye_items} />
                        </div>
                    )}
                </div>
            </section>
            <section id="slide2" className="flex h-[calc(100vh-114px)] w-full bg-[url(/thumbnail_image.png)] bg-center bg-no-repeat bg-cover justify-center scroll-mt-[114px]">
                <div className="relative flex flex-col bg-transparent w-full items-center mt-64">
                    <h2 className="text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Born out of passion</span></h2>
                    <div className="absolute bottom-10 left-10 flex space-x-8">
                        <p onClick={() => toggleExpanded(1)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[1] ? "Close" : "Read More"}</p>
                        <Link href="/about#slide3" className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Next</Link>
                    </div>
                    {expanded[1] && (
                        <div className="mt-16">
                            <AnimatedList items={passion_items} />
                        </div>
                    )}
                </div>
            </section>
            {/* change photo */}
            <section id="slide3" className="flex h-[calc(100vh-114px)] w-full bg-[url(/bg-2.jpg)] bg-center bg-no-repeat bg-cover justify-center scroll-mt-[114px]">
                <div className="relative flex flex-col bg-transparent w-full items-center mt-64">
                    <h2 className="text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Resetting the PV Industry</span></h2>
                    <div className="absolute bottom-10 left-10 flex space-x-8">
                        <p onClick={() => toggleExpanded(2)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[2] ? "Close" : "Read More"}</p>
                        <Link href="/about#slide4" className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Next</Link>
                    </div>
                    {expanded[2] && (
                        <div className="mt-16">
                            <AnimatedList items={reset_items} />
                        </div>
                    )}
                </div>
            </section>
            <section id="slide4" className="flex h-[calc(100vh-114px)] w-full bg-[url(/testing2.jpg)] bg-center bg-no-repeat bg-cover justify-center scroll-mt-[114px]">
                <div className="relative flex flex-col bg-transparent w-full items-center mt-64">
                    <h2 className="text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Be part of a greener future</span></h2>
                    <div className="absolute bottom-10 left-10 flex space-x-8">
                        <p onClick={() => toggleExpanded(3)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[3] ? "Close" : "Read More"}</p>
                        <Link href="/about#slide5" className="text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Next</Link>
                    </div>
                    {expanded[3] && (
                        <div className="mt-16">
                            <AnimatedList items={green_items} />
                        </div>
                    )}
                </div>
            </section>
            {/* somehow discuss that this is slc, front/back */}
            <section id="slide5" className={`flex h-[calc(100vh-114px)] w-full ${toggled? "bg-[url(/SLC/007.JPG)]" : "bg-[url(/SLC/009.JPG)] bg-bottom"} bg-center bg-no-repeat bg-cover justify-center scroll-mt-[114px]`}>
                <div className={`relative flex flex-col bg-transparent w-full items-center ${toggled? "mt-10" : "mt-64"}`}>
                    <h2 className="text-8xl text-white bg-brand-maroon rounded-lg font-bold p-3"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">Quad architecture advantage</span></h2>
                    <div className="absolute bottom-10 left-10 flex space-x-8">
                        <p onClick={() => toggleExpanded(4)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">{expanded[4] ? "Close" : "Read More"}</p>
                        <p onClick={() => handleFlip(4)} className=" text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">Flip Image</p>
                    </div>
                    {(expanded[4] && !toggled) && (
                        <div className="mt-16">
                            <AnimatedList items={quad_items} />
                        </div>
                    )}
                    {(expanded[4] && toggled) && (
                        <div className="mt-4">
                            <AnimatedList items={quad_toggled_items} />
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}