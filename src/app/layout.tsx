import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Nunito } from "next/font/google"
import ForceScroll from "@/components/ForceScroll"
import LeavingSite from "@/components/LeavingSite"

export const metadata: Metadata = {
	title: "Sparq Systems | High Performance and Cost-Effective Power Conversion",
	description: "Sparq Systems",
	icons: '/logo.png',
}

// english font
const nunito = Nunito({
	subsets: ["latin"],
	weight: ["500", "800", "900"],
})

const aboutDropdown = [
	{ label: "Highlights", href: "/about"},
	{ label: "Snapshot", href: "/about/snapshot" },
	{ label: "Who We Are", href: "/about/us" },
	{ label: "Leadership", href: "/about/leadership" },
	{ label: "Board of Directors", href: "/about/board" },
	{ label: "Legal", href: "/legal"}
]

const investorDropdown = [
	{ label: "Investor Highlights", href: "/investors#highlights" },
	{ label: "News", href: "/investors/news" },
	{ label: "Events", href: "/investors/events" },
	{ label: "Stock", href: "/investors/stock" },
	{ label: "Governance", href: "/investors/governance" },
]

const homeownerDropdown = [
	{ label: "Sparq Video", href: "/homeowners" },
	{ label: "Why Sparq", href: "/homeowners#whysparq" },
	{ label: "Sparq Advantage", href: "/homeowners#discover"},
	// { label: "Useful Tools", href: "/homeowners#useful-tools" },
	{ label: "FAQs", href: "/homeowners#faq"}
]

const installerDropdown = [
	{ label: "Why Sparq", href: "/installers#whysparq"},
	{ label: "Sparq Advantage", href: "/installers#discover"},
	{ label: "BoM Calculator", href: "/installers#bom"},
	{ label: "Third-Party Tools", href: "/installers#useful-tools"},
	{ label: "FAQs", href: "/installers#faq"},
]

const productDropdown = [
	{ label: "Quad2", href: "/products/quad2" },
	{ label: "Quad3", href: "/products/quad3" },
	{ label: "Legacy Products", href: "/products/legacy" },
	{ label: "SparqLinq", href: "/products/sparqlinq" },
	{ label: "SparqVu", href: "/products/sparqvu" },
	{ label: "SparqSync", href: "/products/app" },
	{ label: "Accessories", href: "/products/accessories" },
]

const resourcesDropdown = [
	{ label: "Learning Hub", href: "/resources"},
	{ label: "Photo Gallery", href: "/resources/photos" },
	{ label: "Video Gallery", href: "/resources/videos" },
]

const navbarItems = [
	{ label: "About", href: "/about", dropdown: aboutDropdown },
	{ label: "Products", href: "/products", dropdown: productDropdown },
	{ label: "Homeowners", href: "/homeowners", dropdown: homeownerDropdown },
	{ label: "Installers", href: "/installers", dropdown: installerDropdown },
	{ label: "Investors", href: "/investors", dropdown: investorDropdown },
	{ label: "Resources", href: "/resources", dropdown: resourcesDropdown },
	{ label: "Contact", href: "/contact" },
	{ label: "Support", href: "/support" },
]

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode,
}>) {
	return (
		<html lang="en">
			<body className={`${nunito.className} flex flex-col min-h-screen overflow-y-scroll`}>
				<Header navItems={navbarItems} />
				<ForceScroll />
				<LeavingSite />
				<main className="flex-grow h-full">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
