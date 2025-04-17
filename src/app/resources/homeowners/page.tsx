'use client'

import HomeFAQData from "./home_faq.json"
import AccordionItem from "@/components/AccordianItem"
import { items } from "../page"
import Subheader from "@/components/Subheader"

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string }[];
}

const HomeFAQEntries: FAQData[] = HomeFAQData.faqs;


export default function HomeownersPage() {
    return (
        <div>
            <Subheader items={items} />
            <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16">
                    Homeowners
                </h1>
                <h1 className="text-2xl font-bold text-brand-maroon text-left mt-12">
                    Frequently Asked Questions
                </h1>
                <div className="container mx-auto sm:p-4">
                    <div className="flex flex-col space-y-6">
                        {HomeFAQEntries.map((item) => (
                            <AccordionItem title={item.questionBrand} key={item.id} className="sticky top-[58px] sm:relative sm:top-auto">
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
            </div>
        </div>
    )
}