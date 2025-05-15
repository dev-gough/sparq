'use client'
import { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6"

const columns = [
  {
    title: "History",
    bullets: [
      "2009: Founded at Queen's University by Canada Research Chair in Power Electronics, Dr. Praveen Jain, Director of ePOWER, Fellow of the IEEE and the Royal Society of Canada",
      "2018: Manufacturing in North America",
      "2021: Raised $64M venture funding, and went public under SPRQ.V ticker on TSXV",
      "2022: Manufacturing in China",
      "2024: Partnership with Jio Reliance in India, one of the world’s largest Renewable Energy companies",
      "2025: Included in the TSX Venture 50 list in Clean Technology and Renewable Energy sector"
    ]
  },
  {
    title: "Disrupting PV Industry",
    bullets: [
      "High frequency soft-switching power electronics quad and duo architecture driven by real-time and accurate digital control algorithms",
      "Elimination of electrolytic caps and short-life components",
      "Much lower product life-cycle-cost manufacturing, logistics, installation and MRO",
      "Best in-class product safety, performance: reliability, efficiency, THD, specific power, power density, and life-cycle cost"
    ]
  },
  {
    title: "Products",
    bullets: [
      "2020: Q2000 1p microinverter",
      "2020: Energy management and performance monitoring system (Sparqling)",
      "2020: Cloud based data monitoring system SparqVU",
      "2024: Q2000 Dual-mode microinverter",
      "2024: Grid-tied 3-phase microinverter",
      "2025: Integrated PV and Battery Quad Microinverter",
      "2025: Sparq User App for Android and iOS smart phone"
    ]
  },
  {
    title: "Patents & Recognitions",
    bullets: [
      "More than 85 patents awarded and pending",
      "Received Frost & Sullivan’s 2017 'New Product Innovation Award' for the best practices in New Product Innovation in the Module Level Power Electronics Industry",
      "Founder Dr. Praveen Jain received multiple world-class awards",
      "2023: Killam Prize in Engineering",
      "2021: IEEE Medal in Power Engineering",
      "2017: Canada Electric Power Medal"
    ]
  }
];

export default function CompanySnapshot() {
  const [openStates, setOpenStates] = useState(columns.map(() => false));

  const toggleDropdown = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="bg-white">
      <h1 className="text-5xl font-bold text-center text-brand-maroon my-8">COMPANY SNAPSHOT</h1>
      <div className="bg-brand-yellow p-6 text-center text-3xl text-black font-bold">
        SPARQ designs and manufacturers innovative Module Level Power Electronics (MLPE) Products for PV, Energy Storage and EV.
      </div>
      <div className="flex flex-wrap mt-4">
        {columns.map((column, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-2 ">
            <button
              className="w-full bg-[#8c334d] text-white py-7 rounded-full flex items-center justify-center hover:bg-brand-darkmaroon transition-colors cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              <span className="mr-2 w-6 h-6 bg-white rounded-full flex-shrink-0"></span>
              <span className='text-3xl font-bold'>{column.title}</span>
            </button>
            {openStates[index] && (
              <ul className="mt-2 space-y-1">
                {column.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start text-black">
                    <div className='flex-shrink-0 justify-center flex'>
                      <FaArrowRightLong className="mr-2 text-black"/>
                    </div>
                    <span className='text-xl'>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
