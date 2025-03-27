import { TabPanel } from "@material-tailwind/react";
import Image from "next/image";

const fixedData = [
  {
    coin: "USDT",
    image: "/coin/USDT.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
  {
    coin: "BTC",
    image: "/coin/BTC.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
  {
    coin: "ETH",
    image: "/coin/ETH.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
  {
    coin: "UZX",
    image: "/coin/UZX.png",
    apr: "8.11103% ~ 18.25%",
    invest: 0,
  },
];

export default function FixedEarnTab() {
  return (
    <TabPanel value={1}>
      <div className="w-full flex flex-col items-center">
        <div className="w-full grid grid-cols-5 px-6 pb-3 items-center">
          <p>Crypto</p>
          <p>Est APR</p>
          <p>Term</p>
          <p>Invested</p>
          <p>Operate</p>
        </div>
        {fixedData.map((data, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-5 items-start text-black font-bold cursor-pointer p-6 border-b hover:bg-[#f0f0f0]"
          >
            <div className="flex items-center gap-2">
              <Image src={data.image} width={18} height={18} alt="img" />
              <span>{data.coin}</span>
            </div>
            <p>{data.apr}</p>
            <p>Flexible</p>
            <p>{data.invest}</p>
            <div className="w-full">
              <button className="bg-black text-white py-1 px-5 rounded-full">
                Deposit
              </button>
            </div>
          </div>
        ))}
      </div>
    </TabPanel>
  );
}
