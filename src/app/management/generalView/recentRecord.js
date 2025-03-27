import Link from "next/link";
import { useState } from "react";
import DepositRecord from "./depositRecord";
import { useLanguage } from "../../../../context/LanguageProvider";
import WithdrawRecord from "./withDrawRecord";

export default function RecentRecord() {
  const [depositShow, setDepositShow] = useState(false);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full border border-black rounded-md p-4">
      <div className="w-full flex justify-between items-end">
        <p className="text-2xl font-bold">{t("recentRecords")}</p>
        <Link href={"/recharge"} className="text-blue1">
          {t("viewAll")}
        </Link>
      </div>
      <div className="flex gap-2 my-3">
        <button
          onClick={() => setDepositShow(true)}
          className={`${depositShow ? "border-b border-black" : "text-hoverblack"} `}
        >
          {t("deposit")}
        </button>
        <button
          onClick={() => setDepositShow(false)}
          className={`${!depositShow ? "border-b border-black" : "text-hoverblack"} `}
        >
          {t("withdraw")}
        </button>
      </div>
      {depositShow ? <DepositRecord /> : <WithdrawRecord />}
    </div>
  );
}
