"use client";

import Image from "next/image";
import { ExclusiveServices } from "./exclusiveServices";
import { UserInviteEarn } from "./inviteEarn";
import { UzxAdvantage } from "./advantage";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <div className="brands container mx-auto my-2 overflow-hidden drop-shadow-md">
        <div className="w-full flex items-center mt-9 md:flex-row flex-col-reverse">
          <div className="md:w-1/2 w-full flex flex-col items-start gap-6 ">
            <p className="text-5xl text-white">
              {t("affiliate")} <br />
              {t("becomePlatformPartner")}
            </p>
            <p className="text-white text-lg">
              {t("becomePlatformPartnerDesc")}
            </p>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <Image src={"/partner/group.png"} width={465} height={287} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-9 bg-white">
        <ExclusiveServices />
        <UserInviteEarn />
      </div>
      <div className="w-full flex flex-col items-center mt-9 bg-black">
        <UzxAdvantage />
      </div>
    </div>
  );
}
