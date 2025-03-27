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
      // height: 500,
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      // allow_symbol_change: true,
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbol]);

  return <div ref={container} className="tradingview-widget-container" />;
};

export default TradingViewWidget;
