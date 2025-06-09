'use client'

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTrackEvent } from "@/hooks/useTrackEvent"

interface BoardMemberData {
    imgSrc: string;
    name: string;
    location: string;
    title: string;
    blurb: string;
}

const boardMembers: BoardMemberData[] = [
    {
        imgSrc: '/Team/drjain.png',
        name: 'Dr. Praveen Jain',
        location: 'Kingston, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/nishithgoel.jpg',
        name: 'Dr. Nishith Goel',
        location: 'Ottawa, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Dr. Goel is the CEO of Cistel Technology, an Information Technology company he founded in 1995, which has operations in Canada and the USA. A veteran technology executive and entrepreneur, he is also co-founder of CHiL Semiconductor and SPARQ Systems. Dr. Goel has served on the Board of Directors of Enablence Technologies Inc. (TSXV). He has also served on the Board of Directors of the Community Foundation of Ottawa, the Queensway Carleton Hospital Foundation, the Indo-Canada Ottawa Business Chamber, as well as Chair of the Queensway Carleton Hospital Foundation. Dr. Goel obtained his PhD from the University of Waterloo."
    },
    {
        imgSrc: '/Team/robbie.png',
        name: 'BaoJun (Robbie) Luo',
        location: 'Shenzhen, China',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Robbie Luo is the President of Ti-Lane Precision Electronic Company Limited and Ti-Lane Group, Shenzhen, China. Ti-Lane is the global leader in providing connector and cable assembly products for communications, computer, medical, automotive and clean energy applications. He is a firm believer of renewable energy deployment and is a Deputy Director General of Shenzhen Solar Energy Society. He earned his MBA from Ursuline College at Tsinghua University, China.",
    },
    {
        imgSrc: '/Team/ravi.png',
        name: 'Ravi Sood',
        location: 'Toronto, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Mr. Sood is the Managing Director of Signal 8 Limited, based in Toronto, Canada. Mr. Sood has been a founder and the principal investor in several businesses in emerging markets and currently serves as Chairman of Jade Power Trust (TSXV), Galane Gold Ltd. (TSXV), and Biomind Labs Inc. (NEO). He was the founder and Chief Executive Officer of Navina Asset Management Inc., a global asset management firm headquartered in Toronto, Canada. Mr. Sood led the investment activities of Navina and its predecessor company, Lawrence Asset Management Inc., from its founding in 2001 until he sold the firm in 2010. Mr. Sood was educated at the University of Waterloo (B. Mathematics), where he was a Descartes Fellow and the recipient of numerous national awards."
    },
    {
        imgSrc: '/Team/arul.png',
        name: 'Dr. Arul Shanmugasundaram',
        location: 'Karnataka, India',
        title: 'Director as of: February 24, 2022',
        blurb:
            "Dr. Arul Shanmugasundaram is currently the Executive Director of Ayana Renewable Power Private Limited, India, where he is responsible for business development, technology, and asset management functions. Previously, he was the Chief Operating Officer of Tata Power Solar Systems and led the EPC for utility-scale, rooftop, and pump projects. During nearly a decade at Tata Group, he was part of the leadership team that transformed Tata Power Solar from revenues of US$100 million to US$450 million. Dr. Shanmugasundaram started his career at Applied Materials in Silicon Valley, where he spent 15 years developing and launching several new products and process controls. Dr. Shanmugasundaram holds a Bachelor's degree from the Indian Institute of Technology Madras and Master's and Doctorate degrees from Cornell University. He has more than 40 US patents and several international publications."
    },
    {
        imgSrc: '/Team/magomet.png',
        name: 'Magomet Malsagov',
        location: 'Wollerau, Switzerland',
        title: 'Director as of: October 21, 2024',
        blurb:
            "Mr. Malsagov is an accomplished entrepreneur and executive with over two decades of experience across the food and beverage and IT industries. He is the founder of PureCircle Ltd, a global leader in high-purity stevia ingredients, which was acquired by Ingredion Inc, a Fortune 500 company. Additionally, he founded AVATAi Sdn Bhd, an innovative company specializing in 3D Generative AI. Mr. Malsagov, an alumnus of Harvard Business School, holds numerous patents and possesses extensive expertise in business development, strategic planning, and operational excellence and has been actively involved in various professional organizations and philanthropic initiatives."
    }
]

interface BoardMemberCardProps {
    member: BoardMemberData
    index: number
    onClick: () => void
}

function BoardMemberCard({ member, index, onClick }: BoardMemberCardProps) {
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
                            <p className="text-brand-graytext font-medium mb-1">
                                {member.location}
                            </p>
                            <p className="text-brand-graytext text-sm">
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
    { width: 130, height: 85, left: 12, top: 18, duration: 17, delay: 0.9, borderRadius: '50% 50% 70% 30%' },
    { width: 95, height: 115, left: 82, top: 25, duration: 14, delay: 2.2, borderRadius: '40% 60% 60% 40%' },
    { width: 170, height: 55, left: 38, top: 50, duration: 19, delay: 1.5, borderRadius: '30% 70% 70% 30%' },
    { width: 75, height: 75, left: 78, top: 80, duration: 15, delay: 0.7, borderRadius: '50%' },
    { width: 105, height: 145, left: 18, top: 90, duration: 16, delay: 3.8, borderRadius: '70% 30% 50% 50%' },
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
                        y: [0, -18, 0],
                        x: [0, 8, 0],
                        scale: [1, 1.04, 1],
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

export default function BoardPage() {
    const [selectedMember, setMember] = useState<BoardMemberData | null>(null)
    const trackEvent = useTrackEvent()
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    const handleClick = (member: BoardMemberData) => {
        setMember(member)
        trackEvent("popup_opened", {
            "member_viewed": member.name
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative scroll-mt-[115px]">
            <BackgroundElements />

            <div className="relative container mx-auto px-4 pb-20 pt-10">
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
                            Our Board
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed">
                        Distinguished directors providing strategic guidance and governance expertise to drive our mission forward.
                    </p>
                </motion.div>

                {/* Board grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {boardMembers.map((member, index) => (
                        <BoardMemberCard
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
                                <p className="text-xl md:text-2xl text-brand-logo font-medium mb-2">
                                    {selectedMember.location}
                                </p>
                                <p className="text-lg text-brand-graytext">
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