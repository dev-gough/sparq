'use client'
import Subheader from "@/components/Subheader"

import { FaHome, FaRegNewspaper } from "react-icons/fa"
import { AiOutlineStock } from 'react-icons/ai'
import { MdEvent } from 'react-icons/md'
import { HiOutlineDocumentReport } from 'react-icons/hi'

const items = [
    { icon: FaHome, label: "Investor Highlights", href: "/investors#highlights" },
    { icon: FaHome, label: "CEO Letter", href:""},
    { icon: AiOutlineStock, label: "Stock", href: "/investors/stock" },
    { icon: HiOutlineDocumentReport, label: "Annual Report", href: "https://www.sedarplus.ca/csa-party/records/document.html?id=72b87830300d9eb8745191d3d47641234610d301d603bca29c19ed06689d5815" },
    { icon: FaRegNewspaper, label: "News", href: "/investors/news" },
    { icon: MdEvent, label: "Events", href: "/investors/events" },
    { icon: MdEvent, label: "Governance", href: "/investors/governance"}
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