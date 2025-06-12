import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Inter, Poppins, Geist, Nunito } from "next/font/google"
import ForceScroll from "@/components/ForceScroll"
import LeavingSite from "@/components/LeavingSite"

export const metadata: Metadata = {
	title: "Sparq Systems | High Performance and Cost-Effective Power Conversion",
	description: "Sparq Systems",
	icons: '/logo.png',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nunito = Nunito({
	subsets: ['latin'],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geist = Geist({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

// Currently active font - change this to test different fonts
const activeFont = geist

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
    { label: "FAQ", href: "/investors#faq"},
	{ label: "Stock", href: "/investors/stock" },
	{ label: "News", href: "/investors/news" },
	{ label: "Events", href: "/investors/events" },
	{ label: "Governance", href: "/investors/governance" },
]

const homeownerDropdown = [
	{ label: "Why Sparq", href: "/homeowners#whysparq" },
	{ label: "Sparq Advantage", href: "/homeowners#discover"},
	{ label: "Design My System", href: "/homeowners#design"},
	{ label: "FAQs", href: "/homeowners#faq"}
]

const installerDropdown = [
	{ label: "Why Sparq", href: "/installers#whysparq"},
	{ label: "Sparq Advantage", href: "/installers#discover"},
	{ label: "BoM Calculator", href: "/installers#bom"},
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
			<body className={`${activeFont.className} flex flex-col min-h-screen overflow-y-scroll`}>
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
