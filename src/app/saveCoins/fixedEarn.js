import { TabPanel } from "@material-tailwind/react";
import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";
import { FixedEarnDialog } from "./fixedEarnModal";
import { useState } from "react";

const fixedData = [
  {
    coin: "usdt",
    image: "/coin/USDT.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
  {
    coin: "btc",
    image: "/coin/BTC.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
  {
    coin: "eth",
    image: "/coin/ETH.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
];

export default function FixedEarnTab() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fixedCoin, setFixedCoin] = useState("BTC");
  const { t } = useLanguage();

  const handleFixedDeposit = (coin) => {
    setFixedCoin(coin);
    setDialogOpen(true);
  };

  if (!t) return <LoadingScreen />;
  return (
    // <TabPanel value={1}>
    <>
      <FixedEarnDialog
        open={dialogOpen}
        token={fixedCoin}
        setOpen={setDialogOpen}
      />
      <div className="w-full flex flex-col items-center">
        <div className="w-full grid grid-cols-3 md:grid-cols-5 px-6 pb-3 items-center">
          <p>{t("crypto")}</p>
          <p>Est APR</p>
          <p className="hidden md:block">{t("term")}</p>
          <p className="hidden md:block">{t("invested")}</p>
          <p>{t("operation")}</p>
        </div>
        {fixedData.map((data, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-3 md:grid-cols-5 items-start text-black font-bold cursor-pointer p-6 border-b hover:bg-[#f0f0f0]"
          >
            <div className="flex items-center gap-2">
              <Image src={data.image} width={18} height={18} alt="img" />
              <span>{data.coin?.toUpperCase()}</span>
            </div>
            <p>{data.apr}</p>
            <p className="hidden md:block">{t("flexible")}</p>
            <p className="hidden md:block">{data.invest}</p>
            <div className="w-full">
              <button
                onClick={() => handleFixedDeposit(data.coin)}
                className="bg-black text-white py-1 px-5 rounded-full"
              >
                {t("deposit")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
    // </TabPanel>
  );
}
