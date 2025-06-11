'use client'

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import SitePhotosGallery from "@/components/PhotoGallery"

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

const backgroundShapes = [
    { width: 200, height: 140, left: 5, top: 15, duration: 18, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 120, height: 180, left: 85, top: 25, duration: 20, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 240, height: 100, left: 45, top: 35, duration: 17, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 140, height: 140, left: 90, top: 65, duration: 19, delay: 0.8, borderRadius: '50%' },
    { width: 160, height: 220, left: 15, top: 75, duration: 21, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 100, height: 100, left: 70, top: 90, duration: 16, delay: 2.5, borderRadius: '50%' }
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/5 via-brand-logo/3 to-brand-yellow/2"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.15, 1],
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

export default function PhotosPage() {
    const [selectedSite, setSelectedSite] = useState<string>(installationSites[0]?.id || '')
    
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    const currentSite = installationSites.find(site => site.id === selectedSite) || installationSites[0]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
            <BackgroundElements />
            
            {/* Hero Section */}
            <section className="relative container mx-auto px-6 pt-20 pb-32">
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                            Real Installations
                        </span>
                        <br />
                        <span className="text-brand-darkmaroon">
                            Real Results
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-12"
                    >
                        Explore our portfolio of successful solar installations featuring Sparq microinverter technology 
                        across various sites and applications.
                    </motion.p>
                </motion.div>
            </section>

            {/* Site Selection */}
            {installationSites.length > 1 && (
                <section className="relative container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
                            Installation Sites
                        </h2>
                        <p className="text-xl text-brand-graytext max-w-3xl mx-auto">
                            Select a site to view detailed photos and project information.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {installationSites.map((site, index) => (
                            <motion.div
                                key={site.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                                className="group"
                            >
                                <Card 
                                    className={`overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 ${
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
                                                <h3 className="text-xl font-bold text-brand-darkmaroon">{site.name}</h3>
                                                <p className="text-brand-graytext">{site.location}</p>
                                            </div>
                                        </div>
                                        <p className="text-brand-graytext leading-relaxed mb-4">{site.description}</p>
                                        <div className="flex justify-between text-sm text-brand-graytext">
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
            <section className="relative bg-white py-20">
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
            <section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-20">
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