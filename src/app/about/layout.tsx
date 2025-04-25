'use client'

import Subheader from "@/components/Subheader"

import { FaPeopleArrows, FaPeopleCarry } from "react-icons/fa"
import { TiDocument } from "react-icons/ti"
import { GrDocumentText } from "react-icons/gr"

const items = [
    { icon: GrDocumentText, label: "Mission", href: "/about/statements#mission" },
    { icon: GrDocumentText, label: "Vision", href: "/about/statements#vision" },
    { icon: GrDocumentText, label: "Values", href: "/about/statements#values" },
    { icon: FaPeopleArrows, label: "Leadership", href: "/about/leadership" },
    { icon: FaPeopleCarry, label: "Board of Directors", href: "/about/board" },
    { icon: TiDocument, label: "Governance", href: "/about/governance" },
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