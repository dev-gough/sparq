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
			src="/q1200-discontinued.png"
			alt="Q2000 Microinverter"
			width={1920}
			height={1084}
			className="object-contain sticky top-16 z-10"
		/>
	)
}

function body() {
	return (
		<p className="text-brand-gray dark:text-dark-text-secondary mt-4">
			The Q1200 is a legacy product that has been discontinued.  See below for the technical manuals, or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> for support.
		</p>
	)
}

interface AccordionSection {
	title: string
	content: React.ReactNode | ((selectedModel: string) => React.ReactNode)
	accentColor: string
}

const accordionSections: AccordionSection[] = [
	{
		title: "Technical Specifications",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (selectedModel: string) => (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Datasheet for {selectedModel}</h3>
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
					{selectedModel === "Q1200-4102-GT" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q1200/Q1200-GT-discontinued.pdf" target="_blank">
							Download Q1200-4102-GT Datasheet (PDF)
						</Link>
					)}
					{selectedModel === "Q1200-4102-DM" && (
						<Link className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q1200/Q1200-DM-discontinued.pdf" target="_blank">
							Download Q1200-4102-DM Datasheet (PDF)
						</Link>
					)}
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
						{ name: "North America", href: "/Q1200/Q1200-Installer-NA.pdf" },
						{ name: "India", href: "/Q1200/Q1200-Installer-India.pdf" }
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
	}
]

export default function LegacyProductPage() {
	const models = ["Q1200-4102-GT", "Q1200-4102-DM"]
	const [selectedModel, setSelectedModel] = useState<string>(models[0])
	const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({ 0: true, 1: true })
	const trackEvent = useTrackEvent()

	const toggleExpanded = (i: number) => {
		setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
		if (!dropdownExpanded[i]) {
			trackEvent("dropdown_opened", {
				"parent": "legacy",
				"dropdown": accordionSections[i].title,
			})
		}
	}

	const getIconForCategory = (title: string) => {
		if (title.toLowerCase().includes('technical') || title.toLowerCase().includes('specifications')) {
			return (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v1a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-2 2H9m-6 0a2 2 0 002 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2zm8 0V9a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
				model="Q1200"
				heading="Q1200 Microinverter"
				parent="Legacy Products"
				href="legacy"
				bodyContent={body()}
				accordianContent={Accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}