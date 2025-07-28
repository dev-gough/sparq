'use client'

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { Award, Target, Lightbulb } from "lucide-react"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

interface CulturePrinciple {
    title: string
    description: string
    image: string
    quote: string
    principles: string[]
}

const culturePrinciples: CulturePrinciple[] = [
    {
        title: "Innovative Mindset",
        description: "Our commitment to breakthrough thinking and continuous improvement drives every solution we create.",
        image: "/iljinline.jpg",
        quote: "Innovation isn't just about technology - it's about transforming how the world thinks about energy.",
        principles: ["Collaborative problem-solving approach", "Evidence-based decision making", "Continuous learning and adaptation", "Bold thinking with practical execution"]
    },
    {
        title: "Technical Expertise",
        description: "We pursue uncompromising quality and reliability in every aspect of our engineering and manufacturing.",
        image: "/Queens/4.jpg",
        quote: "The future of solar lies not just in better panels, but in smarter, safer power conversion.",
        principles: ["Rigorous testing and validation processes", "Industry-leading safety standards", "Performance optimization mindset", "Long-term reliability focus"]
    },
    {
        title: "Customer-Centric Focus",
        description: "Every decision we make is guided by our commitment to delivering exceptional value and experience to our customers.",
        image: "/SLC/009.JPG",
        quote: "Every product we design is built to exceed expectations - that's our engineering promise.",
        principles: ["User experience at the forefront", "Transparent communication", "Responsive support and service", "Building lasting partnerships"]
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

interface CultureSectionProps {
    principle: CulturePrinciple
    index: number
    isReversed?: boolean
}

function CultureSection({ principle, index, isReversed = false }: CultureSectionProps) {
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
                        <div className="w-96 h-72 mx-auto rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={principle.image}
                                alt={principle.title}
                                width={384}
                                height={288}
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
                            {principle.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-brand-logo font-medium mb-8">
                            {principle.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        className="hidden md:block"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3">
                            {principle.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-brand-logo font-medium mb-8">
                            {principle.description}
                        </p>
                    </motion.div>

                    {/* Quote */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                        className="relative bg-gradient-to-r from-brand-maroon/5 to-brand-logo/5 dark:from-gray-700/30 dark:to-gray-600/40 rounded-2xl p-8 border border-brand-maroon/10"
                    >
                        <Quote className="absolute top-4 left-4 text-brand-maroon/30 dark:text-brand-darkmaroon" size={24} />
                        <p className="text-lg md:text-xl text-brand-darkmaroon dark:text-brand-maroon font-medium italic leading-relaxed pl-8">
                            &quot;{principle.quote}&quot;
                        </p>
                    </motion.div> */}

                    {/* Principles */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {principle.principles.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-brand-maroon/20 shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-brand-maroon flex-shrink-0" />
                                <span className="text-brand-graytext dark:text-dark-text-secondary font-medium">{item}</span>
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
                            Our Culture
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Our Purpose
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
                        Discover the values, principles, and collaborative spirit that drive our mission to revolutionize solar energy.
                    </p>
                </motion.div>
            </div>

            {/* Culture Principles Section */}
            <div className="relative container mx-auto px-6 py-10">
                {culturePrinciples.map((principle, index) => (
                    <CultureSection
                        key={principle.title}
                        principle={principle}
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
                        Our Cultural Foundation
                    </h2>
                    <div className="bg-white/80 dark:bg-gray-700/60 rounded-3xl p-8 border border-brand-maroon/10 shadow-lg">
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-6">
                            At SPARQ Systems, our culture is built on six foundational principles that guide every decision and every interaction:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Integrity</span>
                            </div>
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Collaboration</span>
                            </div>
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Innovation</span>
                            </div>
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Quality</span>
                            </div>
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Social Responsibility</span>
                            </div>
                            <div className="p-4 bg-brand-maroon/5 dark:bg-gray-600/60 rounded-xl border border-brand-maroon/10 dark:border-gray-500/30">
                                <span className="font-semibold text-brand-darkmaroon dark:text-brand-yellow">Teamwork</span>
                            </div>
                        </div>
                        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed mt-6">
                            These values aren&apos;t just words on our website. They&apos;re the living foundation of how we operate,
                            how we innovate, and how we build lasting relationships with our customers,
                            partners, and communities around the world.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}