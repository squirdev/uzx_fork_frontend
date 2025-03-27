import Image from "next/image";
import { RewardsPanel } from "./rewardsTabs";
import { useLanguage } from "../../../context/LanguageProvider";

export const MyRewards = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full brands container mx-auto my-2 overflow-hidden">
      <div className="w-full flex items-end justify-between">
        <p className="text-4xl font-bold">{t("myRewards")}</p>
        <a href="#" className="text-hoverblack">
          {t("myRewardsDesc")} &gt;
        </a>
      </div>
      <div className="w-full my-6">
        <RewardsPanel />
      </div>
    </div>
  );
};
