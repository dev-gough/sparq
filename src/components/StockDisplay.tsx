'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface StockData {
    symbol: string;
    c: number; // Current price
    d: number; // Change
    dp: number; // Percent change
    error?: string;
}

/* 
to stop fast refresh from calling the api on every page save (during dev)

TODO: remove before building

*/

const mockItems: StockData[] = [
    { symbol: "SPRQF", c: 9999, d: 0, dp: 0 },
    { symbol: "MSFT", c: 393.31, d: -3.58, dp: -0.90 },
    { symbol: "ENPH", c: 61.63, d: 2.91, dp: 4.96 }
]

const StockItem = ({ data }: { data: StockData }) => {
    if (data.error) {
        return (
            <div className="p-2 text-red-500">
                Error loading {data.symbol}: {data.error}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1 text-sm whitespace-nowrap">
            <span className="font-bold text-brand-gray">{data.symbol}</span>
            <span className=" font-sans text-brand-gray">${data.c.toFixed(2)}</span>
            <span className={data.d >= 0 ? 'text-green-500' : 'text-red-500'}>
                {data.d >= 0 ? '+' : ''}{data.d.toFixed(2)} ({data.dp.toFixed(2)}%)
            </span>
        </div>
    )
};

const StockDisplay = () => {
    const symbols = ['SPRQF', 'AAPL', 'GOOGL', 'MSFT', 'ENPH', 'GME'];
    // const { data, error, isLoading } = useSWR<StockData[]>(`/api/stockData?symbols=${symbols.join(',')}`, fetcher, {
    //     refreshInterval: 600000,
    // });

    const error = false
    const isLoading = false

    const data: StockData[] = mockItems

    if (error) return <div className="text-red-500">Error loading data</div>;
    if (isLoading) return <div className="text-gray-500">Loading...</div>;

    return (
        <div className="w-full overflow-hidden bg-[#222527] py-1">
            <div className="flex flex-row gap-8 animate-carousel">
                {data && data.map((item, index) => (
                    <StockItem key={index} data={item} />
                ))}
                {data && data.map((item, index) => (
                    <StockItem key={index + data.length} data={item} />
                ))}
            </div>
        </div>
    );
};

export default StockDisplay;