import Image from "next/image";
import { useLanguage } from "../../context/LanguageProvider";
import Link from "next/link";
import LoadingScreen from "./components/loading";

const ExplorePanel = () => {
  const { t } = useLanguage();

  if (!t) return <LoadingScreen />;

  return (
    <div className="w-full bg-mainblack py-12">
      <div className="brands container mx-auto overflow-hidden drop-shadow-md">
        <div className="flex items-center justify-center my-9">
          <div className="w-1/2 flex flex-col items-center gap-6 bg-[url('/explore_back.png')]">
            <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent">
              {t("exploreUZXUniverse")}
            </p>
            <Link
              href="/recharge"
              className="mt-9 rounded-full bg-gradient-to-r from-blue1 to-blue2 p-[1px]"
            >
              <div className="w-full h-full rounded-full bg-black text-center px-16 py-3">
                <span className="text-white font-bold">{t("deposit")}</span>
              </div>
            </Link>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <Image
              src={"/explore.png"}
              width={300}
              height={300}
              alt="explore"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePanel;
