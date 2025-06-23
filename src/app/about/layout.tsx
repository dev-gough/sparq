'use client'

import Subheader from "@/components/Subheader"

const items = [
    { label: "Our Story", href: "/about"},
    { label: "Who We Are", href: "/about/us" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Board of Directors", href: "/about/board" },
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