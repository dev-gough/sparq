import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div id="corporatestatements" className="container mx-auto sm:pb-8 sm:px-4 py-8 px-2">
            <section id="passion" className="sm:mb-16 mb-8 text-sm sm:text-[22px]">
                <h1 className="sm:text-6xl text-xl text-brand-maroon font-bold">A Passion for a Lower Carbon Future</h1>
                <p className='sm:mt-8 mt-4'>SPARQ was born out of a passion to create leading edge solar energy solutions that support a greener future for our planet. Founder Dr. Praveen Jain is a world-leader in energy research, holding over 100 patents. His advanced research at ePower, the Centre for Energy and Power Electronics Research at Queen&apos;s University in Kingston, Canada, resulted in the development of SPARQ&apos;s innovative and versatile microinverter design.</p>
                <p className='mt-4'>Today, SPARQ&apos;s microinverter system is resetting the industry standard for solar energy systems, delivering greater energy harvest over traditional string inverters. It can be used in any power grid, conventional or smart, around the globe.</p>
            </section>
            <section id="learnmore" className="sm:mb-16 mb-8 text-sm sm:text-[22px]">
                <h1 className="sm:text-5xl text-xl font-bold text-brand-maroon">
                    Your cost-effective, reliable solar energy system.
                </h1>
                <p className="sm:mt-8 mt-4">
                    We&apos;re changing the industry standard for solar energy solutions with powerful power conversion that&apos;s smart-grid ready and the lowest cost per watt in the industry.
                </p>
                <p className='mt-4 mb-8 sm:mb-0'>The Sparq Systems Q2000 product family of single and three phase microinverters not only resolve the longstanding safety, partial shading, low reliability problems and high cost of String Photovoltaic-Systems but also further advance state of the art of the single channel microinverter industry leader by eliminating the low reliability electrolytic capacitors and integrating four independently controlled DC-DC channels in one enclosure resulting in best in class reliability, highest weight and power density and lowest life-cycle cost.</p>
                <h2 className="sm:text-5xl text-xl font-bold text-brand-maroon sm:mt-16">
                    Be part of a greener future.
                </h2>
                <p className="sm:mt-8 mt-4 mb-8 sm:mb-0">
                    Backed by advanced research, our microinverter systems are designed with cutting-edge technology for reliable energy solutions that are easy to install and offer more energy harvest compared to traditional string inverters. Save money and contribute to a lower carbon future.
                </p>
                <h2 id="q2000features" className="sm:text-5xl text-xl font-bold text-brand-maroon sm:mt-16">
                    4 panels - 1 inverter.
                </h2>
                <p className="text-black sm:mt-8 mt-4">
                    Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you&apos;ll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 justify-between">
                    <ul className="list-inside list-disc text-gray-800">
                        <li>Quick installation</li>
                        <li>Maximum energy harvest</li>
                        <li>Cloud-based performance monitoring</li>
                        <li>12 standard or 25-year extended warranty</li>
                    </ul>
                    <ul className="list-inside list-disc text-gray-800">
                        <li>Dedicated support</li>
                        <li>Best-in-class reliability</li>
                        <li>Clean energy solutions</li>
                    </ul>
                </div>
            </section>
            <section className="flex flex-row gap-4">
                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                        <Image
                            src="/1.png"
                            alt="Easy Install"
                            width={1080}
                            height={1080}
                            className="mb-4 object-contain w-full h-auto"
                        />
                    </div>
                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                        Easy Install
                    </h3>
                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                    <p className="text-sm md:text-xl text-black">
                        Save time and money with our 4 panel, 1 inverter technology
                    </p>
                </div>
                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                        <Image
                            src="/2.png"
                            alt="High Power, Low Cost"
                            width={1080}
                            height={1080}
                            className="mb-4 object-contain w-full h-auto"
                        />
                    </div>
                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 flex items-center justify-center line-clamp-2">
                        High Power, Low Cost
                    </h3>
                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                    <p className="text-sm md:text-xl text-black">
                        The highest power output for the lowest cost
                    </p>
                </div>
                <div className="w-full flex flex-col items-center text-center pt-2 sm:p-6 min-h-[300px]">
                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                        <Image
                            src="/3.png"
                            alt="Industry Leader in Energy Solutions"
                            width={1080}
                            height={1080}
                            className="mb-4 object-contain w-full h-auto"
                        />
                    </div>
                    {/* Desktop header */}
                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 sm:flex hidden items-center justify-center line-clamp-2">
                        Industry Leader in Energy Solutions
                    </h3>
                    {/* Mobile header */}
                    <h3 className="text-lg md:text-3xl font-bold text-brand-maroon mb-2 h-18 sm:h-24 sm:hidden flex items-center justify-center line-clamp-2">
                        Industry Leader
                    </h3>
                    <hr className="w-16 border-t-2 border-brand-maroon mb-4" />
                    <p className="text-sm md:text-xl text-black">
                        Reliable solar energy for a greener future
                    </p>
                </div>
            </section>
            <div className="flex flex-col items-center gap-4 mt-4 sm:mt-0">
                <Link href="/resources/installers" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-4 py-2 rounded">Support for Installers & Distributers</Link>
                <Link href="/contact" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-2 rounded">Contact Us</Link>
            </div>
        </div>
    )
}