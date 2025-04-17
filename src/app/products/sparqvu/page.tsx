'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import AccordionItem from "@/components/AccordianItem"

export default function SparqVuPage() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="bg-white container mx-auto py-4 px-4 sm:px-10">
            {/* Navigation Links */}
            <div className="flex justify-left items-center mb-6 text-sm text-brand-gray">
                <Link href="/products" className="hover:underline px-2">
                    Products
                </Link>{" "}
                &gt;{" "}
                <Link href="/products/SparqVu" className="hover:underline px-2">
                    SparqVu
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">SparqVu - Your Energy Management System</h1>
                    <p className="text-brand-gray mt-4 text-lg">
                        Manage multi-site monitoring with SparqVu, a performance management system with intuitive displays to help you quickly spot issues and troubleshoot in real time.</p>
                    {isExpanded && (
                        <div className="text-brand-gray text-lg font-mono">
                            <p>More details to be provided</p>
                        </div>
                    )}

                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline mt-2 inline-block cursor-pointer">
                        {isExpanded ? "Read less" : "Read more"}
                    </button>

                    <div className="p-4 sm:mt-16">
                        <AccordionItem title="Features" className="sticky top-[58px] sm:relative sm:top-auto">
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
                            </div>
                        </AccordionItem>
                        <AccordionItem title="Documentation" open={true}>
                            <div></div>
                        </AccordionItem>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/SparqVu.jpg"
                        alt="Sparq Linq Monitoring Tool"
                        width={1920}
                        height={1084}
                        className="object-contain sticky top-16 z-10 border border-black rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};