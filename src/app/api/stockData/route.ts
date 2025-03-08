import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
        /*
        Response Attributes:

        c
        Current price

        d
        Change

        dp
        Percent change

        h
        High price of the day

        l
        Low price of the day

        o
        Open price of the day

        pc
        Previous close price
        */
    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get('symbols');

    if (!symbolsParam) {
        return NextResponse.json({ error: 'Symbols are required' }, { status: 400 });
    }

    const symbols = symbolsParam.split(',');
    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    try {
        const promises = symbols.map((symbol) =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Failed to fetch data for ${symbol}`);
                    }
                    return res.json().then((data) => ({ symbol, ...data }));
                })
                .catch((error) => ({ symbol, error: error.message }))
        );

        const results = await Promise.all(promises);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}