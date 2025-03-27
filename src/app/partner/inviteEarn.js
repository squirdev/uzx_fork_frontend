import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";

const invitePrice = [
  {
    count: 30,
    price: 708,
  },
  {
    count: 60,
    price: 1933,
  },
  {
    count: 90,
    price: 3676,
  },
  {
    count: 120,
    price: 5937,
  },
  {
    count: 150,
    price: 8713,
  },
  {
    count: 180,
    price: 12007,
  },
];

export const UserInviteEarn = () => {
  const [activeUserCnt, setActiveUserCnt] = useState(0);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <div className="w-full flex justify-center items-center text-center gap-2">
        <Image src={"/partner/money.png"} width={24} height={18} alt="cor" />
        <p className="text-3xl font-bold">{t("howMuchCanEarn")}</p>
      </div>
      <p className="font-bold text-center my-8">
        {t("howMuchCanEarn")}
      </p>
      <div className="flex justify-center gap-4 items-center">
        {invitePrice.map((data, index) => (
          <button
            key={index}
            onClick={() => setActiveUserCnt(index)}
            className={`w-16 h-8 text-center text-sm rounded-md ${index == activeUserCnt ? "bg-gradient-to-r from-blue1 to-blue2" : "border border-black"}`}
          >
            {data.count}
          </button>
        ))}
      </div>
      <p className="text-sm text-center mt-8">{t("commissionAvailable")}</p>
      <div className="flex justify-center items-end mt-1 mb-8">
        <p className="font-bold text-4xl">
          ≈{invitePrice[activeUserCnt].price}
        </p>
        <p>USDT</p>
      </div>
    </div>
  );
};
