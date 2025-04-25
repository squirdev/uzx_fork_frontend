"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

export default function Home() {
  const { t, locale } = useLanguage();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/about/lawEnforce/${locale}.txt`)
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, [t, locale]);

  if (!content) return <p>Loading…</p>;

  if (!t) return <LoadingScreen />;

  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full my-12">
          <p className="text-4xl font-bold">{t("lawEnforcement")}</p>
          <p className="text-[12px] text-[#666] my-2">{t("publishedOnData")}</p>
          <p className="whitespace-pre-wrap text-[#111] font-transparent text-sm">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
