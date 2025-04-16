import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";

const { Button } = require("@material-tailwind/react");
const { default: Image } = require("next/image");

export default function CurrentEquity({ userProfile }) {
  const { t } = useLanguage();
  const [userEquity, setUserEquity] = useState(0);

  useEffect(() => {
    setUserEquity(
      userProfile && userProfile.totalBalance ? userProfile.totalBalance : 0
    );
  }, [userProfile]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="border border-hoverblack rounded-md flex flex-col justify-between items-center gap-8 py-16 bg-gradient-to-r from-blue1/10 to-white">
      <Image src="/management/token.png" width={74} height={74} alt="image" />
      <p className="text-2xl font-bold">
        {t("yourCurrentEquity")}{" "}
        {userEquity.toFixed(3) + "USDT"}
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <Link href={"/recharge"}>
          <Button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full text-black px-12">
            {t("deposit")}
          </Button>
        </Link>
        <Link href={"/withdraw"}>
          <Button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full text-black px-12">
            {t("withdraw")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
