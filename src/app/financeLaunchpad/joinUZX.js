import Link from "next/link";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function JoinUZX() {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  return (
    <div className="bg-white brands container mx-auto my-16">
      <div className="w-full rounded-xl flex flex-col text-center py-24 bg-no-repeat bg-cover bg-center items-center justify-center gap-8 bg-[url('/launch/joinback.png')]">
        <p className="text-5xl font-bold">{t("joinUzx")}</p>
        <p className="w-2/3">{t("joinUzxDesc")}</p>
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSfbHQYcmIoor5n1i6XbOqrYxVk7Iv-HnH3sch_8nRsDk6DbTA/viewform"
          className="bg-white rounded-full py-3 px-12 mt-8"
        >
          <span className="text-blue1 text-md">{t("applyNow")}</span>
        </Link>
      </div>
    </div>
  );
}
