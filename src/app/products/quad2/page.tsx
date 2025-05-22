'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import Link from "next/link"
import { useState } from 'react'
import FAQs from "./faqs.json"

function expanded() {
	return (
		<div className="text-brand-gray text-xl">
			<p className="text-brand-gray mt-4 sm:text-lg">
				SPARQ&apos;s revolutionary Quad microinverters are game changers for the solar power industry. Unlike traditional microinverters that have one photovoltaic (PV) module inputting into one microinverter, our Quad microinverters have four individual DC input channels to enable independent peak power tracking for up to four PV modules. This allows significant reduction in installation time and cable costs. Based on a Per-Watt rating, our Quad microinverters have <strong>the lowest microinverter cost, the highest power output, the highest power density, and the lowest weight in the industry.</strong>
			</p>
			<p className="mt-2">Our microinverters have been designed for high reliability, using patented technologies that eliminate the use of short-life electrolytic capacitors. This feature gives our microinverters high reliability and a design life of 25 years, matching the design life of PV modules.</p>
			<p className="mt-2">The Q2000 microinverter is the industry&apos;s first highest power rating microinverter that produces electrical energy from four PV panels of 550W+ each, without any power clipping under all operating conditions. The Q2000 is designed to connect 4 PV panels, up to 550W, to the AC power grid.</p>
		</div>
	)
}

function image() {
	return (
		<Image
			src="/q2000.webp"
			alt="Q2000 Microinverter"
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
			<span>Highest power per unit weight [W/kg] or volume [W/in<sup>3</sup>]</span>,
			"Maximum energy harvesting",
			"Dual-mode operation (on/off-grid)",
			"Individual MPPT for each panel",
			"Ultra high-frequency, soft switching topolgy",
			"Grid Resiliency without energy storage",
			"Grid Independence and energy self-sufficiency",
			<span><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</span>,
			<span><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</span>,
			<span><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</span>
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
			"Quad Architecture",
			"Reduced manufacturing Bill of Materials",
			"Reduced Balance of System (cabling, grounding, ect)",
			"Lower manufacturing and installation costs",
			"Maintenance-free",
			"Lowest lifecycle cost",
			"Outlier on Performance-Cost curve",
		]
	}
]

export default function Quad2Page() {
	const models = ["Q2000-4102", "Q2000-4102-DM", "Q2000-4102-GT"]
	const [selectedModel, setSelectedModel] = useState<string | null>(models[0])

	function accordion() {
		return (
			<div className="p-4 sm:mt-16">
				<AccordionItem title="Features" className="sticky top-[66px] sm:relative sm:top-auto" parent="quad2">
					<ul className="list-inside list-decimal text-brand-maroon">
						<li className="mb-4"> <strong>Superior Value</strong>
							<ul className="list-inside list-disc text-black">
								<li>Low design/installation costs</li>
								<li>Lowest cost per Watt in the industry </li>
								<li>Reduced installation costs</li>
								<li>Robust IOT gateway for monitoring and control</li>
							</ul>
						</li>
						<li className="my-4"> <strong>High Energy Harvest</strong>
							<ul className="list-inside list-disc text-black">
								<li>Greater energy harvest compared to string inverters</li>
								<li>Advanced power electronics for low-light environments</li>
								<li>Independent maximum energy harvest for each module</li>
							</ul>
						</li>
						<li className="my-4"> <strong>Best in-class reliability</strong>
							<ul className="list-inside list-disc text-black">
								<li>No electrolytic capacitors or other components with short lifetimes</li>
								<li>Smart-grid ready, works on any grid, anywhere</li>
								<li>No single point of failure</li>
								<li>Rapid-Shutdown compliance</li>
							</ul>
						</li>
						<li className="my-4"> <strong>Easy to Install</strong>
							<ul className="list-inside list-disc text-black">
								<li>Quad system design reduces the required number of conventional microinverters by a factor of 4</li>
								<li>&quot;All AC&quot; solution promotes safe installation and operation with low voltage</li>
								<li>Industry-standard Amphenol AC connectors, using Zigbee&apos;s open wireless communication protocol for individual node monitoring</li>
							</ul>
						</li>
					</ul>
				</AccordionItem>
				<AccordionItem title="Technical Specifications" parent="quad2">
					<div>
						{selectedModel === "Q2000-4102" && (
							<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102.pdf" target="_blank">
								Datasheet for {selectedModel}
							</Link>
						)}
						{selectedModel === "Q2000-4102-DM" && (
							<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102_DM.pdf" target="_blank">
								Datasheet for {selectedModel}
							</Link>
						)}
						{selectedModel === "Q2000-4102-GT" && (
							<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Datasheet_Q20004102_GT_V2.pdf" target="_blank">
								Datasheet for {selectedModel}
							</Link>
						)}
					</div>
				</AccordionItem>
				<AccordionItem title="Certifications" parent="quad2">
					<h2 className="text-xl font-bold mb-4">Reports</h2>
					<div className="flex flex-col">
						<Link target="_blank" className="text-blue-500 hover:text-blue-700" href="/Q2000/reports/EN_61683.pdf">EN_61683</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700" href="/Q2000/reports/IEC_60068-2-xx.pdf">IEC_60068-2-xx</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700" href="/Q2000/reports/IEC_61727.pdf">IEC_61727</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700" href="/Q2000/reports/IEC_62109_1_2.pdf">IEC_62109_1_2</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700" href="/Q2000/reports/UL1741-Report.pdf">UL1741-Report</Link>
					</div>
					<h2 className="text-xl font-bold my-4">Certifications</h2>
					<div className="flex flex-col">
						<Link target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline" href="/Q2000/certs/CU72239343.01-.02.pdf">CU72239343.01-.02</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline" href="/Q2000/certs/CU72239343.03.pdf">CU72239343.03</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline" href="/Q2000/certs/CU72239343.04.pdf">CU72239343.04</Link>
						<Link target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline" href="/Q2000/certs/SPARQ_Cert_CS000052.pdf">SPARQ_Cert_CS000052</Link>
					</div>
				</AccordionItem>
				<AccordionItem title="Documentation" parent="quad2">
					<h2 className="text-lg font-bold">Installation Manuals for {selectedModel}:</h2>
					<div className="flex flex-col">
						<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Americas.pdf" target="_blank">North America</Link>
						<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Chinese.pdf" target="_blank">China</Link>
						<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_Europe.pdf" target="_blank">Europe</Link>
						<Link className="text-blue-500 hover:text-blue-700" href="/Q2000/Q2000_India.pdf" target="_blank">India</Link>
					</div>
				</AccordionItem>
				<AccordionItem title="Comparison with Leading Microinverter" parent="quad2">
					<Link href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" target="_blank" className="text-blue-400 hover:underline cursor-pointer">Comparison with Enphase IQ8H</Link>
				</AccordionItem>
				<AccordionItem title="Q2000 FAQs" parent="quad2">
					{FAQs.subQuestions.map((item) => (
						<div key={item.id} className="text-gray-700 my-4">
							<strong className="text-brand-maroon">{item.question}</strong><br></br>{" "}
							{item.answer}
						</div>
					))}
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
				model="Q2000"
				heading="Q2000 Microinverter"
				animated={true}
				parent="Quad2"
				href="quad2"
				animatedList={listContent}
				expandedContent={expanded()}
				accordianContent={accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}