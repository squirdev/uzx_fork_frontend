import Image from "next/image";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

const RequiredForBegineer = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const requiredData = [
    {
      image: "/required_eth.png",
      text: t("etherumTrendStatus"),
      date: "2025-02-18",
    },
    {
      image: "/required_class.png",
      text: t("classOfBlock"),
      date: "2025-02-12",
    },
    {
      image: "/required_mis.png",
      text: t("misunderstandingAboutBitcoin"),
      date: "2025-02-07",
    },
  ];
  return (
    <div className="brands container mx-auto my-12 overflow-hidden drop-shadow-md">
      <div className="w-full flex justify-between items-center">
        <p className="text-white font-bold text-4xl my-12">
          {t("requiredForBeginner")}
        </p>
        <button className="flex items-center gap-2">
          <span className="text-blue1">{t("showMore")}</span>
          <AiOutlineDoubleRight className="text-blue1" />
        </button>
      </div>
      <div className="w-full grid grid-cols-3 items-center gap-12">
        {requiredData.map((data, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <Image src={data.image} width={374} height={210} alt="img" />
            <p className="text-white font-bold">{data.text}</p>
            <p className="text-hoverblack text-sm">{data.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredForBegineer;
