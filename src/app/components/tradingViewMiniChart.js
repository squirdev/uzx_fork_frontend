"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import Image from "next/image";

export const TradingViewMiniChart = ({ coinId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
        );
        const json = await res.json();

        // Convert API response into a usable format
        const prices = json.prices.map((price, index, arr) => ({
          time: new Date(price[0]).toLocaleDateString(), // Format time
          price: price[1],
          rising: index > 0 ? price[1] > arr[index - 1][1] : true, // Check if rising
        }));

        setData(prices);
      } catch (error) {
        console.log("Error fetching Token price history:", error);
      }
    };

    fetchPriceHistory();
  }, []);

  return (
    <div className="w-full min-h-[50px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="price"
            fill="url(#FF0000)"
            stroke={
              data.length > 1 ? (data[0].rising ? "green" : "red") : "gray"
            }
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CoinGeckoBTCData = ({ image, coin, coinId }) => {
  const [btcData, setBtcData] = useState(null);

  useEffect(() => {
    const fetchBTCData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
        );
        const data = await res.json();

        setBtcData({
          price: data.market_data.current_price.usd, // BTC Price (USD)
          change24h: data.market_data.price_change_percentage_24h, // 24h Change %
          high24h: data.market_data.high_24h.usd, // 24h High
          low24h: data.market_data.low_24h.usd, // 24h Low
          volume24h: data.market_data.total_volume.usd, // 24h Volume
          turnover24h: data.market_data.market_cap_change_percentage_24h, // 24h Turnover (Market Cap % Change)
        });
      } catch (error) {
        console.log("Error fetching BTC data:", error);
      }
    };

    fetchBTCData();
    const interval = setInterval(fetchBTCData, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return btcData ? (
    <div className="w-full grid grid-cols-9 p-3 text-sm items-center rounded-sm border-b hover:bg-black/10">
      <div className="flex items-center gap-2">
        <Image src={image} width={16} height={16} alt="logo" />
        <p>{coin}</p>
      </div>
      <h2>${btcData.price.toLocaleString()}</h2>
      <p
        className={`flex items-center gap-1 ${btcData.change24h > 0 ? "text-green-500" : "text-red-500"}`}
      >
        {btcData.change24h.toFixed(2)}%
        {btcData.change24h > 0 ? (
          <AiOutlineRise className="w-5 h-5" />
        ) : (
          <AiOutlineFall className="w-5 h-5" />
        )}
      </p>
      <p>${btcData.high24h.toLocaleString()}</p>
      <p>${btcData.low24h.toLocaleString()}</p>
      <p>${btcData.volume24h.toLocaleString()}</p>
      <p>{btcData.turnover24h.toFixed(2)}%</p>
      <TradingViewMiniChart coinId={coinId} />
      <button className="text-sm text-blue1">Trade</button>
    </div>
  ) : (
    <p className="p-6">Loading...</p>
  );
};
