"use client";

import React, { useEffect, useRef } from "react";
import { init } from "klinecharts";

const BTCChart = ({ symbol, profit }) => {
  const chartRef = useRef(null);

  let multiplier = 1;
  if (profit) {
    multiplier += profit / 100;
  }

  useEffect(() => {
    const chartContainer = document.getElementById("btc-kline-chart");
    if (!chartContainer) {
      console.warn("Chart container not found.");
      return;
    }

    // Initialize Chart
    const chart = init("btc-kline-chart");
    if (!chart || typeof chart.applyNewData !== "function") {
      console.warn("Chart initialization failed.");
      return;
    }
    chartRef.current = chart;

    // ✅ Add main chart overlays (Tools & Indicators)
    chart.createOverlay({ name: "MA", shortName: "Moving Avg" });
    chart.createIndicator("MA", false, { id: "candle_pane" });
    chart.createIndicator("VOL");
    chart.createOverlay({ name: "EMA", shortName: "Exponential MA" });
    chart.createIndicator("MACD");
    chart.createOverlay({ name: "BOLL", shortName: "Bollinger Bands" });

    // ✅ Add Volume Pane
    chart.createOverlay({ name: "VOL", shortName: "Volume" });

    // Fetch and Load Data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.us/api/v3/klines?symbol=${symbol}&interval=1m&limit=100`
        );
        const data = await response.json();

        const formattedData = data.map((item, index) => {
          if (index === 1) {
            return {
              timestamp: Math.floor(item[0]),
              open: parseFloat(item[1]) * multiplier,
              high: parseFloat(item[2]) * multiplier,
              low: parseFloat(item[3]) * multiplier,
              close: parseFloat(item[4]) * multiplier,
              volume: parseFloat(item[5]) * multiplier,
            };
          } else {
            return null; // or undefined
          }
        });

        chart.applyNewData(formattedData);
      } catch (error) {
        console.error("Error fetching BTC data:", error);
      }
    };

    fetchData();

    // WebSocket for real-time updates
    const socket = new WebSocket(
      `wss://stream.binance.us:9443/ws/${symbol.toLowerCase()}@kline_1m`
    );

    socket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.k) {
        const newBar = {
          timestamp: Math.floor(json.k.t / 1000),
          open: parseFloat(json.k.o) * multiplier,
          high: parseFloat(json.k.h) * multiplier,
          low: parseFloat(json.k.l) * multiplier,
          close: parseFloat(json.k.c) * multiplier,
          volume: parseFloat(json.k.v),
        };
        chart.updateData(newBar);
      }
    };

    return () => {
      socket.close();
      if (chartRef.current) {
        document.getElementById("btc-kline-chart")?.replaceChildren();
        chartRef.current = null;
      }
    };
  }, [symbol, profit]);

  return (
    <div>
      {/* Chart Container */}
      <div id="btc-kline-chart" className="w-full h-[600px]" />

      {/* ✅ Toolbar to change tools dynamically */}
    </div>
  );
};

export default BTCChart;
