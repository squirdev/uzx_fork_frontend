import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "../loading";

export default function LoginLeftPanel() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  return (
    <div className="w-2/5 h-auto py-24 relative bg-black md:flex hidden flex-col items-center justify-center">
      <p className="text-5xl font-bold bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent">
        {t("welcomeMessage")}
      </p>
      <p className="text-hoverblack text-2xl">{t("journey")}</p>
      <Image
        src={"/login.png"}
        className="-mt-12"
        width={420}
        height={600}
        alt="login"
      />
    </div>
  );
}
