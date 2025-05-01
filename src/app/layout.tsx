import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Nunito } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ForceScroll from "@/components/ForceScroll"

export const metadata: Metadata = {
  title: "Sparq Systems | High Performance and Cost-Effective Power Conversion",
  description: "Sparq Systems",
  icons: '/logo.png',
}

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "800"],
})

const aboutDropdown = [
  { label: "Mission", href: "/about/statements#mission" },
  { label: "Vision", href: "/about/statements#vision" },
  { label: "Value", href: "/about/statements#values" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Board of Directors", href: "/about/board" },
  { label: "Governance", href: "/about/governance" },
]

const investorDropdown = [
  { label: "Investor Highlights", href: "/test#highlights"},
  { label: "News", href: "/investors/news" },
  { label: "Events", href: "/investors/events" },
  { label: "Stock", href: "/investors/stock"},
  { label: "Annual Report", href: "/investors/report"}
]

const productDropdown = [
  { label: "Quad2", href: "/products/quad2" },
  { label: "Quad3", href: "/products/quad3" },
  { label: "Legacy Products", href: "/products/legacy" },
  { label: "SparqLinq", href: "/products/sparqlinq" },
  { label: "SparqVu", href: "/products/sparqvu" },
  { label: "Sparq App", href: "/products/app" },
  { label: "Accessories", href: "/products/accessories" },
]

const resourcesDropdown = [
  { label: "Homeowners", href: "/resources/homeowners" },
  { label: "Installers", href: "/resources/installers" },
  { label: "Photo Gallery", href: "/resources/photos" },
  { label: "Video Gallery", href: "/resources/videos" },
  { label: "Design My System", href: "/resources/design" },
]

const navbarItems = [
  { label: "About", href: "/about", dropdown: aboutDropdown },
  { label: "Products", href: "/products", dropdown: productDropdown },
  { label: "Investor Relations", href: "/test", dropdown: investorDropdown },
  { label: "Resources", href: "/resources", dropdown: resourcesDropdown },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support"},
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} flex flex-col min-h-screen overflow-y-scroll`}>
        <Header navItems={navbarItems} />
        <ForceScroll />
        <main className="flex-grow">
          {children}
        </main>
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
