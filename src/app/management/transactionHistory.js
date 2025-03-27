import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageProvider";

export default function TransactionHistory() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-end">
        <p className="text-3xl font-bold">{t("transactionHistory")}</p>
        <Link href="#" className="text-blue1">
          {t("viewAll")}
        </Link>
      </div>
      <div className="w-full mt-6 flex flex-col">
        <div className="w-full flex items-center justify-between text-sm">
          <p className="text-hoverblack">{t("crypto")}</p>
          <p className="text-hoverblack">{t("type")}</p>
          <p className="text-hoverblack">{t("amount")}</p>
          <p className="text-hoverblack">{t("tradingTime")}</p>
        </div>
        <div className="w-full flex justify-center items-center h-[300px] overflow-auto">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/management/nodata.png"}
              width={80}
              height={60}
              alt="no data"
            />
            <p className="text-sm text-hoverblack">{t("noData")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
