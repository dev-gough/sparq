'use client'

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import SitePhotosGallery from "@/components/PhotoGallery"
import SolarBackgroundElements from '@/components/SolarBackgroundElements'

interface InstallationSite {
    id: string
    name: string
    location: string
    description: string
    completionDate: string
    systemSize: string
    photos: { src: string; alt?: string }[]
}

const installationSites: InstallationSite[] = [
    {
        id: "slc",
        name: "St. Lawrence College",
        location: "Kingston, Ontario",
        description: "A comprehensive solar installation showcasing our Quad microinverter technology in an educational environment.",
        completionDate: "2023",
        systemSize: "50kW",
        photos: [
            {src: "/SLC/001.JPG", alt: "St. Lawrence College installation overview"},
            {src: "/SLC/002.JPG", alt: "Solar panel array configuration"},
            {src: "/SLC/003.JPG", alt: "Microinverter installation detail"},
            {src: "/SLC/004.JPG", alt: "Rooftop installation progress"},
            {src: "/SLC/005.JPG", alt: "System monitoring setup"},
            {src: "/SLC/006.JPG", alt: "Electrical connections"},
            {src: "/SLC/007.JPG", alt: "Completed installation aerial view"},
            {src: "/SLC/008.JPG", alt: "Installation team at work"},
            {src: "/SLC/009.JPG", alt: "Final system commissioning"},
        ]
    }
    // Future sites can be added here
]


export default function PhotosPage() {
    const [selectedSite, setSelectedSite] = useState<string>(installationSites[0]?.id || '')
    
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const currentSite = installationSites.find(site => site.id === selectedSite) || installationSites[0]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <SolarBackgroundElements />
            
            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Real Installations
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
                            Real Results
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Explore our portfolio of successful solar installations featuring Sparq microinverter technology 
                        across various sites and applications.
                    </motion.p>
                </motion.div>
            </section>

            {/* Site Selection */}
            {installationSites.length > 1 && (
                <section className="relative container mx-auto px-6 pb:10 sm:py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
                            Installation Sites
                        </h2>
                        <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
                            Select a site to view detailed photos and project information.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {installationSites.map((site, index) => (
                            <motion.div
                                key={site.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                                className="group"
                            >
                                <Card 
                                    className={`overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700 ${
                                        selectedSite === site.id ? 'ring-2 ring-brand-maroon' : ''
                                    }`}
                                    onClick={() => setSelectedSite(site.id)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow">{site.name}</h3>
                                                <p className="text-brand-graytext dark:text-dark-text-muted">{site.location}</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-4">{site.description}</p>
                                        <div className="flex justify-between text-sm text-brand-graytext dark:text-dark-text-muted">
                                            <span><strong>Completed:</strong> {site.completionDate}</span>
                                            <span><strong>System:</strong> {site.systemSize}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Photo Gallery */}
            <section className="relative bg-white dark:bg-gray-900 py-10">
                <div className="container mx-auto px-6">
                    {currentSite && (
                        <motion.div
                            key={selectedSite}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <SitePhotosGallery 
                                siteName={currentSite.name} 
                                photos={currentSite.photos}
                            />
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready for Your Installation?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Join our growing portfolio of successful installations. Contact us to discuss 
                            your solar project and see how Sparq technology can work for you.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <a href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    Get Started
                                </motion.button>
                            </a>
                            <a href="/installers">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    For Installers
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}