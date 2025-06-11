'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import Link from "next/link"
import { useState } from 'react'

function expanded() {
    return (
        <>
            <p className="mt-4"><strong>Performance That Powers More</strong>: Engineered with high-frequency, soft-switching power electronics and advanced real-time control, the Quad3 ensures maximum energy harvesting and grid resilience. With individual MPPT for each panel, your system achieves optimal output even in partially shaded conditions. It&apos;s also built for the future - scalable, flexible, and ready for both on-grid and off-grid operations.</p>
            <p className="mt-4"><strong>Safety You Can Count On</strong>: The Quad3 eliminates traditional risks with no HV DC cabling, no electrolytic capacitors, and all-AC wiring that complies with Rapid Shutdown (RSD) regulations. It&apos;s a high-reliability, high-availability solution with no single point of failure, minimizing risk while maximizing uptime.</p>
            <p className="mt-4"><strong>Cost-Effectiveness Without Compromise</strong>: Backed by a Quad Architecture that reduces both manufacturing and installation costs, the Quad3 also minimizes Balance of System (BoS) requirements. With lowest lifecycle cost and maintenance-free operation, it stands out as an outlier on the Performance-Cost curve.</p>
            <p className="text-brand-gray font-semibold mt-2">Whether you&apos;re powering a home or a commercial system, the Quad3 microinverter delivers unmatched value, reliability, and smart energy management — all in one compact, user-friendly package.</p>
        </>
    )
}

function image() {
    return (
        <Image
            src="/quad3.webp"
            alt="Quad3 Microinverter"
            width={1920}
            height={1084}
            className="object-contain sticky top-16 z-10"
        />
    )
}

const listContent: ListEntry[] = [
    {
        heading: "Best in-class Performance",
        items: [
           <span key={"quad3-1"}>Highest power per unit weight [W/kg] or volume [W/in<sup>3</sup>]</span>,
			"Maximum energy harvesting",
			"Dual-mode operation (on/off-grid)",
			"Individual MPPT for each panel",
			"Ultra high-frequency, soft switching topolgy",
			"Grid Resiliency without energy storage",
			"Grid Independence and energy self-sufficiency",
			<span key={"quad3-2"}><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</span>,
			<span key={"quad3-3"}><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</span>,
			<span key={"quad3-4"}><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</span>
        ]
    },
    {
        heading: "Safe & Reliable",
        items: [
            "No failure-prone electrolytic capacitors",
            "Other low-lifetime components eliminated",
            "All AC cabling with inherent Rapid Shutdown compliance",
            "No risk of high voltage DC arcing",
            "No high voltage shock hazard for 1st responders",
            "High reliability and system availability",
            "No single point of failure for the PV system",
            "Fewer system components to install/maintain",
            "Best-in-class longevity"
        ]
    },
    {
        heading: "Cost-Effectiveness",
        items: [
            "Quad Architecture is the most cost-effective",
            "Reduced manufacturing Bill of Materials",
            "Reduced Balance of System (cabling, grounding, ect)",
            "Lower manufacturing and installation costs",
            "Maintenance-free",
            "Lowest lifecycle cost",
            "Outlier on Performance-Cost curve",
        ]
    }
]

export default function TestPage() {
    const models = ["Quad3-4301"]
    const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

    function accordion() {
        return (
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
                            <Link className="text-blue-500 hover:text-blue-700" href="/Quad3/quad3_datasheet.pdf" target="_blank">
                                Datasheet for {selectedModel}
                            </Link>
                        )}
                    </div>
                </AccordionItem>
                <AccordionItem title="Certifications" parent="quad3">
                    <h2 className="text-xl font-bold mb-4">Reports</h2>
                    <div className="flex flex-col">
                        <Link href="/Quad3/report/EN50549-1.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">EN50549-1</Link>
                        <Link href="/Quad3/report/EMC_Emissions_Report.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">EN 61000-6-3:2007</Link>
                        <Link href="/Quad3/report/IEC 62109.01.02.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">IEC 62109.01.02</Link>
                        <Link href="/Quad3/report/EMC_Immunity_Report.pdf" target="_blank" className="text-blue-500 hover:text-blue-700">IEC 61000-3-2:2007</Link>
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
            </div>
        )
    }

    return (
        <div>
            <ProductPage
                models={models}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                model="Q2000-4301"
                heading="Quad3 Microinverter"
                animated={true}
                parent="Quad3"
                href="quad3"
                animatedList={listContent}
                expandedContent={expanded()}
                accordianContent={accordion()}
                imageContent={image()}
            >
            </ProductPage>
        </div>
    )
}