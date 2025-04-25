import Image from "next/image";
import { useLanguage } from "../../context/LanguageProvider";
import LoadingScreen from "./components/loading";

const EnhancedTradingPanel = () => {
  const { t } = useLanguage();

  if (!t) return <LoadingScreen />;

  const enhancedTradingData = [
    {
      icon: "/security.png",
      title: t("security"),
      description: t("securityDescription"),
    },
    {
      icon: "/24service.png",
      title: t("24hService"),
      description: t("24hServiceDescription"),
    },
    {
      icon: "/globalExchange.png",
      title: t("globalExchange"),
      description: t("globalExchangeDescription"),
    },
    {
      icon: "/superProject.png",
      title: t("superiorProject"),
      description: t("superiorProjectDescription"),
    },
  ];

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md my-12">
      <div className="w-full">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  mt-16">
          {t("enhancedTradingExperience")}
        </p>
        <p className="text-5xl font-black text-center text-blue2 mt-6">
          {t("assetProtection")}
        </p>
        <div className="flex w-full justify-between items-center gap-8 mt-12">
          {enhancedTradingData.map((data, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <Image src={data.icon} width={136} height={126} alt="security" />
              <p className="text-white font-bold text-2xl mt-2">{data.title}</p>
              <div className="bg-white w-8 h-1 rounded-full mt-4"></div>
              <p className="text-[#94959e] text-center px-6 mt-6">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTradingPanel;
