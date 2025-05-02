'use client'
import Subheader from "@/components/Subheader"

import { FaHome, FaRegNewspaper } from "react-icons/fa"
import { AiOutlineStock } from 'react-icons/ai'
import { MdEvent } from 'react-icons/md'
import { HiOutlineDocumentReport } from 'react-icons/hi'

const items = [
    { icon: FaHome, label: "Investor Highlights", href: "/investors#highlights" },
    { icon: AiOutlineStock, label: "Stock", href: "/investors/stock" },
    { icon: HiOutlineDocumentReport, label: "Annual Report", href: "/investors/annual-report" },
    { icon: FaRegNewspaper, label: "News", href: "/investors/news" },
    { icon: MdEvent, label: "Events", href: "/investors/events" },
]

export default function InvestorLayout({children} : Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
        <Subheader items={items}/>
        {children}
        </div>
    )
}