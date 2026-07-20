import SolarBackgroundElements from "@/components/SolarBackgroundElements"
import TeamBioGrid, { type BioMember } from "@/components/TeamBioGrid"

const boardMembers: BioMember[] = [
    {
        imgSrc: '/Team/drjain.webp',
        name: 'Dr. Praveen Jain',
        location: 'Kingston, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Team/nishith.webp',
        name: 'Dr. Nishith Goel',
        location: 'Ottawa, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Dr. Goel is the CEO of Cistel Technology, an Information Technology company he founded in 1995, which has operations in Canada and the USA. A veteran technology executive and entrepreneur, he is also co-founder of CHiL Semiconductor and SPARQ Systems. Dr. Goel has served on the Board of Directors of Enablence Technologies Inc. (TSXV). He has also served on the Board of Directors of the Community Foundation of Ottawa, the Queensway Carleton Hospital Foundation, the Indo-Canada Ottawa Business Chamber, as well as Chair of the Queensway Carleton Hospital Foundation. Dr. Goel obtained his PhD from the University of Waterloo."
    },
    {
        imgSrc: '/Team/robbie.webp',
        name: 'BaoJun (Robbie) Luo',
        location: 'Shenzhen, China',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Robbie Luo is the President of Ti-Lane Precision Electronic Company Limited and Ti-Lane Group, Shenzhen, China. Ti-Lane is the global leader in providing connector and cable assembly products for communications, computer, medical, automotive and clean energy applications. He is a firm believer of renewable energy deployment and is a Deputy Director General of Shenzhen Solar Energy Society. He earned his MBA from Ursuline College at Tsinghua University, China.",
    },
    {
        imgSrc: '/Team/ravi.webp',
        name: 'Ravi Sood',
        location: 'Toronto, Ontario',
        title: 'Director as of: December 31, 2021',
        blurb:
            "Mr. Sood is an entrepreneur and investor with over 25 years experience in capital markets and operations across a variety of industries and geographies.  He is the Chairman of Abraxas Power, a renewable energy projects developer with projects in Asia, Europe and North America.  He is also the Chairman and CEO of Golconda Gold Ltd, a gold producer and a non-executive director of Elemental Altus Royalties and Biomind Labs Inc.  He was previously the founder and CEO of Navina Asset Management, a Toronto-based investment firm (acquired), the Chairman and co-founder of Jade Power Trust (acquired), a renewable energy project developer, and has served as a director of various companies in the technology, commodity, and financial services sectors.  Mr. Sood holds a B.Mathematics (Hons) degree from the University of Waterloo where he was a Descartes Fellow and the recipient of numerous national awards."
    },
    {
        imgSrc: '/Team/arul.webp',
        name: 'Dr. Arul Shanmugasundaram',
        location: 'Karnataka, India',
        title: 'Director as of: February 24, 2022',
        blurb:
            "Dr Arul Shanmugasundaram is Chief Executive Officer and Managing Director of SWELECT Energy Systems Ltd., a renewable energy solutions company. Prior to this, he was the Executive Director of Ayana Renewable Power Private Limited, India, where he was responsible for business development, technology, and asset management functions. Previously, he was the Chief Operating Officer of Tata Power Solar Systems and led the EPC for utility-scale, rooftop, and pump projects. During nearly a decade at Tata Group, he was part of the leadership team that transformed Tata Power Solar from revenues of US$100 million to US$450 million. Dr. Shanmugasundaram started his career at Applied Materials in Silicon Valley, where he spent 15 years developing and launching several new products and process controls. Dr. Shanmugasundaram holds a Bachelor's degree from the Indian Institute of Technology Madras and Master's and Doctorate degrees from Cornell University. He has more than 40 US patents and several international publications."
    },
    {
        imgSrc: '/Team/magomet.webp',
        name: 'Magomet Malsagov',
        location: 'Wollerau, Switzerland',
        title: 'Director as of: October 21, 2024',
        blurb:
            "Mr. Malsagov is an accomplished entrepreneur and executive with over two decades of experience across the food and beverage and IT industries. He is the founder of PureCircle Ltd, a global leader in high-purity stevia ingredients, which was acquired by Ingredion Inc, a Fortune 500 company. Additionally, he founded AVATAi Sdn Bhd, an innovative company specializing in 3D Generative AI. Mr. Malsagov, an alumnus of Harvard Business School, holds numerous patents and possesses extensive expertise in business development, strategic planning, and operational excellence and has been actively involved in various professional organizations and philanthropic initiatives."
    }
]

/** Server page — bio modal grid is a client island. */
export default function BoardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements />

            <div className="relative container mx-auto px-4 pb-20 pt-10">
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Board of Directors
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
                        Experienced leaders guiding SPARQ&apos;s strategy, governance, and long-term growth.
                    </p>
                </div>

                <TeamBioGrid members={boardMembers} listName="board" />
            </div>
        </div>
    )
}
