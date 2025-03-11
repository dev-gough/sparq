import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <div>
            <footer className="bg-brand-graytext text-gray-300">
                <div className="container mx-auto py-3 px-4">
                    <div className="flex flex-wrap justify-between items-start">
                        {/* Left Column: Company Information */}
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                            {/* Logo */}
                            <div className="flex items-center">
                               <Image src="/logo.png" alt="footer logo" width={64} height={64}/>
                            </div>
                            {/* Tagline */}
                            <p className="mt-1 text-sm">Find out what solutions are right for you.</p>
                            {/* Contact Information */}
                            <p className="mt-1 text-sm">
                                <strong>1-855-947-7277</strong> | info@sparqsys.com
                            </p>
                            <p className="text-sm">We provide products globally.</p>
                            {/* Address */}
                            <p className="mt-1 text-sm">
                                SPARQ, Innovation Park, 945 Princess St, Box 212, Kingston, ON K7L 0E9
                            </p>
                        </div>

                        {/* Middle Column: Navigation Links */}
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                <li><Link href="#" className="hover:text-orange-400">Home</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">About</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Installers/Distributors</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Homeowners</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Our Products</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Training & Support</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Investor Relations</Link></li>
                                <li><Link href="#" className="hover:text-orange-400">Contact</Link></li>
                                <li><Link href="#" className="text-sm hover:text-orange-400">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="text-center mt-2 text-sm border-t border-gray-600 pt-2">
                        <p>All content © Sparq Systems, 2025</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}