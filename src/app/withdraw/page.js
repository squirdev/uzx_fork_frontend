"use client";

import WithdrawStep from "./withdrawStep";
import WithdrawPanel from "./withdrawPanel";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content bg-white md:px-0 px-4">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full flex flex-col gap-12 my-12">
          <p className="text-3xl font-bold">{t("withdraw")}</p>
          <WithdrawStep />
          <WithdrawPanel />
        </div>
      </div>
    </div>
  );
}
