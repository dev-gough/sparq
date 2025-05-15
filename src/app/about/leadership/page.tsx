'use client'

import { useState } from "react"
import Image from "next/image"
import { useTrackEvent } from "@/hooks/useTrackEvent"

interface TeamMemberData {
    imgSrc: string;
    name: string;
    blurb: string;
    title: string;
}

const teamMembers: TeamMemberData[] = [
    {
        imgSrc: '/Team/Dr-Praveen-Jain.png',
        name: 'Dr. Praveen Jain',
        title: 'Founder & CEO',
        blurb: "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/Majid-Pahlevaninezhad.jpg',
        name: 'Dr. Majid Pahlevaninezhad',
        title: 'Chief Technology Officer',
        blurb: "Dr. Pahlevani is the Chief Technology Officer at Sparq Systems. He invented multiple innovative power circuitry and digital control techniques for Sparq's main product family, called the QUAD microinverter. He worked as a technical designer in the Information and Communication Technology Institute (ICTI) from 2003 to 2007, where he was involved in design and implementation of high-quality resonant converters. He also collaborated with Freescale Semiconductor Inc. where he was the leader of a research team working on the design and implementation of the power converters for a pure electric vehicle from 2008 to 2012. He is the author of more than 210 journal and conference proceeding papers and the holder of 85 US patents. Dr. Pahlevani is a senior member of IEEE and a member of the IEEE Power Electronics Society and Industrial Electronics Society. He is also the recipient of many awards such as the “Engineering and Applied Sciences Outstanding Thesis” award from Queen's University, “Research Excellence Award” from the IEEE Canada, and “Distinguished Graduate Student Award” from Isfahan University of Technology. Dr. Pahlevani received his Ph.D. degree from Queens University."
    },
    {
        imgSrc: '/Team/hassan.png',
        name: 'Dr. Hassan Kojori',
        title: 'VP of Program Management',
        blurb: "Dr. Kojori has 30+ years of technical and leadership experience in research and technology development, commercialization and manufacturing of power electronics products for diverse markets including aviation, transportation, steel making, telecommunication and utility industries. As a Senior Principal Engineer at AlliedSignal and Honeywell (1997 to 2022), he was the conversion portfolio leader responsible for research and technology demonstration of highly reliable, efficient and light weight power electronics, Li-ion energy storage, and motor controls products for More Electric Aircraft. As the new product introduction leader at Inver-power Controls Limited (1990-97), he invented the world's first arc-furnace flicker controller under commercial name of Smart Predictive Line Controller (SPLC) and led the technical team for successful design, installation and field testing of a 46 kV, 75 MW SPLC at Co-Steel-LASCO located in Whitby, Canada. His original designs on numerous technology firsts have resulted in more than 45 patent disclosures (29 granted), several trade secrets and over 100 technical papers and proprietary industry reports. He is the recipient of numerous prestigious industry awards including the “Honeywell Technology Marquee Award” (2000). Dr. Kojori holds a PhD from the University of Toronto, is a Certified Green Belt DFSS and Six Sigma Plus professional, an IEEE Life Fellow and licensed Professional Engineer in Ontario."
    },
    {
        imgSrc: '/Team/Dr-Shangzhi-Pan.png',
        name: 'Dr. Shangzhi Pan',
        title: 'VP of Engineering',
        blurb: "Dr. Pan has led the research, development, design, testing and certification of Sparq's microinverters since 2009. Dr. Pan has completed extensive applied research at Queen's University over the past decade on advanced digital control techniques for the computer and lighting industries as well as microinverter technologies. He is the inventor or co-inventor of 22 issued and pending US patents. He previously worked as an R&D engineer for Alcatel Shanghai Bell and as a consultant for CHiL Semiconductor to transfer patented technologies from Queen's labs to the company. Dr. Pan is a senior member of the Institute of Electrical and Electronics Engineers (IEEE), and a member of IEEE Power Electronics and Industrial Electronics Societies. Dr. Pan holds a PhD degree in Power Electronics from Queen's University, Canada."
    },
    {
        imgSrc: '/Team/Pankaj_photo.png',
        name: 'Pankaj Jain',
        title: 'VP of Operations',
        blurb: "Pankaj has 20+ years of experience managing all aspects of product development and life cycle management. He has broad technical expertise in the development and manufacturing of complex products built to the highest industry standards. Pankaj is keenly interested in advancing the open standards for communication in the emerging Smart Power Grids. He wants to see solar on every roof and believes that the world's energy needs can easily be met through solar power. He holds a Master of Science degree in Electrical Engineering from Memorial University of Newfoundland and a Bachelor of Engineering from Panjab Engineering College."
    },
    {
        imgSrc: '/Team/Haibo-Zhang.jpg',
        name: 'Haibo Zhang',
        title: 'VP of Manufacturing',
        blurb: "Haibo Zhang has over 30 years of engineering experience in power electronics product design and manufacturing. He joined Sparq Systems in 2009 to lead the product manufacturing. Prior to this, he had worked at Cistel Technology, as a Power Electronics R&D Manager; Nortel Networks as a Power Electronics consultant, and at CHiL Semiconductor, as a Chief Power Electronics Engineer. His innovative ideas in power electronic circuits led him to start his own company, Coolumen, where he developed power electronic drivers for CFL and LED lighting. He holds an MASc degree in Electrical Engineering from Concordia University, Montreal, Canada. Mr. Zhang holds several patents."
    },
    {
        imgSrc: '/Team/Muhammad_Ikram.jpg',
        name: 'Muhammad Ikram',
        title: 'VP of Finance',
        blurb: "Muhammad Ikram is a member of Chartered Professional Accountants Ontario and Canada. He also holds a Bachelors in Commerce degree from University of the Punjab. Muhammad started his career as an assistant accountant at a tax law firm over two decades ago. Over the years Muhammad has served in progressive finance and accounting roles for a variety of public and private growth companies, including a solar company. At Redline Communications Inc., Muhammad was part of the IPO team that took the company public at AIM (London Stock Exchange) and TSX (Toronto Stock Exchange) simultaneously. Muhammad's key areas of expertise include, but are not limited to, internal controls, system implementations, financial reporting including MD&A, government filings, payroll, and benefits administration."
    },
    {
        imgSrc: '/Team/kyle.png',
        name: 'Kyle Appleby',
        title: 'Chief Financial Officer',
        blurb: "Kyle has been the Chief Financial Officer (CFO) of Sparq since July 2021. Since 2007, Kyle has been providing CFO services to a number of public and private companies, both domestic and international. He has focused on assisting companies with financial reporting, internal controls, governance, operations, and regulatory compliance.  He is a member in good standing of the Chartered Professional Accountants of Canada and the Chartered Professional Accountants of Ontario."
    },
]

