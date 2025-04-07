import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col">
            <div className="relative h-[50vh] overflow-hidden">
                <Image priority className="object-cover object-top" fill src="/hero.webp" alt="hero" />
            </div>
            {/* Q2000 header, image, and blurb */}
            <div className="container mx-auto py-16 px-4">
                {/* Boxed Header */}
                <div>Scrolling view, similar to: <Link href="https://investor.honeywell.com/" className="text-blue-500"target="_blank">this site</Link></div>
                <div className="mb-16">maroon text is the content related to each item which would scroll from light to left and there is “More Detail” button within the scrolling window to get more info (the black text & links)</div>
                <section id="1.i)">
                    <h1 className="text-brand-maroon">Introducing the Q2000: The most powerful microinverter in the industry!</h1>
                        <div className="my-4">
                            <p className="text-base text-black">
                                SPARQ is pleased to introduce the Quad 2000, the industry&apos;s most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, without any power clipping. Our advanced software allows the Q2000 to operate seamlessly in grid-tied, standalone and dual-mode solar panel applications.
                            </p>
                            <Link href="https://www.youtube.com/watch?v=3LPu1w_Qj1I" className="text-blue-500" target="_blank">
                                See Video
                            </Link>
                        </div>
                </section>
                <section id="1.ii)">
                    <h1 className="text-brand-maroon mt-16">Most advanced Single phase and three phase microinverter in the industry</h1>
                    <p>Sparq Systems Q2000 product family of single and three phase microinverters not only resolve the longstanding safety, partial shading, low reliability problems and high cost of String Photovoltaic-Systems but also further advance state of the art of the single channel microinverter industry leader by eliminating the low reliability electrolytic capacitors and integrating four independently controlled DC-DC channels in one enclose resulting in best in class reliability, highest weigh and power density and lowest life-cycle cost.</p>
                    <Link
                        href="https://www.sparqsys.com/wp-content/uploads/2025/03/Comparison-of-Q2000-4102-with-IQ8H.pdf"
                        className="text-blue-500">
                            Comparison of Q2000-4102 with IQ8H
                    </Link>
                    <Link
                        href="https://www.sparqsys.com/wp-content/uploads/2025/03/Comparison-of-Q2000-4302-with-IQ8H-3p.pdf"
                        className="text-blue-500">
                            Comparison of Q2000-4302 with IQ8H-3P
                    </Link>
                </section>
                <section id="1.iii)">
                    <h1 className="text-brand-maroon mt-32">Be part of a greener future</h1>
                    <div>
                        <p>Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you'll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.</p>
                        <ul className="list-disc list-inside">
                            <li>4 panels - 1 inverter</li>
                            <li>Best in-class reliability</li>
                            <li>Quick and easy installation</li>
                            <li>Maximum energy harvest</li>
                            <li>Cloud-based performance monitoring</li>
                            <li>12 standard or 25-year extended warranty</li>
                            <li>Clean energy solutions</li>
                            <li>Dedicated support</li>
                        </ul>
                    </div>
                </section>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

















                {/* Product Info */}
                <section className="bg-white pt-20 px-4">
                    <h1 className="text-3xl font-bold text-brand-maroon">
                        Your cost-effective, reliable solar energy system.
                    </h1>
                    <p className="text-md text-black mt-2">
                        We&apos;re changing the industry standard for solar energy solutions with powerful power conversion that&apos;s smart-grid ready and the lowest cost per watt in the industry.
                    </p>

                    {/* First Subheading and Paragraph */}
                    <h2 className="text-2xl font-bold text-brand-maroon mt-6">
                        Be part of a greener future.
                    </h2>
                    <p className="text-black mt-2">
                        Backed by advanced research, our microinverter systems are designed with cutting-edge technology for reliable energy solutions that are easy to install and offer more energy harvest compared to traditional string inverters. Save money and contribute to a lower carbon future.
                    </p>

                    {/* Second Subheading and Paragraph */}
                    <h2 className="text-2xl font-bold text-brand-maroon mt-6">
                        4 panels - 1 inverter.
                    </h2>
                    <p className="text-black mt-2">
                        Our quad microinverter is changing industry standards for advanced grid functions. With only one microinverter feeding 4 solar panels, you&apos;ll enjoy maximum energy harvest for a fraction of the cost. Installation is quick and easy, and backed by an extended 25-year warranty.
                    </p>

                    {/* Bullet Point List in Two Columns */}
                    <div className="grid grid-cols-2 gap-4 mt-6 px-4 justify-between">
                        <ul className="list-disc text-gray-800">
                            <li>Quick installation</li>
                            <li>Maximum energy harvest</li>
                            <li>Cloud-based performance monitoring</li>
                            <li>12 standard or 25-year extended warranty</li>
                        </ul>
                        <ul className="list-disc text-gray-800">
                            <li>Dedicated support</li>
                            <li>Best-in-class reliability</li>
                            <li>Clean energy solutions</li>
                        </ul>
                    </div>
                </section>
                {/* Selling Points Section */}
                <section>
                    <div className="container mx-auto py-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* First Column: Easy Install */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/1.png"
                                        alt="Easy Install"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    Easy Install
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    Save time and money with our 4 panel, 1 inverter technology
                                </p>
                            </div>
                            {/* Second Column: High Power, Low Cost */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/2.png"
                                        alt="High Power, Low Cost"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    High Power, Low Cost
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    The highest power output for the lowest cost
                                </p>
                            </div>

                            {/* Third Column: Industry Leader in Energy Solutions */}
                            <div className="w-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                                <div className="w-24 h-24 md:w-32 md:h-32">
                                    <Image
                                        src="/3.png"
                                        alt="Industry Leader in Energy Solutions"
                                        width={1080}
                                        height={1080}
                                        className="mb-4 object-contain w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-2">
                                    Industry Leader in Energy Solutions
                                </h3>
                                <hr className="w-16 border-t-2 border-red-800 mb-4" />
                                <p className="text-lg md:text-xl text-red-800">
                                    Reliable solar energy for a greener future
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Call to Action */}
                <div className="flex flex-col items-center gap-4">
                    <Link href="/training" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-4 py-2 rounded">Support for Installers & Distributers</Link>
                    <Link href="/contact" className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-2 rounded">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}
