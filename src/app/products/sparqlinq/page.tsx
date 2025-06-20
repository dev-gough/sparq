'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

function image() {
	return (
		<Image
			src="/SparqLinq.jpg"
			alt="SparqLinq Monitoring Tool"
			width={1920}
			height={1084}
			className="object-contain sticky top-16 z-10 rounded-xl"
		/>
	)
}

function body() {
	return (
		<p className="text-brand-gray mt-4">
			Access and monitor your energy system data at any time with SparqLinq, our smart interface for the Quad 2000 and Quad3. SparqLinq can be used on nearly any device and is backed by industry standard Zigbee wireless communication, providing access to real-time data and historical records.</p>
	)
}

export default function SparqLinqPage() {
	const models = ["SL200-2001"]
	const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

	function accordion() {
		return (
			<div className="p-4 sm:mt-16">
				<AccordionItem title="Features" className="sticky top-[66px] lg:relative lg:top-auto" parent="sparqlinq">
					<ul className="list-inside list-decimal text-brand-maroon">
						<li className="mb-4"> <strong>Data when you need it</strong>
							<ul className="list-inside list-disc text-black">
								<li>Advanced performance and communication tools
									with no app required</li>
								<li>Real-time metrics, historical records
									and panel-by-panel information</li>
								<li>Cloud-based monitoring</li>
							</ul>
						</li>
						<li className="my-4"> <strong>Quick Installation</strong>
							<ul className="list-inside list-disc text-black">
								<li>Automatically detects connected inverters
									before AC is connected</li>
								<li>Installation layout syncs automatically to your cloud account</li>
							</ul>
						</li>
					</ul>
				</AccordionItem>
				<AccordionItem title="Technical specifications" className="sticky top-[66px] lg:relative lg:top-auto" parent="sparqlinq">
					<div>
						<Link className="text-blue-500 hover:text-blue-700" href="/sparqlinq-specsheet.pdf" target="_blank">
							Datasheet for SL200-2001
						</Link>
					</div>
				</AccordionItem>
				<AccordionItem title="Documentation" className="sticky top-[66px] lg:relative lg:top-auto" parent="sparqlinq">
					<div className="my-2">
						<h2 className="text-lg font-bold">Quick Install Guide for SL200-2001:</h2>
						<Link className="text-blue-500 hover:text-blue-700" href="/sparqlinq-quickinstall.pdf" target="_blank">All Regions</Link>
					</div>
					<div className="my-2">
						<h2 className="text-lg font-bold">LED Indicator Guide for SL200-2001:</h2>
						<Link className="text-blue-500 hover:text-blue-700" href="/sparqlinq-ledguide.pdf" target="_blank">SparqLinq-LEDGuide.pdf</Link>
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
				model="SL200-2001"
				heading="SparqLinq: Real-time performance monitoring"
				parent="SparqLinq"
				href="sparqlinq"
				bodyContent={body()}
				accordianContent={accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}