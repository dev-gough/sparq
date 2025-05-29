'use client'

import Subheader from "@/components/Subheader"

const items = [
    { label: "Photos", href: "/resources/photos"},
    { label: "Videos", href: "/resources/videos"},
    { label: "Design My System", href: "/resources/design"},
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