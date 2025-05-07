import Image from "next/image";
import Link from "next/link";

import Logo from "../header/logo";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";
import { useState } from "react";
import { Collapse } from "@material-tailwind/react";
import { BiChevronRight, BiChevronDown, BiChevronUp } from "react-icons/bi";

const communityLinkData = [
  {
    icon: "/social/x.png",
    url: "#",
  },
  {
    icon: "/social/telegram.png",
    url: "#",
  },
  {
    icon: "/social/instagram.png",
    url: "#",
  },
  {
    icon: "/social/facebook.png",
    url: "#",
  },
  {
    icon: "/social/discord.png",
    url: "#",
  },
  {
    icon: "/social/youtube.png",
    url: "#",
  },
  {
    icon: "/social/apple.png",
    url: "#",
  },
];
const Footer = () => {
  const { t } = useLanguage();

  const [aboutUZX, setAboutUZX] = useState(false);
  const [products, setProducts] = useState(false);
  const [service, setService] = useState(false);
  const [trade, setTrade] = useState(false);

  if (!t) return <LoadingScreen />;

  const footerNavData = [
    [
      {
        title: t("aboutUZX"),
        data: [
          {
            title: t("aboutUs"),
            url: "/about/aboutUs",
          },
          {
            title: t("contactUS"),
            url: "/contactUs",
          },
          {
            title: t("termsService"),
            url: "/about/termService",
          },
          {
            title: t("privacyFooterPolicy"),
            url: "/about/privacyPolicy",
          },
          {
            title: t("disclaimer"),
            url: "/about/disClaimer",
          },
          {
            title: t("antiCorruption"),
            url: "/about/antiCorrupt",
          },
          {
            title: t("lawEnforcement"),
            url: "/about/lawEnforce",
          },
        ],
      },
    ],
    [
      {
        title: t("products"),
        data: [
          {
            title: t("convert"),
            url: "/cexchange",
          },
          {
            title: t("spot"),
            url: "/exchange/btc",
          },
          {
            title: t("earn"),
            url: "/saveCoins",
          },
        ],
      },
    ],
    [
      {
        title: t("service"),
        data: [
          {
            title: t("affiliate"),
            url: "/partner",
          },
          {
            title: t("boardApply"),
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfoXiC3KOCuUfMIlgaY0vQQ9i41sQ4xIg9GqnARUevQnMOtrA/viewform?usp=sf_link",
          },
        ],
      },
    ],
    [
      {
        title: t("trade"),
        data: [
          {
            title: "BTC/USDT",
            url: "/exchange/btc",
          },
          {
            title: "ETH/USDT",
            url: "/exchange/eth",
          },
          {
            title: "DOGE/USDT",
            url: "/exchange/doge",
          },
          {
            title: "XRP/USDT",
            url: "/exchange/xrp",
          },
          {
            title: "LTC/USDT",
            url: "/exchange/ltc",
          },
          {
            title: "FIL/USDT",
            url: "/exchange/fil",
          },
          {
            title: "ADA/USDT",
            url: "/exchange/ada",
          },
          {
            title: "EOS/USDT",
            url: "/exchange/eos",
          },
          {
            title: "SHIB/USDT",
            url: "/exchange/shib",
          },
          {
            title: "BNB/USDT",
            url: "/exchange/bnb",
          },
          {
            title: "DOT/USDT",
            url: "/exchange/dot",
          },
          {
            title: "CRV/USDT",
            url: "/exchange/crv",
          },
          {
            title: "TRUMP/USDT",
            url: "/exchange/trump",
          },
          {
            title: "SUI/USDT",
            url: "/exchange/sui",
          },
          {
            title: "CRO/USDT",
            url: "/exchange/cro",
          },
          {
            title: "SOL/USDT",
            url: "/exchange/sol",
          },
        ],
      },
    ],
  ];
  return (
    <div className="bg-black">
      <div className="container mx-auto py-20 flex justify-between gap-8">
        <div className="w-full flex flex-col items-start px-2 md:px-0">
          <Logo />
          <div className="hidden w-full md:grid grid-cols-6 mt-8">
            {footerNavData.map((footItem, index) => (
              <div key={index} className="w-full flex flex-col pl-4">
                {footItem.map((footSubItem, subIndex) => (
                  <div key={subIndex}>
                    <p className="text-white font-bold text-xl my-3">
                      {footSubItem.title}
                    </p>
                    {footSubItem.data.map((footDetailItem, detailIndex) => (
                      <a key={detailIndex} href={footDetailItem.url}>
                        <p className="text-hoverblack py-1 hover:text-blue1">
                          {footDetailItem.title}
                        </p>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div className="w-full flex flex-col pl-4">
              <p className="text-white font-bold text-xl my-3">
                {t("community")}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {communityLinkData.map((data, index) => (
                  <a key={index} href={data.url}>
                    <Image src={data.icon} width={26} height={26} alt="icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-white mt-8 md:hidden text-[14px]">
            <div>
              <div
                className="flex flex-row gap-4 items-center cursor-pointer pr-[10px]"
                onClick={() => setAboutUZX(!aboutUZX)}
              >
                {aboutUZX ? (
                  <BiChevronDown color="white" size={20} />
                ) : (
                  <BiChevronRight color="white" size={20} />
                )}
                <p>{footerNavData[0][0].title}</p>
              </div>
              <Collapse open={aboutUZX}>
                <div className="flex flex-col gap-4 mt-4 pl-[50px]">
                  {footerNavData[0][0].data.map((item, index) => (
                    <Link key={index} href={item.url}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Collapse>
            </div>
            <div>
              <div
                className="flex flex-row gap-4 items-center cursor-pointer pr-[10px]"
                onClick={() => setProducts(!products)}
              >
                {products ? (
                  <BiChevronDown color="white" size={20} />
                ) : (
                  <BiChevronRight color="white" size={20} />
                )}
                <p>{footerNavData[1][0].title}</p>
              </div>
              <Collapse open={products}>
                <div className="flex flex-col gap-4 mt-4 pl-[50px]">
                  {footerNavData[1][0].data.map((item, index) => (
                    <Link key={index} href={item.url}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Collapse>
            </div>
            <div>
              <div
                className="flex flex-row gap-4 items-center cursor-pointer pr-[10px]"
                onClick={() => setService(!service)}
              >
                {service ? (
                  <BiChevronDown color="white" size={20} />
                ) : (
                  <BiChevronRight color="white" size={20} />
                )}
                <p>{footerNavData[2][0].title}</p>
              </div>
              <Collapse open={service}>
                <div className="flex flex-col gap-4 mt-4 pl-[50px]">
                  {footerNavData[2][0].data.map((item, index) => (
                    <Link key={index} href={item.url}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Collapse>
            </div>
            <div>
              <div
                className="flex flex-row gap-4 items-center cursor-pointer pr-[10px]"
                onClick={() => setTrade(!trade)}
              >
                {trade ? (
                  <BiChevronDown color="white" size={20} />
                ) : (
                  <BiChevronRight color="white" size={20} />
                )}
                <p>{footerNavData[3][0].title}</p>
              </div>
              <Collapse open={trade}>
                <div className="flex flex-col gap-4 mt-4 pl-[50px]">
                  {footerNavData[3][0].data.map((item, index) => (
                    <Link key={index} href={item.url}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="flex flex-row gap-2">
              {communityLinkData.map((data, index) => (
                <a key={index} href={data.url}>
                  <Image src={data.icon} width={26} height={26} alt="icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
