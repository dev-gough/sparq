'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianItem"

export default function ProductPage() {
    const models = ["Q1200-4102-GT", "Q1200-4102-DM"]
    const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

    return (
        <div className="bg-white container mx-auto py-4 px-4 sm:px-0">
            {/* Navigation Links */}
            <div className="flex justify-left items-center mb-6 text-sm text-brand-gray">
                <Link href="/products" className="hover:underline px-2">
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href="/products/legacy" className="hover:underline px-2">
                    Q1200 Microinverter
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Q1200 Microinverter</h1>
                    <p className="text-brand-gray mt-4 sm:text-lg">
                        The Q1200 is a legacy product that has been discontinued.  See below for the technical manuals, or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> for support.
                    </p>
                    {/* Model Selector */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700">Model: Q1200</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {models.map((model) => (
                                <button
                                    key={model}
                                    className={`px-4 py-2 border rounded-md text-sm cursor-pointer ${model === selectedModel
                                        ? "border-blue-600 text-blue-600"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                        }`}
                                    onClick={() => setSelectedModel(model)}
                                >
                                    {model}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 sm:mt-16">
                        <AccordionItem title="Technical Specifications" open={true} parent="legacy">
                            <div>
                                {selectedModel === "Q1200-4102-GT" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q1200/Q1200-GT-discontinued.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                                {selectedModel === "Q1200-4102-DM" && (
                                    <Link className="text-blue-500 hover:text-blue-700" href="/Q1200/Q1200-DM-discontinued.pdf" target="_blank">
                                        Datasheet for {selectedModel}
                                    </Link>
                                )}
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Documentation" open={true} parent="legacy">
                            <h2 className="text-lg font-bold">Installation Manuals for {selectedModel}:</h2>
                            <div className="flex flex-col">
                                <Link className="text-blue-500 hover:text-blue-700" href="/Q1200/Q1200-Installer-NA.pdf" target="_blank">North America</Link>
                                <Link className="text-blue-500 hover:text-blue-700" href="/Q1200/Q1200-Installer-India.pdf" target="_blank">India</Link>
                            </div>
                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/q1200-discontinued.png"
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