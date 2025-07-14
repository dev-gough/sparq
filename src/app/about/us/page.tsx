'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { Quote, Award, Target, Lightbulb } from "lucide-react"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

interface Leader {
    name: string
    title: string
    image: string
    quote: string
    bio: string
    achievements: string[]
}

const leaders: Leader[] = [
    {
        name: "Dr. Praveen Jain",
        title: "Founder & CEO",
        image: "/Team/drjain.png",
        quote: "Innovation isn't just about technology - it's about transforming how the world thinks about energy.",
        bio: "Dr. Jain is the visionary founder who identified the critical need for revolutionary microinverter technology. A Fellow of the Royal Society of Canada and recipient of the 2021 IEEE Medal in Power Engineering, he brings decades of power electronics expertise from companies like Intel, GE, and his successful exit from CHiL Semiconductor.",
        achievements: ["100+ Patents", "IEEE Medal in Power Engineering 2021", "Fellow of Royal Society of Canada", "Founded CHiL Semiconductor (acquired by International Rectifier)"]
    },
    {
        name: "Dr. Majid Pahlevaninezhad",
        title: "Chief Technology Officer",
        image: "/Team/Majid-Pahlevaninezhad.jpg",
        quote: "The future of solar lies not just in better panels, but in smarter, safer power conversion.",
        bio: "Dr. Pahlevani is the technical mastermind behind Sparq's QUAD microinverter family. With 210+ publications and 85+ US patents, he has pioneered innovative power circuitry and digital control techniques that define our competitive advantage. His work spans from pure electric vehicle power systems to cutting-edge solar microinverters.",
        achievements: ["210+ Technical Publications", "85+ US Patents", "Engineering Excellence Award Queen's University", "IEEE Research Excellence Award Canada"]
    },
    {
        name: "Dr. Shangzhi Pan",
        title: "VP of Engineering",
        image: "/Team/Dr-Shangzhi-Pan.png",
        quote: "Every microinverter we design is built to outlast the solar panel it serves - that's our engineering promise.",
        bio: "Dr. Pan has led the research, development, and certification of Sparq's microinverters since 2009. His decade of applied research at Queen's University has resulted in breakthrough digital control techniques that power our industry-leading reliability and efficiency. He bridges the gap between laboratory innovation and field-proven products.",
        achievements: ["22+ US Patents", "15+ Years Microinverter Development", "Senior IEEE Member", "Queen's University PhD Power Electronics"]
    }
]

interface CompanyValue {
    title: string
    description: string
    icon: React.ReactNode
}

const companyValues: CompanyValue[] = [
    {
        title: "Our Mission",
        description: "Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.",
        icon: <Target size={32} />
    },
    {
        title: "Our Vision",
        description: "Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.",
        icon: <Lightbulb size={32} />
    },
    {
        title: "Our Promise",
        description: "Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.",
        icon: <Award size={32} />
    }
]

interface LeaderSectionProps {
    leader: Leader
    index: number
    isReversed?: boolean
}

function LeaderSection({ leader, index, isReversed = false }: LeaderSectionProps) {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <motion.section
            ref={sectionRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`max-w-7xl mx-auto sm:mb-32 ${index !== 0 ? 'border-t border-brand-maroon/10 pt-16' : ''}`}
        >
            <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="lg:w-1/3"
                >
                    <div className="relative">
                        <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={leader.image}
                                alt={leader.name}
                                width={320}
                                height={320}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-maroon/10 rounded-full blur-xl" />
                    </div>
                </motion.div>

                {/* Content Side */}
                <div className="lg:w-2/3 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        className="md:hidden"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3">
                            {leader.name}
                        </h2>
                        <p className="text-xl md:text-2xl text-brand-logo font-medium mb-8">
                            {leader.title}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        className="hidden md:block"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3">
                            {leader.name}
                        </h2>
                        <p className="text-xl md:text-2xl text-brand-logo font-medium mb-8">
                            {leader.title}
                        </p>
                    </motion.div>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                        className="relative bg-gradient-to-r from-brand-maroon/5 to-brand-logo/5 dark:from-gray-700/30 dark:to-gray-600/40 rounded-2xl p-8 border border-brand-maroon/10"
                    >
                        <Quote className="absolute top-4 left-4 text-brand-maroon/30 dark:text-brand-darkmaroon" size={24} />
                        <p className="text-lg md:text-xl text-brand-darkmaroon dark:text-brand-maroon font-medium italic leading-relaxed pl-8">
                            &quot;{leader.quote}&quot;
                        </p>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-8">
                            {leader.bio}
                        </p>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {leader.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-gray-700/50 rounded-xl p-4 border border-brand-maroon/5">
                                <div className="w-2 h-2 rounded-full bg-brand-maroon flex-shrink-0" />
                                <span className="text-brand-graytext dark:text-dark-text-secondary font-medium">{achievement}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

function CompanyValuesSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <motion.section
            ref={sectionRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto sm:mb-32 border-t border-brand-maroon/10 pt-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6 dark:text-brand-yellow">
                    What Drives Us
                </h2>
                <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
                    Our core principles guide every decision, every innovation, and every relationship we build.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {companyValues.map((value, index) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                            {value.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-brand-darkmaroon mb-4 dark:text-brand-yellow">
                            {value.title}
                        </h3>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            {value.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

export default function AboutUsPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
            <SolarBackgroundElements/>
            {/* Hero Section */}
            <div className="relative container mx-auto px-6 pt-10 sm:pb-8">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Meet the Minds
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Behind the Mission
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
                        The visionary leaders and technical innovators driving the future of solar energy technology.
                    </p>
                </motion.div>
            </div>

            {/* Leaders Section */}
            <div className="relative container mx-auto px-6 py-10">
                {leaders.map((leader, index) => (
                    <LeaderSection
                        key={leader.name}
                        leader={leader}
                        index={index}
                        isReversed={index % 2 === 1}
                    />
                ))}

                {/* Company Values */}
                <CompanyValuesSection />
            </div>

            {/* Core Values Legacy Section */}
            <div className="relative container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon mb-8 dark:text-brand-yellow">
                        Built on Strong Values
                    </h2>
                    <div className="bg-white/80 dark:bg-gray-700/60 rounded-3xl p-8 border border-brand-maroon/10 shadow-lg">
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                            <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Integrity, Collaboration, Innovation, Quality, Social Responsibility, and Teamwork</span> -
                            these aren&apos;t just words on our website. They&apos;re the foundation of how we operate,
                            how we innovate, and how we build lasting relationships with our customers,
                            partners, and communities around the world.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}