'use client'

import InstallerFAQData from "./installer_faq.json"
import AccordionItem from "@/components/AccordianItem"
import Link from "next/link"

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string }[];
}

const InstallerFAQEntries: FAQData[] = InstallerFAQData.faqs

export default function InstallersPage() {
    return (
        <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
            <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16">
                Installers
            </h1>
            <h1 className="text-2xl font-bold text-brand-maroon text-left mt-12">
                Frequently Asked Questions
            </h1>
            <div className="container mx-auto sm:p-4">
                <div className="flex flex-col space-y-6">
                    {InstallerFAQEntries.map((item) => (
                        <AccordionItem title={item.questionBrand} key={item.id} parent="installer_faq">
                            <div>
                                <h2 className="text-xl font-bold text-brand-maroon text-center mb-4">
                                    {item.questionBrand}
                                </h2>
                                <div className="space-y-2">
                                    {item.subQuestions.map((subItem) => (
                                        <div key={subItem.id} className="text-gray-700">
                                            <strong className="text-brand-maroon">{subItem.question}</strong><br></br>{" "}
                                            {subItem.answer}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionItem>
                    ))}
                </div>
            </div>
            <div className="py-14">
                <strong>Support for Installers and Distributors:</strong> We are currently updating our training materials for installers and distributors. Please check back often for more information or <Link href="/contact" className="text-amber-400 hover:underline hover:text-amber-600">contact us</Link> for support.
            </div>
        </div>
    )
}