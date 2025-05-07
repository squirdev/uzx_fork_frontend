import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const PartialRightPanel = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const partialRightData = [
    {
      image: "/dao/proposal.png",
      title: t("rightToProposals"),
      desc: t("rightToProposalsDesc"),
    },
    {
      image: "/dao/voting.png",
      title: t("votingRights"),
      desc: t("votingRightsDesc"),
    },
    {
      image: "/dao/vip.png",
      title: t("vIPTradingRights"),
      desc: t("vIPTradingRightsDesc"),
    },
    {
      image: "/dao/sharing.png",
      title: t("profitSharingRights"),
      desc: t("profitSharingRightsDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md mt-12">
      <div className="w-full flex flex-col mt-24">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  my-16">
          {t("uZXPartialRights")}
        </p>
        <div className="self-center grid md:grid-cols-2 grid-cols-1 gap-12">
          {partialRightData.map((data, index) => (
            <div key={index} className="w-full flex gap-7">
              <div className="w-[112px] h-auto">
                <Image src={data.image} width={112} height={112} alt="logo" />
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <p className="text-white font-bold text-xl">{data.title}</p>
                <p className="text-[#939393] text-sm">{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
