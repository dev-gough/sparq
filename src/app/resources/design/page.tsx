'use client'

import { items } from "../page"
import Subheader from "@/components/Subheader"

export default function DesignPage() {
    return (
        <div>
            <Subheader items={items} />
            <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16 ">Design Your System</h1>
                <p className="mt-4">Follow these steps for designing your SPARQ energy solution system.</p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 1 – Understand your requirements</h2>
                    <p className="mt-2">Determine your average annual energy consumption by summing the last 12 months of kWh energy usage from your utility bills. Use your annual energy information to help select your system size.</p>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 2 – Size the system</h2>
                    <p className="mt-2">Get an idea of the solar potential of your location by going to the free PV Watts site: <a href="https://pvwatts.nrel.gov/" className="text-blue-600 underline">PV Watts Calculator</a>. Enter your address or zip code, select the solar resource data and click on ‘Go To System Info’.</p>
                    <p className="mt-2">Set DC System Size to 1. If mounting the system on your roof, enter the Tilt (slope) and Azimuth (angle rotated from north). Click on ‘Go to Results’. Divide the annual energy from step 1 by the PV Watts result to get the system size in kW needed to offset all of your electricity usage.</p>
                    <p className="font-semibold py-4">Example:</p>
                    <ul className="list-disc list-inside">
                        <li>Annual energy = 5,600kWh</li>
                        <li>PV Watts results = 1,512kWh</li>
                        <li>System size = 5600 / 1512 = 3.703kW</li>
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Step 3 – Create a bill of material and contact us</h2>
                    <p className="mt-2">Each Q1200 (Quad) will produce up to 1.2kW of power. Divide the system size calculated in Step 2 by 1.2 to determine the number of Quad microinverters needed to offset the annual energy consumption.</p>
                    <p className="font-semibold py-4">Example:</p>
                    <ul className="list-disc list-inside">
                        <li>System size = 3.703kW</li>
                        <li>Number of Q1200 = 3.703 / 1.2 = 3.08 (Round to 3)</li>
                    </ul>
                    <p className="mt-2">Each Quad will be connected to 4 PV modules. Size the PV modules for peak output between 300 and 350W per 60-cell module.</p>
                    <p className="mt-2">Each Quad will need a trunk cable branch connector, and the trunk cable will need an end terminator cap. A SparqLinq gateway interface allows the system to be monitored. An AC disconnect tool and a DC disconnect tool are recommended for maintenance.</p>
                    <p className="font-semibold py-4">Total parts list:</p>
                    <ul className="list-disc list-inside">
                        <li>Quad</li>
                        <li>Trunk cable branch connectors</li>
                        <li>End terminator cap</li>
                        <li>SparqLinq gateway</li>
                        <li>AC and DC disconnect tool</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}