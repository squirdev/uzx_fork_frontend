"use client";

import { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol = "BTCUSDT" }) => {
  const container = useRef(null);

  useEffect(() => {
    // Remove existing script before adding a new one
    if (container.current) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `BINANCE:${symbol}`,
      width: "100%",
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      custom_formatters: {
        priceFormatterFactory: (symbolInfo, minTick) => {
          console.log("$$$$$$$", symbolInfo);
          if (symbolInfo === null) {
            return null;
          }

          if (symbolInfo.format === "price") {
            return {
              format: (price, signPositive) => {
                if (price >= 1000000000) {
                  return `${((price * 2) / 1000000000).toFixed(4)}B`;
                }

                if (price >= 1000000) {
                  return `${((price * 2) / 1000000).toFixed(4)}M`;
                }

                if (price >= 1000) {
                  return `${((price * 2) / 1000).toFixed(4)}K`;
                }

                return (price * 2).toFixed(4);
              },
            };
          }
          return null; // The default formatter will be used.
        },
      },
      // allow_symbol_change: true,
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbol]);

  return <div ref={container} className="tradingview-widget-container" />;
};

export default TradingViewWidget;
