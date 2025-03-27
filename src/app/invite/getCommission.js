import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

export const GetCommission = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <p className="text-5xl text-center font-bold">
        {t("inviteFriendsGetComm")}
      </p>
      <div className="w-full flex justify-between items-center gap-24">
        <div className="flex-1 my-12 flex flex-col gap-4">
          <p>{t("inviteFriendsGetCommDesc1")}</p>
          <p>{t("inviteFriendsGetCommDesc2")}</p>
          <p>{t("inviteFriendsGetCommDesc3")}</p>
        </div>
        <div className="w-[210px] h-[166px]">
          <Image
            src={"/invite/wallet.png"}
            width={210}
            height={166}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};
