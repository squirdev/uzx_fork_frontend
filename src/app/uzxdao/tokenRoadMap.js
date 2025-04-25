import { useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const TokenRoadMap = () => {
  const [activeMapIndex, setActiveMapIndex] = useState(0);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const roadMapData = [
    {
      title: t("issuingMillionTokens"),
      desc: t("issuingMillionTokensDesc"),
    },
    {
      title: t("allocatingMillionTokens"),
      desc: t("allocatingMillionTokensDesc"),
    },
    {
      title: t("releasingMillionTokens"),
      desc: t("releasingMillionTokensDesc"),
    },
    {
      title: t("tradingMillionTokens"),
      desc: t("tradingMillionTokensDesc"),
    },
    {
      title: t("exchangeMillionTokens"),
      desc: t("exchangeMillionTokensDesc"),
    },
    {
      title: t("fundMillionTokens"),
      desc: t("fundMillionTokensDesc"),
    },
  ];

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md mt-12">
      <div className="w-full flex flex-col mt-24">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  my-16">
          {t("governanceTokenRoadmap")}
        </p>
        <div className="self-center grid grid-cols-3 gap-8">
          {roadMapData.map((data, index) => (
            <div
              key={index}
              onClick={() => setActiveMapIndex(index)}
              className="w-full flex gap-4"
            >
              <div
                className={`w-12 h-12 flex justify-center items-center rounded-full text-white text-2xl  border ${index == activeMapIndex ? "border-blue1" : "border-white"} `}
              >
                {index + 1}
              </div>
              <div
                className={`flex-1 flex flex-col gap-4 ${index == activeMapIndex ? "text-blue1" : "text-white"}`}
              >
                <p className="font-bold text-xl">{data.title}</p>
                <p className="text-hoverblack text-sm">{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
