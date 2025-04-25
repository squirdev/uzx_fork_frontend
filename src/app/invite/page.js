"use client";

import Image from "next/image";
import { CryptoBlindBox } from "./cryptoBlindBox";
import { UserInviteEarn } from "./inviteEarn";
import { GetCommission } from "./getCommission";
import { PromotionTools } from "./promotionTools";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function Home() {
  const inviteLink = "https://www.uzxkr.com/#/register?code=SPAA";
  const inviteCode = "SPAA";

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <div className="brands container mx-auto my-8 overflow-hidden drop-shadow-md">
        <div className="w-full flex items-center mt-9">
          <div className="w-3/4 flex flex-col items-start gap-6 ">
            <p className="text-5xl font-bold text-white">{t("inviteHeader")}</p>
            <p className="text-white text-lg">{t("inviteFriends")}</p>
            <div className="w-[500px] flex flex-col gap-4 my-8">
              <div className="w-full rounded-md bg-white text-sm px-2 py-2 gap-2 flex justify-between items-center">
                <div className="flex items-center gap-4 px-3">
                  <p>{t("inviteLink")}</p>
                  <p>{inviteLink}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(inviteLink)}
                  className="bg-gradient-to-r from-blue1 to-blue2 px-2 py-[2px] rounded-md"
                >
                  {t("copy")}
                </button>
              </div>
              <div className="w-full rounded-md bg-white text-sm px-2 py-2 gap-2 flex justify-between items-center">
                <div className="flex items-center gap-4 px-3">
                  <p>{t("inviteCode")}</p>
                  <p>{inviteCode}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(inviteCode)}
                  className="bg-gradient-to-r from-blue1 to-blue2 px-2 py-[2px] rounded-md"
                >
                  {t("copy")}
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex items-center justify-center">
            <Image src={"/partner/group.png"} width={465} height={287} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-9 bg-white">
        <CryptoBlindBox />
        <UserInviteEarn />
        <GetCommission />
        <PromotionTools />
      </div>
    </div>
  );
}
