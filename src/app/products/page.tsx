'use client';

import { useState } from 'react';
import TOSDropdown from '@/components/TOSDropdown';
import Image from 'next/image';

interface Product {
    title: string;
    content: ContentItem[];
}

interface ParagraphContent {
    type: 'paragraph'
    content: string
    className?: string
}

interface ImageContent {
    type: 'image'
    src: string
    alt: string
    className?: string
}

type ContentItem = ParagraphContent | ImageContent

const products: Product[] = [
    {
        title: 'Q2000 Microinverter',
        content: [
            {
                type: "paragraph",
                content: "SPARQ's revolutionary Quad microinverters are game changers for the solar power industry. Unlike traditional microinverters that have one photovoltaic (PV) module inputting into one microinverter, our Quad microinverters have four individual DC input channels to enable independent peak power tracking for up to four PV modules. This allows significant reduction in installation time and cable costs. Based on a Per-Watt rating, our Quad microinverters have the lowest microinverter cost, the highest power output, the highest power density, and the lowest weight in the industry."
            },
            {
                type: "paragraph",
                content: "Our microinverters have been designed for high reliability, using patented technologies that eliminate the use of short-life electrolytic capacitors. This feature gives our microinverters high reliability and a design life of 25 years, matching the design life of PV modules."
            },
            {
                type: "paragraph",
                content: "The Q2000 microinverter is the industry's first highest power rating microinverter that produces electrical energy from four photovoltaic (“PV”) panels of 550W+ each, without any power clipping under all operating conditions. The Q2000 is designed to connect 4 PV panels, up to 550W, to the AC power grid."
            }
        ]
    },
    {
        title: 'Q1200 Grid-Tied',
        content: [{type: "paragraph", content: "The Q1200 Grid-Tied microinverter is designed to connect 4 PV panels, up to 400W, to the AC power grid."}]
    },
    {
        title: 'Q1200 Dual Mode',
        content: [{type: "paragraph", content: "The Q1200 Dual Mode microinverter is specifically designed for use in India, and operates both in grid-tied and off-grid modes, with and without home batteries. The Q1200 is designed to connect 4 PV panels, up to 400W, to the AC power grid."}]
    },
];

const renderContent = (content: ContentItem[]) => {
    return content.map((item, idx) => {
        switch (item.type) {
          case 'paragraph':
            return <p key={idx} className={`mb-4 ${item?.className}`}>{item.content}</p>;
          case 'image':
            return <Image key={idx} src={item.src} alt={item.alt} className={`mb-4 w-full ${item?.className}`} />;
        }
      });
}

export default function ProductDropdowns() {

    // State to track which dropdown is currently open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-6 px-20 my-10 container mx-auto">
            <TOSDropdown/>
            {products.map((product, index) => (
                <div key={index} className="w-full">
                    <div
                        className="p-4 cursor-pointer bg-gray-100 rounded-xl border hover:bg-gray-200"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        aria-expanded={openIndex === index}
                    >
                        <div className="flex flex-row justify-between items-center">
                            <span>{product.title}</span>
                            <svg
                                fill="#000000"
                                height="20"
                                width="20"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 330.00 330.00"
                                className={`transform transition-transform duration-300 ${openIndex === index ? 'scale-y-[-1]' : ''
                                    }`}
                            >
                                <path
                                    id="XMLID_225_"
                                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                />
                            </svg>
                        </div>
                    </div>
                    {openIndex === index && (
                        <div id={`content-${index}`} className="p-4 mt-2">
                            {renderContent(product.content)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}