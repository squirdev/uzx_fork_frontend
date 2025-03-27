"use client";

import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import OnlineProject from "./onlineProject";
import JoinUZX from "./joinUZX";
import CommonProblem from "./commonProblem";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="content">
      <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
        <div className="w-full flex justify-between items-center mt-24">
          <div className="w-1/2 flex flex-col items-start gap-6 ">
            <p className="text-5xl font-black text-white">{t("launchpad")}</p>
            <p className="text-[#939393] text-xl">{t("launchpadDesc")}</p>
            <div className="flex items-center gap-2 mt-12">
              <Link
                href="/management"
                className="rounded-full bg-gradient-to-r from-blue1 to-blue2 py-4 px-8"
              >
                <span className="text-black text-lg font-bold">
                  {t("lookAsset")}
                </span>
              </Link>
            </div>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <Image
              src={"/launch/logo.png"}
              width={300}
              height={300}
              alt="part"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex flex-col">
        <OnlineProject />
        <JoinUZX />
        <CommonProblem />
      </div>
    </div>
  );
}
