'use client'
import Subheader from "@/components/Subheader"


const items = [
    { label: "Investor Homepage", href: "/investors" },
    { label: "Stock", href: "https://money.tmx.com/en/quote/SPRQ", target: "_blank"},
	{ label: "Reports & Filings", href: "/investors/reports"},
    { label: "Governance", href: "/investors/governance"}
]

export default function InvestorLayout({children} : Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full">
        <Subheader items={items}/>
        {children}
        </div>
    )
}