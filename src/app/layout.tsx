import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import RootLayoutClient from "@/components/RootLayoutClient"
import Footer from "@/components/Footer"

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

/**
 * Blocking FOUC script: reads theme-preference cookie, defaults to dark.
 * Must stay in sync with src/lib/cookies.ts (cookie name + values).
 * Lives in layout so we never call cookies() from next/headers (keeps
 * marketing routes eligible for static generation).
 */
const themeInitScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme-preference=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode,
}>) {
	// Default `dark` on <html> matches product default; script adjusts for light cookie before paint.
	// data-scroll-behavior="smooth": Next 16 no longer auto-overrides CSS smooth scrolling on SPA
	// navigations; this attribute restores instant scroll-to-top during route changes while
	// keeping smooth scroll for in-page anchors (pairs with ForceScroll).
	return (
		<html
			lang="en"
			className={`bg-white dark:bg-gray-900 dark ${inter.className}`}
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<RootLayoutClient navbarItems={navbarItems} footer={<Footer />}>
				{children}
			</RootLayoutClient>
		</html>
	)
}
