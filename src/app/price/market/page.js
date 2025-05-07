"use client";

import { useState } from "react";
import CoinItemButton from "@/app/components/coinItemButtom";
import { BiRefresh } from "react-icons/bi";
import { CoinGeckoBTCData } from "@/app/components/tradingViewMiniChart";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

const coinListData = [
  "All",
  "Top",
  "Meme",
  "PoW",
  "HK",
  "GameFi",
  "Layer1",
  "Layer2 ",
  "Storage",
  "DeFi",
  "Fan Tokens",
  "NFT",
  "SocialFi",
  "AI",
  "Metaverse",
  "Web3",
  "DAO",
  "Payment",
];
const cryptoData = [
  {
    coin: "BTC",
    image: "/coin/BTC.png",
    coinId: "bitcoin",
  },
  {
    coin: "ETH",
    image: "/coin/ETH.png",
    coinId: "ethereum",
  },
  {
    coin: "BNB",
    image: "/coin/BNB.png",
    coinId: "binancecoin",
  },
  {
    coin: "TRX",
    image: "/coin/TRX.png",
    coinId: "tron",
  },
  {
    coin: "SOL",
    image: "/coin/SOL.png",
    coinId: "solana",
  },
  {
    coin: "DOGE",
    image: "/coin/DOGE.png",
    coinId: "doge",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  return (
    <div className="content bg-white px-2 md:px-0">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full my-12">
          <div className="w-full flex flex-col mt-24">
            <div className="w-full flex justify-between gap-12 items-start">
              <div className="flex flex-wrap gap-4">
                {coinListData.map((data, index) => (
                  <CoinItemButton
                    key={index}
                    index={index}
                    text={data}
                    activeIndex={activeIndex}
                    setActive={setActiveIndex}
                  />
                ))}
              </div>
              <button>
                <BiRefresh className="w-7 h-7 text-black" />
              </button>
            </div>

            <div className="w-full flex flex-col items-center mt-12">
              {/* Header */}
              <div className="w-full grid md:grid-cols-9 grid-cols-3 gap-2 px-3 text-sm">
                <p># {t("crypto")}</p>
                <p>{t("price")}</p>
                <p>{t("change24H")}</p>
                <p className="hidden md:block">{t("high24H")}</p>
                <p className="hidden md:block">{t("low24H")}</p>
                <p className="hidden md:block">{t("volume24H")}</p>
                <p className="hidden md:block">{t("turnover24H")}</p>
                <p className="hidden md:block">{t("priceTrend")}</p>
                <p className="hidden md:block">{t("operation")}</p>
              </div>
              {/* Body */}
              <div className="w-full flex flex-col mt-4">
                {cryptoData.map((data, index) => (
                  <CoinGeckoBTCData
                    key={index}
                    image={data.image}
                    coin={data.coin}
                    coinId={data.coinId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
