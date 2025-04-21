'use client'

import Link from "next/link"
import TOSDropdown from "@/components/TOSDropdown"
import PrivacyPolicyDropdown from "@/components/PrivacyPolicyDropdown"

export default function GovernancePage() {
    return (
        <div className="container mx-auto sm:py-8 sm:px-4 pb-4">
            <section id="governance" className="px-2 sm:0">
                <h2 className="text-5xl font-bold text-brand-maroon text-center">Governance Documents</h2>
                <ul className="mt-16 text-xl text-[#993300]">
                    <li><Link target="_blank" href="/Governance/Audit-Committee-Charter.pdf">Audit Committee Charter</Link></li>
                    <li><Link target="_blank" href="/Governance/Board-Effectiveness-Survey.pdf">Board Effectiveness Survey</Link></li>
                    <li><Link target="_blank" href="/Governance/Business-Code-of-Conduct.pdf">Business Code of Conduct</Link></li>
                    <li><Link target="_blank" href="/Governance/CEO-Mandate.pdf">CEO Mandate</Link></li>
                    <li><Link target="_blank" href="/Governance/Chairmans-Mandate.pdf">Chairmans&apos; Mandate</Link></li>
                    <li><Link target="_blank" href="/Governance/Compensation-Committee-Charter.pdf">Compensation Committee Charter</Link></li>
                    <li><Link target="_blank" href="/Governance/Corporate-Governance-and-Nominating-Committee-Charter.pdf">Corporate Governance and Nomniating Committee Charter Directors&apos; Mandate</Link></li>
                    <li><Link target="_blank" href="/Governance/Directors-Mandate.pdf">Directors&apos; Mandate</Link></li>
                    <li><Link target="_blank" href="/Governance/Disclosure-Policy.pdf">Disclosure Policy</Link></li>
                    <li><Link target="_blank" href="/Governance/Insider-Trading-Policy.pdf">Insider Trading Policy</Link></li>
                </ul>
            </section>
            <section className="mt-8 px-2 sm:px-0">
                <TOSDropdown />
                <PrivacyPolicyDropdown className='mt-8' />
            </section>
        </div>
    )
}