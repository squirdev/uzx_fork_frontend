import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";
import TradingVideoItem from "../components/recharge/tradeVideo";

const TradingVideo = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const tradeVideoData = [
    {
      title: "Recharge USDT",
      videoUrl: "/video/recharge.mp4",
      text: t("proceedDeposit"),
    },
    {
      title: "Spot Trading",
      videoUrl: "/video/spottrading.mp4",
      text: t("trade"),
    },
    {
      title: "USDⓈ-M",
      videoUrl: "/video/usdm.mp4",
      text: t("trade"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden drop-shadow-md">
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-12 mt-9">
        {tradeVideoData.map((data, index) => (
          <TradingVideoItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TradingVideo;
