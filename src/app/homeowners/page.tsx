// 'use client'

import ConstructionPage from "@/components/Construction"

// import React, { useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"

// interface SolarTool {
//     title: string;
//     description: string;
//     url: string;
// }

// const solarTools: SolarTool[] = [
//     {
//         title: "Google Project Sunroof",
//         description: "Uses satellite imagery to analyze roof size, shading, and local climate.",
//         url: "https://sunroof.withgoogle.com/"
//     },
//     {
//         title: "PVWatts Calculator (NREL)",
//         description: "Offers a detailed estimate of system output based on location, system size, tilt, and more.",
//         url: "https://pvwatts.nrel.gov/"
//     },
//     {
//         title: "EnergySage Solar Calculator",
//         description: "Estimates optimal system size, cost, and savings based on utility rates and location.",
//         url: "https://www.energysage.com/solar/calculator/"
//     },
//     {
//         title: "Solar-Estimate.org",
//         description: "Provides system sizing, savings projections, and can match homeowners with installers.",
//         url: "https://www.solar-estimate.org/"
//     }
// ];



// const performanceItems = [
//     "High Frequency, soft-switching power electronics",
//     "Advanced real-time control",
//     "Individual MPPT for each panel",
//     "No HV DC cabling on the roof",
//     "Lowest weight of microinverters on the roof",
//     "Maximum Energy Harvesting",
//     "Dual Mode Operation (On-grid & Off-grid)",
//     "Grid independence",
//     "Energy self-sufficiency",
//     "Future ready for being flexible and scalable",
//     "Robust IOT gateway for health monitoring & control",
//     "Web monitoring with Intuitive displays",
//     "User-Friendly mobile app",
//     "Accessible and expert technical support",
// ];

// const safetyItems = [
//     "No Electrolytic Capacitor",
//     "No other low-life components",
//     "All-AC cabling with inherent Rapid-Shut-Down (RSD) compliance",
//     "No risk of HV DC arcing",
//     "No Risk of HV electric shock hazard for first responders",
//     "High reliability",
//     "High system availability",
//     "No PV system single point failure",
//     "Minimize number of system components to install and maintain results for high MTBF",
//     "Longlisting",
//     "Comprehensive warranty",
// ];

// const costItems = [
//     "Quad Architecture",
//     "Reduced manufacturing BOM",
//     "Reduced Balance of System (cabling, grounding, junction boxes etc)",
//     "Reduced manufacturing cost",
//     "Reduced installation cost",
//     "Maintenance-free",
//     "Lowest cycle-life-cost",
//     "Outlier on Performance-Cost Curve",
// ];

// export default function HomeownersPage() {

//     useEffect(() => {
//         // Load the YouTube IFrame API script
//         const tag = document.createElement('script');
//         tag.src = "https://www.youtube.com/iframe_api";
//         const firstScriptTag = document.getElementsByTagName('script')[0];
//         if (firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//         window.onYouTubeIframeAPIReady = () => {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//             const player = new YT.Player("youtube-player", {
//                 events: {
//                     'onStateChange': (event) => {
//                         if (event.data === YT.PlayerState.ENDED) {
//                             const anchor = document.getElementById('whysparq')
//                             if (anchor) anchor.scrollIntoView({ behavior: "smooth" })
//                             console.log(anchor)
//                         }
//                     }
//                 }
//             })
//         }


//         // Clean up the global function when the component unmounts
//         return () => {
//             const tmp = { ...window } as Partial<Window>
//             delete tmp.onYouTubeIframeAPIReady;
//         };
//     }, []);

//     return (
//         <div>
//             <section className="relative h-[calc(100vh-66px)] overflow-x-hidden">
//                 <iframe
//                     id="youtube-player"
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={`https://www.youtube.com/embed/oJAbATJCugs?autoplay=1&loop=1&controls=1&rel=0&mute=1&enablejsapi=1`}
//                     allowFullScreen
//                     title="YouTube Background Video"
//                 ></iframe>
//             </section>
//             <section id="whysparq" className="container mx-auto h-[calc(100vh-66px)] scroll-mt-[66px]">
//                 <header className="flex justify-between items-center p-4">
//                     <h1 className="text-black font-bold uppercase text-6xl">
//                         Why Choose Sparq as a Homeowner?
//                     </h1>
//                     <Image alt="Sparq Logo" src="/logo.png" width={125} height={85} />
//                 </header>
//                 <section className="grid md:grid-cols-3 gap-6 p-6">
//                     <div>
//                         <h2 className="text-black font-bold text-3xl mb-4">Performance</h2>
//                         <ul className="list-none space-y-2">
//                             {performanceItems.map((item, index) => (
//                                 <li key={index} className="text-black text-lg">
//                                     ✓ {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <h2 className="text-black font-bold text-3xl mb-4">Safety & Reliability</h2>
//                         <ul className="list-none space-y-2">
//                             {safetyItems.map((item, index) => (
//                                 <li key={index} className="text-black text-lg">
//                                     ✓ {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <h2 className="text-black font-bold text-3xl mb-4">Cost-Effectiveness</h2>
//                         <ul className="list-none space-y-2">
//                             {costItems.map((item, index) => (
//                                 <li key={index} className="text-black text-lg">
//                                     ✓ {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </section>

//                 {/* Footer */}
//                 <footer className="bg-brand-logo rounded-full text-white text-center p-4 text-3xl">
//                     Do Your Homework. Ensure You Sign-up A Certified Installer. Buy Best-in-Class Products.
//                 </footer>

//                 <div className="flex justify-evenly mt-8">
//                     <Link className="cursor-pointer border rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/homeowner.pptx">Download PowerPoint</Link>
//                     <Link className="cursor-pointer border rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/products">View our Products</Link>
//                     <Link className="cursor-pointer border rounded-md p-4 text-xl bg-brand-maroon hover:bg-brand-darkmaroon text-white" href="/hassan_presentation.mp4">Learn More About Our Products</Link>
//                 </div>
//             </section>
//             <section id="useful-links" className="container mx-auto mb-8">
//                 <h1 className="text-3xl font-bold mb-6">Solar Energy Tools</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {solarTools.map((tool) => (
//                         <div
//                             key={tool.title}
//                             className="bg-white shadow-lg rounded-lg p-4 transform hover:scale-105 transition duration-300"
//                         >
//                             <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
//                             <p className="text-gray-600 mb-4">{tool.description}</p>
//                             <Link
//                                 href={tool.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-block bg-brand-maroon text-white px-4 py-2 rounded hover:bg-brand-darkmaroon"
//                             >
//                                 Visit Site
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//                 <span className="text-xs">
//                     The links provided on this page are offered solely for your convenience and informational purposes. Sparq Systems Inc. is not affiliated with, endorsed by, or responsible for the content, accuracy, or reliability of these external websites. We provide these links as a courtesy and make no guarantees about the information or services they contain. Use of these links is at your own discretion, and Sparq Systems Inc. bears no liability for any issues arising from them.
//                 </span>
//             </section>
//         </div>
//     )
// }

export default function HomeownersPage() {
    return (
        <ConstructionPage/>
    )
}