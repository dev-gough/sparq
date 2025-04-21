'use client'

import SupportTicketForm from "@/components/SupportTicket"

export default function ResourcesPage() {
    return (
        <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
            <section className="mt-16" id="support">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Contact Us
                </h1>
                <SupportTicketForm />
            </section>
        </div>
    )
}