import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function OnlineProject() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const onlineProjectData = [
    {
      image: "/launch/DOGE.png",
      title: "DOGE",
      desc: t("dogeDesc"),
    },
    {
      image: "/launch/LINK.png",
      title: "LINK",
      desc: t("linkDesc"),
    },
    {
      image: "/launch/AVAX.png",
      title: "AVAX",
      desc: t("avaxDesc"),
    },
    {
      image: "/launch/SOL.png",
      title: "SOL",
      desc: t("solDesc"),
    },
    {
      image: "/launch/DOT.png",
      title: "DOT",
      desc: t("dotDesc"),
    },
    {
      image: "/launch/ATMO.png",
      title: "ATMO",
      desc: t("atmoDesc"),
    },
  ];
  return (
    <div className="bg-white brands container mx-auto mt-16 md:py-0 py-2">
      <p className="text-4xl font-bold">{t("oneLineProject")}</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-2 mt-8">
        {onlineProjectData.map((data, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Image src={data.image} width={330} height={200} alt="image" />
            <p className="text-xl font-bold">{data.title}</p>
            <p className="text-[13px] text-hoverblack">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
