import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Get parameters from query string with defaults
        const interval = searchParams.get('interval') || '1h';
        const startDate = searchParams.get('start_date') || '2020-01-01 08:00:00';
        const endDate = searchParams.get('end_date') || '';
        const exchange = searchParams.get('exchange') || 'TSXV';

        // Map exchange to symbol
        const getSymbolForExchange = (exchange: string) => {
            switch (exchange) {
                case 'FSX':
                    return 'M26';
                case 'NEO':
                    return 'SPRQ';
                case 'OTC':
                    return 'SPRQF';
                case 'TSXV':
                default:
                    return 'SPRQ';
            }
        };

        const symbol = getSymbolForExchange(exchange);
        
        // Build URL with parameters
        let url = `https://api.twelvedata.com/time_series?apikey=${process.env.TWELVE_DATA_API_KEY}&interval=${interval}&symbol=${symbol}&start_date=${startDate}&exchange=${exchange}`;
        
        if (endDate) {
            url += `&end_date=${endDate}`;
        }
        
        const res = await fetch(url)
        const results = await res.json()
        return NextResponse.json(results)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch data'}, { status: 500 })
    }
}