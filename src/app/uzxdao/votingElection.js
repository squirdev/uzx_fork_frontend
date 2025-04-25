import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const VotingElection = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const votingElectionData = [
    {
      title: t("decisionMakingSystem"),
      desc: t("decisionMakingSystemDesc"),
    },
    {
      title: t("representativeTenure"),
      desc: t("representativeTenureDesc"),
    },
    {
      title: t("eligiCandiSelection"),
      desc: t("eligiCandiSelectionDesc"),
    },
    {
      title: t("proposalSystem"),
      desc: t("proposalSystemDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
      <div className="w-full flex flex-col mt-24">
        <p className="text-5xl text-center font-bold bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent my-12">
          {t("votingElection")}
        </p>
        <div className="flex items-center gap-6">
          <div className="w-auto h-auto">
            <Image
              src={"/dao/decision.png"}
              width={60}
              height={60}
              alt="image"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-white font-bold text-xl">
              {t("tokenHoldersDecisions")}
            </p>
            <p className="text-white">{t("tokenHoldersDecisionsDesc")}</p>
          </div>
        </div>
        <ul className="self-center grid grid-cols-2 gap-4 mt-24">
          {votingElectionData.map((data, index) => (
            <li key={index} className="w-full flex flex-col py-4 px-4 gap-4">
              <p className="text-white font-bold text-2xl">{data.title}</p>
              <p className="text-white text-sm">{data.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
