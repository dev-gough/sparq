'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

interface TeamMemberData {
    imgSrc: string;
    name: string;
    blurb: string;
    title: string;
}

const teamMembers: TeamMemberData[] = [
    {
        imgSrc: '/Team/drjain.webp',
        name: 'Dr. Praveen Jain',
        title: 'Founder & CEO',
        blurb: "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/Majid-Pahlevaninezhad.webp',
        name: 'Dr. Majid Pahlevaninezhad',
        title: 'Chief Technology Officer',
        blurb: "Dr. Pahlevani is the Chief Technology Officer at Sparq Systems. He invented multiple innovative power circuitry and digital control techniques for Sparq's main product family, called the QUAD microinverter. He worked as a technical designer in the Information and Communication Technology Institute (ICTI) from 2003 to 2007, where he was involved in design and implementation of high-quality resonant converters. He also collaborated with Freescale Semiconductor Inc. where he was the leader of a research team working on the design and implementation of the power converters for a pure electric vehicle from 2008 to 2012. He is the author of more than 210 journal and conference proceeding papers and the holder of 85 US patents. Dr. Pahlevani is a senior member of IEEE and a member of the IEEE Power Electronics Society and Industrial Electronics Society. He is also the recipient of many awards such as the \"Engineering and Applied Sciences Outstanding Thesis\" award from Queen's University, \"Research Excellence Award\" from the IEEE Canada, and \"Distinguished Graduate Student Award\" from Isfahan University of Technology. Dr. Pahlevani received his Ph.D. degree from Queens University."
    },
    {
        imgSrc: '/Team/kyle.webp',
        name: 'Kyle Appleby',
        title: 'Chief Financial Officer',
        blurb: "Kyle has been the Chief Financial Officer (CFO) of Sparq since July 2021. Since 2007, Kyle has been providing CFO services to a number of public and private companies, both domestic and international. He has focused on assisting companies with financial reporting, internal controls, governance, operations, and regulatory compliance.  He is a member in good standing of the Chartered Professional Accountants of Canada and the Chartered Professional Accountants of Ontario."
    },
    {
        imgSrc: '/Team/hassan-3.webp',
        name: 'Dr. Hassan Kojori',
        title: 'VP of Program Management',
        blurb: "Dr. Kojori has 30+ years of technical and leadership experience in research and technology development, commercialization and manufacturing of power electronics products for diverse markets including aviation, transportation, steel making, telecommunication and utility industries. As a Senior Principal Engineer at AlliedSignal and Honeywell (1997 to 2022), he was the conversion portfolio leader responsible for research and technology demonstration of highly reliable, efficient and light weight power electronics, Li-ion energy storage, and motor controls products for More Electric Aircraft. As the new product introduction leader at Inver-power Controls Limited (1990-97), he invented the world's first arc-furnace flicker controller under commercial name of Smart Predictive Line Controller (SPLC) and led the technical team for successful design, installation and field testing of a 46 kV, 75 MW SPLC at Co-Steel-LASCO located in Whitby, Canada. His original designs on numerous technology firsts have resulted in more than 45 patent disclosures (29 granted), several trade secrets and over 100 technical papers and proprietary industry reports. He is the recipient of numerous prestigious industry awards including the \"Honeywell Technology Marquee Award\" (2000). Dr. Kojori holds a PhD from the University of Toronto, is a Certified Green Belt DFSS and Six Sigma Plus professional, an IEEE Life Fellow and licensed Professional Engineer in Ontario."
    },
    {
        imgSrc: '/Team/Dr-Shangzhi-Pan.webp',
        name: 'Dr. Shangzhi Pan',
        title: 'VP of Engineering',
        blurb: "Dr. Pan has led the research, development, design, testing and certification of Sparq's microinverters since 2009. Dr. Pan has completed extensive applied research at Queen's University over the past decade on advanced digital control techniques for the computer and lighting industries as well as microinverter technologies. He is the inventor or co-inventor of 22 issued and pending US patents. He previously worked as an R&D engineer for Alcatel Shanghai Bell and as a consultant for CHiL Semiconductor to transfer patented technologies from Queen's labs to the company. Dr. Pan is a senior member of the Institute of Electrical and Electronics Engineers (IEEE), and a member of IEEE Power Electronics and Industrial Electronics Societies. Dr. Pan holds a PhD degree in Power Electronics from Queen's University, Canada."
    },
    {
        imgSrc: '/Team/Pankaj_photo.webp',
        name: 'Pankaj Jain',
        title: 'VP of Operations',
        blurb: "Pankaj has 20+ years of experience managing all aspects of product development and life cycle management. He has broad technical expertise in the development and manufacturing of complex products built to the highest industry standards. Pankaj is keenly interested in advancing the open standards for communication in the emerging Smart Power Grids. He wants to see solar on every roof and believes that the world's energy needs can easily be met through solar power. He holds a Master of Science degree in Electrical Engineering from Memorial University of Newfoundland and a Bachelor of Engineering from Panjab Engineering College."
    },
    {
        imgSrc: '/Team/Haibo-Zhang.webp',
        name: 'Haibo Zhang',
        title: 'VP of Manufacturing',
        blurb: "Haibo Zhang has over 30 years of engineering experience in power electronics product design and manufacturing. He joined Sparq Systems in 2009 to lead the product manufacturing. Prior to this, he had worked at Cistel Technology, as a Power Electronics R&D Manager; Nortel Networks as a Power Electronics consultant, and at CHiL Semiconductor, as a Chief Power Electronics Engineer. His innovative ideas in power electronic circuits led him to start his own company, Coolumen, where he developed power electronic drivers for CFL and LED lighting. He holds an MASc degree in Electrical Engineering from Concordia University, Montreal, Canada. Mr. Zhang holds several patents."
    },
    {
        imgSrc: '/Team/Muhammad_Ikram.webp',
        name: 'Muhammad Ikram',
        title: 'VP of Finance',
        blurb: "Muhammad Ikram is a member of Chartered Professional Accountants Ontario and Canada. He also holds a Bachelors in Commerce degree from University of the Punjab. Muhammad started his career as an assistant accountant at a tax law firm over two decades ago. Over the years Muhammad has served in progressive finance and accounting roles for a variety of public and private growth companies, including a solar company. At Redline Communications Inc., Muhammad was part of the IPO team that took the company public at AIM (London Stock Exchange) and TSX (Toronto Stock Exchange) simultaneously. Muhammad's key areas of expertise include, but are not limited to, internal controls, system implementations, financial reporting including MD&A, government filings, payroll, and benefits administration."
    },
]

