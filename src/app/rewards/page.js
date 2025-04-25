"use client";

import Image from "next/image";
import { Activity } from "./activity";
import { MyRewards } from "./myRewards";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <div className="brands container mx-auto my-2">
        <div className="w-full flex items-center mt-9">
          <div className="w-1/2 flex flex-col items-start gap-6 ">
            <p className="text-5xl font-bold text-white">
              {t("rewardsCenter")}
            </p>
            <p className="text-[#939393] text-lg">
              {t("chanceWinMore")}
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <Image src={"/rewards/top.png"} width={465} height={287} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-9 bg-white">
        <Activity />
        <MyRewards />
      </div>
    </div>
  );
}
