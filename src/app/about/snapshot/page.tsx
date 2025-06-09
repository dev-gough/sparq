'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from "@/components/ui/card"
import { FaAward } from 'react-icons/fa'
import { Calendar, Zap, Package, Trophy } from 'lucide-react'

interface TimelineItem {
	year: string
	event: string
}

interface SectionData {
	id: string
	title: string
	icon: React.ReactNode
	color: string
	items: (string | TimelineItem)[]
}

const sectionData: SectionData[] = [
	{
		id: "history",
		title: "History",
		icon: <Calendar size={24} />,
		color: "from-brand-maroon to-brand-darkmaroon",
		items: [
			{ year: "2009", event: "Dr. Praveen Jain, Director of ePower at Queens University, founded SPARQ" },
			{ year: "2018", event: "Manufacturing in North America" },
			{ year: "2021", event: "Raised $64M venture funding, and went public under SPRQ.V ticker on TSXV" },
			{ year: "2022", event: "Manufacturing in China" },
			{ year: "2024", event: "Partnership with Jio Reliance, India's largest IoT and Renewable Energy company" },
			{ year: "2025", event: "Included in the TSX Venture 50 list in Clean Technology and Renewable Energy" }
		]
	},
	{
		id: "disrupting",
		title: "Disrupting PV Industry",
		icon: <Zap size={24} />,
		color: "from-brand-logo to-brand-yellow",
		items: [
			"HF soft-switching quad and duo architecture driven by real-time and accurate controls",
			"Elimination of electrolytic caps and short-life components",
			"Much lower product life-cycle-cost, manufacturing, logistics, installation, and maintenance",
			"Safe and highly reliable, without risk of high voltage DC arcing and electric shock",
			"Best in-class product performance, efficiency, and lowest volume, weight, and cost"
		]
	},
	{
		id: "products",
		title: "Products",
		icon: <Package size={24} />,
		color: "from-mission to-brand-maroon",
		items: [
			{ year: "2020", event: "Q2000 single-phase microinverter" },
			{ year: "2020", event: "Energy management and performance monitoring system (SparqLinq)" },
			{ year: "2020", event: "Cloud web-based data monitoring system (SparqVu)" },
			{ year: "2024", event: "Q2000 Dual-mode microinverter" },
			{ year: "2024", event: "Grid-tied three-phase microinverter" },
			{ year: "2025", event: "Integrated PV and Battery Quad microinverter" },
			{ year: "2025", event: "User App: SparqSync for Android and iOS" }
		]
	},
	{
		id: "awards",
		title: "Patents & Awards",
		icon: <Trophy size={24} />,
		color: "from-values to-brand-logo",
		items: [
			"More than 85 patents awarded and pending",
			"Received Frost & Sullivan's 2017 'New Product Innovation Award'",
			"Founder Dr. Praveen Jain received multiple world-class awards"
		]
	}
]


interface SectionProps {
	section: SectionData
	index: number
}

function Section({ section, index }: SectionProps) {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
	const isEven = index % 2 === 0

	return (
		<motion.section
			ref={sectionRef}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="mb-16"
		>
			{/* Section Header */}
			<div className={`flex items-center gap-4 mb-8 ${isEven ? 'justify-start' : 'justify-end'}`}>
				{!isEven && (
					<h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon">
						{section.title}
					</h2>
				)}
				<div className={`p-3 bg-gradient-to-br ${section.color} rounded-xl text-white shadow-lg`}>
					{section.icon}
				</div>
				{isEven && (
					<h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon">
						{section.title}
					</h2>
				)}
			</div>

			{/* Timeline Content for History and Products */}
			{(section.id === "history" || section.id === "products") && (
				<div className={`max-w-5xl ${isEven ? 'ml-0' : 'ml-auto'} space-y-6`}>
					{(section.items as TimelineItem[]).map((item, itemIndex) => (
						<motion.div
							key={itemIndex}
							initial={{ opacity: 0, x: isEven ? -30 : 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: itemIndex * 0.08 }}
							className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
						>
							<div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${section.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
								{item.year}
							</div>
							<Card className="flex-1 backdrop-blur-md bg-white/80 border-brand-maroon/20 shadow-lg rounded-xl">
								<CardContent className="px-4 py-2">
									<p className="text-brand-graytext leading-relaxed">{item.event}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			)}

			{/* List Content for Disrupting and Awards */}
			{(section.id === "disrupting" || section.id === "awards") && (
				<div className={`max-w-5xl ${isEven ? 'ml-0' : 'ml-auto'} space-y-4`}>
					{(section.items as string[]).map((item, itemIndex) => (
						<motion.div
							key={itemIndex}
							initial={{ opacity: 0, x: isEven ? -30 : 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.4, delay: itemIndex * 0.08 }}
						>
							<Card className="backdrop-blur-md bg-white/80 border-brand-maroon/20 shadow-lg rounded-xl">
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className={`w-2 h-2 rounded-full bg-gradient-to-br ${section.color} mt-2 flex-shrink-0`} />
										<p className="text-brand-graytext leading-relaxed">{item}</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{/* Special Awards Subsection */}
					{section.id === "awards" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="mt-6"
						>
							<Card className="backdrop-blur-md bg-gradient-to-br from-brand-maroon/5 to-brand-logo/5 border-brand-maroon/20 shadow-lg rounded-xl">
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-brand-darkmaroon mb-4 flex items-center gap-3">
										<FaAward className="text-brand-logo text-2xl" />
										Dr. Praveen Jain's Awards
									</h3>
									<div className="space-y-3">
										{[
											{ year: "2017", award: "Canada Electric Power Medal" },
											{ year: "2021", award: "IEEE Medal in Power Engineering" },
											{ year: "2023", award: "Killam Prize in Engineering" }
										].map((award, awardIndex) => (
											<motion.div
												key={awardIndex}
												initial={{ opacity: 0, x: isEven ? -20 : 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.3, delay: awardIndex * 0.05 }}
												className="flex items-center gap-3"
											>
												<div className="w-12 h-12 bg-gradient-to-br from-brand-logo to-brand-yellow rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
													{award.year}
												</div>
												<p className="text-brand-graytext font-medium">{award.award}</p>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</div>
			)}
		</motion.section>
	)
}

export default function CompanySnapshot() {
	const titleRef = useRef(null)
	const isInView = useInView(titleRef, { once: true })

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
			{/* Hero section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<motion.div
					ref={titleRef}
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
						<span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
							Our Journey
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
						Explore the milestones, innovations, and achievements that define Sparq Systems'
						commitment to revolutionizing solar energy technology.
					</p>
				</motion.div>
			</div>

			{/* Vertical Sections */}
			<div className="relative z-10 container mx-auto px-4 pb-20">
				<div className="max-w-7xl mx-auto space-y-20">
					{sectionData.map((section, index) => (
						<Section key={section.id} section={section} index={index} />
					))}
				</div>
			</div>
		</div>
	)
}