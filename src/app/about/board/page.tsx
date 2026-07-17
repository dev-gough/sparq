'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTrackEvent } from "@/hooks/useTrackEvent"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

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
        imgSrc: '/Team/nishith.png',
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
            "Mr. Sood is an entrepreneur and investor with over 25 years experience in capital markets and operations across a variety of industries and geographies.  He is the Chairman of Abraxas Power, a renewable energy projects developer with projects in Asia, Europe and North America.  He is also the Chairman and CEO of Golconda Gold Ltd, a gold producer and a non-executive director of Elemental Altus Royalties and Biomind Labs Inc.  He was previously the founder and CEO of Navina Asset Management, a Toronto-based investment firm (acquired), the Chairman and co-founder of Jade Power Trust (acquired), a renewable energy project developer, and has served as a director of various companies in the technology, commodity, and financial services sectors.  Mr. Sood holds a B.Mathematics (Hons) degree from the University of Waterloo where he was a Descartes Fellow and the recipient of numerous national awards."
    },
    {
        imgSrc: '/Team/arul.png',
        name: 'Dr. Arul Shanmugasundaram',
        location: 'Karnataka, India',
        title: 'Director as of: February 24, 2022',
        blurb:
            "Dr Arul Shanmugasundaram is Chief Executive Officer and Managing Director of SWELECT Energy Systems Ltd., a renewable energy solutions company. Prior to this, he was the Executive Director of Ayana Renewable Power Private Limited, India, where he was responsible for business development, technology, and asset management functions. Previously, he was the Chief Operating Officer of Tata Power Solar Systems and led the EPC for utility-scale, rooftop, and pump projects. During nearly a decade at Tata Group, he was part of the leadership team that transformed Tata Power Solar from revenues of US$100 million to US$450 million. Dr. Shanmugasundaram started his career at Applied Materials in Silicon Valley, where he spent 15 years developing and launching several new products and process controls. Dr. Shanmugasundaram holds a Bachelor's degree from the Indian Institute of Technology Madras and Master's and Doctorate degrees from Cornell University. He has more than 40 US patents and several international publications."
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
    onClick: () => void
}

function BoardMemberCard({ member, onClick }: BoardMemberCardProps) {
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
                                className="w-full h-80 object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                        </div>
                        <div className="px-6 pb-6 pt-4 text-center">
                            <span className="block text-xl font-bold text-brand-darkmaroon dark:text-dark-text-primary mb-2 group-hover:text-brand-maroon dark:group-hover:text-brand-yellow transition-colors duration-300">
                                {member.name}
                            </span>
                            <p className="text-brand-graytext dark:text-dark-text-secondary font-medium mb-1">
                                {member.location}
                            </p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </button>
    )
}

export default function BoardPage() {
    const [selectedMember, setMember] = useState<BoardMemberData | null>(null)
    const trackEvent = useTrackEvent()
    const handleClick = (member: BoardMemberData) => {
        setMember(member)
        trackEvent("popup_opened", {
            "member_viewed": member.name
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />

            <div className="relative container mx-auto px-4 pb-20 pt-10">
                {/* Hero section */}
                <div
                    
                    
                    
                    className="text-center mb-16">

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Our Board
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
                        Distinguished directors providing strategic guidance and governance expertise to drive our mission forward.
                    </p>
                </div>

                {/* Board grid */}
                <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto [&>*]:w-full [&>*]:sm:w-[calc(50%-1rem)] [&>*]:lg:w-[calc(33.333%-1.33rem)] [&>*]:xl:w-[calc(25%-1.5rem)]">
                    {boardMembers.map((member) => (
                        <BoardMemberCard
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
                                    <p className="text-lg md:text-xl lg:text-2xl text-brand-logo dark:text-brand-yellow font-medium mb-2">
                                        {selectedMember.location}
                                    </p>
                                    <p className="text-base md:text-lg text-brand-graytext dark:text-dark-text-secondary">
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