export default function LeadershipPage() {

    const [selectedMember, setMember] = useState<TeamMemberData | null>(null)
    const trackEvent = useTrackEvent()

    const handleClick = (member: TeamMemberData) => {
        setMember(member)
        trackEvent("popup_opened", {
            "member_viewed": member.name
        })
    }

    return (
        <div className="container mx-auto py-8 sm:px-4 pb-4">
            <section id="leadership" className="px-2 sm:px-0">
                <h1 className="sm:text-5xl text-3xl font-bold text-brand-maroon text-center sm:mb-32 mb-8">Meet the Team</h1>
                <div className="flex flex-wrap justify-center gap-16">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(member)}
                            className={`bg-white flex flex-col items-center cursor-pointer transform transition duration-300 w-full sm:w-1/2 lg:w-72 ${selectedMember === member
                                ? 'scale-100'
                                : 'hover:scale-110 hover:z-100 hover:border-x hover:border-b hover:rounded-xl'
                                }`}>
                            <Image
                                src={member.imgSrc}
                                alt={member.name}
                                width={512}
                                height={512}
                                className="w-full h-96 object-cover rounded-lg mb-2"
                            />
                            <h2 className="text-xl font-medium text-black">{member.name}</h2>
                            <p className="text-lg text-black">{member.title}</p>
                        </div>
                    ))}
                </div>
            </section>
            {selectedMember && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMember(null)}
                >
                    <div
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl z-50 sm:max-w-4/5 max-h-4/5 w-full overflow-y-auto border-brand-maroon border-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 bg-brand-maroon text-white px-4 py-2 rounded hover:bg-brand-maroon/80 z-10 cursor-pointer"
                            onClick={() => setMember(null)}
                        >
                            Close
                        </button>
                        <div className="border-b-4 pb-2 rounded-md border-brand-yellow">
                            <h2 className="sm:text-4xl text-lg font-bold">{selectedMember.name}</h2>
                            <p className="sm:text-3xl">{selectedMember.title}</p>
                        </div>
                        <p className="mt-4 text-gray-700 sm:text-2xl text-sm">{selectedMember.blurb}</p>
                    </div>
                </div>
            )}
        </div>
    )
}