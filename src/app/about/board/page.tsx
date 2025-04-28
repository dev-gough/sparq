'use client'

import { useState } from "react"
import Image from "next/image"

interface BoardMemberData {
    imgSrc: string;
    name: string;
    location: string;
    title: string;
    blurb: string;
}

const boardMembers: BoardMemberData[] = [
    {
        imgSrc: '/Team/Dr-Praveen-Jain.png',
        name: 'Praveen Jain',
        location: 'Kingston, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/nishithgoel.jpg',
        name: 'Nishith Goel',
        location: 'Ottawa, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Dr. Goel is the CEO of Cistel Technology, an Information Technology company he founded in 1995, which has operations in Canada and the USA. A veteran technology executive and entrepreneur, he is also co-founder of CHiL Semiconductor and SPARQ Systems. Dr. Goel has served on the Board of Directors of Enablence Technologies Inc. (TSXV). He has also served on the Board of Directors of the Community Foundation of Ottawa, the Queensway Carleton Hospital Foundation, the Indo-Canada Ottawa Business Chamber, as well as Chair of the Queensway Carleton Hospital Foundation. Dr. Goel obtained his PhD from the University of Waterloo."
    },
    {
        imgSrc: '/Team/baojunrobbieluo.jpg',
        name: 'BaoJun (Robbie) Luo',
        location: 'Shenzhen, China',
        title: 'Director since: December 31, 2021',
        blurb:
            "Robbie Luo is the President of Ti-Lane Precision Electronic Company Limited and Ti-Lane Group, Shenzhen, China. Ti-Lane is the global leader in providing connector and cable assembly products for communications, computer, medical, automotive and clean energy applications. He is a firm believer of renewable energy deployment and is a Deputy Director General of Shenzhen Solar Energy Society. He earned his MBA from Ursuline College at Tsinghua University, China.",
    },
    {
        imgSrc: '/Team/ravisood.png',
        name: 'Ravi Sood',
        location: 'Toronto, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Mr. Sood is the Managing Director of Signal 8 Limited, based in Toronto, Canada. Mr. Sood has been a founder and the principal investor in several businesses in emerging markets and currently serves as Chairman of Jade Power Trust (TSXV), Galane Gold Ltd. (TSXV), and Biomind Labs Inc. (NEO). He was the founder and Chief Executive Officer of Navina Asset Management Inc., a global asset management firm headquartered in Toronto, Canada. Mr. Sood led the investment activities of Navina and its predecessor company, Lawrence Asset Management Inc., from its founding in 2001 until he sold the firm in 2010. Mr. Sood was educated at the University of Waterloo (B. Mathematics), where he was a Descartes Fellow and the recipient of numerous national awards."
    },
    {
        imgSrc: '/Team/arulshanmugasundaram.png',
        name: 'Arul Shanmugasundaram',
        location: 'Karnataka, India',
        title: 'Director since: February 24, 2022',
        blurb:
            "Dr. Arul Shanmugasundaram is currently the Executive Director of Ayana Renewable Power Private Limited, India, where he is responsible for business development, technology, and asset management functions. Previously, he was the Chief Operating Officer of Tata Power Solar Systems and led the EPC for utility-scale, rooftop, and pump projects. During nearly a decade at Tata Group, he was part of the leadership team that transformed Tata Power Solar from revenues of US$100 million to US$450 million. Dr. Shanmugasundaram started his career at Applied Materials in Silicon Valley, where he spent 15 years developing and launching several new products and process controls. Dr. Shanmugasundaram holds a Bachelor's degree from the Indian Institute of Technology Madras and Master's and Doctorate degrees from Cornell University. He has more than 40 US patents and several international publications."
    },
    {
        imgSrc: '/Team/Magomet.jpg',
        name: 'Magomet Malsagov',
        location: 'Wollerau, Switzerland',
        title: 'Director since: October 21, 2024',
        blurb:
            "Mr. Malsagov is an accomplished entrepreneur and executive with over two decades of experience across the food and beverage and IT industries. He is the founder of PureCircle Ltd, a global leader in high-purity stevia ingredients, which was acquired by Ingredion Inc, a Fortune 500 company. Additionally, he founded AVATAi Sdn Bhd, an innovative company specializing in 3D Generative AI. Mr. Malsagov, an alumnus of Harvard Business School, holds numerous patents and possesses extensive expertise in business development, strategic planning, and operational excellence and has been actively involved in various professional organizations and philanthropic initiatives."
    }
]

export default function BoardPage() {

    const [selectedMember, setMember] = useState<BoardMemberData | null>(null)

    return (
        <div className="container mx-auto py-8 sm:px-4 pb-4">
            <section id="bod" className="px-2 sm:px-0">
                <div className="container mx-auto">
                    <h1 className="sm:text-5xl text-3xl font-bold text-brand-maroon text-center sm:mb-32 mb-8">Board of Directors</h1>
                    <div className="flex flex-wrap justify-center gap-16">
                        {boardMembers.map((member, index) => (
                            <div
                                key={index}
                                onClick={() => setMember(member)}
                                className={`bg-white flex flex-col items-center cursor-pointer transform transition duration-300 w-full sm:w-1/2 lg:w-72 ${selectedMember == member
                                    ? 'scale-100'
                                    : 'hover:scale-110 hover:z-100 hover:border-x hover:border-b hover:rounded-xl'
                                    }`}>
                                <Image
                                    src={member.imgSrc}
                                    alt={member.name}
                                    width={512}
                                    height={512}
                                    className="w-full h-96 object-cover rounded-lg mb-4 pt-1"
                                />
                                <h2 className="text-xl font-medium text-black">{member.name}</h2>
                                <p className="text-lg text-black">{member.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {selectedMember && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMember(null)}
                >
                    <div
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl z-50 sm:max-w-4/5 max-h-4/5 w-full overflow-y-scroll"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 z-10 cursor-pointer"
                            onClick={() => setMember(null)}
                        >
                            Close
                        </button>
                        <Image
                            src={selectedMember.imgSrc}
                            alt={selectedMember.name}
                            className="w-fit h-32 sm:h-96 object-cover rounded-lg mb-4"
                            width={512}
                            height={512}
                        />
                        <h2 className="sm:text-4xl text-lg font-bold">{selectedMember.name}</h2>
                        <p className="sm:text-3xl">{selectedMember.title}</p>
                        <p className="mt-4 text-gray-700 sm:text-2xl text-sm">{selectedMember.blurb}</p>
                    </div>
                </div>
            )}
        </div>
    )
}