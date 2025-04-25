import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const UzxAdvantage = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const advantage = [
    {
      title: t("upLifetimeComm"),
      image: "/partner/lifetime.png",
      desc: t("upLifetimeCommDesc"),
    },
    {
      title: t("globalLeadTrading"),
      image: "/partner/leading.png",
      desc: t("globalLeadTradingDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <div className="w-full flex justify-center items-center text-center gap-2">
        <Image
          src={"/partner/cor_white.png"}
          width={24}
          height={18}
          alt="cor"
        />
        <p className="text-3xl text-white font-bold">{t("uZXAdvantages")}</p>
      </div>
      <div className="w-full grid grid-cols-2 gap-8 my-16">
        {advantage.map((data, index) => (
          <div
            key={index}
            className="border border-hoverblack rounded-md p-6 gap-12 flex justify-between items-center"
          >
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-xl text-white font-bold">{data.title}</p>
              <p className="text-sm text-white">{data.desc}</p>
            </div>
            <div className=" w-[120px] h-[145px]">
              <Image src={data.image} width={120} height={145} alt="image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
