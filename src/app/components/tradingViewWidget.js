"use client";

import React, { useEffect, useRef } from "react";

import { KLineChartPro } from '@klinecharts/pro'
// Import css
import '@klinecharts/pro/dist/klinecharts-pro.css'

class CustomDatafeed {

  constructor(symbol, profit, timestamp){
    this.symbol = symbol;
    this.profit = profit;
    this.interval = '15m';
    this.timestamp = timestamp;

    console.log(symbol, profit);
  }

  /**
   * Fuzzy search symbols
   * Triggered when the search box is entered
   * Returns an array of symbol information
   */
  searchSymbols (search = ''){
    // Remote pull of symbol data based on fuzzy fields
  }

  /**
   * Pull historical k-line data
   * Triggered when the symbol and period change
   * 
   * Returns the symbol k-line data array
   */

  async fetchData (interval) {
    const response = await fetch(
      `https://api.binance.us/api/v3/klines?symbol=${this.symbol}&interval=${interval}`
    );

    
    let temp = 0;

    const data = await response.json();

    const formattedData = data.map((item, index) => {
      
      if (item[0] > this.timestamp) {
        if(temp === 0) {
          temp = 1;
          return {
            timestamp: Math.floor(item[0]),
            open: parseFloat(item[1]),
            high: parseFloat(item[2]) * this.profit,
            low: parseFloat(item[3]),
            close: parseFloat(item[4]) * this.profit,
            volume: parseFloat(item[5]) * this.profit,
          };
        }else {
          return {
            timestamp: Math.floor(item[0]),
            open: parseFloat(item[1]) * this.profit,
            high: parseFloat(item[2])* this.profit,
            low: parseFloat(item[3])* this.profit,
            close: parseFloat(item[4])* this.profit,
            volume: parseFloat(item[5])* this.profit,
          };
        }

      } else if(index === (data.length - 1)) {
        return {
          timestamp: Math.floor(item[0]),
          open: parseFloat(item[1]),
          high: parseFloat(item[2]) * this.profit,
          low: parseFloat(item[3]),
          close: parseFloat(item[4]) * this.profit,
          volume: parseFloat(item[5]) * this.profit,
        };
      } else {
        return {
          timestamp: Math.floor(item[0]),
          open: parseFloat(item[1]) ,
          high: parseFloat(item[2]) ,
          low: parseFloat(item[3]) ,
          close: parseFloat(item[4]) ,
          volume: parseFloat(item[5]) ,
        }; // or undefined
      }
    });

    return formattedData
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
  

  getHistoryKLineData (symbol, period, from, to) {

    const interval = this.getTimeDifference(from, to);

    console.log(from, to);

    console.log(interval);
    // Complete data request
     const data = this.fetchData(interval)
     return data
  }

  /**
   * Subscribe to real-time data of the symbol in a certain period
   * Triggered when the symbol and period change
   * 
   * Notify chart to receive data through callback
   */
  subscribe (symbol, period, callback) {
    // Complete ws subscription or http polling
  }

  /**
   * Unsubscribe to real-time data of the symbol in a certain period
   * Triggered when the symbol and period change
   * 
   */ 
  unsubscribe (symbol, period) {
    // Complete ws subscription cancellation or http polling cancellation
  }

  length = 9
  
}

const BTCChart = ({ symbol, profit, date }) => {
  const chartRef = useRef(null);

  let multiplier = 1;
  if (profit) {
    multiplier += profit / 100;
  }

  useEffect(() => {
    const container = document.getElementById("btc-kline-chart");

    const timestamp = new Date(date).getTime();

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
      datafeed: new CustomDatafeed(symbol, multiplier, timestamp)
    });

    chart.setStyles({grid: {show: false}})

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
  }, [symbol, profit, date]);

  return (
    <div>
      {/* Chart Container */}
      <div id="btc-kline-chart" className="w-full !h-[600px] bg-mainblack p-2" />

      {/* ✅ Toolbar to change tools dynamically */}
    </div>
  );
};

export default BTCChart;
