'use client'

import Image from "next/image";

interface CardProps {
    value: string;
    label: string;
    footnote?: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ value, label, footnote, link }) => {
    return (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold">{value}</div>
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
    {
        value: '$4,391,837',
        label: 'Total Assets',
        footnote: '14% Ex-BBD (1)',
        link: '#',
    },
];

export default function InvestorPage() {
    return (
        <div className="container mx-auto py-16 px-10">
            <section>
                <h1 className="text-center">Investor relations image, with scrolling information</h1>
                <Image src="/hero.webp" height={1080} width={1920} alt="investor relations splash" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                    {cards.map((card, index) => (
                        <Card key={index} {...card} />
                    ))}
                </div>
            </section>
        </div>
    )

    // bg-[url(/hero.webp)] bg-no-repeat bg-cover h-[800px]
}