"use client";

import Image from "next/image";
import { PartialRightPanel } from "./partialright";
import { TokenRoadMap } from "./tokenRoadMap";
import { SecurityEmpower } from "./securityEmpower";
import { VotingElection } from "./votingElection";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content md:px-0 px-2">
      <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
        <div className="w-full flex md:flex-row flex-col-reverse items-center mt-24">
          <div className="md:w-2/3 w-full flex flex-col items-start gap-6 ">
            <p className="text-6xl font-black bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent">
              {t("welcomeUZXOpenGov")}
            </p>
            <p className="text-[#939393] text-2xl">
              {t("welcomeUZXOpenGovDesc")}
            </p>
            <div className="flex items-center gap-2 mt-12">
              <Image src={"/dec.png"} width={24} height={18} alt="part" />
              <p className="text-white text-xl font-bold">
                {t("claimGovernToken")}
              </p>
              <Image src={"/dec.png"} width={24} height={18} alt="part" />
            </div>
          </div>
          <div className="md:w-1/3 w-full flex items-center justify-center">
            <Image src={"/dao.png"} width={450} height={300} alt="part" />
          </div>
        </div>
      </div>
      <PartialRightPanel />
      <TokenRoadMap />
      <SecurityEmpower />
      <VotingElection />
    </div>
  );
}
