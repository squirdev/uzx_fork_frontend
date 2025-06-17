"use client";

import { useState } from "react";
import DetailsPanel from "./DetailsPanel";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

export default function Home() {
  const [isOverView, setIsOverView] = useState(false);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content bg-white  md:px-0 px-2">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full my-12">
          <div className="flex items-center gap-6">
            <p className="text-3xl font-bold">{t("uZXRanking")}</p>
            <div className="rounded-md text-sm p-1">
              <button
                onClick={() => setIsOverView(true)}
                className={`p-2 rounded-md ${isOverView ? "text-white bg-black" : "text-black bg-inherit"}`}
              >
                {t("overview")}
              </button>
              <button
                onClick={() => setIsOverView(false)}
                className={`p-2 rounded-md ${isOverView ? "text-black bg-inherit" : "text-white bg-black"}`}
              >
                {t("details")}
              </button>
            </div>
          </div>

          <DetailsPanel />
        </div>
      </div>
    </div>
  );
}
