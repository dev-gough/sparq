'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

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
		<p className="text-brand-gray mt-4">
			The Q1200 is a legacy product that has been discontinued.  See below for the technical manuals, or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> for support.
		</p>
	)
}

export default function LegacyProductPage() {
	const models = ["Q1200-4102-GT", "Q1200-4102-DM"]
	const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

	function accordion() {
		return (
			<div className="py-4">
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