import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

const IssueSupport = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full bg-mainblack">
      <div className="brands container mx-auto overflow-hidden drop-shadow-md">
        <div className="flex relative flex-col items-center justify-center py-32">
          <Image
            src={"/issue_back1.png"}
            width={148}
            height={104}
            className="absolute top-0 right-0"
            alt="img"
          />
          <Image
            src={"/issue_back2.png"}
            width={148}
            height={104}
            className="absolute bottom-0 left-0"
            alt="img"
          />
          <div className="flex flex-col items-center gap-16 justify-between">
            <p className="text-white font-bold text-4xl">
              {t("yourIssuenotResolve")}
            </p>
            <button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full py-3 px-24 font-bold">
              {t("toSupport")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueSupport;
