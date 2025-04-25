"use client";

import { getSwapHistory } from "@/app/api/token";
import { getSimplifiedDateTime } from "@/app/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

const SwapHistory = () => {
  const [swapHistory, setSwapHistory] = useState(null);
  const { t } = useLanguage();

  const fetchHistory = async () => {
    let result = await getSwapHistory();
    if (result && result.data) {
      console.log("SWAP HISTORY::", result.data);
      setSwapHistory(result.data);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full overflow-auto min-h-[300px] p-4 bg-mainblack mt-2">
      <div className="w-full border-b border-white pb-1">
        <p className="text-white">{t("history")}</p>
      </div>
      <div className="w-full h-full flex flex-col mt-2">
        <div className="w-full grid grid-cols-5 text-white font-bold">
          <p>{t("token")}</p>
          <p>{t("time")}</p>
          <p>{t("value")}</p>
          <p>{t("amount")}</p>
          <p>{t("status")}</p>
        </div>
        <div className="w-full flex-1 max-h-[300px] overflow-auto">
          {swapHistory ? (
            <div className="w-full flex flex-col mt-6">
              {swapHistory.map((data, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-5 items-center text-white py-1 text-sm"
                >
                  {data.fromToken == "usdt" ? (
                    <p className="text-green-500">
                      {data.toToken.toUpperCase()}
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.fromToken.toUpperCase()}
                    </p>
                  )}
                  <p>{getSimplifiedDateTime(data.createdAt)}</p>
                  {data.fromToken == "usdt" ? (
                    <p className="text-green-500">{data.toAmount.toFixed(3)}</p>
                  ) : (
                    <p className="text-red-500">{data.fromAmount.toFixed(3)}</p>
                  )}
                  {data.fromToken == "usdt" ? (
                    <p className="text-green-500">
                      {data.fromAmount.toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-red-500">{data.toAmount.toFixed(2)}</p>
                  )}
                  <p className="text-green-500">
                    {data.fromToken == "usdt"
                      ? t("buy").toUpperCase() + "_" + t("success").toUpperCase()
                      : t("sell").toUpperCase() + "_" + t("success").toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full mt-12 flex flex-col justify-center items-center">
              <Image src={"/nodata.png"} width={80} height={60} alt="image" />
              <p className="text-hoverblack text-sm">{t("noDataAvailable")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapHistory;
