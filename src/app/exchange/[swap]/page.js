"use client";

import TradingViewWidget from "@/app/components/tradingViewWidget";
import { AiOutlineSetting, AiOutlineLayout } from "react-icons/ai";
import Image from "next/image";
import OrderTable from "./orderTable";
import OrderAssets from "./assets/orderAssets";
import SwapHistory from "./history";
import { use } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { SwapTokenList } from "@/constants/supportCryptoInfo";
import Link from "next/link";

export default function Home({ params }) {
  const { t } = useLanguage();
  const { swap } = use(params);
  const tradingSymbol = swap.toUpperCase() + "USDT";
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="w-full p-2 bg-black">
      <div className="w-full">
        <div className="w-full flex justify-between bg-mainblack p-3">
          <div className="flex items-center gap-8">
            <Menu color="dark">
              <MenuHandler>
                <Button className="px-6">{t("selectTradingPair")}</Button>
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
              <p className="text-[#999] text-warnred">-0.54%</p>
            </div>
            <div className="flex flex-col text-[12px] items-end">
              <p className="text-[#999]">{t("high24H")}</p>
              <p className="text-[#999] text-white">-0.54%</p>
            </div>
            <div className="flex flex-col text-[12px] items-end">
              <p className="text-[#999]">{t("low24H")}</p>
              <p className="text-[#999] text-white">-0.54%</p>
            </div>
            <div className="flex flex-col text-[12px] items-end">
              <p className="text-[#999]">{t("volume24H")}</p>
              <p className="text-[#999] text-white">-0.54%</p>
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
                <TradingViewWidget symbol={tradingSymbol} />
              </div>
              <div className="">
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
  );
}
