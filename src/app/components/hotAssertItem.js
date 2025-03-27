import Image from "next/image";

const HotAssertItem = ({ itemData }) => {
  
  return (
    <div className="w-full rounded-xl bg-gradient-to-b from-hoverblack to-mainblack">
      <div className="flex items-center gap-4 p-6">
        <Image src={itemData.icon} width={20} height={20} alt="hot" />
        <p className="text-white font-bold text-xl">{itemData.title}</p>
      </div>
      <div className="flex flex-col pb-6">
        {itemData.data.map((coinData, index) => (
          <div
            key={index}
            className="w-full flex items-center hover:bg-hoverblack justify-between px-6 py-4"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{index + 1}</span>
              <Image src={coinData.image} width={24} height={24} alt="icon" />
              <span className="font-bold text-white">{coinData.coin}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white">${coinData.price}</span>
              <span className="text-[#01BD8D]">{coinData.rate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotAssertItem;
