'use client'

import { motion } from "motion/react"
import { useRef } from "react"
import { useInView } from "motion/react"
import BoMCalc from "@/components/BomCalc"
import SolarBackgroundElements from "@/components/SolarBackgroundElements"

export default function CalculatorPage() {
    const titleRef = useRef(null)
    const isInView = useInView(titleRef, { once: true })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />

            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 pb-16">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            BOM Calculator
                        </span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed"
                    >
                        Calculate your Bill of Materials and system requirements with our comprehensive planning tool.
                    </motion.p>
                </motion.div>
            </section>

            {/* BOM Calculator Section */}
            <section className="relative container mx-auto px-6 pb-20">
                <BoMCalc />
            </section>
        </div>
    )
}