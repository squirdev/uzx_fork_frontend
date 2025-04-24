"use client";

import Image from "next/image";

import Logo from "../header/logo";
import { useLanguage } from "../../../context/LanguageProvider";

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
  if (!t) return <p className="text-white">Loading translations...</p>;
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
            url: "/#",
          },
          {
            title: t("termsService"),
            url: "/about/termService",
          },
          {
            title: t("privacyPolicy"),
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
      // {
      //   title: t("userSupport"),
      //   data: [
      //     {
      //       title: t("support"),
      //       url: "/#",
      //     },
      //     {
      //       title: t("uZXCommunity"),
      //       url: "/#",
      //     },
      //     {
      //       title: t("transactionFees"),
      //       url: "/#",
      //     },
      //     {
      //       title: t("officialVerification"),
      //       url: "/#",
      //     },
      //     {
      //       title: t("channels"),
      //       url: "/#",
      //     },
      //     {
      //       title: t("proofReserces"),
      //       url: "/#",
      //     },
      //     {
      //       title: "API",
      //       url: "/#",
      //     },
      //   ],
      // },
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
        <div className="w-full flex flex-col items-start">
          <Logo />
          <div className="w-full grid grid-cols-6 mt-8 ">
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
