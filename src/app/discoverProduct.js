import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useLanguage } from "../../context/LanguageProvider";
import Link from "next/link";
import LoadingScreen from "./components/loading";

export default function DiscoverProductPanel() {
  const { t } = useLanguage();

  if (!t) return <LoadingScreen />;

  const productServiceData = [
    {
      icon: "/spot.png",
      title: t("spot"),
      description: t("tradeCryptowithTool"),
      href: "/exchange/btc",
    },
    // {
    //   icon: "/contract.png",
    //   title: t("perpetualContract"),
    //   description: t("coinBaseUBaseContracts"),
    //   href: "/exchange/btc",
    // },
    {
      icon: "/convert.png",
      title: t("convert"),
      description: t("easiestWaytoTrade"),
      href: "/cexchange",
    },
    {
      icon: "/earn.png",
      title: t("earn"),
      description: t("makeMoneyEasily"),
      href: "/saveCoins",
    },
  ];

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md my-12">
      <div className="w-full">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  my-16">
          {t("discoverProduct")}
        </p>
        <div className="w-full md:grid grid-cols-3 gap-6 pt-12 flex flex-col">
          {productServiceData.map((data, index) => (
            <Link
              key={index}
              href={data.href}
              className=" w-full bg-mainblack rounded-md p-8 cursor-pointer hover:shadow-blue1 hover:shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Image src={data.icon} width={24} height={24} alt="" />
                  <p className="text-white font-bold text-2xl">{data.title}</p>
                </div>
                <AiOutlineArrowRight className="text-white w-8 h-6" />
              </div>
              <p className="text-[#939393] mt-6 mb-12">{data.description}</p>
            </Link>
          ))}
        </div>
        <Carousel
          className="w-full md:h-auto h-[200px] rounded-xl overflow-hidden mt-8"
          autoplay={true}
          autoplayDelay={5000}
          loop={true}
          prevArrow={() => <></>}
          nextArrow={() => <></>}
        >
          <div className="relative w-full h-[537px]">
            <img
              src="/slide1.png"
              alt="brand1"
              className="h-full w-full object-center"
            />
          </div>
          <div className="relative h-full w-full">
            <img
              src="/slide2.png"
              alt="brand2"
              className="h-full w-full object-center"
            />
          </div>
          <div className="relative h-full w-full">
            <img
              src="/slide3.png"
              alt="brand3"
              className="h-full w-full object-center"
            />
          </div>
          <div className="relative h-full w-full">
            <img
              src="/slide4.jpg"
              alt="brand3"
              className="h-full w-full object-center"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
