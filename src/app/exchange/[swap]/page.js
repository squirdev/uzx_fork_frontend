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
  IconButton,
} from "@material-tailwind/react";
import { AiOutlineSetting, AiOutlineLayout } from "react-icons/ai";
import { BiObjectsVerticalCenter } from "react-icons/bi";

// import TradingViewWidget from "@/app/components/tradingViewWidget";
import OrderTable from "./orderTable";
import OrderAssets from "./assets/orderAssets";
import SwapHistory from "./history";
import { useLanguage } from "../../../../context/LanguageProvider";
import { SwapTokenList } from "@/constants/supportCryptoInfo";
import BTCChart from "@/app/components/tradingViewWidget";
import { getTokenProfit } from "@/app/api/token";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingScreen from "@/app/components/loading";

export default function Home({ params }) {
  const [tokenInfo, setTokenInfo] = useState(null);
  const { swap } = use(params);
  const tradingSymbol = swap.toUpperCase() + "USDT";
  const router = useRouter();

  const [btcData, setBtcData] = useState(null);
  const [change24H, setChange24H] = useState(0);
  const [high24H, setHigh24H] = useState("");
  const [low24H, setLow24H] = useState("");

  const [showTradingView, setShowTradingView] = useState(false);

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
      const response = await fetch(
        `https://api.binance.us/api/v3/ticker/24hr?symbol=${tradingSymbol}`
      );
      const data = await response.json();

      setBtcData({
        change24h: data.priceChangePercent,
        high24h: data.highPrice,
        low24h: data.lastPrice,
        volume24h: data.volume,
      });
    } catch (error) {
      console.log("Error fetching BTC data:", error);
    }
  };

  const getBTCPrices = async () => {
    const response = await axios.get("https://api.binance.us/api/v3/klines", {
      params: {
        symbol: tradingSymbol,
        interval: "5m",
        limit: 288,
      },
    });

    const prices = response.data.map((candle) => {
      const ts = new Date(candle[0]);

      if (!tokenInfo || tokenInfo.length === 0) {
        return {
          time: new Date(candle[0]),
          max: parseFloat(candle[2]),
          min: parseFloat(candle[3]),
        };
      }

      for (let i = 0; i < tokenInfo.length; i++) {
        const current = tokenInfo[i];
        const start = new Date(current.createdAt);
        const profit = current.profit;
        const multiplier = 1 + profit / 100;

        // Handle the last tokenInfo entry
        const isLast = i === tokenInfo.length - 1;
        const end = isLast
          ? new Date(8640000000000000) // max Date
          : new Date(tokenInfo[i + 1].createdAt);

        if (ts >= start && ts < end) {
          return {
            time: new Date(candle[0]),
            max: parseFloat(candle[2]) * multiplier,
            min:
              multiplier > 1
                ? parseFloat(candle[3])
                : parseFloat(candle[3]) * multiplier,
          };
        }
      }
      return {
        time: new Date(candle[0]),
        max: parseFloat(candle[2]),
        min: parseFloat(candle[3]),
      };
    });

    const maxIndex = prices.reduce(
      (maxIdx, item, idx, arr) => (item.max > arr[maxIdx].max ? idx : maxIdx),
      0
    );

    const minIndex = prices.reduce(
      (minIdx, item, idx, arr) => (item.min < arr[minIdx].min ? idx : minIdx),
      0
    );

    setChange24H(((prices[287].max - prices[0].max) * 100) / prices[287].max);
    setHigh24H(prices[maxIndex].max);
    setLow24H(prices[minIndex].min);
  };

  useEffect(() => {
    fetchTokenList();
    fetchBTCData();
  }, []);

  useEffect(() => {
    getBTCPrices();
  }, [tokenInfo]);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <>
      {showTradingView ? (
        <div className="flex flex-col">
          <div className="flex flex-row justify-end">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setShowTradingView(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>

          <div>
            <BTCChart symbol={tradingSymbol} tokenInfo={tokenInfo} />
          </div>
        </div>
      ) : (
        <div className="w-full p-2 bg-black">
          <div className="w-full">
            <div className="w-full flex justify-between bg-mainblack p-3">
              <div className="flex items-center gap-8">
                <Menu color="dark">
                  <MenuHandler>
                    <Button className="px-6 py-2 text-md">
                      {swap.toUpperCase() + "/USDT"}
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-0 border-none bg-black">
                    {SwapTokenList.map((data, index) => (
                      <Link
                        key={index}
                        href={`/exchange/${data.toLowerCase()}`}
                      >
                        <MenuItem className="bg-black outline-none ">
                          {data}/USDT
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </Menu>
                <div className="md:flex hidden flex-col text-[12px] items-end">
                  <p className="text-[#999]">{t("change24H")}</p>
                  <p
                    className={`text-[#999] ${change24H >= 0 ? "text-green-400" : "text-warnred"} `}
                  >
                    {Number(change24H).toFixed(2)}%
                  </p>
                </div>
                <div className="md:flex hidden flex-col text-[12px] items-end">
                  <p className="text-[#999]">{t("high24H")}</p>
                  <p className="text-[#999] text-white">
                    {Number(high24H).toFixed(2)}
                  </p>
                </div>
                <div className="md:flex hidden flex-col text-[12px] items-end">
                  <p className="text-[#999]">{t("low24H")}</p>
                  <p className="text-[#999] text-white">
                    {Number(low24H).toFixed(2)}
                  </p>
                </div>
                <div className="md:flex hidden flex-col text-[12px] items-end">
                  <p className="text-[#999]">{t("volume24H")}</p>
                  <p className="text-[#999] text-white">
                    {Number(btcData?.volume24h).toFixed(2)}
                    {/* {Number(volume24H).toFixed(2)} */}
                    {swap.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button className="md:flex hidden items-center gap-2">
                  <Image
                    src={"/marketInfo.png"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p className="text-white text-sm">{t("tradingMarketInfo")}</p>
                </button>
                <button
                  className="md:hidden flex items-center gap-2"
                  onClick={() => setShowTradingView(!showTradingView)}
                >
                  <BiObjectsVerticalCenter className="w-5 h-5 text-white" />
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
            <div className="w-full h-full md:grid flex flex-col-reverse md:grid-cols-5 grid-cols-2 gap-2">
              <div className="col-span-4 h-full flex flex-col items-stretch">
                <div className="w-full mt-2 h-full bg-black gap-2 grid grid-cols-1 md:grid-cols-4">
                  <div className="col-span-3 h-full hidden md:block bg-black">
                    {/* <BTCChart symbol={tradingSymbol} profit={tokenInfo?.profit} date={tokenInfo?.updatedAt} /> */}
                    <BTCChart symbol={tradingSymbol} tokenInfo={tokenInfo} />
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
      )}
    </>
  );
}
