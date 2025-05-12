'use client'

import StockChart from "@/components/StockChart"
import data from "@/components/data.json"

export default function StockPage() {
    return (
        <div>
            <h1 className="text-center [font-weight:900] text-4xl">Stock Chart</h1>
            <StockChart data={data.values} symbol="TSLA" height={800}/>
        </div>
    )
}