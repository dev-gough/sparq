'use client'

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
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
        imgSrc: '/Team/drjain.png',
        name: 'Dr. Praveen Jain',
        title: 'Founder & CEO',
        blurb: "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/Majid-Pahlevaninezhad.jpg',
        name: 'Dr. Majid Pahlevaninezhad',
        title: 'Chief Technology Officer',
        blurb: "Dr. Pahlevani is the Chief Technology Officer at Sparq Systems. He invented multiple innovative power circuitry and digital control techniques for Sparq's main product family, called the QUAD microinverter. He worked as a technical designer in the Information and Communication Technology Institute (ICTI) from 2003 to 2007, where he was involved in design and implementation of high-quality resonant converters. He also collaborated with Freescale Semiconductor Inc. where he was the leader of a research team working on the design and implementation of the power converters for a pure electric vehicle from 2008 to 2012. He is the author of more than 210 journal and conference proceeding papers and the holder of 85 US patents. Dr. Pahlevani is a senior member of IEEE and a member of the IEEE Power Electronics Society and Industrial Electronics Society. He is also the recipient of many awards such as the \"Engineering and Applied Sciences Outstanding Thesis\" award from Queen's University, \"Research Excellence Award\" from the IEEE Canada, and \"Distinguished Graduate Student Award\" from Isfahan University of Technology. Dr. Pahlevani received his Ph.D. degree from Queens University."
    },
    {
        imgSrc: '/Team/hassan.png',
        name: 'Dr. Hassan Kojori',
        title: 'VP of Program Management',
        blurb: "Dr. Kojori has 30+ years of technical and leadership experience in research and technology development, commercialization and manufacturing of power electronics products for diverse markets including aviation, transportation, steel making, telecommunication and utility industries. As a Senior Principal Engineer at AlliedSignal and Honeywell (1997 to 2022), he was the conversion portfolio leader responsible for research and technology demonstration of highly reliable, efficient and light weight power electronics, Li-ion energy storage, and motor controls products for More Electric Aircraft. As the new product introduction leader at Inver-power Controls Limited (1990-97), he invented the world's first arc-furnace flicker controller under commercial name of Smart Predictive Line Controller (SPLC) and led the technical team for successful design, installation and field testing of a 46 kV, 75 MW SPLC at Co-Steel-LASCO located in Whitby, Canada. His original designs on numerous technology firsts have resulted in more than 45 patent disclosures (29 granted), several trade secrets and over 100 technical papers and proprietary industry reports. He is the recipient of numerous prestigious industry awards including the \"Honeywell Technology Marquee Award\" (2000). Dr. Kojori holds a PhD from the University of Toronto, is a Certified Green Belt DFSS and Six Sigma Plus professional, an IEEE Life Fellow and licensed Professional Engineer in Ontario."
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

interface TeamMemberCardProps {
    member: TeamMemberData
    index: number
    onClick: () => void
}

function TeamMemberCard({ member, index, onClick }: TeamMemberCardProps) {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className="cursor-pointer group"
        >
            <Card className="h-full backdrop-blur-md bg-white/90 border-brand-maroon/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl py-0">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                            <Image
                                src={member.imgSrc}
                                alt={member.name}
                                width={512}
                                height={512}
                                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="px-6 pb-6 pt-4 text-center">
                            <h2 className="text-xl font-bold text-brand-darkmaroon mb-2 group-hover:text-brand-maroon transition-colors duration-300">
                                {member.name}
                            </h2>
                            <p className="text-brand-graytext font-medium">
                                {member.title}
                            </p>
                        </div>
                    </CardContent>
                </motion.div>
            </Card>
        </motion.div>
    )
}

// Background shapes for consistency
const backgroundShapes = [
    { width: 140, height: 90, left: 8, top: 12, duration: 18, delay: 1.2, borderRadius: '50% 50% 70% 30%' },
    { width: 100, height: 120, left: 85, top: 20, duration: 15, delay: 2.5, borderRadius: '40% 60% 60% 40%' },
    { width: 180, height: 60, left: 35, top: 45, duration: 20, delay: 0.8, borderRadius: '30% 70% 70% 30%' },
    { width: 80, height: 80, left: 75, top: 75, duration: 14, delay: 1.8, borderRadius: '50%' },
    { width: 110, height: 150, left: 15, top: 85, duration: 16, delay: 3.2, borderRadius: '70% 30% 50% 50%' },
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/4 via-brand-logo/3 to-brand-yellow/2"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        scale: [1, 1.05, 1],
                        rotate: [0, 360],
                        borderRadius: [
                            shape.borderRadius,
                            shape.borderRadius === '50%' ? '30% 70% 70% 30%' : '50%',
                            shape.borderRadius
                        ]
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

export default function LeadershipPage() {
    const [selectedMember, setMember] = useState<TeamMemberData | null>(null)
    const trackEvent = useTrackEvent()
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const handleClick = (member: TeamMemberData) => {
        setMember(member)
        trackEvent("popup_opened", {
            "member_viewed": member.name
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            <BackgroundElements />

            <div className="relative container mx-auto px-4 py-20">
                {/* Hero section */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Meet Our Leaders
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        The visionary executives and technical experts driving innovation in solar energy technology.
                    </p>
                </motion.div>

                {/* Team grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            member={member}
                            index={index}
                            onClick={() => handleClick(member)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMember && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4"
                    onClick={() => setMember(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-brand-maroon/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative p-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-4 right-4 w-10 h-10 bg-brand-maroon/10 hover:bg-brand-maroon text-brand-maroon hover:text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                onClick={() => setMember(null)}
                            >
                                ✕
                            </motion.button>

                            <div className="border-b border-brand-maroon/20 pb-6 mb-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon mb-2">
                                    {selectedMember.name}
                                </h2>
                                <p className="text-xl md:text-2xl text-brand-logo font-medium">
                                    {selectedMember.title}
                                </p>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-brand-graytext leading-relaxed text-lg">
                                    {selectedMember.blurb}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}