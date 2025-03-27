"use client";

import WithdrawStep from "./withdrawStep";
import WithdrawPanel from "./withdrawPanel";
import { useLanguage } from "../../../context/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full flex flex-col gap-12 my-12">
          <p className="text-3xl font-bold">Withdraw</p>
          <WithdrawStep />
          <WithdrawPanel />
        </div>
      </div>
    </div>
  );
}
