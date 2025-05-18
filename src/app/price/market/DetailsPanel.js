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

export default function DetailsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tokenProfit, setTokenProfit] = useState(null);
  const { t } = useLanguage();

  const fetchTokenList = async () => {
    let result = await getTokenList();
    if (result && result.data) {
      const temp = result.data.reduce((acc, item) => {
        acc[item.name] = item.profit;
        return acc;
      }, {});
      setTokenProfit(temp);
    }
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
        <div className="w-full grid md:grid-cols-8 grid-cols-3 gap-2 px-3 text-sm">
          <p># {t("crypto")}</p>
          <p>{t("price")}</p>
          <p>{t("change24H")}</p>
          <p className="hidden md:block">{t("high24H")}</p>
          <p className="hidden md:block">{t("low24H")}</p>
          <p className="hidden md:block">{t("volume24H")}</p>
          <p className="hidden md:block">{t("turnover24H")}</p>
          <p className="hidden md:block">{t("operation")}</p>
        </div>
        <CoinGeckoBTCData tokenProfit={tokenProfit} />
      </div>
    </div>
  );
}
