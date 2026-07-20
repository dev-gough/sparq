import DocsAccordion from '@/components/DocsAccordion'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import Link from "next/link"
import YouTubeFacade from '@/components/YouTubeFacade'

function expanded() {
	return (
		<>
			<p className="mt-4"><strong>Native Three-Phase Power Generation</strong>: The Quad3 is a true native three-phase microinverter that generates balanced three-phase power directly from solar panels, eliminating the complexity and losses associated with single-phase inverters in three-phase systems. Supporting 380V/400V/480V grid connections, it delivers 2,000W of clean power with exceptional grid compliance and anti-islanding protection.</p>
			<p className="mt-4"><strong>Revolutionary Tri-Mode Operation</strong>: Beyond traditional grid-tied operation, the Quad3 uniquely supports off-grid standalone mode and MPPT motor drive applications. It can operate as a variable frequency drive (0-130Hz) to run induction, BLDC, and PMSM motors directly from solar power, with parallel operation capability for higher power requirements. This versatility makes it ideal for commercial buildings, industrial facilities, and next-generation PV farms.</p>
			<p className="text-brand-gray dark:text-dark-text-secondary font-semibold mt-2">Whether you&apos;re powering a home or a commercial system, the Quad3 microinverter delivers unmatched value, reliability, and smart energy management - all in one compact, user-friendly package</p>
		</>
	)
}

function body() {
	return (
		<>
			<p className="mt-4"><strong>Industry-Leading Three-Phase Architecture</strong>: The Quad3 delivers native three-phase power through our patented soft-switching technology, achieving 97.5% maximum efficiency while completely eliminating failure-prone electrolytic capacitors. This breakthrough design provides a 25+ year operational life with maintenance-free reliability. Four independent PV input channels with dedicated MPPT controllers ensure maximum energy harvest from each panel, delivering up to 2,000W total nominal capacity with the highest power density in the microinverter industry.</p>
		</>
	)
}

function image() {
	return (
		<Image
			src="/quad3.webp"
			alt="Quad3 Microinverter"
			width={800}
			height={451}
			sizes="(max-width: 1024px) 90vw, 480px"
			className="object-contain sticky top-16 z-10 w-full h-auto"
			priority
		/>
	)
}

const listContent: ListEntry[] = [
	{
		heading: "Best in-class Performance",
		items: [
			<span key={"quad3-1"}>Highest power per unit weight [W/kg] or volume [W/in<sup>3</sup>]</span>,
			"Maximum energy harvesting",
			"Dual-mode operation (on/off-grid)",
			"Individual MPPT for each panel",
			"Ultra high-frequency, soft switching topolgy",
			"Grid Resiliency without energy storage",
			"Grid Independence and energy self-sufficiency",
			<span key={"quad3-2"}><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</span>,
			<span key={"quad3-3"}><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</span>,
			<span key={"quad3-4"}><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</span>
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
			"Quad Architecture is the most cost-effective",
			"Reduced manufacturing Bill of Materials",
			"Reduced Balance of System (cabling, grounding, ect)",
			"Lower manufacturing and installation costs",
			"Maintenance-free",
			"Lowest lifecycle cost",
			"Outlier on Performance-Cost curve",
		]
	}
]

interface AccordionSection {
	title: string
	content: React.ReactNode
	accentColor: string
}

export default function Quad3Page() {
	const accordionSections: AccordionSection[] = [
		{
			title: "Documentation",
			accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
			content: (
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<div className="space-y-6">
						<div>
							<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Datasheet for Quad3-4301</h3>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
																	<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3/quad3_datasheet.pdf" target="_blank" rel="noopener noreferrer">
										Download Quad3-4301 Datasheet (PDF)
									</a>
							</div>
						</div>
						<div>
							<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Installation Manual for Quad3-4301</h3>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3.pdf" target="_blank" rel="noopener noreferrer">
									All Regions
								</a>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Certifications",
			accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
			content: (
				<div className="space-y-6">
					<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
						<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Reports</h3>
						<div className="grid gap-3">
							{[
								{ name: "EN50549-1", href: "/Quad3/report/EN50549-1.pdf" },
								{ name: "EN 61000-6-3:2007", href: "/Quad3/report/EMC_Emissions_Report.pdf" },
								{ name: "IEC 62109.01.02", href: "/Quad3/report/IEC 62109.01.02.pdf" },
								{ name: "IEC 61000-3-2:2007", href: "/Quad3/report/EMC_Immunity_Report.pdf" }
							].map((report) => (
								<div key={report.name} className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
									<a target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={report.href}>
										{report.name}
									</a>
								</div>
							))}
						</div>
					</div>
					<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
						<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Certifications</h3>
						<div className="grid gap-3">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Quad3/certs/IEC_62109.pdf">
									IEC_62109
								</a>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Installation Video",
			accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
			content: (
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<div className="w-full aspect-video min-h-[400px]">
						<YouTubeFacade videoId="r05zC7wY7NQ" title="Installation Video" />
					</div>
				</div>
			)
		},
		// {
		// 	title: "Comparison with Leading Microinverter",
		// 	accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
		// 	content: (
		// 		<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
		// 			<div className="flex items-center gap-3">
		// 				<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
		// 				<a href="/Q2000/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors">
		// 					Comparison with Enphase IQ8H-3p (PDF)
		// 				</a>
		// 			</div>
		// 		</div>
		// 	)
		// }
	]



	return (
		<div>
			<ProductPage
				model="Q2000-4301"
				heading="Quad3 Microinverter"
				animated={true}
				parent="Quad3"
				href="quad3"
				animatedList={listContent}
				expandedContent={expanded()}
				bodyContent={body()}
				accordianContent={<DocsAccordion parent="quad3" sections={accordionSections} />}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}