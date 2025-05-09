import { AiOutlineDoubleRight } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

const BlockchainGlossary = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const blockchainGlossaryData = [
    {
      header: "JUP",
      text: t("blockchainJUPDesc"),
    },
    {
      header: "CPO",
      text: t("blockchainCPODesc"),
    },
    {
      header: "MANTA",
      text: t("blockchainMANTADesc"),
    },
    {
      header: "UMA",
      text: t("blockchainUMADesc"),
    },
    {
      header: "POND",
      text: t("blockchainPONDDesc"),
    },
    {
      header: "STMX",
      text: t("blockchainSTMXDesc"),
    },
  ];

  return (
    <div className="brands container mx-auto mt-12 mb-32 overflow-hidden  drop-shadow-md">
      <div className="w-full flex justify-between items-center">
        <p className="text-white font-bold text-4xl my-12">
          {t("blockchainGlossary")}
        </p>
        <button className="flex items-center gap-2">
          <span className="text-blue1">{t("showMore")}</span>
          <AiOutlineDoubleRight className="text-blue1" />
        </button>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center gap-12">
        {blockchainGlossaryData.map((data, index) => (
          <div
            key={index}
            className="w-full h-full flex flex-col p-5 gap-6 bg-mainblack"
          >
            <p className="text-white font-bold text-2xl">{data.header}</p>
            <p className="text-sm text-white">{data.text.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainGlossary;
