'use client'
import ProductPage from "@/components/ProductPage"
import AccordionItem from "@/components/AccordionItem"
import Image from "next/image"
import VideoPlayer from "@/components/VideoPlayer"

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

export default function SparqSyncPage() {
	function accordion() {
		return (
			<div className="p-4 sm:mt-16 text-black">
				<AccordionItem title="Features" className="sticky top-[66px] lg:relative lg:top-auto" parent="app">
					<ul className="list-inside list-decimal text-brand-maroon">
						<li className="mb-4"> <strong>Real-time insights</strong>
							<ul className="list-inside list-disc text-black">
								<li>Track energy data, grid voltage, and energy totals</li>
								<li>Alerts for system faults, inverter health, and more</li>
								<li>On-site current and future weather</li>
								<li className="font-bold">
									Per-inverter details:
									<ul className="font-normal list-disc list-inside ps-5">
										<li>Power, Voltage, and Energy</li>
										<li>Temperature, lifetime energy, and VAr-Hours</li>
									</ul>
								</li>

							</ul>
						</li>
						<li className="my-4"> <strong>Control in the palm of your hand</strong>
							<ul className="list-inside list-disc text-black">
								<li>View/Manage Ground Faults (GFDI)</li>
								<li>Set up new projects as they are built</li>
							</ul>
						</li>
					</ul>
				</AccordionItem>
				<AccordionItem title="Watch the Demo" className="sticky top-[66px] lg:relative lg:top-auto" parent="app">
					<div className="w-full aspect-video">
						<VideoPlayer src="/external-sparq-app.mp4" />
					</div>
				</AccordionItem>
			</div>
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
				accordianContent={accordion()}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}