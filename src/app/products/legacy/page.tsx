'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

function expanded() {
	return (
		<div className="text-brand-gray text-xl">
			<p className="mt-4"><strong>Performance That Powers More</strong>: Engineered with high-frequency, soft-switching power electronics and advanced real-time control, the Quad3 ensures maximum energy harvesting and grid resilience. With individual MPPT for each panel, your system achieves optimal output even in partially shaded conditions. It&apos;s also built for the future - scalable, flexible, and ready for both on-grid and off-grid operations.</p>
			<p className="mt-4"><strong>Safety You Can Count On</strong>: The Quad3 eliminates traditional risks with no HV DC cabling, no electrolytic capacitors, and all-AC wiring that complies with Rapid Shutdown (RSD) regulations. It&apos;s a high-reliability, high-availability solution with no single point of failure, minimizing risk while maximizing uptime.</p>
			<p className="mt-4"><strong>Cost-Effectiveness Without Compromise</strong>: Backed by a Quad Architecture that reduces both manufacturing and installation costs, the Quad3 also minimizes Balance of System (BoS) requirements. With lowest lifecycle cost and maintenance-free operation, it stands out as an outlier on the Performance-Cost curve.</p>
			<p className="text-brand-gray font-semibold text-lg mt-2">Whether you&apos;re powering a home or a commercial system, the Quad3 microinverter delivers unmatched value, reliability, and smart energy management — all in one compact, user-friendly package.</p>
		</div>
	)
}

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
		<p className="text-brand-gray mt-4 sm:text-lg">
			The Q1200 is a legacy product that has been discontinued.  See below for the technical manuals, or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> for support.
		</p>
	)
}

export default function LegacyProductPage() {
	const models = ["Q1200-4102-GT", "Q1200-4102-DM"]
	const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

	function accordion() {
		return (
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
				accordianContent={accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}