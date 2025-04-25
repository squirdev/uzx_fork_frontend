"use client";

import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function HeaderPanel() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
      <div className="w-full">
        <div className="brands container mx-auto overflow-hidden drop-shadow-md">
          <div className="w-full flex flex-col items-center">
            <div className="w-2/3 flex relative flex-col items-center justify-center py-24">
              <Image
                src={"/issue_back1.png"}
                width={148}
                height={104}
                className="absolute top-0 right-0"
                alt="img"
              />
              <Image
                src={"/issue_back2.png"}
                width={148}
                height={104}
                className="absolute bottom-0 left-0"
                alt="img"
              />
              <div className="flex flex-col items-center justify-between">
                <p className="text-white font-bold text-4xl">
                  {t("contactUS")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
