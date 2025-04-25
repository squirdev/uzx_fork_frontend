import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const CryptoBlindBox = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const descData = [
    {
      image: "/invite/blind.png",
      title: t("referral"),
      desc: t("referralDesc"),
    },
    {
      image: "/invite/log.png",
      title: t("friendsLogIn"),
      desc: t("friendsLogInDesc"),
    },
    {
      image: "/invite/blind.png",
      title: t("recvBlindBox"),
      desc: t("recvBlindBoxDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <p className="text-5xl text-center font-bold">
        {t("howToReceiveCrypto")}
      </p>
      <div className="w-full my-8 grid grid-cols-3 gap-12">
        {descData.map((data, index) => (
          <div key={index} className="px-12 flex gap-5 flex-col items-center">
            <Image src={data.image} width={160} height={160} alt="icon" />
            <p className="text-xl font-bold mt-2">{data.title}</p>
            <p className="text-sm text-center text-hoverblack">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
