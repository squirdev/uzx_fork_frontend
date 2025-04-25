import Image from "next/image";
import { useEffect, useState } from "react";
import { getSimplifiedDateTime } from "@/app/helper";
import { getDepositHistory } from "@/app/api/token";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

const DepositRecord = () => {
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
      <div className="w-full grid grid-cols-3 mt-4">
        <p className="text-sm text-hoverblack">{t("crypto")}</p>
        <p className="text-sm text-hoverblack">{t("depositAmount")}</p>
        <p className="text-sm text-hoverblack">{t("time")}</p>
      </div>
      <div className="w-full mt-6 flex flex-col justify-center items-center max-h-[400px] overflow-y-auto gap-4">
        {depositHistory ? (
          depositHistory.map((data, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-3 font-bold text-sm"
            >
              <p>{data.token.toUpperCase()}</p>
              <p>{data.amount}</p>
              <p>{getSimplifiedDateTime(data.createdAt)}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Image
              src={"/management/nodata.png"}
              width={80}
              height={60}
              alt="nodata"
            />
            <p className="text-sm text-hoverblack">{t("noDataAvailable")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositRecord;
