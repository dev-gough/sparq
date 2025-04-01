import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Nunito } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Sparq Systems",
  description: "Sparq Systems - Low Cost Solar Power Conversion",
  icons: '/logo.png',
};

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["500", "800"],
})

const aboutDropdown = [
    { label: "Management", href: "/about#management" },
    { label: "Board of Directors", href: "/about#bod" },
    { label: "Governance", href: "/about#governance" },
]

const productDropdown = [
    { label: "Quad Microinverters", href: "/products#quad" },
    { label: "SparqLinq", href: "/products#linq" },
    { label: "SparqVu", href: "/products#vu" },
    { label: "Accessories", href: "/products#accessories" },
]

const trainingDropdown = [
    { label: "Installation Manuals", href: "/training#manuals" },
    { label: "FAQs", href: "/training#faq" },
    { label: "Design Your System", href: "/training#design" },
    { label: "Terms of Service", href: "/training#tos" },
]

const navbarItems = [
    { label: "About", href: "/about", dropdown: aboutDropdown },
    { label: "Products", href: "/products", dropdown: productDropdown },
    { label: "Training & Support", href: "/training", dropdown: trainingDropdown },
    { label: "News & Events", href: "/news" },
    { label: "Investor Relations", href: "/investor-relations" },
    { label: "Careers", href: "/careers" },
    { label: "How to Order", href: "/order" },
    { label: "Contact", href: "/contact" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header navItems={navbarItems}/>
        {children}
        <SpeedInsights />
        <Footer />
    </body>
    </html>
  );
}
