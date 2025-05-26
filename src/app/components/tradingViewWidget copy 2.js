"use client";

import React, { useEffect, useRef } from "react";

import { KLineChartPro } from "@klinecharts/pro";
// Import css
import "@klinecharts/pro/dist/klinecharts-pro.css";

class CustomDatafeed {
  constructor(symbol, tokenInfo) {
    this.symbol = symbol;
    this.tokenInfo = tokenInfo;
    this.interval = "15m";
  }

  /**
   * Fuzzy search symbols
   * Triggered when the search box is entered
   * Returns an array of symbol information
   */
  searchSymbols(search = "") {
    // Remote pull of symbol data based on fuzzy fields
  }

  /**
   * Pull historical k-line data
   * Triggered when the symbol and period change
   *
   * Returns the symbol k-line data array
   */

  async fetchData(interval) {
    const response = await fetch(
      `https://api.binance.us/api/v3/klines?symbol=${this.symbol}&interval=${interval}`
    );

    const data = await response.json();

    let flagIndex = false;
    let flagStep = -1;
    const formattedData = data.map((item, index) => {
      const ts = new Date(item[0]);

      if (!this.tokenInfo || this.tokenInfo.length == 0) {
        return {
          timestamp: Math.floor(item[0]),
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
          volume: parseFloat(item[5]),
        };
      }

      for (let i = 0; i < this.tokenInfo.length; i++) {
        const profit = this.tokenInfo[i].profit;
        const multiplier = 1 + profit / 100;
        const start = new Date(this.tokenInfo[i].createdAt);
        if (i == this.tokenInfo.length - 1) {
          if (ts > start) {
            if (!flagIndex) {
              flagIndex = true;
              const beforeProfit = this.tokenInfo[i - 1]
                ? this.tokenInfo[i - 1].profit
                : 0;
              const beforeMultiplier = 1 + beforeProfit / 100;
              return {
                timestamp: Math.floor(item[0]),
                open: parseFloat(item[1]) * beforeMultiplier,
                high: parseFloat(item[2]) * multiplier,
                low: parseFloat(item[3]) * beforeMultiplier,
                close: parseFloat(item[4]) * multiplier,
                volume: parseFloat(item[5]) * multiplier,
              };
            } else {
              return {
                timestamp: Math.floor(item[0]),
                open: parseFloat(item[1]) * multiplier,
                high: parseFloat(item[2]) * multiplier,
                low: parseFloat(item[3]) * multiplier,
                close: parseFloat(item[4]) * multiplier,
                volume: parseFloat(item[5]) * multiplier,
              };
            }
          } else {
            return {
              timestamp: Math.floor(item[0]),
              open: parseFloat(item[1]),
              high: parseFloat(item[2]),
              low: parseFloat(item[3]),
              close: parseFloat(item[4]),
              volume: parseFloat(item[5]),
            };
          }
        }

        const end = new Date(this.tokenInfo[i + 1].createdAt);

        if (ts >= start && ts < end) {
          if (flagStep == i) {
            return {
              timestamp: Math.floor(item[0]),
              open: parseFloat(item[1]) * multiplier,
              high: parseFloat(item[2]) * multiplier,
              low: parseFloat(item[3]) * multiplier,
              close: parseFloat(item[4]) * multiplier,
              volume: parseFloat(item[5]) * multiplier,
            };
          } else {
            flagStep = i;
            const beforeProfit = this.tokenInfo[i - 1]
              ? this.tokenInfo[i - 1].profit
              : 0;
            const beforeMultiplier = 1 + beforeProfit / 100;
            return {
              timestamp: Math.floor(item[0]),
              open: parseFloat(item[1]) * beforeMultiplier,
              high: parseFloat(item[2]) * multiplier,
              low: parseFloat(item[3]) * beforeMultiplier,
              close: parseFloat(item[4]) * multiplier,
              volume: parseFloat(item[5]) * multiplier,
            };
          }
        }
      }

      return {
        timestamp: Math.floor(item[0]),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
      };
    });
    return formattedData;
  }

  getTimeDifference(from, to) {
    const difference = Math.abs(to - from); // Get absolute difference in milliseconds

    const second = 1000 * 500;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // Approximate (30 days)
    const year = day * 365; // Approximate (365 days)

    if (difference < minute) {
      return `${(difference / second).toFixed(0)} seconds`;
    } else if (difference < hour) {
      return `${(difference / minute).toFixed(0)}m`;
    } else if (difference < day) {
      return `${(difference / hour).toFixed(0)}h`;
    } else if (difference < week) {
      return `${(difference / day).toFixed(0)}d`;
    } else if (difference < month) {
      return `${(difference / week).toFixed(0)}w`;
    } else if (difference < year) {
      return `${(difference / month).toFixed(0)}m`;
    } else {
      return `${(difference / year).toFixed(0)}y`;
    }
  }

  getHistoryKLineData(symbol, period, from, to) {
    const interval = this.getTimeDifference(from, to);

    // Complete data request
    const data = this.fetchData(interval);
    return data;
  }

  /**
   * Subscribe to real-time data of the symbol in a certain period
   * Triggered when the symbol and period change
   *
   * Notify chart to receive data through callback
   */
  subscribe(symbol, period, callback) {
    // Complete ws subscription or http polling
  }

  /**
   * Unsubscribe to real-time data of the symbol in a certain period
   * Triggered when the symbol and period change
   *
   */
  unsubscribe(symbol, period) {
    // Complete ws subscription cancellation or http polling cancellation
  }

  length = 9;
}

const BTCChart = ({ symbol, tokenInfo }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById("btc-kline-chart");

    // **Clear existing chart container before rendering**
    if (container) {
      container.innerHTML = ""; // This removes previous chart elements
    }

    // **Destroy previous chart instance before creating a new one**
    if (chartRef.current) {
      console.log("Destroying previous chart instance...");
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // **Create a new chart instance**
    const chart = new KLineChartPro({
      container,
      symbol: {
        exchange: "BTCUSDT",
        market: "stocks",
        name: "Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares",
        shortName: "BABA",
        ticker: "BABA",
        priceCurrency: "usd",
        type: "ADRC",
      },
      period: { multiplier: 15, timespan: "minute", text: "15m" },
      datafeed: new CustomDatafeed(symbol, tokenInfo),
    });

    chart.setStyles({ grid: { show: false } });

    if (!chart || typeof chart.applyNewData !== "function") {
      console.warn("Chart initialization failed.");
      return;
    }

    chartRef.current = chart;

    return () => {
      console.log("Cleaning up chart...");
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [symbol, tokenInfo]);

  return (
    <div>
      {/* Chart Container */}
      <div
        id="btc-kline-chart"
        className="w-full !h-[600px] bg-mainblack p-2"
      />

      {/* ✅ Toolbar to change tools dynamically */}
    </div>
  );
};

export default BTCChart;
