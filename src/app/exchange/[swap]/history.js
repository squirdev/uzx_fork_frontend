"use client";

import { getSwapHistory } from "@/app/api/token";
import { getSimplifiedDateTime } from "@/app/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";

const SwapHistory = () => {
  const [swapHistory, setSwapHistory] = useState(null);
  const { t } = useLanguage();

  const fetchHistory = async () => {
    let result = await getSwapHistory();
    if (result && result.data) {
      setSwapHistory(result.data);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full overflow-auto min-h-[300px] p-4 bg-mainblack mt-2">
      <div className="w-full border-b border-white pb-1">
        <p className="text-white">{t("history")}</p>
      </div>
      <div className="w-full h-full flex flex-col mt-2">
        <div className="w-full grid grid-cols-6 text-white font-bold">
          <p>{t("amount")}</p>
          <p>{t("time")}</p>
          <p>{t("value")}</p>
          <p>{t("name")}</p>
          <p>{t("token")}</p>
          <p>{t("status")}</p>
        </div>
        <div className="w-full flex-1 max-h-[300px] overflow-auto">
          {swapHistory ? (
            <div className="w-full flex flex-col mt-6">
              {swapHistory.map((data, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-6 items-center text-white py-1"
                >
                  <p>{data.fromAmount}</p>
                  <p>{getSimplifiedDateTime(data.createdAt)}</p>
                  <p>{data.toAmount.toFixed(3)}</p>
                  <p>{data.toToken?.toUpperCase()}</p>
                  <p>{data.fromToken?.toUpperCase()}</p>
                  <p>{t("success")}</p>
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
