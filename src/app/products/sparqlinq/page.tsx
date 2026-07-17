'use client'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import YTVideo from "@/components/YTVideo"

function image() {
	return (
		<Image
			src="/SparqLinq.jpg"
			alt="SparqLinq Monitoring Tool"
			width={800}
			height={451}
			sizes="(max-width: 1024px) 90vw, 480px"
			className="object-contain sticky top-16 z-10 rounded-xl w-full h-auto"
			priority
		/>
	)
}

function body() {
	return (
		<p className="text-brand-gray dark:text-dark-text-secondary mt-4">
			Access and monitor your energy system data at any time with SparqLinq, our smart interface for the Quad2 and Quad3. SparqLinq can be used on nearly any device and is backed by industry standard Zigbee wireless communication, providing access to real-time data and historical records.</p>
	)
}

const listContent: ListEntry[] = [
	{
		heading: "Data when you need it",
		items: [
			"Advanced performance and communication tools with no app required",
			"Real-time metrics, historical records and panel-by-panel information",
			"Cloud-based monitoring"
		]
	},
	{
		heading: "Quick Installation",
		items: [
			"Automatically detects connected inverters before AC is connected",
			"Installation layout syncs automatically to your cloud account"
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
		title: "Documentation",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="space-y-6">
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Technical Specifications</h3>
					<div className="space-y-3">
						<div>
							<h4 className="font-semibold text-brand-graytext dark:text-dark-text-secondary mb-2">SL200-2001 Datasheet</h4>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/sparqlinq-specsheet.pdf" target="_blank" rel="noopener noreferrer">
									Download SL200-2001 Datasheet (PDF)
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Installation Documentation</h3>
					<div className="grid gap-3">
						<div>
							<h4 className="font-semibold text-brand-graytext dark:text-dark-text-secondary mb-2">Quick Install Guide for SL200-2001</h4>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/sparqlinq-quickinstall.pdf" target="_blank" rel="noopener noreferrer">
									All Regions
								</a>
							</div>
						</div>
						<div>
							<h4 className="font-semibold text-brand-graytext dark:text-dark-text-secondary mb-2">LED Indicator Guide for SL200-2001</h4>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/sparqlinq-ledguide.pdf" target="_blank" rel="noopener noreferrer">
									SparqLinq-LEDGuide.pdf
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},
	{
		title: "Installation Video",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<YTVideo
					videoIds={["nhH8LrnONxs"]}
					videoTitles={{ "nhH8LrnONxs": "SparqLinq Installation Guide" }}
					fullWidth={true}
				/>
			</div>
		)
	}
]

export default function SparqLinqPage() {
	const models = ["SL200-2001"]
	const [selectedModel, setSelectedModel] = useState<string>(models[0])
	const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
	const trackEvent = useTrackEvent()

	const toggleExpanded = (i: number) => {
		setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
		if (!dropdownExpanded[i]) {
			trackEvent("dropdown_opened", {
				"parent": "sparqlinq",
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
		return (
			<div className="py-6 space-y-6 max-w-4xl">
				{accordionSections.map((section, index) => (
					<div
						key={index}
					>
						<Card
							className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl py-0"
						>
							<CardContent className="p-0">
								<button
									type="button"
									className={`${section.accentColor} p-6 text-white cursor-pointer w-full text-left`}
									onClick={() => toggleExpanded(index)}
									aria-expanded={!!dropdownExpanded[index]}
								>
									<div className="flex items-center gap-4">
										<div className="flex-shrink-0" aria-hidden>
											{getIconForCategory(section.title)}
										</div>
										<span className="text-xl md:text-2xl font-bold flex-1">{section.title}</span>
										<div
											className={`flex-shrink-0 transition-transform duration-300 ${dropdownExpanded[index] ? "rotate-180" : ""}`}
											aria-hidden
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</div>
									</div>
								</button>

								{dropdownExpanded[index] && (
									<div className="p-6 bg-white dark:bg-gray-800">
										{typeof section.content === 'function' ? section.content(selectedModel) : section.content}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		)
	}

	return (
		<div>
			<ProductPage
				models={models}
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
				model="SL200-2001"
				heading="SparqLinq: Real-time performance monitoring"
				animated={true}
				parent="SparqLinq"
				href="sparqlinq"
				animatedList={listContent}
				bodyContent={body()}
				accordianContent={Accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}