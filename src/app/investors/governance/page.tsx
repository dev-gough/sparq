import Link from "next/link"

export default function GovernancePage() {
    return (
        <div className="container mx-auto py-8 sm:px-4 pb-4">
            <section id="governance" className="px-2 sm:0">
                <h2 className="sm:text-5xl text-3xl font-bold text-brand-maroon text-center">Governance Documents</h2>
                <ul className="sm:mt-16 mt-8 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl space-y-2 lg:space-y-4 text-brand-logo">
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Audit-Committee-Charter.pdf">Audit Committee Charter</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Board-Effectiveness-Survey.pdf">Board Effectiveness Survey</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Business-Code-of-Conduct.pdf">Business Code of Conduct</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/CEO-Mandate.pdf">CEO Mandate</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Chairmans-Mandate.pdf">Chairmans&apos; Mandate</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Compensation-Committee-Charter.pdf">Compensation Committee Charter</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Corporate-Governance-and-Nominating-Committee-Charter.pdf">Corporate Governance and Nomniating Committee Charter</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Directors-Mandate.pdf">Directors&apos; Mandate</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Disclosure-Policy.pdf">Disclosure Policy</Link></li>
                    <li><Link className="hover:underline" target="_blank" href="/Governance/Insider-Trading-Policy.pdf">Insider Trading Policy</Link></li>
                </ul>
            </section>
        </div>
    )
}