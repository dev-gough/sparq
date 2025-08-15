'use client'
import Subheader from "@/components/Subheader"


const items = [
    { label: "Investor Highlights", href: "/investors#highlights" },
    { label: "Stock", href: "https://money.tmx.com/en/quote/SPRQ", target: "_blank"},
    { label: "Annual Report", href: "https://www.sedarplus.ca/csa-party/records/document.html?id=72b87830300d9eb8745191d3d47641234610d301d603bca29c19ed06689d5815", target: "_blank"},
    { label: "News", href: "/investors/news" },
    // { label: "Events", href: "/investors/events" },
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