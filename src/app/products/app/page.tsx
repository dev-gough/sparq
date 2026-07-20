'use client'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"

function expanded() {
	return (
		<>
			<p className="mt-4">Effortlessly track real-time energy data, monitor system health, and explore historical performance trends right from your smartphone. SparqSync gives you complete visibility over your installations, helping you make informed decisions and stay up to date.</p>
			<p className="mt-4">Designed with a sleek, intuitive interface, SparqSync brings clarity and confidence to solar system monitoring.</p>
			<p className="font-bold text-black dark:text-dark-text-secondary mt-4">Stay in sync with your solar system - with SparqSync</p>
		</>
	)
}

function image() {
	return (
		<div className="flex items-center justify-center gap-4">
			<div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
				<Image
					src="/app1.webp"
					alt="SparqSync mobile app home screen"
					fill
					className="object-cover"
					sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
					priority
				/>
			</div>
			<div className="relative aspect-[9/19.5] w-[180px] md:w-[220px] lg:w-[260px] rounded-3xl border-8 border-gray-300 shadow-lg overflow-hidden">
				<Image
					src="/app2.webp"
					alt="SparqSync app inverter detail screen"
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
		</div>
	)
}

const listContent: ListEntry[] = [
	{
		heading: "Real-time insights",
		items: [
			"Track energy data, grid voltage, and energy totals",
			"Alerts for system faults, inverter health, and more",
			"On-site current and future weather",
			<span key="per-inverter-details">
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
			</span>
		]
	},
	{
		heading: "Control in the palm of your hand",
		items: [
			"View/Manage Ground Faults (GFDI)",
			"Set up new projects as they are built",
			"Push notifications for any issues"
		]
	}
]

export default function SparqSyncPage() {
	return (
		<div>
			<ProductPage
				heading="SparqSync Mobile App"
				animated={true}
				parent="SparqSync"
				href="app"
				animatedList={listContent}
				bodyContent={body()}
				expandedContent={expanded()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}
