import { useLanguage } from "../../../context/LanguageProvider";
import TradingVideoItem from "../components/recharge/tradeVideo";

const TradingVideo = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

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
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
      <div className="w-full grid grid-cols-3 gap-12 mt-9">
        {tradeVideoData.map((data, index) => (
          <TradingVideoItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TradingVideo;
