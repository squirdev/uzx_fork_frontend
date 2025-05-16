"use client";

import { useEffect, useState } from "react";
import CoinItemButton from "@/app/components/coinItemButtom";
import { BiRefresh } from "react-icons/bi";
import { CoinGeckoBTCData } from "@/app/components/tradingViewMiniChart";
import { useLanguage } from "../../../../context/LanguageProvider";
import { getTokenList } from "@/app/api/token";
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
    coin: "SOL",
    image: "/coin/SOL.png",
    coinId: "solana",
  },
  // {
  //   coin: "DOGE",
  //   image: "/coin/DOGE.png",
  //   coinId: "doge",
  // },
];

function getProfit(array, name) {
  if (!array) return 0;
  const item = array.find((entry) => entry.name === name);
  return item ? item.profit : 0;
}

export default function DetailsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tokenList, setTokenList] = useState(null);
  const { t } = useLanguage();

  const fetchTokenList = async () => {
    let result = await getTokenList();
    if (result) setTokenList(result.data);
  };

  useEffect(() => {
    fetchTokenList();
  }, []);

  if (!t) return <LoadingScreen />;
  return (
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
        <div className="w-full grid md:grid-cols-8 grid-cols-3 gap-2 px-3 text-sm">
          <p># {t("crypto")}</p>
          <p>{t("price")}</p>
          <p>{t("change24H")}</p>
          <p className="hidden md:block">{t("high24H")}</p>
          <p className="hidden md:block">{t("low24H")}</p>
          <p className="hidden md:block">{t("volume24H")}</p>
          <p className="hidden md:block">{t("turnover24H")}</p>
          {/* <p className="hidden md:block">{t("priceTrend")}</p> */}
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
              profit={getProfit(tokenList, data.coin.toLowerCase())}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
