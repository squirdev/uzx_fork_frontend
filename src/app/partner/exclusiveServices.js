import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

export const ExclusiveServices = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const descData = [
    {
      image: "/partner/enjoy.png",
      title: t("oneExclusiveService"),
      desc: t("oneExclusiveServiceDesc"),
    },
    {
      image: "/partner/tracking.png",
      title: t("realTimeDataTracking"),
      desc: t("realTimeDataTrackingDesc"),
    },
    {
      image: "/partner/people.png",
      title: t("cooperationSituation"),
      desc: t("cooperationSituationDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <div className="w-full flex justify-center items-center text-center gap-2">
        <Image src={"/partner/cor.png"} width={24} height={18} alt="cor" />
        <p className="text-3xl font-bold">{t("enjoyExclusiveServices")}</p>
      </div>
      <div className="my-12 w-full grid grid-cols-3 gap-12">
        {descData.map((data, index) => (
          <div
            key={index}
            className="px-9 py-8 rounded-md border border-mainblack flex gap-5 flex-col items-center"
          >
            <Image src={data.image} width={28} height={28} alt="icon" />
            <p className="text-xl font-bold">{data.title}</p>
            <p className="text-sm">{data.desc}</p>
            <button className="border rounded-full border-black px-12 py-1">
              <span className="text-sm font-bold">{t("joinNow")}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
