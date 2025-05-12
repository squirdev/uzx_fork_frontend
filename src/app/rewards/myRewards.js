import Image from "next/image";
import { RewardsPanel } from "./rewardsTabs";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const MyRewards = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full brands container mx-auto my-2 overflow-hidden md:px-0 px-4">
      <div className="w-full flex items-end justify-between">
        <p className="md:text-4xl font-bold text-xl">{t("myRewards")}</p>
        {/* <a href="#" className="text-hoverblack">
          {t("myRewardsDesc")} &gt;
        </a> */}
      </div>
      <div className="w-full my-6">
        <RewardsPanel />
      </div>
    </div>
  );
};
