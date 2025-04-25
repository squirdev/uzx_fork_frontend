"use client";

import Image from "next/image";

import { Typography } from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import HeaderPanel from "./headerPanel";

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

export default function Home() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="content">
      <HeaderPanel />
      <div className="w-full bg-white py-12 pb-36">
        <div className="brands container mx-auto flex flex-col overflow-hidden drop-shadow-md">
          <div className="w-2/3 self-center flex flex-col gap-6">
            <Typography variant="h2">E-mail Address</Typography>
            <div className="flex flex-col gap-1">
              <Typography variant="h6">
                {t("customerService")}: CS@UZXKR.com
              </Typography>
              <Typography variant="h6">
                {t("technicalSupport")}: TS@UZXKR.com
              </Typography>
              <Typography variant="h6">
                {t("coinApplication")}: Listing@UZXKR.com
              </Typography>
              <Typography variant="h6">{t("cooperation")}: X@UZXKR.com</Typography>
              <Typography variant="h6">
                {t("humanResources")}: HR@UZXKR.com
              </Typography>
              <Typography variant="h6">
                {t("riskControlDepartment")}: RCD@UZXKR.com
              </Typography>
            </div>
            {/* <Typography variant="h2">Social Media</Typography>
            <div className="flex items-center gap-8">
              {communityLinkData.map((data, index) => (
                <a key={index} href={data.url}>
                  <Image src={data.icon} width={26} height={26} alt="icon" />
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
