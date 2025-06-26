'use client'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import Link from "next/link"
import { useState, useRef } from 'react'
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"

function expanded() {
    return (
        <>
            <p className="mt-4"><strong>Performance That Powers More</strong>: Engineered with high-frequency, soft-switching power electronics and advanced real-time control, the Quad3 ensures maximum energy harvesting and grid resilience. With individual MPPT for each panel, your system achieves optimal output even in partially shaded conditions. It&apos;s also built for the future - scalable, flexible, and ready for both on-grid and off-grid operations.</p>
            <p className="mt-4"><strong>Safety You Can Count On</strong>: The Quad3 eliminates traditional risks with no HV DC cabling, no electrolytic capacitors, and all-AC wiring that complies with Rapid Shutdown (RSD) regulations. It&apos;s a high-reliability, high-availability solution with no single point of failure, minimizing risk while maximizing uptime.</p>
            <p className="mt-4"><strong>Cost-Effectiveness Without Compromise</strong>: Backed by a Quad Architecture that reduces both manufacturing and installation costs, the Quad3 also minimizes Balance of System (BoS) requirements. With lowest lifecycle cost and maintenance-free operation, it stands out as an outlier on the Performance-Cost curve.</p>
            <p className="text-brand-gray font-semibold mt-2">Whether you&apos;re powering a home or a commercial system, the Quad3 microinverter delivers unmatched value, reliability, and smart energy management - all in one compact, user-friendly package.</p>
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

interface AccordionSection {
	title: string
	content: React.ReactNode | ((selectedModel: string) => React.ReactNode)
	accentColor: string
}

const accordionSections: AccordionSection[] = [
	{
		title: "Features",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="space-y-6">
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">Superior Value</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Low design/installation costs</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Lowest cost per Watt in the industry</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Electrolyte-free design for longer lifetime</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">High Energy Harvest</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Greater energy harvest compared to string inverters</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Advanced power electronics for low-light environments</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Independent maximum energy harvest for each module</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">Best in-class reliability</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Smart-grid ready, works on any grid, anywhere</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>No single point of failure</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">Easy to Install</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Quad system design reduces the required number of conventional microinverters by a factor of 4</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>"All AC" solution promotes safe installation and operation with low voltage</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Industry-standard Amphenol AC connectors, using Zigbee's open wireless communication protocol for individual node monitoring</span>
						</li>
					</ul>
				</div>
			</div>
		)
	},
	{
		title: "Technical Specifications",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (selectedModel: string) => (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
				<h3 className="font-bold text-brand-darkmaroon mb-4">Datasheet for {selectedModel}</h3>
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					{selectedModel === "Quad3-4301" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3/quad3_datasheet.pdf" target="_blank">
							Download Quad3-4301 Datasheet (PDF)
						</Link>
					)}
				</div>
			</div>
		)
	},
	{
		title: "Certifications",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="space-y-6">
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-4">Reports</h3>
					<div className="grid gap-3">
						{[
							{ name: "EN50549-1", href: "/Quad3/report/EN50549-1.pdf" },
							{ name: "EN 61000-6-3:2007", href: "/Quad3/report/EMC_Emissions_Report.pdf" },
							{ name: "IEC 62109.01.02", href: "/Quad3/report/IEC 62109.01.02.pdf" },
							{ name: "IEC 61000-3-2:2007", href: "/Quad3/report/EMC_Immunity_Report.pdf" }
						].map((report) => (
							<div key={report.name} className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<Link target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={report.href}>
									{report.name}
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-4">Certifications</h3>
					<div className="grid gap-3">
						<div className="flex items-center gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
							<Link target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3/certs/IEC_62109.pdf">
								IEC_62109
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	},
	{
		title: "Documentation",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (selectedModel: string) => (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
				<h3 className="font-bold text-brand-darkmaroon mb-4">Installation Manual for {selectedModel}</h3>
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3.pdf" target="_blank">
						All Regions
					</Link>
				</div>
			</div>
		)
	},
	{
		title: "Comparison with Leading Microinverter",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					<Link href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors">
						Comparison with Enphase IQ8H-3p (PDF)
					</Link>
				</div>
			</div>
		)
	}
]

export default function TestPage() {
    const models = ["Quad3-4301"]
    const [selectedModel, setSelectedModel] = useState<string>(models[0])
    const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
    const trackEvent = useTrackEvent()

    const toggleExpanded = (i: number) => {
        setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
        if (!dropdownExpanded[i]) {
            trackEvent("dropdown_opened", {
                "parent": "quad3",
                "dropdown": accordionSections[i].title,
            })
        }
    }

    const getIconForCategory = (title: string) => {
        if (title.toLowerCase().includes('features')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
        if (title.toLowerCase().includes('technical') || title.toLowerCase().includes('specifications')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v1a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-2 2H9m-6 0a2 2 0 002 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2zm8 0V9a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        }
        if (title.toLowerCase().includes('certifications')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
        if (title.toLowerCase().includes('documentation')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        )
    }

	function Accordion() {
		const containerRef = useRef(null)
		const isInView = useInView(containerRef, { once: true, margin: "-50px" })

		return (
			<motion.div
				ref={containerRef}
				className="py-6 space-y-6 max-w-4xl"
			>
				{accordionSections.map((section, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.1 * index }}
					>
						<Card
							className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl py-0"
						>
							<CardContent className="p-0">
								<div
									className={`${section.accentColor} p-6 text-white cursor-pointer`}
									onClick={() => toggleExpanded(index)}
								>
									<div className="flex items-center gap-4">
										<div className="flex-shrink-0">
											{getIconForCategory(section.title)}
										</div>
										<h3 className="text-xl md:text-2xl font-bold flex-1">{section.title}</h3>
										<motion.div
											animate={{ rotate: dropdownExpanded[index] ? 180 : 0 }}
											transition={{ duration: 0.3 }}
											className="flex-shrink-0"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</motion.div>
									</div>
								</div>

								<motion.div
									initial={false}
									animate={{
										height: dropdownExpanded[index] ? 'auto' : 0,
										opacity: dropdownExpanded[index] ? 1 : 0
									}}
									transition={{ duration: 0.4, ease: [0.23, 1, 0.320, 1] }}
									className="overflow-hidden"
								>
									<div className="p-6 bg-white">
										{typeof section.content === 'function' ? section.content(selectedModel) : section.content}
									</div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>
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
                accordianContent={Accordion()}
                imageContent={image()}
            >
            </ProductPage>
        </div>
    )
}