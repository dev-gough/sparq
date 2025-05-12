import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  UTCTimestamp,
  CandlestickData,
  CandlestickSeries,
  HistogramData,
  HistogramSeries,
  Time,
  ColorType
} from "lightweight-charts";

/**
 * Raw 15‑minute bar as it may arrive from your backend.
 */
export interface RawBar {
  datetime: string; // ISO‑8601 or "YYYY-MM-DD HH:mm:ss" in exchange timezone
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface ChartProps {
  /**
   * Array of bars in *reverse‑chronological* or chronological order.
   * They will be sorted before plotting.
   */
  data: RawBar[];
  /** Symbol rendered as a translucent watermark (optional). */
  symbol?: string;
  /** Width in px (flexes to parent if omitted). */
  width?: number;
  /** Height in px (defaults to 400). */
  height?: number;
}

/**
 * Reusable React component wrapping TradingView’s Lightweight Charts.
 *
 * ```tsx
 * <LightweightChart
 *   data={bars}
 *   symbol="AAPL"
 *   height={450}
 * />
 * ```
 */
const LightweightChart: React.FC<ChartProps> = ({
  data,
  symbol,
  width = 0, // 0 ➜ take full width of parent
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  /** Convert backend bar ➜ Lightweight Charts format. */
  const toCandlestick = (bar: RawBar): CandlestickData => {
    // Parse in the browser’s locale then convert to UTC seconds.
    // If your backend sends ISO strings with timezone, simply `Date.parse(bar.datetime)`.
    const date = new Date(bar.datetime);
    const time = (date.getTime() / 1000) as UTCTimestamp;
    return {
      time,
      open: parseFloat(bar.open),
      high: parseFloat(bar.high),
      low: parseFloat(bar.low),
      close: parseFloat(bar.close),
    };
  };

  const toVolume = (bar: RawBar): HistogramData<Time> => {
    const date = new Date(bar.datetime);
    const time = (date.getTime() / 1000) as Time;
    const upCandle = parseFloat(bar.close) >= parseFloat(bar.open);
    return {
      time,
      value: parseInt(bar.volume, 10),
      color: upCandle ? "#26a69a" : "#ef5350",
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    /***** Create / recreate chart *****/
    // Clean up old instance when re‑rendering with new data.
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(containerRef.current, {
      width: width || containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "#fff" },
        textColor: "#66666",
      },
      rightPriceScale: {
        scaleMargins: { top: 0.15, bottom: 0.25 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    /*****  Add series *****/
    const candleSeries = chart.addSeries(CandlestickSeries);
    candleSeries.priceScale().applyOptions({ scaleMargins: { top: 0.05, bottom: 0.30 } })

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceScaleId: "",
      priceFormat: { type: "volume" },
    });
    volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.80, bottom: 0 } })

    /*****  Prepare + set data *****/
    const candles = data
      .map(toCandlestick)
      .sort((a, b) => (a.time.valueOf() as number) - (b.time.valueOf() as number));

    const volumes = data
      .map(toVolume)
      .sort((a, b) => (a.time.valueOf() as number) - (b.time.valueOf() as number));

    candleSeries.setData(candles);
    volumeSeries.setData(volumes);

    /***** Handle resize *****/
    const handleResize = () => {
      chart.applyOptions({ width: containerRef.current?.clientWidth || width });
    };
    window.addEventListener("resize", handleResize);

    chart.timeScale().fitContent()

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, height, symbol, width, chartRef]);

  return <div ref={containerRef} style={{ width: "100%", height }} />;
};

export default LightweightChart;
