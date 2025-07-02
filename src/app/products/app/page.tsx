'use client'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import VideoPlayer from "@/components/VideoPlayer"
import { useState, useRef } from 'react'
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { useTrackEvent } from "@/hooks/useTrackEvent"

function expanded() {
	return (
		<>
			<p className="mt-4">Effortlessly track real-time energy data, monitor system health, and explore historical performance trends right from your smartphone. SparqSync gives you complete visibility over your installations, helping you make informed decisions and stay up to date.</p>
			<p className="mt-4">Designed with a sleek, intuitive interface, SparqSync brings clarity and confidence to solar system monitoring.</p>
			<p className="font-bold text-black mt-4">Stay in sync with your solar system - with SparqSync</p>
		</>
	)
}

function image() {
	return (
		<div className="flex items-center justify-center gap-4">
			<div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
				<Image
					src="/app1.jpg"
					alt=""
					fill
					className="object-cover"
					sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
					priority
				/>
			</div>
			<div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
				<Image
					src="/app2.jpg"
					alt=""
					fill
					className="object-cover"
					sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
				/>
			</div>
		</div>
	)
}

function body() {
	return (
		<div>
			<p className="mt-4">Now unveiling SparqSync, the all-new mobile monitoring solution designed exclusively for Sparq customers. With SparqSync, staying connected to your solar energy system has never been easier - or more powerful.</p>
			<p className="font-bold mt-4 text-black">Coming to iOS and Android in May 2025.</p>
		</div>
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
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">Real-time insights</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Track energy data, grid voltage, and energy totals</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Alerts for system faults, inverter health, and more</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>On-site current and future weather</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<div>
								<span className="font-bold">Per-inverter details:</span>
								<ul className="mt-1 ml-4 space-y-1">
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-1.5 flex-shrink-0" />
										<span>Power, Voltage, and Energy</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-1.5 flex-shrink-0" />
										<span>Temperature, lifetime energy, and VAr-Hours</span>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-3">Control in the palm of your hand</h3>
					<ul className="space-y-2 text-brand-graytext dark:text-dark-text-secondary">
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>View/Manage Ground Faults (GFDI)</span>
						</li>
						<li className="flex items-start gap-3">
							<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo mt-2 flex-shrink-0" />
							<span>Set up new projects as they are built</span>
						</li>
					</ul>
				</div>
			</div>
		)
	},
	{
		title: "Watch the Demo",
		accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		content: (
			<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
				<div className="w-full aspect-video">
					<VideoPlayer src="/external-sparq-app.mp4" />
				</div>
			</div>
		)
	}
]

export default function SparqSyncPage() {
	const [dropdownExpanded, setDropdownExpanded] = useState<Record<number, boolean>>({})
	const trackEvent = useTrackEvent()

	const toggleExpanded = (i: number) => {
		setDropdownExpanded(prev => ({ ...prev, [i]: !prev[i] }))
		if (!dropdownExpanded[i]) {
			trackEvent("dropdown_opened", {
				"parent": "app",
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
		if (title.toLowerCase().includes('demo') || title.toLowerCase().includes('watch')) {
			return (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.828 2.828a1 1 0 01.293.707V15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1m-6 0h6" />
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
				heading="SparqSync Mobile App"
				parent="SparqSync"
				href="app"
				bodyContent={body()}
				expandedContent={expanded()}
				accordianContent={Accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}