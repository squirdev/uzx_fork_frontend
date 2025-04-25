"use client";

import { useLanguage } from "../../../context/LanguageProvider";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmailVerify from "./emailVerify";
import GoogleVerify from "./googleVerify";
import LoginPassword from "./loginPassword";
import FundPassword from "./fundPassword";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const searchParams = useSearchParams();
  const classify = searchParams.get("classify");

  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-8">
        <div className="w-full flex flex-col items-start mt-9 py-8">
          <Breadcrumbs>
            <Link href="/management" className="opacity-60">
              {t("safety")}
            </Link>
            <p className="opacity-60">
              {classify == 1 && t("emailVerify")}
              {classify == 2 && t("googleVerification")}
              {classify == 3 && t("changeLoginPassword")}
              {classify == 4 && t("setFundPassword")}
            </p>
          </Breadcrumbs>
          {classify == 1 && <EmailVerify />}
          {classify == 2 && <GoogleVerify />}
          {classify == 3 && <LoginPassword />}
          {classify == 4 && <FundPassword />}
        </div>
      </div>
    </div>
  );
}
