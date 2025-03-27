"use client";

import { useLanguage } from "../../../context/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full my-12">
          <p className="text-4xl font-bold">{t("disclaimer")}</p>
          <p className="text-[12px] text-[#666] my-2">{t("publishedOnData")}</p>
          <p className="text-[#111] whitespace-pre-line text-sm leading-loose">
            {t("riskWarning")}
            <br />
            {t("riskWarningDescription1")}
            <br />
            {t("riskWarningDescription2")}
            <br />
            {t("riskWarningDescription3")}
            <br />
            {t("legalDisclaimer")}
            <br />
            {t("legalDisclaimerDescription1")}
            <br />
            {t("legalDisclaimerDescription2")}
            <br />
            {t("legalDisclaimerDescription21")}
            <br />
            {t("legalDisclaimerDescription211")}
            <br />
            {t("legalDisclaimerDescription212")}
            <br />
            {t("legalDisclaimerDescription213")}
            <br />
            {t("legalDisclaimerDescription214")}
            <br />
            {t("legalDisclaimerDescription215")}
            <br />
            {t("legalDisclaimerDescription216")}
            <br />
            {t("legalDisclaimerDescription217")}
            <br />
            {t("legalDisclaimerDescription22")}
            <br />
            a.{t("legalDisclaimerDescription221")}
            <br />
            b.{t("legalDisclaimerDescription222")}
            <br />
            c.{t("legalDisclaimerDescription223")}
            <br />
            d.{t("legalDisclaimerDescription224")}
            <br />
            e.{t("legalDisclaimerDescription225")}
            <br />
            f.{t("legalDisclaimerDescription226")}
            <br />
            g.{t("legalDisclaimerDescription227")}
            <br />
            h.{t("legalDisclaimerDescription228")}
            <br />
            i.{t("legalDisclaimerDescription229")}
          </p>
        </div>
      </div>
    </div>
  );
}
