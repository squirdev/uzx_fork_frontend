import { getTradingHistory } from "@/app/api/token";
import { getSimplifiedDateTime, getSimplifiedTime } from "@/app/helper";
import { useEffect, useState } from "react";
import { AiOutlineSync } from "react-icons/ai";
import { useLanguage } from "../../../../context/LanguageProvider";
import Image from "next/image";
import LoadingScreen from "@/app/components/loading";

const OrderTable = ({ swap }) => {
  const { t } = useLanguage();
  const [tradingHistoryList, setTradingHistoryList] = useState(null);

  const fetchTradingHistory = async () => {
    let result = await getTradingHistory(swap.toLowerCase());
    if (result) {
      setTradingHistoryList(result.data);
    }
  };

  useEffect(() => {
    fetchTradingHistory();
  }, []);

  if (!t) return <LoadingScreen />;
  return (
    <div className="h-full bg-mainblack">
      <div className="w-full flex justify-between border-b border-white p-2 pb-1">
        <p className="text-white">{t("latestTrades")}</p>
        <button onClick={fetchTradingHistory}>
          <AiOutlineSync className="text-xl text-white" />
        </button>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full grid grid-cols-3 text-white text-sm p-2">
          <p>{t("price")}(USDT)</p>
          <p>
            {t("amount")}({swap?.toUpperCase()})
          </p>
          <p>{t("time")}</p>
        </div>
        <div className="w-full flex max-h-[500px] flex-col overflow-y-auto">
          {tradingHistoryList && tradingHistoryList.length > 0 ? (
            tradingHistoryList.map((data, index) => (
              <div key={index} className="w-full grid grid-cols-3 text-sm p-2">
                <p
                  className={`${data.toToken == "usdt" ? "text-red-400" : "text-green-400"}`}
                >
                  {data.toToken == "usdt"
                    ? data.fromTokenPrice?.toFixed(3)
                    : data.toTokenPrice?.toFixed(3)}
                </p>
                <p className="text-white">
                  {data.toToken == "usdt"
                    ? data.fromAmount.toFixed(3)
                    : data.toAmount?.toFixed(3)}
                </p>
                <p className="text-white">
                  {getSimplifiedTime(data.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col mt-12 gap-2 items-center">
              <Image src={"/nodata.png"} width={80} height={60} alt="nodata" />
              <p className="text-sm text-[#939393]">{t("noDataAvailable")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
