import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

export const SecurityEmpower = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const securityEmpowerData = [
    {
      image: "/dao/contract.png",
      title: t("smartContracts"),
      desc: t("smartContractsDesc"),
    },
    {
      image: "/dao/lock.png",
      title: t("timelocks"),
      desc: t("timelocksDesc"),
    },
    {
      image: "/dao/wallet.png",
      title: t("multiSigWallet"),
      desc: t("multiSigWalletDesc"),
    },
  ];
  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md mt-12">
      <div className="w-full flex flex-col mt-24">
        <div className="flex gap-2">
          <div>
            <Image src={"/dao/cor.png"} width={36} height={26} alt="logo" />
          </div>
          <p className="bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent font-bold">
            {t("securityEmpowermentDesc1")}
          </p>
        </div>
        <p className="text-5xl font-bold text-white mt-16">{t("uZXToken")}</p>
        <p className="font-bold text-white my-6">
          {t("securityEmpowermentDesc2")}
        </p>
        <p className="text-5xl text-center font-bold bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent my-24">
          {t("securityEmpowerment")}
        </p>
        <div className="self-center grid grid-cols-3 gap-8">
          {securityEmpowerData.map((data, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-center text-center py-12 px-8 gap-12 rounded-xl bg-mainblack border border-hoverblack"
            >
              <Image src={data.image} width={66} height={66} alt="image" />
              <p className="text-white font-bold text-2xl">{data.title}</p>
              <p className="text-white text-sm">{data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
