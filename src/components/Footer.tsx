'use client'
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";

export default function Footer() {
    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/products", label: "Products" },
        { href: "/homeowners", label: "Homeowners" },
        { href: "/contact", label: "Contact" },
        { href: "/installers", label: "Installers" },
        { href: "/legal", label: "Legal" },
        { href: "/investors", label: "Investors" },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-maroon" />

            <div className="container mx-auto px-6 py-4">
                {/* Logo Section - Left Aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center mb-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Sparq Systems"
                                width={80}
                                height={80}
                                className="h-auto"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Company Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <p className="text-brand-graytext text-lg mb-6 leading-relaxed">
                            Find out what solutions are right for you.
                        </p>

                        <div className="space-y-4">
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 text-brand-graytext"
                            >
                                <FiPhone size={18} className="text-brand-maroon flex-shrink-0" />
                                <Link
                                    href="tel:1-855-947-7277"
                                    className="font-semibold hover:text-brand-maroon transition-colors duration-300"
                                >
                                    1-855-947-7277
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 text-brand-graytext"
                            >
                                <FiMail size={18} className="text-brand-maroon flex-shrink-0" />
                                <Link
                                    href="mailto:info@sparqsys.com"
                                    className="hover:text-brand-maroon transition-colors duration-300"
                                >
                                    info@sparqsys.com
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 text-brand-graytext"
                            >
                                <FiGlobe size={18} className="text-brand-maroon flex-shrink-0" />
                                <span>We provide products globally.</span>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-start gap-3 text-brand-graytext"
                            >
                                <FiMapPin size={18} className="text-brand-maroon flex-shrink-0 mt-1" />
                                <Link
                                    href="https://www.google.com/maps/place/SPARQ+Systems/@44.2441588,-76.5137419,16z/data=!3m2!4b1!5s0x4cd2ab9a2037b4b3:0x1ab4365f03d628f!4m6!3m5!1s0x4cd2ab9be77eb54d:0xe009de5ec0fdede2!8m2!3d44.244155!4d-76.511167!16s%2Fg%2F11b6gnsx96?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    className="hover:text-brand-maroon transition-colors duration-300"
                                >
                                    945 Princess St<br />
                                    Kingston, ON K7L 0E9
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-xl font-bold text-brand-darkmaroon mb-4">
                            Quick Links
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {navigationLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="inline-block px-3 py-2 text-brand-graytext hover:text-brand-maroon hover:bg-brand-maroon/5 rounded-lg transition-all duration-300 font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Copyright Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-brand-maroon/10 text-center"
                >
                    <p className="text-brand-graytext">
                        © 2025 Sparq Systems Inc. All Rights Reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}