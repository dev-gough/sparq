import Link from "next/link"
import Image from "next/image"
import { IoIosInformationCircle } from "react-icons/io"

export default function DesignPage() {
    return (
        <div className="container mx-auto py-8 px-4 sm:px-10 border border-brand-logo bg-neutral-100 rounded-xl">
            <h1 className="text-4xl font-bold text-brand-maroon text-left sm:mb-16 mb-8 ">Design My System</h1>
            <p className="sm:text-2xl text-lg dark:text-dark-text-secondary">Please use NREL&apos;s PVWatts calculator to estimate your energy production by entering your address at this link:<Link href="https://pvwatts.nrel.gov/" target="_blank"className="text-blue-400 hover:underline cursor-pointer ml-2">pvwatts.nrel.gov</Link> </p>
            <p className="flex flex-col 2xl:flex-row sm:text-2xl text-lg mt-4 dark:text-dark-text-secondary">Use the <IoIosInformationCircle className="hidden 2xl:flex mx-2 mt-1 text-blue-500" /> information bubbles to help modify the inputs to your needs.<strong className="ml-1"> Set the &quot;DC System Size (kW)&quot; field to 2.</strong></p>

            <p className="sm:text-2xl text-lg mt-4 dark:text-dark-text-secondary">Follow these 3 easy steps to calculate how many Q2000 units you&apos;ll need:</p>
            <ol className="list-inside list-decimal sm:text-2xl text-lg dark:text-dark-text-secondary">
                <li>Follow the instructions above to recieve your estimated energy generation.</li>
                <li>Sum the last 12 months of kWh energy usage from your utility provider.</li>
                <li>Divide the estimated generation by your yearly usage.</li>
            </ol>
            <p className="sm:text-2xl text-lg mt-4 dark:text-dark-text-secondary">Once you have a rough idea of your system, <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> at our head office to facilitate further refinement and other requirements.</p>
            <div className="flex justify-center mt-4 sm:mt-16">
                <Image src="/formula.png" alt="Q2000 calculation" width={832} height={832}/>
            </div>
        </div >
    )
}