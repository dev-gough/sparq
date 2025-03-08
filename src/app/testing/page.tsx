'use client'

import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StockDisplay = () => {
    // Hardcoded list of symbols inside the component
    const symbols = ['SPRQF', 'AAPL', 'GOOGL', 'MSFT']; // You can add more symbols here
    const { data, error, isLoading } = useSWR(`/api/stockData?symbols=${symbols.join(',')}`, fetcher, { refreshInterval: 600000 });
    const [currentIndex, setCurrentIndex] = useState(0);

    // Set up the 10-second rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % symbols.length);
        }, 10000); // 10 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [symbols.length]);

    // Handle loading and error states
    if (error) return <div className="text-red-500">Error loading data</div>;
    if (isLoading) return <div className="text-gray-500">Loading...</div>;

    const currentData = data[currentIndex];

    // Handle per-symbol errors
    if (currentData.error) {
        return <div className="text-red-500">Error loading data for {currentData.symbol}: {currentData.error}</div>;
    }

    // Display the stock data
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{currentData.symbol}</h2>
            <p>Current Price: ${currentData.c.toFixed(2)}</p>
            <p>
                Change:{' '}
                <span className={currentData.d >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {currentData.d.toFixed(2)}
                </span>
            </p>
            <p>
                Percent Change:{' '}
                <span className={currentData.dp >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {currentData.dp.toFixed(2)}%
                </span>
            </p>
        </div>
    );
};

export default StockDisplay;