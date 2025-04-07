'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianMenuItem"

export default function ProductPage() {
    const models = ["Q2000-4102","Q2000-4102-DM", "Q2000-4102-GT"]
    const [selectedModel, setSelectedModel] = useState<string | null>(models[0])
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="bg-white container mx-auto py-4 px-10">
            {/* Navigation Links */}
            <div className="flex justify-left items-center mb-6 text-sm text-brand-gray">
                <Link href="/products" className="hover:underline px-2">
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href="/products/Q2000" className="hover:underline px-2">
                    Q2000 Microinverter
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Q2000 Microinverter</h1>
                    <p className="text-brand-gray mt-4 text-lg">
                        SPARQ&apos;s revolutionary Quad microinverters are game changers for the solar power industry. Unlike traditional microinverters that have one photovoltaic (PV) module inputting into one microinverter, our Quad microinverters have four individual DC input channels to enable independent peak power tracking for up to four PV modules. This allows significant reduction in installation time and cable costs. Based on a Per-Watt rating, our Quad microinverters have <strong>the lowest microinverter cost, the highest power output, the highest power density, and the lowest weight in the industry.</strong>
                    </p>

                    {isExpanded && (
                        <div className="text-brand-gray text-lg">
                            <p className="mt-2">Our microinverters have been designed for high reliability, using patented technologies that eliminate the use of short-life electrolytic capacitors. This feature gives our microinverters high reliability and a design life of 25 years, matching the design life of PV modules.</p>
                            <p className="mt-2">The Q2000 microinverter is the industry&apos;s first highest power rating microinverter that produces electrical energy from four photovoltaic (“PV”) panels of 550W+ each, without any power clipping under all operating conditions. The Q2000 is designed to connect 4 PV panels, up to 550W, to the AC power grid.</p>
                        </div>
                    )}

                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    {/* Model Selector */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700">Model: Q2000</p>
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

                    <div className="p-4 mt-16">
                        <AccordionItem title="Features">
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
                                        <li>Industry-standard Amphenol AC connectors, using Zigbee&quot;s open wireless communication protocol for individual node monitoring</li>
                                    </ul>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title="Technical specifications">
                            <div>
                                {selectedModel === "Q2000-4102" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                                {selectedModel === "Q2000-4102-DM" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102_DM.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                                {selectedModel === "Q2000-4102-GT" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102_GT_V2.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Documentation">
                            <h2 className="text-lg font-bold">Installation Manuals for {selectedModel}:</h2>
                                <div className="flex flex-col">
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Americas.pdf" target="_blank">North America</Link>
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Chinese.pdf" target="_blank">China</Link>
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Europe.pdf" target="_blank">Europe</Link>
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_India.pdf" target="_blank">India</Link>
                                </div>
                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/q2000.webp"
                        alt="Q2000 Microinverter"
                        width={1920}
                        height={1084}
                        className="object-contain sticky top-16 z-10"
                    />
                </div>
            </div>
        </div>
    );
};