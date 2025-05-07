import { useEffect, useState } from "react";
import HotAssertItem from "./components/hotAssertItem";
import { getTokenData, getTokenDataById } from "./components/tokenInformation";
import { useLanguage } from "../../context/LanguageProvider";
import { getTokenList, getTokenProfit } from "./api/token";
import LoadingScreen from "./components/loading";

const HotAssertItemData = [
  {
    icon: "/hot.png",
    title: "HotRank",
    data: [
      {
        coin: "XAUT USDT",
        image: "/usdt.jpg",
        price: 2954.7,
        rate: 0.0,
      },
      {
        coin: "XDAG/USDT",
        image: "/coin/xdag.png",
        price: 0.00363,
        rate: 0.0,
      },
      {
        coin: "WYZ/USDT",
        image: "/coin/wyz.png",
        price: 0.0073,
        rate: 8.96,
      },
      {
        coin: "ETH/USDT",
        image: "/coin/ETH.png",
        price: 0.17217,
        rate: -2.63,
      },
      {
        coin: "DOGE/USDT",
        image: "/coin/DOGE.png",
        price: 0.17217,
        rate: -2.63,
      },
      {
        coin: "BTC/USDT",
        image: "/coin/BTC.png",
        price: 83879.03,
        rate: -0.55,
      },
    ],
  },
  {
    icon: "/new.png",
    title: "New",
    data: [
      {
        coin: "SAI/USDT",
        image: "/coin/sai.jpg",
        price: 0.48,
        rate: 4.64,
      },
      {
        coin: "JYAI/USDT",
        image: "/coin/jayi.jpg",
        price: 0.00002954,
        rate: -24.09,
      },
      {
        coin: "MNTC/USDT",
        image: "/coin/mntc.jpg",
        price: 0.95,
        rate: 0.0,
      },
      {
        coin: "STIK/USDT",
        image: "/coin/stik.jpg",
        price: 5.197,
        rate: -0.06,
      },
      {
        coin: "XDAG/USDT",
        image: "/coin/xdag.png",
        price: 0.00362,
        rate: 0.0,
      },
      {
        coin: "XFI/USDT",
        image: "/coin/xfi.png",
        price: 0.1197,
        rate: 1.02,
      },
    ],
  },
  {
    icon: "/gainer.png",
    title: "Gainers",
    data: [
      {
        coin: "WYZ/USDT",
        image: "/coin/wyz.png",
        price: 0.0077,
        rate: 14.93,
      },
      {
        coin: "HOPPY/USDT",
        image: "/coin/hoppy.png",
        price: 0.00001875,
        rate: 11.95,
      },
      {
        coin: "BNX/USDT",
        image: "/coin/BNX.png",
        price: 1.1936,
        rate: 8.58,
      },
      {
        coin: "STMX/USDT",
        image: "/coin/STMX.png",
        price: 0.003745,
        rate: 5.41,
      },
      {
        coin: "ID/USDT",
        image: "/coin/ID.png",
        price: 0.23895,
        rate: 5.06,
      },
      {
        coin: "SUPER/USDT",
        image: "/coin/super.png",
        price: 0.48,
        rate: 4.74,
      },
    ],
  },
];

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
        const currentUSD = coinDetail[tokenName]?.usd;
        if (currentUSD != null) {
          updatedCoinDetail[tokenName].usd =
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

      // Step 2: Split into 3 roughly equal parts
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
