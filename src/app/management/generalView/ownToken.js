import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import { getProfile } from "@/app/api/profile";
import { SwapTokenList } from "@/constants/supportCryptoInfo";

export default function OwnToken() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [showTokenList, setShowTokenList] = useState(SwapTokenList);

  const fetchUserProfile = async () => {
    let result = await getProfile();
    if (result) setBalanceInfo(result.user);
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
      <div className="w-full flex justify-between items-center mt-4 font-bold px-4">
        <p>{t("crypto")}</p>
        <p>{t("amount")}</p>
      </div>
      <div className="mt-4 w-full flex flex-col overflow-y-auto max-h-96 px-4">
        {showTokenList.map((data, index) => {
          if (
            balanceInfo &&
            balanceInfo[data.toLowerCase()] &&
            balanceInfo[data.toLowerCase()] != 0
          )
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center py-2"
              >
                <p>{data}</p>
                <p>
                  {balanceInfo &&
                    balanceInfo[data.toLowerCase()] &&
                    balanceInfo[data.toLowerCase()].toFixed(2)}
                </p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
