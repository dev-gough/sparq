'use client'

import Subheader from "@/components/Subheader"

import { FaHouseUser, FaHammer, FaCamera, FaVideo } from "react-icons/fa"
import { MdOutlineDesignServices } from "react-icons/md"

const items = [
    { icon: FaHouseUser, label: "Homeowners", href: "/resources/homeowners"},
    { icon: FaHammer, label: "Installers", href: "/resources/installers"},
    { icon: FaCamera, label: "Photos", href: "/resources/photos"},
    { icon: FaVideo, label: "Videos", href: "/resources/videos"},
    { icon: MdOutlineDesignServices, label: "Design my System", href: "/resources/design"},
]

export default function InvestorLayout({children} : any) {
    return (
        <div>
        <Subheader items={items}/>
        {children}
        </div>
    )
}