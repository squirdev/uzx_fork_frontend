import { TabPanel } from "@material-tailwind/react";
import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

const flexibleData = [
  {
    coin: "USDT",
    image: "/coin/USDT.png",
    apr: 6.0006,
    dpr: 0.01644,
    invest: 0,
  },
  {
    coin: "BTC",
    image: "/coin/BTC.png",
    apr: 6.0006,
    dpr: 0.01644,
    invest: 0,
  },
  {
    coin: "ETH",
    image: "/coin/ETH.png",
    apr: 6.0006,
    dpr: 0.01644,
    invest: 0,
  },
  {
    coin: "UZX",
    image: "/coin/UZX.png",
    apr: 6.0006,
    dpr: 0.01644,
    invest: 0,
  },
];

export default function FlexibleEarnTab() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <TabPanel value={0}>
      <div className="w-full flex flex-col items-center">
        <div className="w-full grid grid-cols-6 px-6 pb-3 items-center">
          <p>{t("crypto")}</p>
          <p>Est APR</p>
          <p>Est DPR</p>
          <p>Term</p>
          <p>Invested</p>
          <p>{t("operation")}</p>
        </div>
        {flexibleData.map((data, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-6 items-start text-black font-bold p-6 border-b hover:bg-[#f0f0f0]"
          >
            <div className="flex items-center gap-1">
              <Image src={data.image} width={18} height={18} alt="img" />
              <span>{data.coin}</span>
            </div>
            <p>{data.apr}%</p>
            <p>{data.dpr}%</p>
            <p>Flexible</p>
            <p>{data.invest}</p>
            <div className="w-full">
              <button className="bg-black text-white py-1 px-5 rounded-full">
                {t("deposit")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </TabPanel>
  );
}
