import Link from "next/link"
import Image from "next/image"
import { IoIosInformationCircle } from "react-icons/io"

export default function DesignPage() {
    return (
        <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
            <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16 ">Design Your System</h1>
            <p className="text-2xl">We are working on a custom calculator.  For now, please use NREL&apos;s PVWatts calculator to estimate your energy production by entering your address at this link:<Link href="https://pvwatts.nrel.gov/" target="_blank"className="text-blue-400 hover:underline cursor-pointer ml-2">pvwatts.nrel.gov</Link> </p>
            <p className="flex flex-row text-2xl mt-4">Use the <IoIosInformationCircle className="mx-2 mt-1 text-blue-500" /> bubbles to help modify the inputs to your needs.<strong> Set the &quot;DC System Size (kW)&quot; field to 2.</strong></p>
            <p className="text-2xl mt-16">Determine your average annual energy consumption by summing the last 12 months of kWh energy usage from your utility bills. Use your annual energy information to help select your system size.</p>
            <p className="text-2xl mt-4">Divide the result from the PVWatts calculator by your annual energy consumption to calculate the required system size to offset 100% of your electricity usage.</p>
            <p className="text-2xl mt-4">Each Q2000 can produce 2.0kW of power.  Divide the system size by 2.0 to determine how many Q2000 units are required. </p>
            <p className="text-2xl mt-4">Once you have a rough idea of your system, <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> at our head office to facilitate further refinement and other requirements.</p>
            <div className="flex items-center justify-center">
                <Image src="/formula.png" alt="Q2000 calculation" width={832} height={832}/>
            </div>
        </div>
    )
}