interface TeamMemberCardProps {
    member: TeamMemberData
    onClick: () => void
}

function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer group text-left w-full"
            aria-label={`View biography for ${member.name}`}
        >
            <Card className="h-full backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border-brand-maroon/10 dark:border-gray-600/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl py-0">
                <div>
                    <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                            <Image src={member.imgSrc}
                                alt=""
                                width={512}
                                height={512}
                                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                        </div>
                        <div className="px-6 pb-6 pt-4 text-center">
                            <span className="block text-xl font-bold text-brand-darkmaroon dark:text-dark-text-primary mb-2 group-hover:text-brand-maroon dark:group-hover:text-brand-yellow transition-colors duration-300">
                                {member.name}
                            </span>
                            <p className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                                {member.title}
                            </p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </button>
    )
}

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />

            <div className="relative container mx-auto px-4 py-10">
                {/* Hero section */}
                <div
                    
                    
                    
                    className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Meet Our Leaders
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
                        The visionary executives and technical experts driving innovation in solar energy technology.
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {teamMembers.map((member) => (
                        <TeamMemberCard
                            key={member.name}
                            member={member}
                            onClick={() => handleClick(member)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMember && (
                <div className="fixed inset-0 bg-black/80 z-[60]"
                    onClick={() => setMember(null)}>
                    <div className="absolute w-full flex items-center justify-center px-4"
                        style={{
                            top: '153px', // Header (75px) + Subheader (78px)
                            height: 'calc(100dvh - 153px)', // Use dynamic viewport height for mobile browser compatibility
                        }}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto border border-brand-maroon/20 dark:border-gray-600/50"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="relative p-4 md:p-8">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 min-h-[44px] min-w-[44px] bg-brand-maroon/10 hover:bg-brand-maroon text-brand-maroon hover:text-white rounded-full inline-flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                    onClick={() => setMember(null)}
                                    aria-label="Close biography"
                                >
                                    <span aria-hidden>✕</span>
                                </button>

                                <div className="border-b border-brand-maroon/20 dark:border-gray-600/50 pb-4 md:pb-6 mb-4 md:mb-6">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-darkmaroon dark:text-dark-text-primary mb-2">
                                        {selectedMember.name}
                                    </h2>
                                    <p className="text-lg md:text-xl lg:text-2xl text-brand-logo dark:text-brand-yellow font-medium">
                                        {selectedMember.title}
                                    </p>
                                </div>

                                <div className="prose prose-sm md:prose-lg max-w-none">
                                    <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed text-sm md:text-base lg:text-lg">
                                        {selectedMember.blurb}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}