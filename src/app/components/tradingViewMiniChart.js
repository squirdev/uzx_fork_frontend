"use client";

import { useState, useEffect } from "react";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "./loading";

export const CoinGeckoBTCData = ({ tokenProfit }) => {
  const { t } = useLanguage();
  const [coinInfo, setCoinInfo] = useState(null);
  const coinIds = [
    "bitcoin",
    "ethereum",
    "dogecoin",
    "ripple",
    "litecoin",
    "filecoin",
    "cardano",
    "eos",
    "binancecoin",
    "polkadot",
    "curve-dao-token",
    "official-trump",
    "sui",
    "cronos",
    "solana",
  ];

  const fetchBTCData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await res.json();

      setCoinInfo(data);
    } catch (error) {
      console.log("Error fetching BTC data:", error);
    }
  };

  useEffect(() => {
    fetchBTCData();
  }, []);

  if (!t) return <LoadingScreen />;
  return (
    coinInfo &&
    coinInfo.map((coin, index) => (
      <div
        key={index}
        className="w-full grid md:grid-cols-8 grid-cols-3 p-3 py-5 text-sm items-center rounded-sm border-b hover:bg-black/10"
      >
        <div className="flex items-center gap-2">
          <Image src={coin.image} width={16} height={16} alt="logo" />
          <p>{coin.symbol}</p>
        </div>
        <h2>
          $
          {(
            coin.current_price *
            (1 + (tokenProfit && tokenProfit[coin.symbol]) / 100)
          ).toLocaleString()}
        </h2>
        <p
          className={`flex items-center gap-1 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
          {coin.price_change_percentage_24h > 0 ? (
            <AiOutlineRise className="w-5 h-5" />
          ) : (
            <AiOutlineFall className="w-5 h-5" />
          )}
        </p>
        <p className="hidden md:block">${coin.high_24h.toLocaleString()}</p>
        <p className="hidden md:block">${coin.low_24h.toLocaleString()}</p>
        <p className="hidden md:block">${coin.low_24h.toLocaleString()}</p>
        <p className="hidden md:block">
          {coin.market_cap_change_percentage_24h.toFixed(2)}%
        </p>
        <Link
          href={`/exchange/${coin.symbol}`}
          className="text-sm text-blue1 hidden md:block"
        >
          {t("trade")}
        </Link>
      </div>
    ))
  );
};
