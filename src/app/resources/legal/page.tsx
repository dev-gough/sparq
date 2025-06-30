'use client'

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import TOSDropdown from "@/components/TOSDropdown"
import PrivacyPolicyDropdown from "@/components/PrivacyPolicyDropdown"

export default function LegalPage() {
    const headerRef = useRef(null)
    const tosRef = useRef(null)
    const privacyRef = useRef(null)
    
    const headerInView = useInView(headerRef, { once: true, margin: "-100px" })
    const tosInView = useInView(tosRef, { once: true, margin: "-100px" })
    const privacyInView = useInView(privacyRef, { once: true, margin: "-100px" })

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50">
            <div className="container mx-auto px-6 py-10">
                <motion.div 
                    ref={headerRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent">
                            Legal
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-graytext max-w-3xl mx-auto leading-relaxed">
                        Important legal information for our products and services
                    </p>
                </motion.div>
                
                <div className="max-w-6xl mx-auto space-y-8">
                    <motion.div
                        ref={tosRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={tosInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1], delay: 0.2 }}
                    >
                        <TOSDropdown />
                    </motion.div>
                    
                    <motion.div
                        ref={privacyRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={privacyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1], delay: 0.4 }}
                    >
                        <PrivacyPolicyDropdown />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}