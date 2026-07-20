import DocsAccordion from '@/components/DocsAccordion'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import { ListEntry } from "@/components/ProductPage"
import Link from "next/link"
import YouTubeFacade from '@/components/YouTubeFacade'

function expanded() {
	return (
		<>
			<p className="mt-4">Our microinverters have been designed for high reliability, using patented technologies that eliminate the use of short-life electrolytic capacitors. This feature gives our microinverters high reliability and a design life of 25 years, matching the design life of PV modules.</p>
		</>
	)
}

function body() {
	return (
		<>
			<p className="mt-8">SPARQ&apos;s revolutionary Quad microinverters are game changers for the solar power industry. Unlike traditional microinverters that have one photovoltaic (PV) module inputting into one microinverter, our Quad microinverters have four individual DC input channels to enable independent peak power tracking for up to four PV modules. This allows significant reduction in installation time and cable costs. Based on a Per-Watt rating, our Quad microinverters have <strong>the lowest microinverter cost, the highest power output, the highest power density, and the lowest weight in the industry.</strong>
			</p>
		</>
	)
}

function image() {
	return (
		<Image
			src="/q2000.webp"
			alt="Q2000 Microinverter"
			width={800}
			height={451}
			sizes="(max-width: 1024px) 90vw, 480px"
			className="object-contain sticky top-[100px] z-10 w-full h-auto"
			priority
		/>
	)
}

const listContent: ListEntry[] = [
	{
		heading: "Best In-Class",
		items: [
			<span key={"quad2-1"}>Highest power per unit weight [W/kg] or volume [W/in<sup>3</sup>]</span>,
			"Maximum energy harvesting",
			"Dual-mode operation (on/off-grid)",
			"Individual MPPT for each panel",
			<span key={"quad2-2"}><Link href="/products/sparqlinq" className="hover:underline">SparqLinq</Link>: advanced gateway to rule them all</span>,
			<span key={"quad2-3"}><Link href="/products/sparqvu" className="hover:underline">SparqVu</Link>: Web monitoring with intuitive displays</span>,
			<span key={"quad2-4"}><Link href="/products/app" className="hover:underline">SparqSync</Link>: User-friendly mobile app</span>
		]
	},
	{
		heading: "Reliable & Safe",
		items: [
			"No failure-prone electrolytic capacitors",
			"No risk of high voltage DC arcing",
			"All AC cabling with inherent Rapid Shutdown compliance",
			"No high voltage shock hazard for 1st responders",
			"No single point of failure for the PV system",
			"Best-in-class longevity"
		]
	},
	{
		heading: "Cost-Effectiveness",
		items: [
			"Outlier on Performance-Cost curve",
			"Reduced cost of cabling",
			"Lower installation costs",
			"Maintenance-free",
			"Lowest lifecycle cost",
		]
	}
]

interface AccordionSection {
	title: string
	content: React.ReactNode
	accentColor: string
}

export default function Quad2Page() {
	const accordionSections: AccordionSection[] = [
		{
			title: "Documentation",
			accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
			content: (
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<div className="space-y-6">
						<div>
							<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Datasheets</h3>
							<div className="grid gap-3">
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
									<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q2000/Datasheet_Q20004102_DM.pdf" target="_blank" rel="noopener noreferrer">
										Download Q2000-4102-DM Datasheet (PDF)
									</a>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
									<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q2000/Datasheet_Q20004102_GT.pdf" target="_blank" rel="noopener noreferrer">
										Download Q2000-4102-GT Datasheet (PDF)
									</a>
								</div>
							</div>
						</div>
						<div>
							<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Installation Manuals</h3>
							<div className="grid gap-3">
								{[
									{ name: "North America", href: "/Q2000/Q2000_Americas.pdf" },
									{ name: "China", href: "/Q2000/Q2000_Chinese.pdf" },
									{ name: "Europe", href: "/Q2000/Q2000_Europe.pdf" },
									{ name: "India", href: "/Q2000/Q2000_India.pdf" }
								].map((manual) => (
									<div key={manual.name} className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
										<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={manual.href} target="_blank" rel="noopener noreferrer">
											{manual.name}
										</a>
									</div>
								))}
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
								{ name: "EN_61683", href: "/Q2000/reports/EN_61683.pdf" },
								{ name: "IEC_60068-2-xx", href: "/Q2000/reports/IEC_60068-2-xx.pdf" },
								{ name: "IEC_61727", href: "/Q2000/reports/IEC_61727.pdf" },
								{ name: "IEC_62109_1_2", href: "/Q2000/reports/IEC_62109_1_2.pdf" },
								{ name: "UL1741-Report", href: "/Q2000/reports/UL1741-Report.pdf" }
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
							{[
								{ name: "CU72239343.01-.02", href: "/Q2000/certs/CU72239343.01-.02.pdf" },
								{ name: "CU72239343.03", href: "/Q2000/certs/CU72239343.03.pdf" },
								{ name: "CU72239343.04", href: "/Q2000/certs/CU72239343.04.pdf" },
								{ name: "SPARQ_Cert_CS000052", href: "/Q2000/certs/SPARQ_Cert_CS000052.pdf" }
							].map((cert) => (
								<div key={cert.name} className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
									<a target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href={cert.href}>
										{cert.name}
									</a>
								</div>
							))}
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
		/* {
			title: "Comparison with Leading Microinverter",
			accentColor: "bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80",
			content: (
				<div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
						<a href="/Q2000/Comparison-of-Q2000-4102-with-IQ8H.pdf" target="_blank" rel="noopener noreferrer" className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors">
							Comparison with Enphase IQ8H (PDF)
						</a>
					</div>
				</div>
			)
		} */
	]



	return (
		<div>
			<ProductPage
				model="Q2000"
				heading="Quad2 Microinverter"
				animated={true}
				parent="Quad2"
				href="quad2"
				animatedList={listContent}
				bodyContent={body()}
				expandedContent={expanded()}
				accordianContent={<DocsAccordion parent="quad2" sections={accordionSections} />}
				imageContent={image()}
			>
			</ProductPage>
		</div>
	)
}