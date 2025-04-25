import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

export default function ProofReserve() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="border border-hoverblack rounded-md flex items-center justify-between p-4 bg-gradient-to-r from-yellow1/10 to-white">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">{t("proofReserves")} &gt;</p>
        <p className="text-hoverblack text-sm">{t("proofReserves")}</p>
      </div>
      <Image
        src={"/management/reserve.png"}
        width={120}
        height={120}
        alt="image"
      />
    </div>
  );
}
