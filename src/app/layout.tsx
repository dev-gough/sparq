import type { Metadata } from "next"
import "./globals.css"
import { Inter, Poppins, Geist, Nunito, Roboto_Flex, Quicksand, PT_Sans } from "next/font/google"
import RootLayoutClient from "@/components/RootLayoutClient"

export const metadata: Metadata = {
	title: "Sparq Systems | High Performance and Cost-Effective Power Conversion",
	description: "Sparq Systems",
	icons: '/logo.png',
}

const nunito = Nunito({
	subsets: ['latin'],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

const robo_flex = Roboto_Flex({
	subsets: ['latin'],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

const pt_sans = PT_Sans({
	subsets: ['latin'],
	weight: ["400", "700"],
	display: 'swap',
})

const quicksand = Quicksand({
	subsets: ['latin'],
	weight: ["300", "400", "500", "600", "700"],
	display: 'swap',
})

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

const geist = Geist({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: 'swap',
})

// Font objects for dynamic switching
export const fontOptions = {
	'pt_sans': pt_sans,
	'nunito': nunito,
	'roboto_flex': robo_flex,
	'quicksand': quicksand,
	'inter': inter,
	'poppins': poppins,
	'geist': geist,
}

const aboutDropdown = [
	{ label: "Our Story", href: "/about"},
	{ label: "Who We Are", href: "/about/us" },
	{ label: "Leadership", href: "/about/leadership" },
	{ label: "Board of Directors", href: "/about/board" },
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
	{ label: "Legal", href: "/resources/legal"}
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
			<RootLayoutClient navbarItems={navbarItems} fontOptions={fontOptions}>
				{children}
			</RootLayoutClient>
		</html>
	)
}
