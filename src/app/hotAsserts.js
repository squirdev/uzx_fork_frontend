import { useEffect, useState } from "react";
import HotAssertItem from "./components/hotAssertItem";
import { getTokenData } from "./components/tokenInformation";
import { useLanguage } from "../../context/LanguageProvider";
import { getTokenList } from "./api/token";
import LoadingScreen from "./components/loading";

const HotAssertsPanel = () => {
  const { t } = useLanguage();
  const [coinDetail, setCoinDetail] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [finalCoinDetail, setFinalCoinDetail] = useState(null);

  if (!t) return <LoadingScreen />;

  const fetchTokenProfits = async () => {
    const info = await getTokenList();
    setTokenInfo(info.data);
  };

  const fetchTokenData = async () => {
    const bitcoin = await getTokenData();
    setCoinDetail(bitcoin);
  };

  useEffect(() => {
    fetchTokenData();
    fetchTokenProfits();
  }, []);

  useEffect(() => {
    if (tokenInfo && coinDetail) {
      let updatedCoinDetail = {};

      for (const key in coinDetail) {
        updatedCoinDetail[key] = { ...coinDetail[key] };
      }
      for (let i = 0; i < tokenInfo.length; i++) {
        const tokenName = tokenInfo[i].name;
        const tokenProfit = tokenInfo[i].profit;
        const currentUSD = coinDetail[tokenName]?.current_price;
        if (currentUSD != null) {
          updatedCoinDetail[tokenName].current_price =
            (currentUSD * (100 + tokenProfit)) / 100;
        }
      }

      const arr = Object.entries(updatedCoinDetail).map(([name, values]) => ({
        name,
        ...values,
      }));

      const sorted = arr
        .filter((item) => item.usd_24h_change !== null)
        .sort((a, b) => b.usd_24h_change - a.usd_24h_change);

      const third = Math.ceil(sorted.length / 3);
      const part1 = sorted.slice(0, third);
      const part2 = sorted.slice(third, third * 2);
      const part3 = sorted.slice(third * 2);

      setFinalCoinDetail([part1, part2, part3]);
    }
  }, [coinDetail, tokenInfo]);

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md mt-12">
      <div className="w-full">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  my-16">
          {t("hotAssert")}
        </p>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-8">
          {finalCoinDetail &&
            finalCoinDetail.map((data, index) => (
              <HotAssertItem itemData={data} key={index} subIndex={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HotAssertsPanel;
