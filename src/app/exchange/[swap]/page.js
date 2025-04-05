"use client";

import { use, useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { AiOutlineSetting, AiOutlineLayout } from "react-icons/ai";

// import TradingViewWidget from "@/app/components/tradingViewWidget";
import OrderTable from "./orderTable";
import OrderAssets from "./assets/orderAssets";
import SwapHistory from "./history";
import { useLanguage } from "../../../../context/LanguageProvider";
import { SwapTokenList } from "@/constants/supportCryptoInfo";
import BTCChart from "@/app/components/tradingViewWidget";
import { getTokenProfit } from "@/app/api/token";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  const [tokenInfo, setTokenInfo] = useState(null);
  const { swap } = use(params);
  const tradingSymbol = swap.toUpperCase() + "USDT";
  const router = useRouter();

  const [btcData, setBtcData] = useState(null);

  useEffect(() => {
    if (!SwapTokenList.includes(swap.toUpperCase())) {
      router.push("/exchange/btc");
    }
  }, [swap]);

  const fetchTokenList = async () => {
    let result = await getTokenProfit(swap);
    if (result) setTokenInfo(result.data);
  };

  const fetchBTCData = async () => {
    try {
      
     const response = await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${tradingSymbol}`);
     const data = await response.json();

      console.log(data);

      setBtcData({
        change24h: data.priceChangePercent, // 24h Change %
        high24h: data.highPrice, // 24h High
        low24h: data.lastPrice, // 24h Low
        volume24h: data.volume, // 24h Volume
      });
    } catch (error) {
      console.log("Error fetching BTC data:", error);
    }
  };

  useEffect(() => {
    fetchTokenList();
    fetchBTCData();
  }, []);

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <>
      <div className="w-full p-2 bg-black">
        <div className="w-full">
          <div className="w-full flex justify-between bg-mainblack p-3">
            <div className="flex items-center gap-8">
              <Menu color="dark">
                <MenuHandler>
                  <Button className="px-6 py-2 text-md">{swap.toUpperCase() + "/USDT"}</Button>
                </MenuHandler>
                <MenuList className="p-0 border-none bg-black">
                  {SwapTokenList.map((data, index) => (
                    <Link key={index} href={`/exchange/${data.toLowerCase()}`}>
                      <MenuItem className="bg-black outline-none ">
                        {data}/USDT
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
              <div className="flex flex-col text-[12px] items-end">
                <p className="text-[#999]">{t("change24H")}</p>
                <p className="text-[#999] text-warnred">{btcData?.change24h}%</p>
              </div>
              <div className="flex flex-col text-[12px] items-end">
                <p className="text-[#999]">{t("high24H")}</p>
                <p className="text-[#999] text-white">{Number(btcData?.high24h).toFixed(2)}</p>
              </div>
              <div className="flex flex-col text-[12px] items-end">
                <p className="text-[#999]">{t("low24H")}</p>
                <p className="text-[#999] text-white">{Number(btcData?.low24h).toFixed(2)}</p>
              </div>
              <div className="flex flex-col text-[12px] items-end">
                <p className="text-[#999]">{t("volume24H")}</p>
                <p className="text-[#999] text-white">{Number(btcData?.volume24h).toFixed(2)}{swap.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2">
                <Image src={"/marketInfo.png"} width={20} height={20} alt="" />
                <p className="text-white text-sm">{t("tradingMarketInfo")}</p>
              </button>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2">
                  <AiOutlineLayout className="w-5 h-5 text-white" />
                </button>
                <button className="flex items-center gap-2">
                  <AiOutlineSetting className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-5 gap-2">
            <div className="col-span-4 h-full flex flex-col items-stretch">
              <div className="w-full mt-2 h-full bg-black gap-2 grid grid-cols-4">
                <div className="col-span-3 h-full">
                  <BTCChart symbol={tradingSymbol} profit={tokenInfo?.profit} date={tokenInfo?.updatedAt} />
                </div>
                <div className="max-h-[600px] overflow-auto">
                  <OrderTable swap={swap} />
                </div>
              </div>
              <div className="w-full self-end text-white">
                <SwapHistory />
              </div>
            </div>
            <div className="col-span-1 h-full mt-2 text-white">
              <OrderAssets swap={swap} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
