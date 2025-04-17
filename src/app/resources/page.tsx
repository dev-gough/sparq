'use client'

import SupportTicketForm from "@/components/SupportTicket"
import Subheader from "@/components/Subheader"

import { FaHouseUser, FaHammer, FaCamera, FaVideo } from "react-icons/fa"
import { MdOutlineDesignServices } from "react-icons/md"

export const items = [
    { icon: FaHouseUser, label: "Homeowners", href: "/resources/homeowners"},
    { icon: FaHammer, label: "Installers", href: "/resources/installers"},
    { icon: FaCamera, label: "Photos", href: "/resources/photos"},
    { icon: FaVideo, label: "Videos", href: "/resources/videos"},
    { icon: MdOutlineDesignServices, label: "Design my System", href: "/resources/design"},
]

export default function ResourcesPage() {
    return (
        <div>
            <Subheader items={items} />
            <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
                <section className="mt-16" id="support">
                    <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                        Contact Us
                    </h1>
                    <SupportTicketForm />
                </section>
            </div>
        </div>
    )
}