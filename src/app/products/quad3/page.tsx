'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianItem"
import FAQs from "./faqs.json"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import { motion } from "motion/react"


export default function Quad3Page() {
    const models = ["Quad3-4301"]
    const [selectedModel, setSelectedModel] = useState<string | null>(models[0])
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})

    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
    }

    const trackEvent = useTrackEvent()
    const handleClick = () => {
        setIsExpanded(!isExpanded)
        if (isExpanded) return // useState is async, so this checks old value
        trackEvent("read_more", {
            "parent": "quad3"
        })
    }

    return (
        <div className="bg-white container mx-auto py-4 px-4 sm:px-0">
            {/* Navigation Links */}
            <div className="flex justify-left items-center mb-6 text-sm text-brand-gray">
                <Link href="/products" className="hover:underline px-2">
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href="/products/quad3" className="hover:underline px-2">
                    Quad 3 Microinverter
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-6xl font-bold text-gray-900 mt-1">Quad 3 Microinverter</h1>
                    <ul className="space-y-4 list-disc list-inside text-2xl mt-4">
                        <li>
                            <span className="hover:underline text-4xl cursor-pointer" onClick={() => toggleExpanded(0)}>Best in-class Performance</span>
                            {dropdownExpanded[0] && (
                                <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                    {/* todo: turn this into a map */}
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Highest weight/power density</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Maximum energy harvesting</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Dual-mode operation (on/off-grid)</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Individual MPPT for each panel</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Ultra high-frequency, soft switching topolgy</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Grid Resiliency without energy storage</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Grid Independence and energy self-sufficiency</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</motion.li>
                                </ol>
                            )}
                        </li>
                        <li>
                            <span onClick={() => toggleExpanded(1)} className="hover:underline text-4xl cursor-pointer">Safe & Reliable</span>
                            {dropdownExpanded[1] && (
                                <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                    {/* todo: turn this into a map */}
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>No failure-prone electrolytic capacitors</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Other low-lifetime components eliminated</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>All DC cabling with inherent Rapid Shutdown compliance</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>No risk of high voltage DC arcing</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>No high voltage shock hazard for 1st responders</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>High reliability and system availability</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>No single point of failure for the PV system</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Fewer system components to install/maintain</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Best-in-class longevity</motion.li>
                                </ol>
                            )}
                        </li>
                        <li>
                            <span onClick={() => toggleExpanded(2)} className="hover:underline text-4xl cursor-pointer">Cost-Effectiveness</span>
                            {dropdownExpanded[2] && (
                                <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                    {/* todo: turn this into a map */}
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Quad Architecture</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Reduced manufacturing Bill of Materials</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Reduced Balance of System (cabling, grounding, ect)</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Lower manufacturing and installation costs</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Maintenance-free</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Lowest cycle-life-cost</motion.li>
                                    <motion.li initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}>Outlier on Performance-Cost curve</motion.li>
                                </ol>
                            )}
                        </li>
                    </ul>


                    {isExpanded && (
                        <div className="text-brand-gray text-xl">
                            <p className="mt-4"><strong>Performance That Powers More</strong>: Engineered with high-frequency, soft-switching power electronics and advanced real-time control, the Quad3 ensures maximum energy harvesting and grid resilience. With individual MPPT for each panel, your system achieves optimal output even in partially shaded conditions. It&apos;s also built for the future - scalable, flexible, and ready for both on-grid and off-grid operations.</p>
                            <p className="mt-4"><strong>Safety You Can Count On</strong>: The Quad3 eliminates traditional risks with no HV DC cabling, no electrolytic capacitors, and all-AC wiring that complies with Rapid Shutdown (RSD) regulations. It&apos;s a high-reliability, high-availability solution with no single point of failure, minimizing risk while maximizing uptime.</p>
                            <p className="mt-4"><strong>Cost-Effectiveness Without Compromise</strong>: Backed by a Quad Architecture that reduces both manufacturing and installation costs, the Quad3 also minimizes Balance of System (BoS) requirements. With lowest cycle-life cost and maintenance-free operation, it stands out as an outlier on the Performance-Cost curve.</p>
                            <p className="text-brand-gray font-semibold text-lg mt-2">Whether you&apos;re powering a home or a commercial system, the Quad3 microinverter delivers unmatched value, reliability, and smart energy management — all in one compact, user-friendly package.</p>
                        </div>
                    )}

                    <button onClick={handleClick} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    {/* Model Selector */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700">Model: Q2000-4301</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {models.map((model) => (
                                <button
                                    key={model}
                                    className={`px-4 py-2 border rounded-md text-sm cursor-pointer ${model === selectedModel
                                        ? "border-blue-600 text-blue-600"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                        }`}
                                    onClick={() => setSelectedModel(selectedModel === model ? null : model)}
                                >
                                    {model}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 sm:mt-16">
                        <AccordionItem title="Features" className="sticky top-[58px] sm:relative sm:top-auto" parent="quad3">
                            <ul className="list-inside list-decimal text-brand-maroon">
                                <li className="mb-4"> <strong>Superior Value</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Low design/installation costs</li>
                                        <li>Lowest cost per Watt in the industry </li>
                                        <li>Electrolyte-free design for longer lifetime</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>High Energy Harvest</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Greater energy harvest compared to string inverters</li>
                                        <li>Advanced power electronics for low-light environments</li>
                                        <li>Independent maximum energy harvest for each module</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Best in-class reliability</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Smart-grid ready, works on any grid, anywhere</li>
                                        <li>No single point of failure</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Easy to Install</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Quad system design reduces the required number of conventional microinverters by a factor of 4</li>
                                        <li>&quot;All AC&quot; solution promotes safe installation and operation with low voltage</li>
                                        <li>Industry-standard Amphenol AC connectors, using Zigbee&apos;s open wireless communication protocol for individual node monitoring</li>
                                    </ul>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title="Technical Specifications" parent="quad3">
                            <div>
                                {selectedModel === "Quad3-4301" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Datasheet_Quad4301.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Certifications" parent="quad3">
                            <h2 className="text-xl font-bold mb-4">Reports</h2>
                            <div className="flex flex-col">
                                <Link href="/Quad3/report/EN50549-1.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">EN50549-1</Link>
                                <Link href="/Quad3/report/IEC 62109.01.02.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">IEC 62109.01.02</Link>
                            </div>
                            <h2 className="text-xl font-bold my-4">Certifications</h2>
                            <div className="flex flex-col">
                                <Link href="/Quad3/certs/IEC_62109.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">IEC_62109</Link>
                                
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Documentation" parent="quad3">
                            <h2 className="text-lg font-bold">Installation Manual for {selectedModel}:</h2>
                            <Link className="text-blue-500 hover:text-blue-700" href="/Quad3.pdf" target="_blank">All Regions</Link>
                        </AccordionItem>
                        <AccordionItem title="Comparison with Leading Microinverter" parent="quad3">
                            <Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" target="_blank" className="text-blue-400 hover:underline cursor-pointer">Comparison with Enphase IQ8H-3p</Link>
                        </AccordionItem>
                        <AccordionItem title="Quad3 FAQs" parent="quad3">
                            {FAQs.subQuestions.map((item) => (
                                <div key={item.id} className="text-gray-700 my-4">
                                    <strong className="text-brand-maroon">{item.question}</strong><br></br>{" "}
                                    {item.answer}
                                </div>
                            ))}
                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/quad3.webp"
                        alt="Quad 3 Microinverter"
                        width={1920}
                        height={1084}
                        className="object-contain sticky top-16 z-10"
                    />
                </div>
            </div>
        </div>
    );
};