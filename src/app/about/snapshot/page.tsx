'use client'
import { useState } from 'react'

const cols = ["History", "Disrupting PV", "Products", "Patents & Awards", "Who We Are?"]

interface DropdownButtonProps {
	index: number
	title: string
}

export default function CompanySnapshot() {
	function DropdownButton({ index, title }: DropdownButtonProps) {
		return (<div className='w-full md:w-1/2 lg:w-1/5 p-2'>
			<button
				className={`w-full bg-brand-maroon text-white py-4 rounded-full flex items-center justify-center hover:bg-brand-darkmaroon transition-colors cursor-pointer ${openIndex === index ? "border-4 border-brand-logo" : "border-none"}`}
				onClick={() => toggleDropdown(index)}
			>
				<span className="text-4xl font-bold">{title}</span>
			</button>
		</div>
		)
	}

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleDropdown = (index: number) => {
		setOpenIndex(prev => (prev === index ? null : index));
	};

	return (
		<div className="bg-white">
			<div className="flex flex-wrap mt-4">
				{cols.map((title, index) => (
					<DropdownButton key={index} index={index} title={title} />
				))}
			</div>
			{openIndex === 0 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-disc list-outside pl-4 text-[40px] ">
						<li><strong>2009</strong>: Dr. Praveen Jain, Director of ePower at Queens University, founded SPARQ</li>
						<li><strong>2018</strong>: Manufacturing in North America</li>
						<li><strong>2021</strong>: Raised $64M venture funding, and went public under SPRQ.V ticker on TSXV</li>
						<li><strong>2022</strong>: Manufacturing in China</li>
						<li><strong>2024</strong>: Partnership with Jio Reliance, India&apos;s largest IoT and Renewable Energy company</li>
						<li><strong>2025</strong>: Included in the TSX Venture 50 list in Clean Technology and Renewable Energy</li>
					</ul>
				</div>
			)}
			{openIndex === 1 && (
				<div className='mt-4 w-full px-12'>
					<ul className='space-y-8 list-disc list-outside pl-4 text-[40px]'>
						<li>HF soft-switching quad and duo architecture driven by real-time and accurate controls</li>
						<li>Elimination of electrolytic caps and short-life components</li>
						<li>Much lower product life-cycle-cost, manufacturing, logistics, installation, and maintenance</li>
						<li>Safe and highly reliable, without risk of high voltage DC arcing and electric shock</li>
						<li>Best in-class product performance, efficiency, and lowest volume, weight, and cos</li>
					</ul>
				</div>

			)}
			{openIndex === 2 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-disc list-outside pl-4 text-[40px] ">
						<li><strong>2020</strong>: Q2000 1p microinverter</li>
						<li><strong>2020</strong>: Energy management and performance monitoring system (SparqLinq)</li>
						<li><strong>2020</strong>: Cloud based data monitoring system (SparqVu)</li>
						<li><strong>2024</strong>: Q2000 Dual-mode microinverter</li>
						<li><strong>2024</strong>: Grid-tied 3 phase microinverter</li>
						<li><strong>2025</strong>: Integrated PV and Battery Quad microinverter</li>
						<li><strong>2025</strong>: Sparq User App for Android and iOS</li>
					</ul>
				</div>
			)}
			{openIndex === 3 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-disc list-outside pl-4 text-[40px]">
						<li>More than 85 patents awarded and pending</li>
						<li>Received Frost & Sullivan&apos;s 2017 &apos;New Product Innovation Award&apos;</li>
						<li>
							Founder Dr. Praveen Jain received multiple world-class awards
							<ul className='ps-5 mt-2 space-y-2 list-disc list-inside'>
								<li><strong>2017</strong>: Canada Electric Power Medal</li>
								<li><strong>2021</strong>: IEEE Medal in Power Engineering</li>
								<li><strong>2023</strong>: Killam Prize in Engineering</li>
							</ul>
						</li>

					</ul>
				</div>
			)}
			{openIndex === 4 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-disc list-outside pl-4 text-[40px]">
						<li><strong>Core Values</strong>: Integrity, Collaboration, Innovation, Quality, Social Responsibility, Teamwork</li>
						<li><strong>Mission</strong>: Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</li>
						<li><strong>Vision</strong>: Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.</li>
						<li><strong>Value</strong>: Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.</li>
					</ul>
				</div>
			)}
		</div>
	)
}