'use client'

import Subheader from "@/components/Subheader"

const items = [
    { label: "Learning Hub", href: "/resources"},
    { label: "BoM Calculator", href: "/resources/calculator"},
	{ label: "Legal", href: "/resources/legal"}
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