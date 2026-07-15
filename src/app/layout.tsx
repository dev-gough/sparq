import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import RootLayoutClient from "@/components/RootLayoutClient"
import { getServerTheme } from "@/lib/theme-server"

export const metadata: Metadata = {
	title: "Sparq Systems | High Performance and Cost-Effective Power Conversion",
	description: "Sparq Systems",
	icons: '/logo.png',
}

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: 'swap',
})

const aboutDropdown = [
	{ label: "About Us", href: "/about" },
	{ label: "Leadership", href: "/about/leadership" },
	{ label: "Board of Directors", href: "/about/board" },
]

const investorDropdown = [
	{ label: "Partnerships", href: "/investors#partnerships" },
	{ label: "FAQ", href: "/investors#faq" },
	{ label: "Stock", href: "https://money.tmx.com/en/quote/SPRQ" },
	{ label: "Reports & Filings", href: "/investors/reports"},
	{ label: "Governance", href: "/investors/governance" },
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
	{ label: "Learning Hub", href: "/resources" },
	{ label: "BoM Calculator", href: "/resources/calculator" },
	{ label: "Legal", href: "/resources/legal" }
]

const navbarItems = [
	{ label: "About", href: "/about", dropdown: aboutDropdown },
	{ label: "Technology", href: "/technology"},
	{ label: "Products", href: "/products", dropdown: productDropdown },
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
	const theme = await getServerTheme()
	const themeClass = theme === 'dark' ? 'dark' : ''
	
	return (
		<html lang="en" className={`bg-white dark:bg-gray-900 ${themeClass} ${inter.className}`}>
			<RootLayoutClient navbarItems={navbarItems}>
				{children}
			</RootLayoutClient>
		</html>
	)
}
