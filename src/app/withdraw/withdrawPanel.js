import { Spinner, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { getWithdrawHistory } from "../api/token";
import { getSimplifiedAddress, getSimplifiedDateTime } from "../helper";
import { BsArrowRepeat } from "react-icons/bs";
import LoadingScreen from "../components/loading";

export default function WithdrawPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawHistory, setWithdrawHistory] = useState(null);
  const { t } = useLanguage();

  const fetchWithdrawHistory = async () => {
    setIsLoading(true);
    let result = await getWithdrawHistory();
    if (result) {
      setWithdrawHistory(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWithdrawHistory();
  }, []);
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between item-end pr-12">
        <Typography variant="h5" color="blue-gray">
          {t("recording")}
        </Typography>
        <button onClick={() => fetchWithdrawHistory()}>
          <BsArrowRepeat className="text-2xl hover:rotate-180 duration-300 text-blue1" />
        </button>
      </div>
      <div className="w-full md:overflow-hidden overflow-x-scroll">
        <div className="w-[1000px] grid grid-cols-6 mt-4">
          <p className="text-sm text-hoverblack">{t("arrivalTime")}</p>
          <p className="text-sm text-hoverblack">{t("crypto")}</p>
          <p className="text-sm text-hoverblack">{t("networkProtocol")}</p>
          <p className="text-sm text-hoverblack">{t("withdrawAddress")}</p>
          <p className="text-sm text-hoverblack">{t("amount")}</p>
          <p className="text-sm text-hoverblack">{t("status")}</p>
        </div>
        <div className="w-[1000px] flex justify-center items-center h-[300px] overflow-auto">
          {isLoading ? (
            <div className="w-full bg-gray-200 h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : withdrawHistory ? (
            <div className="w-full h-full py-12 flex flex-col gap-4 items-center">
              {withdrawHistory.map((item, index) => (
                <div key={index} className="w-full grid grid-cols-6">
                  <p className="text-sm text-hoverblack">
                    {getSimplifiedDateTime(item.createdAt)}
                  </p>
                  <p className="text-sm text-hoverblack">
                    {item.token.toUpperCase()}
                  </p>
                  <p className="text-sm text-hoverblack">{item.network}</p>
                  <p className="text-sm text-hoverblack">
                    {getSimplifiedAddress(item.address)}
                  </p>
                  <p className="text-sm text-hoverblack">{item.amount}</p>
                  <p className="text-sm text-hoverblack">{item.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={"/recharge/nodata.png"}
                width={90}
                height={60}
                alt="nodata"
              />
              <p className="text-[13px] text-hoverblack">
                {t("noDataAvailable")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
