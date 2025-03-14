import BoardMember from "@/components/BoardMember"
import TeamMember from "@/components/TeamMember";
import Link from "next/link";

interface BoardMemberData {
    imgSrc: string;
    name: string;
    location: string;
    title: string;
    blurb: string;
}

interface TeamMemberData {
    imgSrc: string;
    name: string;
    blurb: string;
}

const boardMembers: BoardMemberData[] = [
    {
        imgSrc: '/Dr-Praveen-Jain.png',
        name: 'Praveen Jain',
        location: 'Kingston, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."    },
    {
        imgSrc: '/nishithgoel.jpg',
        name: 'Nishith Goel',
        location: 'Ottawa, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Dr. Goel is the CEO of Cistel Technology, an Information Technology company he founded in 1995, which has operations in Canada and the USA. A veteran technology executive and entrepreneur, he is also co-founder of CHiL Semiconductor and SPARQ Systems. Dr. Goel has served on the Board of Directors of Enablence Technologies Inc. (TSXV). He has also served on the Board of Directors of the Community Foundation of Ottawa, the Queensway Carleton Hospital Foundation, the Indo-Canada Ottawa Business Chamber, as well as Chair of the Queensway Carleton Hospital Foundation. Dr. Goel obtained his PhD from the University of Waterloo."    },
    {
        imgSrc: '/baojunrobbieluo.jpg',
        name: 'BaoJun (Robbie) Luo',
        location: 'Shenzhen, China',
        title: 'Director since: December 31, 2021',
        blurb:
            "Robbie Luo is the President of Ti-Lane Precision Electronic Company Limited and Ti-Lane Group, Shenzhen, China. Ti-Lane is the global leader in providing connector and cable assembly products for communications, computer, medical, automotive and clean energy applications. He is a firm believer of renewable energy deployment and is a Deputy Director General of Shenzhen Solar Energy Society. He earned his MBA from Ursuline College at Tsinghua University, China.",
    },
    {
        imgSrc: '/ravisood.png',
        name: 'Ravi Sood',
        location: 'Toronto, Ontario',
        title: 'Director since: December 31, 2021',
        blurb:
            "Mr. Sood is the Managing Director of Signal 8 Limited, based in Toronto, Canada. Mr. Sood has been a founder and the principal investor in several businesses in emerging markets and currently serves as Chairman of Jade Power Trust (TSXV), Galane Gold Ltd. (TSXV), and Biomind Labs Inc. (NEO). He was the founder and Chief Executive Officer of Navina Asset Management Inc., a global asset management firm headquartered in Toronto, Canada. Mr. Sood led the investment activities of Navina and its predecessor company, Lawrence Asset Management Inc., from its founding in 2001 until he sold the firm in 2010. Mr. Sood was educated at the University of Waterloo (B. Mathematics), where he was a Descartes Fellow and the recipient of numerous national awards."    },
    {
        imgSrc: '/arulshanmugasundaram.png',
        name: 'Arul Shanmugasundaram',
        location: 'Karnataka, India',
        title: 'Director since: February 24, 2022',
        blurb:
            "Dr. Arul Shanmugasundaram is currently the Executive Director of Ayana Renewable Power Private Limited, India, where he is responsible for business development, technology, and asset management functions. Previously, he was the Chief Operating Officer of Tata Power Solar Systems and led the EPC for utility-scale, rooftop, and pump projects. During nearly a decade at Tata Group, he was part of the leadership team that transformed Tata Power Solar from revenues of US$100 million to US$450 million. Dr. Shanmugasundaram started his career at Applied Materials in Silicon Valley, where he spent 15 years developing and launching several new products and process controls. Dr. Shanmugasundaram holds a Bachelor's degree from the Indian Institute of Technology Madras and Master's and Doctorate degrees from Cornell University. He has more than 40 US patents and several international publications."    },
]

const teamMembers: TeamMemberData[] = [
    {
        imgSrc: '/Dr-Praveen-Jain.png',
        name: 'Praveen Jain, CEO',
        blurb: "Dr. Jain is the Founder and the CEO of SPARQ. He has considerable industrial experience in power electronics, working and consulting with Canadian Astronautics, Nortel Networks, Astec, Intel, Freescale, and GE. He founded CHiL Semiconductor, a digital power control chip company, which was acquired by International Rectifier (later merged with Infineon). Dr. Jain is a Fellow of the Royal Society of Canada, the Institute of Electrical and Electronics Engineers (IEEE), the Engineering Institute of Canada, and the Canadian Academy of Engineering. He is the recipient of the 2021 IEEE Medal in Power Engineering, the 2017 IEEE Canada Electric Power Medal, the 2011 IEEE William E. Newell Power Electronics Award, and the 2004 Engineering Medal from Ontario Professional Engineers. He holds over 100 patents. Dr. Jain obtained his PhD from the University of Toronto."
    },
    {
        imgSrc: '/Dr-Shangzhi-Pan.png',
        name: 'Dr. Shangzhi Pan, VP of Engineering',
        blurb: "Dr. Pan has led the research, development, design, testing and certification of Sparq's microinverters since 2009. Dr. Pan has completed extensive applied research at Queen's University over the past decade on advanced digital control techniques for the computer and lighting industries as well as microinverter technologies. He is the inventor or co-inventor of 22 issued and pending US patents. He previously worked as an R&D engineer for Alcatel Shanghai Bell and as a consultant for CHiL Semiconductor to transfer patented technologies from Queen's labs to the company. Dr. Pan is a senior member of the Institute of Electrical and Electronics Engineers (IEEE), and a member of IEEE Power Electronics and Industrial Electronics Societies. Dr. Pan holds a PhD degree in Power Electronics from Queen's University, Canada."
    },
    {
        imgSrc: '/Majid-Pahlevaninezhad.jpg',
        name: 'Majid Pahlevaninezhad, VP of Technology',
        blurb: "Dr. Pahlevani is the VP of Technology at Sparq Systems. He invented multiple innovative power circuitry and digital control techniques for Sparq's main product, called QUAD microinverter. He worked as a technical designer in the Information and Communication Technology Institute (ICTI) from 2003 to 2007, where he was involved in design and implementation of high-quality resonant converters. He also collaborated with Freescale Semiconductor Inc. where he was the leader of a research team working on the design and implementation of the power converters for a pure electric vehicle from 2008 to 2012. He is the author of more than 120 journal and conference proceeding papers and the holder of 30 US patents. Dr. Pahlevani is a senior member of IEEE and a member of the IEEE Power Electronics Society and Industrial Electronics Society. He is also the recipient of many awards such as the “Engineering and Applied Sciences Outstanding Thesis” award from Queen's University, “Research Excellence Award” from the IEEE Canada, and “Distinguished Graduate Student Award” from Isfahan University of Technology. Dr. Pahlevani received his Ph.D. degree from Queens University."
    },
    {
        imgSrc: '/Pankaj_photo.png',
        name: 'Pankaj Jain, VP of Operations',
        blurb: "Pankaj has 20+ years of experience managing all aspects of product development and life cycle management. He has broad technical expertise in the development and manufacturing of complex products built to the highest industry standards. Pankaj is keenly interested in advancing the open standards for communication in the emerging Smart Power Grids. He wants to see solar on every roof and believes that the world's energy needs can easily be met through solar power. He holds a Master of Science degree in Electrical Engineering from Memorial University of Newfoundland and a Bachelor of Engineering from Panjab Engineering College."
    },
    {
        imgSrc: '/Haibo-Zhang.jpg',
        name: 'Haibo Zhang, VP of Manufacturing',
        blurb: "Haibo Zhang has over 30 years of engineering experience in power electronics product design and manufacturing. He joined Sparq Systems in 2009 to lead the product manufacturing. Prior to this, he had worked at Cistel Technology, as a Power Electronics R&D Manager; Nortel Networks as a Power Electronics consultant, and at CHiL Semiconductor, as a Chief Power Electronics Engineer. His innovative ideas in power electronic circuits led him to start his own company, Coolumen, where he developed power electronic drivers for CFL and LED lighting. He holds an MASc degree in Electrical Engineering from Concordia University, Montreal, Canada. Mr. Zhang holds several patents."
    },
    {
        imgSrc: '/Muhammad_Ikram.jpg',
        name: 'Muhammad Ikram, VP of Finance',
        blurb: "Muhammad Ikram is a member of Chartered Professional Accountants Ontario and Canada. He also holds a Bachelors in Commerce degree from University of the Punjab. Muhammad started his career as an assistant accountant at a tax law firm over two decades ago. Over the years Muhammad has served in progressive finance and accounting roles for a variety of public and private growth companies, including a solar company. At Redline Communications Inc., Muhammad was part of the IPO team that took the company public at AIM (London Stock Exchange) and TSX (Toronto Stock Exchange) simultaneously. Muhammad's key areas of expertise include, but are not limited to, internal controls, system implementations, financial reporting including MD&A, government filings, payroll, and benefits administration."
    },
    {
        imgSrc: '/Kyle_Appleby.jpg',
        name: 'Kyle Appleby, Chief Financial Officer',
        blurb: "Kyle has been the Chief Financial Officer (CFO) of Sparq since July 2021. Since 2007, Kyle has been providing CFO services to a number of public and private companies, both domestic and international. He has focused on assisting companies with financial reporting, internal controls, governance, operations, and regulatory compliance.  He is a member in good standing of the Chartered Professional Accountants of Canada and the Chartered Professional Accountants of Ontario."
    },
]

export default function AboutPage() {
    return (
        <div className="bg-white container mx-auto py-16 px-20">
            {/* Introductory Section */}
            <section id="passion">
                <h2 className="text-3xl font-bold uppercase text-brand-maroon">
                    A passion for a lower carbon future
                </h2>
                <p className="text-base mt-4">
                    SPARQ was born out of a passion to create leading edge solar energy solutions that support
                    a greener future for our planet. Founder Dr. Praveen Jain is a world-leader in energy
                    research, holding over 100 patents. His advanced research at ePOWER, the Centre for
                    Energy and Power Electronics Research at Queen&apos;s University in Kingston, Canada,
                    resulted in the development of SPARQ&apos;s innovative and versatile microinverter design.
                    <br />
                    <br />
                    Today SPARQ&apos;s microinverter system is resetting the industry standard for solar energy
                    systems, delivering greater energy harvest over traditional string inverters. It can be
                    used in any power grid, conventional or smart, around the globe.
                </p>
            </section>

            {/* Board of Directors Section */}
            <section id="bod" className="mt-12">
                <h2 className="text-3xl font-bold uppercase text-brand-maroon">Board of Directors</h2>
                <div className="mt-8 space-y-8">
                    {boardMembers.map((member, index) => (
                        <BoardMember
                            key={index}
                            imgSrc={member.imgSrc}
                            right={index % 2 === 0} // Even index: image on right, odd index: image on left
                            name={member.name}
                            location={member.location}
                            title={member.title}
                            blurb={member.blurb}
                        />
                    ))}
                </div>
            </section>
            {/* Our Team Section */}
            <section id="management" className="mt-16">
                <h2 className="text-3xl font-bold uppercase text-brand-maroon">Our Team</h2>
                <div className="mt-8 space-y-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember
                            key={index}
                            imgSrc={member.imgSrc}
                            right={index % 2 === 0} // Even index: image on right, odd index: image on left
                            name={member.name}
                            blurb={member.blurb}
                        />
                    ))}
                </div>
            </section>
            {/* Governance Section */}
            <section id="governance" className="mt-16">
                <h2 className="text-3xl font-bold uppercase text-brand-maroon">Governance</h2>
                <ul className="mt-16 text-xl text-[#993300]">
                    <li><Link href="/Audit-Committee-Charter.pdf">Audit Committee Charter</Link></li>
                    <li><Link href="/Board-Effectiveness-Survey.pdf">Board Effectiveness Survey</Link></li>
                    <li><Link href="/Business-Code-of-Conduct.pdf">Business Code of Conduct</Link></li>
                    <li><Link href="/CEO-Mandate.pdf">CEO Mandate</Link></li>
                    <li><Link href="/Chairmans-Mandate.pdf">Chairmans&apos; Mandate</Link></li>
                    <li><Link href="/Compensation-Committee-Charter.pdf">Compensation Committee Charter</Link></li>
                    <li><Link href="/Corporate-Governance-and-Nominating-Committee-Charter.pdf">Corporate Governance and Nomniating Committee Charter Directors&apos; Mandate</Link></li>
                    <li><Link href="/Directors-Mandate.pdf">Directors&apos; Mandate</Link></li>
                    <li><Link href="/Disclosure-Policy.pdf">Disclosure Policy</Link></li>
                    <li><Link href="/Insider-Trading-Policy.pdf">Insider Trading Policy</Link></li>

                </ul>
            </section>
        </div>
    )
}