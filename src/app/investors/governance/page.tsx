'use client'

import Link from "next/link"
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Download, Shield, Users, Gavel, Eye } from 'lucide-react'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'

interface GovernanceDocument {
    id: string
    title: string
    description: string
    url: string
    category: 'board' | 'policies' | 'committees' | 'mandates'
    icon: React.ReactNode
}

const governanceDocuments: GovernanceDocument[] = [
    {
        id: 'audit-charter',
        title: 'Audit Committee Charter',
        description: 'Charter defining the responsibilities and authority of the Audit Committee.',
        url: '/Governance/Audit-Committee-Charter.pdf',
        category: 'committees',
        icon: <Shield className="w-5 h-5" />
    },
    {
        id: 'board-survey',
        title: 'Board Effectiveness Survey',
        description: 'Assessment framework for evaluating board performance and effectiveness.',
        url: '/Governance/Board-Effectiveness-Survey.pdf',
        category: 'board',
        icon: <Users className="w-5 h-5" />
    },
    {
        id: 'code-conduct',
        title: 'Business Code of Conduct',
        description: 'Ethical guidelines and standards for all business operations and employees.',
        url: '/Governance/Business-Code-of-Conduct.pdf',
        category: 'policies',
        icon: <Gavel className="w-5 h-5" />
    },
    {
        id: 'ceo-mandate',
        title: 'CEO Mandate',
        description: 'Role definition and responsibilities of the Chief Executive Officer.',
        url: '/Governance/CEO-Mandate.pdf',
        category: 'mandates',
        icon: <Users className="w-5 h-5" />
    },
    {
        id: 'chairman-mandate',
        title: 'Chairman\'s Mandate',
        description: 'Duties and responsibilities of the Board Chairman position.',
        url: '/Governance/Chairmans-Mandate.pdf',
        category: 'mandates',
        icon: <Users className="w-5 h-5" />
    },
    {
        id: 'compensation-charter',
        title: 'Compensation Committee Charter',
        description: 'Framework for executive compensation decisions and committee oversight.',
        url: '/Governance/Compensation-Committee-Charter.pdf',
        category: 'committees',
        icon: <Shield className="w-5 h-5" />
    },
    {
        id: 'governance-charter',
        title: 'Corporate Governance Committee Charter',
        description: 'Charter governing corporate governance and nominating committee functions.',
        url: '/Governance/Corporate-Governance-and-Nominating-Committee-Charter.pdf',
        category: 'committees',
        icon: <Shield className="w-5 h-5" />
    },
    {
        id: 'directors-mandate',
        title: 'Directors\' Mandate',
        description: 'Comprehensive guide to director roles, responsibilities, and expectations.',
        url: '/Governance/Directors-Mandate.pdf',
        category: 'mandates',
        icon: <Users className="w-5 h-5" />
    },
    {
        id: 'disclosure-policy',
        title: 'Disclosure Policy',
        description: 'Guidelines for transparent and timely disclosure of material information.',
        url: '/Governance/Disclosure-Policy.pdf',
        category: 'policies',
        icon: <Eye className="w-5 h-5" />
    },
    {
        id: 'insider-trading',
        title: 'Insider Trading Policy',
        description: 'Comprehensive policy on insider trading prevention and compliance.',
        url: '/Governance/Insider-Trading-Policy.pdf',
        category: 'policies',
        icon: <Gavel className="w-5 h-5" />
    }
]

const categoryLabels = {
    board: 'Board Operations',
    policies: 'Corporate Policies',
    committees: 'Committee Charters',
    mandates: 'Role Mandates'
}


function DocumentCard({ document }: { document: GovernanceDocument }) {
    return (
        <div className="group">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
                <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                            {document.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon dark:group-hover:text-brand-logo transition-colors duration-300 mb-2">
                                {document.title}
                            </h3>
                        </div>
                    </div>

                    <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-6 flex-grow">
                        {document.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <a
                            href={document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 min-h-[44px] text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200 group/link"
                        >
                            <Download className="w-4 h-4" aria-hidden />
                            <span>Download {document.title} PDF</span>
                        </a>
                        <div className="flex items-center gap-2 text-brand-graytext dark:text-dark-text-muted">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">PDF</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function GovernancePage() {
    const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />
            
            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
                <div
                    
                    
                    
                    className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Governance
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            & Compliance
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12">
                        Access our comprehensive governance documents, policies, and committee charters 
                        that guide our commitment to transparency and responsible corporate stewardship.
                    </p>
                </div>
            </section>

            {/* Documents Section */}
            <section className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Governance Documents
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Download and review our governance framework, policies, and committee charters.
                        </p>
                    </div>

                    {categories.map((category) => {
                        const categoryDocs = governanceDocuments.filter(doc => doc.category === category)
                        if (categoryDocs.length === 0) return null

                        return (
                            <div key={category} className="mb-16 last:mb-0">
                                <div className="mb-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-2">
                                        {categoryLabels[category]}
                                    </h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-brand-maroon to-brand-logo rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categoryDocs.map((document) => (
                                        <DocumentCard key={document.id} document={document} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
                <div className="container mx-auto px-6 text-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Questions About Governance?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Our investor relations team is available to answer questions about our 
                            governance practices, policies, and commitment to transparency.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link href="/contact">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    Contact Investor Relations
                                </button>
                            </Link>
                            <Link href="/investors">
                                <button className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    Investor Overview
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}