'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import Link from "next/link"
import FAQs from "./faqs.json"

function image() {
	return (
		<Image
			src="/sparqvu.png"
			alt="Sparq Linq Monitoring Tool"
			width={1920}
			height={1084}
			className="object-contain sticky top-16 z-10 rounded-xl"
		/>
	)
}

function body() {
	return (
		<p className="text-brand-gray mt-4 text-lg">
			Manage multi-site monitoring with SparqVu, a performance management system with intuitive displays to help you quickly spot issues and troubleshoot in real time.</p>
	)
}

export default function SparqVuPage() {
	function accordion() {
		return (
			<div className="p-4 sm:mt-16">
				<AccordionItem title="Features" className="sticky top-[58px] sm:relative sm:top-auto" parent="sparqvu">
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
				<AccordionItem title="Documentation" parent="sparqvu">
					<Link href="/SparqVu.pdf" target="_blank" className="text-blue-400 hover:underline cursor-pointer">SparqVu Manual</Link>
				</AccordionItem>
				<AccordionItem title="SparqVu FAQs" parent="sparqvu">
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
				heading="SparqVu - Your Energy Management System"
				parent="SparqVu"
				href="sparqvu"
				bodyContent={body()}
				accordianContent={accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}