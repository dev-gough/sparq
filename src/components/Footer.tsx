import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <div>
            <footer className="bg-brand-graytext text-gray-300">
                <div className="container mx-auto py-3 px-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                    <div className="flex flex-wrap justify-between items-start">
                        {/* Left Column: Company Information */}
                        <div className="w-full md:w-1/2 mb-2 md:mb-0">
                            {/* Logo */}
                            <div className="flex items-center">
                               <Image src="/logo.png" alt="footer logo" width={64} height={64}/>
                            </div>
                            {/* Tagline */}
                            <p className="mt-1 ">Find out what solutions are right for you.</p>
                            {/* Contact Information */}
                            <p className="mt-1 ">
                                <Link href="tel:1-855-947-7277"><strong>1-855-947-7277</strong></Link> | <Link href="mailto:info@sparqsys.com">info@sparqsys.com</Link>
                            </p>
                            <p className="">We provide products globally.</p>
                            {/* Address */}
                            <Link href="https://www.google.com/maps/place/SPARQ+Systems/@44.2441588,-76.5137419,16z/data=!3m2!4b1!5s0x4cd2ab9a2037b4b3:0x1ab4365f03d628f!4m6!3m5!1s0x4cd2ab9be77eb54d:0xe009de5ec0fdede2!8m2!3d44.244155!4d-76.511167!16s%2Fg%2F11b6gnsx96?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D" target="_blank">
                                <p className="mt-1 ">
                                    945 Princess St, Kingston, ON K7L 0E9
                                </p>
                            </Link>
                        </div>

                        {/* Middle Column: Navigation Links */}
                        <div className="w-full md:w-1/2 mb-2 md:mb-0">
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1  pt-4">
                                <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
                                <li><Link href="/about" className="hover:text-orange-400">About</Link></li>
                                <li><Link href="/resources/installers" className="hover:text-orange-400">Installers/Distributors</Link></li>
                                <li><Link href="/homeowners" className="hover:text-orange-400">Homeowners</Link></li>
                                <li><Link href="/products" className="hover:text-orange-400">Our Products</Link></li>
                                <li><Link href="/investors" className="hover:text-orange-400">Investor Relations</Link></li>
                                <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
                                <li><Link href="/about/governance" className="hover:text-orange-400">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="text-center mt-2  border-t border-gray-600 pt-2">
                        <p>All content © Sparq Systems, 2025</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}