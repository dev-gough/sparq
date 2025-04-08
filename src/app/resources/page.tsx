'use client'

import HomeFAQData from "./home_faq.json"
import InstallerFAQData from "./installer_faq.json"
import AccordionItem from "@/components/AccordianMenuItem";
import SupportTicketForm from "@/components/SupportTicket";
import YTVideo from "@/components/YTVideo";

interface FAQData {
    id: number
    questionBrand: string;
    subQuestions: { id: number, question: string, answer: string }[];
}

const ids = [
    "gaFi_dPnYNk",
    "5u3KVFYHfk0",
    "I3an6Yqga1Y",
    "8OJ02vvC-Os",
    "Ibs0snk6nH0",
    "4Ngk_vP-dIQ",
    "am7VzIpn5TI",
    "nhH8LrnONxs",
]

const HomeFAQEntries: FAQData[] = HomeFAQData.faqs;
const InstallerFAQEntries: FAQData[] = InstallerFAQData.faqs

export default function ResourcesPage() {
    return (
        <div className="bg-white container mx-auto py-8 px-10">
            <section id="homeowners">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Homeowners
                </h1>
                <h1 className="text-2xl font-bold text-brand-maroon text-left mt-12">
                    Frequently Asked Questions
                </h1>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col space-y-6">
                        {HomeFAQEntries.map((item) => (
                            <AccordionItem title={item.questionBrand} key={item.id}>
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
            </section>
            <section id="installers">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Installers
                </h1>
                <h1 className="text-2xl font-bold text-brand-maroon text-left mt-12">
                    Frequently Asked Questions
                </h1>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col space-y-6">
                        {InstallerFAQEntries.map((item) => (
                            <AccordionItem title={item.questionBrand} key={item.id}>
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
            </section>
            <section>
                <div className="py-14">
                    <strong>Support for Installers and Distributors:</strong> we are currently updating our training materials for installers and distributors. Please check back often for more information or <span className="text-amber-800 hover:text-amber-600 transition duration-200"><a href="https://www.sparqsys.com/contact-us/">contact us</a></span> for support.
                </div>
            </section>
            <section className="mt-16" id="support">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Support Ticket
                </h1>
                <SupportTicketForm />
            </section>
            <section id="photos">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Photo Gallery
                </h1>
                <p>Need Content</p>
            </section>
            <section id="videos">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16">
                    Video Gallery
                </h1>
                <AccordionItem title="Videos">
                    <YTVideo videoIds={ids} />
                </AccordionItem>
            </section>
            <section id="design">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mt-12 mb-16 ">Design Your System</h1>
                <p className="mt-4">Follow these steps for designing your SPARQ energy solution system.</p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 1 – Understand your requirements</h2>
                    <p className="mt-2">Determine your average annual energy consumption by summing the last 12 months of kWh energy usage from your utility bills. Use your annual energy information to help select your system size.</p>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 2 – Size the system</h2>
                    <p className="mt-2">Get an idea of the solar potential of your location by going to the free PV Watts site: <a href="https://pvwatts.nrel.gov/" className="text-blue-600 underline">PV Watts Calculator</a>. Enter your address or zip code, select the solar resource data and click on ‘Go To System Info’.</p>
                    <p className="mt-2">Set DC System Size to 1. If mounting the system on your roof, enter the Tilt (slope) and Azimuth (angle rotated from north). Click on ‘Go to Results’. Divide the annual energy from step 1 by the PV Watts result to get the system size in kW needed to offset all of your electricity usage.</p>
                    <p className="font-semibold py-4">Example:</p>
                    <ul className="list-disc list-inside">
                        <li>Annual energy = 5,600kWh</li>
                        <li>PV Watts results = 1,512kWh</li>
                        <li>System size = 5600 / 1512 = 3.703kW</li>
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 3 – Create a bill of material and contact us</h2>
                    <p className="mt-2">Each Q1200 (Quad) will produce up to 1.2kW of power. Divide the system size calculated in Step 2 by 1.2 to determine the number of Quad microinverters needed to offset the annual energy consumption.</p>
                    <p className="font-semibold py-4">Example:</p>
                    <ul className="list-disc list-inside">
                        <li>System size = 3.703kW</li>
                        <li>Number of Q1200 = 3.703 / 1.2 = 3.08 (Round to 3)</li>
                    </ul>
                    <p className="mt-2">Each Quad will be connected to 4 PV modules. Size the PV modules for peak output between 300 and 350W per 60-cell module.</p>
                    <p className="mt-2">Each Quad will need a trunk cable branch connector, and the trunk cable will need an end terminator cap. A SparqLinq gateway interface allows the system to be monitored. An AC disconnect tool and a DC disconnect tool are recommended for maintenance.</p>
                    <p className="font-semibold py-4">Total parts list:</p>
                    <ul className="list-disc list-inside">
                        <li>Quad</li>
                        <li>Trunk cable branch connectors</li>
                        <li>End terminator cap</li>
                        <li>SparqLinq gateway</li>
                        <li>AC and DC disconnect tool</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}