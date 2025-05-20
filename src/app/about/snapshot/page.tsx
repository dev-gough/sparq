'use client'
import { useState } from 'react'
import { FaAward } from 'react-icons/fa'
import Link from 'next/link'

const cols = ["History", "Disrupting PV", "Products", "Patents & Awards"]

interface DropdownButtonProps {
	index: number
	title: string
}

export default function CompanySnapshot() {
	function DropdownButton({ index, title }: DropdownButtonProps) {
		return (
			<div className='w-full md:w-1/2 lg:w-1/5 p-2'>
				<button
					className={`w-full bg-brand-maroon text-white py-4 rounded-full flex items-center justify-center hover:bg-brand-darkmaroon transition-colors cursor-pointer ${openIndex === index ? "border-4 border-brand-logo" : "border-none"}`}
					onClick={() => toggleDropdown(index)}
				>
					<span className="text-4xl font-bold">{title}</span>
				</button>
			</div>
		)
	}

	function CustomLI({ children }: { children: React.ReactNode }) {
		return (
			<li className='relative pl-10'>
				<span className='absolute left-0 top-3'>
					<FaAward className='size-8 mr-8' />
				</span>
				{children}
			</li>
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
				<div className='w-full md:w-1/2 lg:w-1/5 p-2'>
					<Link
						href="/about"
						className="w-full bg-brand-maroon text-white py-4 rounded-full flex items-center justify-center hover:bg-brand-darkmaroon transition-colors cursor-pointer"
					>
						<span className="text-4xl font-bold">Read More</span>
					</Link>
				</div>
			</div>
			{/* make this a switch case? */}
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
						<li>Best in-class product performance, efficiency, and lowest volume, weight, and cost</li>
					</ul>
				</div>

			)}
			{openIndex === 2 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-disc list-outside pl-4 text-[40px] ">
						<li><strong>2020</strong>: Q2000 single-phase microinverter</li>
						<li><strong>2020</strong>: Energy management and performance monitoring system (SparqLinq)</li>
						<li><strong>2020</strong>: Cloud web-based data monitoring system (SparqVu)</li>
						<li><strong>2024</strong>: Q2000 Dual-mode microinverter</li>
						<li><strong>2024</strong>: Grid-tied three-phase microinverter</li>
						<li><strong>2025</strong>: Integrated PV and Battery Quad microinverter</li>
						<li><strong>2025</strong>: User App: SparqSync for Android and iOS</li>
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
							<ul className='mt-2 space-y-2 list-none'>
								<CustomLI><strong>2017</strong>: Canada Electric Power Medal</CustomLI>
								<CustomLI><strong>2021</strong>: IEEE Medal in Power Engineering</CustomLI>
								<CustomLI><strong>2023</strong>: Killam Prize in Engineering</CustomLI>
							</ul>
						</li>

					</ul>
				</div>
			)}
			{openIndex === 4 && (
				<div className="mt-4 w-full px-12">
					<ul className="space-y-8 list-none list-outside pl-4 text-[40px]">
						<li><strong>Core Values</strong>: Integrity, Collaboration, Innovation, Quality, Social Responsibility, Teamwork</li>
						<li><strong>Mission</strong>: Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</li>
						<li><strong>Vision</strong>: Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.</li>
						<li><strong>Values</strong>: Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.</li>
					</ul>
				</div>
			)}
		</div>
	)
}