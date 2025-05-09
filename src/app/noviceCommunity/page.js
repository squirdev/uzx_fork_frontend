"use client";

import Image from "next/image";

import TradingVideo from "./tradingVideo";
import ThemeClassroom from "./themeClassroom";
import RequiredForBegineer from "./requiredForBeginner";
import BlockchainGlossary from "./blockchainGlossary";
import IssueSupport from "./issueSupport";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function NoviceCommunity() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content md:px-0 px-2">
      <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
        <div className="w-full flex items-center mt-9 md:flex-row flex-col-reverse">
          <div className="md:w-1/2 w-full flex flex-col items-start gap-6 ">
            <p className="text-5xl font-bold text-white">
              {t("playWithDigCurrency")}
            </p>
            <p className="text-[#939393] text-lg">
              {t("playWithDigCurrencyDesc")}
            </p>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <Image src={"/noviceHeader.png"} width={465} height={287} alt="" />
          </div>
        </div>
      </div>
      <TradingVideo />
      <ThemeClassroom />
      <RequiredForBegineer />
      <BlockchainGlossary />
      <IssueSupport />
    </div>
  );
}
