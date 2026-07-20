import DocsAccordion from '@/components/DocsAccordion'
import ProductPage from "@/components/ProductPage"
import Image from "next/image"
import Link from "next/link"

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

function body() {
	return (
		<p className="text-brand-gray dark:text-dark-text-secondary mt-4">
			The Q1200 is a legacy product that has been discontinued.  See below for the technical manuals, or <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> for support.
		</p>
	)
}

interface AccordionSection {
	title: string
	content: React.ReactNode
	accentColor: string
}

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
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q1200/Q1200-GT-discontinued.pdf" target="_blank" rel="noopener noreferrer">
									Download Q1200-4102-GT Datasheet (PDF)
								</a>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
								<a className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors" href="/Q1200/Q1200-DM-discontinued.pdf" target="_blank" rel="noopener noreferrer">
									Download Q1200-4102-DM Datasheet (PDF)
								</a>
							</div>
						</div>
					</div>
					<div>
						<h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Installation Manuals</h3>
						<div className="grid gap-3">
							{[
								{ name: "North America", href: "/Q1200/Q1200-Installer-NA.pdf" },
								{ name: "India", href: "/Q1200/Q1200-Installer-India.pdf" }
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
	}
]

export default function LegacyProductPage() {
	return (
		<ProductPage
			heading="Q1200 Microinverter"
			parent="Legacy Products"
			href="legacy"
			bodyContent={body()}
			accordianContent={
				<DocsAccordion parent="legacy" sections={accordionSections} defaultOpen={[0, 1]} />
			}
			imageContent={image()}
		/>
	)
}
