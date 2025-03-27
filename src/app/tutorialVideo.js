import { useLanguage } from "../../context/LanguageProvider";

export default function TutorialVideoPanel() {
  const { t } = useLanguage();

  if (!t) return <p className="text-white">Loading translations...</p>;

  const tutorialVideoData = [
    {
      title: t("secondsTrading"),
      url: "/video/video1.mp4",
    },
    {
      title: t("whatContractTrading"),
      url: "/video/video2.mp4",
    },
    {
      title: t("optionsContractTrading"),
      url: "/video/video3.mp4",
    },
  ];
  return (
    <div className="brands container mx-auto overflow-hidden  drop-shadow-md my-12 mb-36">
      <div className="w-full">
        <p className="text-xl text-center text-white mt-16">
          {t("watchTutorials")}
        </p>
        <div className="w-full gap-6 mt-12 grid grid-cols-3">
          {tutorialVideoData.map((data, index) => (
            <div key={index} className="w-full flex flex-col">
              <video
                autoPlay
                muted
                loop
                controls
                width="640"
                height="360"
                className="lazyload"
              >
                <source src={data.url} type="video/mp4" />
              </video>
              <p className="text-white text-xl font-bold mt-4">{data.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
