'use client'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from 'react'
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"

function image() {
	return (
		<Image
			src="/sparqvu.png"
			alt="SparqVu Monitoring Tool"
			width={1920}
			height={1084}
			className="object-contain sticky top-[100px] z-10 rounded-xl"
		/>
	)
}

function body() {
	return (
		<p className="text-brand-gray mt-4">
			Manage multi-site monitoring with SparqVu, a performance management system with intuitive displays to help you quickly spot issues and troubleshoot in real time.</p>
	)
}

interface AccordionSection {
	title: string
	content: React.ReactNode
	accentColor: string
}

const accordionSections: AccordionSection[] = [
	{
		title: "Features",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="space-y-6">
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">Data when you need it</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Advanced performance and communication tools with no app required</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Real-time metrics, historical records and panel-by-panel information</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Cloud-based monitoring</span>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
					<h3 className="font-bold text-brand-darkmaroon mb-3">Quick Installation</h3>
					<ul className="space-y-2 text-brand-graytext">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Automatically detects connected inverters before AC is connected</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Installation layout syncs automatically to your cloud account</span>
						</li>
					</ul>
				</div>
			</div>
		)
	},
	{
		title: "Documentation",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50">
				<h3 className="font-bold text-brand-darkmaroon mb-4">Manual</h3>
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					<Link href="/SparqVu.pdf" target="_blank" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors">
						SparqVu Manual (PDF)
					</Link>
				</div>
			</div>
		)
	}
]

export default function SparqVuPage() {
	const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
	const trackEvent = useTrackEvent()

	const toggleExpanded = (i: number) => {
		setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
		if (!dropdownExpanded[i]) {
			trackEvent("dropdown_opened", {
				"parent": "sparqvu",
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
										{section.content}
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
				heading="SparqVu - Your Energy Management System"
				parent="SparqVu"
				href="sparqvu"
				bodyContent={body()}
				accordianContent={Accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}