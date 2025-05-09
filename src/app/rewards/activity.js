import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import Link from "next/link";
import LoadingScreen from "../components/loading";

export const Activity = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16 md:px-0 px-2">
      <p className="text-4xl font-bold">{t("activity")}</p>
      <div className="md:w-1/2 w-full my-6 rounded-md p-4 flex items-end justify-between gap-4 border border-black">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">{t("singleDeposit")}</p>
          <p className="text-hoverblack text-sm">{t("singleDepositDesc")}</p>
          <Link
            href="/recharge"
            className="self-start px-8 bg-gradient-to-r from-blue1 to-blue2 py-2 rounded-full text-sm font-bold"
          >
            {t("proceedDeposit")}
          </Link>
        </div>
        <Image src="/rewards/events.png" width={108} height={108} alt="event" />
      </div>
    </div>
  );
};
