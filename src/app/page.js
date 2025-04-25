"use client";

import { CarouselWithContent } from "./components/carousels";
import HotAssertsPanel from "./hotAsserts";
import NewUserPanel from "./newUserPanel";
import DiscoverProductPanel from "./discoverProduct";
import EnhancedTradingPanel from "./enhancedTrading";
import FaqPanel from "./faqPanel";
import TutorialVideoPanel from "./tutorialVideo";
import ExplorePanel from "./explorePanel";
import { useLanguage } from "../../context/LanguageProvider";
import { useSelector } from "react-redux";
import Link from "next/link";
import LeadingDigitalExchange from "./lapTop";
import LoadingScreen from "./components/loading";

export default function Home() {
  const marqueeData = [
    "TON $3.443 (2.17%)",
    "SNT $0.0245 (0.66%)",
    "FLOKI $0.0000626 (-0.07%)",
    "POKERFI $0.0{5}11 (0.00%)",
    "GLM $0.2915 (-0.55%)",
    "JASMY $0.014493 (1.55%)",
    "LPT $5.57 (2.02%)",
    "BAL $1.454 (0.00%)",
    "SSV $7.63 (2.56%)",
    "BLUR $0.1078 (0.85%)",
    "PENDLE $2.1862 (0.90%)",
    "GNS $1.551 (-2.03%)",
    "PUNDIX $0.3024 (0.30%)",
    "RSR $0.005777 (-0.47%)",
    "C98 $0.0738 (2.50%)",
    "RPL $5.29 (-0.19%)",
    "STG $0.2104 (0.67%)",
    "GOGO $0.00166285 (-0.04%)",
    "BNX $1.1457 (4.23%)",
  ];

  const { isAuth } = useSelector((state) => state.auth);
  const { t } = useLanguage();

  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
        <div className="w-full flex items-center mt-9">
          <div className="w-1/2 flex flex-col items-start gap-6 ">
            <p className="text-6xl font-black bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent">
              {isAuth ? t("welcomeMessage") : t("unleashUZXUniverse")}
            </p>
            <p className="text-hoverblack text-3xl">
              {isAuth ? t("journey") : t("unleashUZXUniverseDesc")}
            </p>
            {isAuth ? (
              <Link
                href="/recharge"
                className="mt-9 py-2 rounded-full font-bold bg-gradient-to-r from-blue1 to-blue2 text-black text-xl px-8"
              >
                {t("deposit")}
              </Link>
            ) : (
              <div className="relative w-96 mt-9">
                <input className="w-full h-full rounded-full border border-blue1 bg-black p-4 px-6 outline-none text-hoverblack" />
                <Link
                  href="/register"
                  className="!absolute h-full top-0 right-0 flex justify-center items-center rounded-full bg-gradient-to-r from-blue1 to-blue2 px-6"
                >
                  <span className="text-black">{t("register")}</span>
                </Link>
              </div>
            )}
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <CarouselWithContent />
          </div>
        </div>
      </div>
      <marquee className="w-full flex flex-row items-center bg-gradient-to-r from-blue1 to-blue2 py-4 gap-4 mt-14">
        {marqueeData.map((text, index) => (
          <span key={index} className="text-black text-2xl font-bold ml-7">
            {text}
          </span>
        ))}
      </marquee>
      {isAuth ? <HotAssertsPanel /> : <LeadingDigitalExchange />}
      <NewUserPanel />
      <DiscoverProductPanel />
      <EnhancedTradingPanel />
      <FaqPanel />
      <TutorialVideoPanel />
      <ExplorePanel />
    </div>
  );
}
