'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianMenuItem"

export default function Quad3Page() {
    const models = ["SL200-2001"]
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
                <Link href="/products/SparqLinq" className="hover:underline px-2">
                    SparqLinq
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Sparq Linq: Real-time performance monitoring</h1>
                    <p className="text-brand-gray mt-4 text-lg">
                        Access and monitor your energy system data at any time with SparqLinq, our smart interface for the Quad 2000 and Quad 3. SparqLinq can be used on nearly any device and is backed by industry standard Zigbee wireless communication, providing access to real-time data and historical records.</p>

                    {isExpanded && (
                        <div className="text-brand-gray text-lg font-mono">
                            <p>More details to be provided</p>
                        </div>
                    )}

                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    {/* Model Selector */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700">Model: SL200</p>
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
                                <li className="mb-4"> <strong>Data when you need it</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Advanced performance and communication tools
                                        with no app required</li>
                                        <li>Real-time metrics, historical records
                                        and panel-by-panel information</li>
                                        <li>Cloud-based monitoring</li>
                                    </ul>
                                </li>
                                <li className="my-4"> <strong>Quick Installation</strong>
                                    <ul className="list-inside list-disc text-black">
                                        <li>Automatically detects connected inverters
                                        before AC is connected</li>
                                        <li>Installation layout syncs automatically to your cloud account</li>
                                    </ul>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title="Technical specifications" open={true}>
                            <div>
                                {selectedModel === "SL200-2001" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/sparqlinq-specsheet.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Documentation" open={true}>
                            <h2 className="text-lg font-bold">Quick Install Guide for {selectedModel}:</h2>
                            <Link className="text-blue-500 hover:text-blue-700" href="/sparqlinq-quickinstall.pdf" target="_blank">All Regions</Link>

                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/SparqLinq.jpg"
                        alt="Sparq Linq Monitoring Tool"
                        width={1920}
                        height={1084}
                        className="object-contain sticky top-16 z-10"
                    />
                </div>
            </div>
        </div>
    );
};