'use client'

import Subheader from "@/components/Subheader"

import { FaPeopleArrows, FaPeopleCarry } from "react-icons/fa"
import { TiDocument } from "react-icons/ti"
import { GrDocumentText } from "react-icons/gr"

const items = [
    { icon: TiDocument, label: "Snapshot", href: "/about/snapshot"},
    { icon: GrDocumentText, label: "Who We Are", href: "/about/us" },
    { icon: FaPeopleArrows, label: "Leadership", href: "/about/leadership" },
    { icon: FaPeopleCarry, label: "Board of Directors", href: "/about/board" },
    { icon: TiDocument, label: "Governance", href: "/about/governance" },
]

export default function InvestorLayout({children} : Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex-grow">
        <Subheader items={items}/>
        {children}
        </div>
    )
}