'use client'

import Image from "next/image";
import Link from "next/link";
import InvestorSlider from "@/components/Sliders/InvestorSlider";

interface CardProps {
    value: string;
    label: string;
    footnote?: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ value, label, footnote, link }) => {
    return (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-lg mt-2">{label}</div>
            {footnote && <div className="text-sm text-gray-600 mt-1">{footnote}</div>}
            <a href={link} className="text-blue-500 hover:underline mt-4 block">MORE →</a>
        </div>
    );
};

const cards = [
    {
        value: '$361,718',
        label: 'Total Revenue',
        link: '#',
    },
    {
        value: '$-1,066,296',
        label: 'Gross Profit',
        link: '#',
    },
    {
        value: '$-0.08',
        label: 'EPS',
        link: '#',
    },
    {
        value: '$-6,377,103',
        label: 'EBITDA',
        link: '#',
    },
];


export default function InvestorPage() {
    return (
        <div className="container mx-auto py-16 px-10">
            <section>
                <InvestorSlider/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {cards.map((card, index) => (
                        <Card key={index} {...card} />
                    ))}
                </div>
            </section>




















            <section id="4.i)">
                <h1 className="text-5xl text-center my-8">To be included in the slider:</h1>
                <p className="text-center">mono font means need content</p>
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">News (NYI)</h1>
                <ul className="list-disc list-inside">
                    <li>Icorporate automated news feeds</li>
                    <li>Top 10 news will scroll right to left</li>
                    <li>More detail option + see all news option</li>
                </ul>
            </section>
            <section id="4.ii)">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">Events (NYI)</h1>
                <ul className="list-disc list-inside">
                    <li>Top events scroll right to left</li>
                    <li>More detail option + see all news option</li>
                </ul>
            </section>
            <section id="4.iii)">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">Financials</h1>
                <ul className="list-disc list-inside">
                    <li className="font-mono">Investor Presentation</li>
                    <li className="font-mono">CEO letter to shareholders</li>
                    <li className="font-mono">Report?</li>
                    <li className="font-mono">ESG Report</li>
                </ul>
            </section>
            <section id="4.iv)">
                <h1 className="text-brand-maroon font-mono text-2xl mt-16">Sparq Stock</h1>
                <ul className="list-disc list-inside">
                    <li>Sparq stock page with canadian and us tickers, where clicking opens a link opens the yahoo finance page</li>
                    <li className="font-mono">videos from the investment community</li>
                </ul>
            </section>
            <section id="4.v)">
                <h1 className="text-brand-maroon text-2xl mt-16">Key Partners</h1>
                <ul className="list-disc list-inside">
                    <li><Link href="https://www.queensu.ca/epower/" target="_blank" className="text-blue-500">ePower</Link></li>
                    <li><Link href="https://www.jiothings.com/" target="_blank" className="text-blue-500">JioThings</Link></li>
                    <li><Link href="https://www.ril.com/businesses/new-energy-materials" target="_blank" className="text-blue-500">Reliance</Link></li>
                    <li><Link href="https://www.iljin.co.in/" target="_blank" className="text-blue-500">ILJIN Electronics</Link></li>
                <h2 className="text-brand-maroon text-xl mt-4">Test Sites:</h2>
                <ul className="list-disc list-inside">
                    <li>Queen&apos;s University</li>
                    <li>St. Lawrence College</li>
                    <li>Modern Niagara (WIP)</li>
                </ul>
                </ul>
            </section>
        </div>
    )

    // bg-[url(/hero.webp)] bg-no-repeat bg-cover h-[800px]
}