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
			<p className="mt-8">SPARQ&apos;s revolutionary Quad microinverters are game changers for the solar power industry. Unlike traditional microinverters that have one photovoltaic (PV) module inputting into one microinverter, our Quad microinverters have four individual DC input channels to enable independent peak power tracking for up to four PV modules. This allows significant reduction in installation time and cable costs. Based on a Per-Watt rating, our Quad microinverters have <strong>the lowest microinverter cost, the highest power output, the highest power density, and the lowest weight in the industry.</strong>
			</p>
			<p className="mt-4">Our microinverters have been designed for high reliability, using patented technologies that eliminate the use of short-life electrolytic capacitors. This feature gives our microinverters high reliability and a design life of 25 years, matching the design life of PV modules.</p>
			<p className="mt-4">The Q2000 microinverter is the industry&apos;s first highest power rating microinverter that produces electrical energy from four PV panels of 550W+ each, without any power clipping under all operating conditions. The Q2000 is designed to connect 4 PV panels, up to 550W, to the AC power grid.</p>
		</>
	)
}

function image() {
	return (
		<Image
			src="/q2000.webp"
			alt="Q2000 Microinverter"
			width={1920}
			height={1084}
			className="object-contain sticky top-[100px] z-10"
		/>
	)
}

const listContent: ListEntry[] = [
	{
		heading: "Best in-class Performance",
		items: [
			<span key={"quad2-1"}>Highest power per unit weight [W/kg] or volume [W/in<sup>3</sup>]</span>,
			"Maximum energy harvesting",
			"Dual-mode operation (on/off-grid)",
			"Individual MPPT for each panel",
			"Ultra high-frequency, soft switching topolgy",
			"Grid Resiliency without energy storage",
			"Grid Independence and energy self-sufficiency",
			<span key={"quad2-2"}><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</span>,
			<span key={"quad2-3"}><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</span>,
			<span key={"quad2-4"}><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</span>
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
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">Superior Value</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
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
							<span>Reduced installation costs</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Robust IOT gateway for monitoring and control</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">High Energy Harvest</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
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
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">Best in-class reliability</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>No electrolytic capacitors or other components with short lifetimes</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Smart-grid ready, works on any grid, anywhere</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>No single point of failure</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Rapid-Shutdown compliance</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">Easy to Install</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Quad system design reduces the required number of conventional microinverters by a factor of 4</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>&quot;All AC&quot; solution promotes safe installation and operation with low voltage</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Industry-standard Amphenol AC connectors, using Zigbee&apos;s open wireless communication protocol for individual node monitoring</span>
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
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Datasheet for {selectedModel}</h3>
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					{selectedModel === "Q2000-4102" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q2000/Datasheet_Q20004102.pdf" target="_blank">
							Download Q2000-4102 Datasheet (PDF)
						</Link>
					)}
					{selectedModel === "Q2000-4102-DM" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q2000/Datasheet_Q20004102_DM.pdf" target="_blank">
							Download Q2000-4102-DM Datasheet (PDF)
						</Link>
					)}
					{selectedModel === "Q2000-4102-GT" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q2000/Datasheet_Q20004102_GT_V2.pdf" target="_blank">
							Download Q2000-4102-GT Datasheet (PDF)
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
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Reports</h3>
					<div className="grid gap-3">
						{[
							{ name: "EN_61683", href: "/Q2000/reports/EN_61683.pdf" },
							{ name: "IEC_60068-2-xx", href: "/Q2000/reports/IEC_60068-2-xx.pdf" },
							{ name: "IEC_61727", href: "/Q2000/reports/IEC_61727.pdf" },
							{ name: "IEC_62109_1_2", href: "/Q2000/reports/IEC_62109_1_2.pdf" },
							{ name: "UL1741-Report", href: "/Q2000/reports/UL1741-Report.pdf" }
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
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Certifications</h3>
					<div className="grid gap-3">
						{[
							{ name: "CU72239343.01-.02", href: "/Q2000/certs/CU72239343.01-.02.pdf" },
							{ name: "CU72239343.03", href: "/Q2000/certs/CU72239343.03.pdf" },
							{ name: "CU72239343.04", href: "/Q2000/certs/CU72239343.04.pdf" },
							{ name: "SPARQ_Cert_CS000052", href: "/Q2000/certs/SPARQ_Cert_CS000052.pdf" }
						].map((cert) => (
							<div key={cert.name} className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<Link target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={cert.href}>
									{cert.name}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	},
	{
		title: "Documentation",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (selectedModel: string) => (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Installation Manuals for {selectedModel}</h3>
				<div className="grid gap-3">
					{[
						{ name: "North America", href: "/Q2000/Q2000_Americas.pdf" },
						{ name: "China", href: "/Q2000/Q2000_Chinese.pdf" },
						{ name: "Europe", href: "/Q2000/Q2000_Europe.pdf" },
						{ name: "India", href: "/Q2000/Q2000_India.pdf" }
					].map((manual) => (
						<div key={manual.name} className="flex items-center gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
							<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={manual.href} target="_blank">
								{manual.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		)
	},
	{
		title: "Comparison with Leading Microinverter",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					<Link href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors">
						Comparison with Enphase IQ8H (PDF)
					</Link>
				</div>
			</div>
		)
	}
]

export default function Quad2Page() {
	const models = ["Q2000-4102", "Q2000-4102-DM", "Q2000-4102-GT"]
	const [selectedModel, setSelectedModel] = useState<string>(models[0])
	const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
	const trackEvent = useTrackEvent()

	const toggleExpanded = (i: number) => {
		setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
		if (!dropdownExpanded[i]) {
			trackEvent("dropdown_opened", {
				"parent": "quad2",
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
									<div className="p-6 bg-white dark:bg-gray-800">
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
				model="Q2000"
				heading="Quad2 Microinverter"
				animated={true}
				parent="Quad2"
				href="quad2"
				animatedList={listContent}
				expandedContent={expanded()}
				accordianContent={Accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}