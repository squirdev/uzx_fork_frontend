import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { getDepositHistory } from "../api/token";
import { getSimplifiedAddress, getSimplifiedDateTime } from "../helper";
import LoadingScreen from "@/app/components/loading";

export default function DepositPanel() {
  const [depositHistory, setDepositHistory] = useState(null);
  const { t } = useLanguage();

  const fetchRepositHistory = async () => {
    let result = await getDepositHistory();
    if (result) {
      setDepositHistory(result.data);
    }
  };

  useEffect(() => {
    fetchRepositHistory();
  }, []);
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full flex flex-col">
      <Typography variant="h5" color="blue-gray">
        {t("recording")}
      </Typography>
      <div className="w-full md:overflow-hidden overflow-x-scroll">
        <div className="w-[1000px] grid grid-cols-6 mt-4">
          <p className="text-sm text-hoverblack">{t("arrivalTime")}</p>
          <p className="text-sm text-hoverblack">{t("crypto")}</p>
          <p className="text-sm text-hoverblack">{t("networkProtocol")}</p>
          <p className="text-sm text-hoverblack">{t("depositAddress")}</p>
          <p className="text-sm text-hoverblack">{t("amount")}</p>
          <p className="text-sm text-hoverblack">{t("status")}</p>
        </div>
        <div className="w-[1000px] flex justify-center items-center h-[300px] overflow-auto">
          {depositHistory && depositHistory.length !== 0 ? (
            <div className="w-full h-full py-12 flex flex-col gap-4 items-center">
              {depositHistory.map((item, index) => (
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
                  <p className="text-sm text-hoverblack font-bold">
                    {item.status.toUpperCase()}
                  </p>
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
