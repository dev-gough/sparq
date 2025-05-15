'use client'

//import StockChart from "@/components/StockChart"
//import data from "@/components/data.json"
import { MdConstruction } from "react-icons/md"

export default function StockPage() {
    return (
        <div className="flex w-full items-center justify-center">
            <MdConstruction className="size-20 text-orange-400"/>
            <h1 className="text-center [font-weight:900] text-4xl">Stock Chart Coming Soon!</h1>
            {/* <StockChart data={data.values} symbol="TSLA" height={800}/> */}
        </div>
    )
}