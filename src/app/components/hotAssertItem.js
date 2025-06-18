import Image from "next/image";
import Link from "next/link";

const HotAssertItem = ({ itemData, subIndex }) => {
  return (
    <div className="w-full rounded-xl bg-gradient-to-b from-hoverblack to-mainblack py-6">
      <div className="flex flex-col pb-6">
        {itemData.map((coinData, index) => {
          const fileUrl = "/coin/" + coinData.symbol.toUpperCase() + ".png";
          return (
            <Link
              href={`/exchange/${coinData.symbol}`}
              key={index}
              className="w-full flex items-center hover:bg-hoverblack justify-between px-6 py-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">
                  {index + 1 + subIndex * itemData.length}
                </span>
                <Image src={fileUrl} width={24} height={24} alt="icon" />
                <span className="font-bold text-white">
                  {coinData.symbol.toUpperCase()}/USDT
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white">
                  ${coinData.current_price?.toFixed(3)}
                </span>
                <span
                  className={`${coinData.market_cap_change_percentage_24h > 0 ? "text-[#01BD8D]" : "text-red-500"} `}
                >
                  {coinData.market_cap_change_percentage_24h?.toFixed(3)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HotAssertItem;
