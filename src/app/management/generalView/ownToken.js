import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import { getBalanceDetail } from "@/app/api/profile";
import { SwapTokenList } from "@/constants/supportCryptoInfo";

export default function OwnToken() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [showTokenList, setShowTokenList] = useState(SwapTokenList);

  const fetchUserProfile = async () => {
    let result = await getBalanceDetail();
    console.log("DETAIL_BALANCE:", result);
    if (result) setBalanceInfo(result.data);
  };

  useEffect(() => {
    fetchUserProfile();
    setShowTokenList((prevList) => [...prevList, "USDT", "USDC"]);
  }, []);

  return (
    <div className="w-full border border-black rounded-md p-4">
      <div className="w-full flex justify-between items-end">
        <p className="text-2xl font-bold">{t("ownedTokens")}</p>
      </div>
      <div className="w-full grid grid-cols-3 mt-4 font-bold px-4">
        <p>{t("crypto")}</p>
        <p>{t("amount")}</p>
        <p className="text-end">USDT {t("amount")}</p>
      </div>
      <div className="mt-4 w-full flex flex-col overflow-y-auto max-h-96 px-4">
        {balanceInfo?.map((data, index) => {
          if (data.tokenBalance)
            return (
              <div
                key={index}
                className="w-full grid grid-cols-3 text-sm font-bold items-center py-2"
              >
                <p>{data.name?.toUpperCase()}</p>
                <p>
                  {data.tokenBalance?.toFixed(2)}
                  {data.name?.toUpperCase()}
                </p>
                <p className="text-end">{data.usdtBalance?.toFixed(2)}USDT</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
