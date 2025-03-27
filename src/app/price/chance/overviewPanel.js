"use client";

import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";
import CoinItemButton from "@/app/components/coinItemButtom";
import { BiRefresh } from "react-icons/bi";
import { CoinGeckoBTCData } from "@/app/components/tradingViewMiniChart";


export default function OverviewPanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex flex-col mt-24">
    </div>
  );
}
