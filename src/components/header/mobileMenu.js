import { use, useState } from "react";
import {
  Button,
  Badge,
  Drawer,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { BiWindowAlt, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useLanguage } from "../../../context/LanguageProvider";
import Link from "next/link";

const supportLanguage = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ch",
    name: "中文(简体)",
  },
  {
    code: "zh",
    name: "中文(繁體)",
  },
  {
    code: "de",
    name: "Deutsch",
  },
  {
    code: "jp",
    name: "日本語",
  },
  {
    code: "sp",
    name: "İspanyol",
  },
  {
    code: "tr",
    name: "Türkçe",
  },
];

const MobileMenu = ({ open, setOpen }) => {
  const { t, setLocale } = useLanguage();
  if (!t) return <LoadingScreen />;

  const [discover, setDiscover] = useState(false);
  const [trade, setTrade] = useState(false);
  const [grow, setGrow] = useState(false);
  const [more, setMore] = useState(false);
  const [language, setLanguage] = useState(false);

  const handleSelectLanguage = (code) => {
    localStorage.setItem("language", code);
    setOpen(!open);
    console.log(code);
    setLocale(code);
  };

  return (
    <Drawer
      placement="right"
      open={open}
      onClose={() => setOpen(false)}
      className="p-4 bg-[#292929] text-white"
      size={800}
    >
      <div className="mb-3 flex items-center justify-end">
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex flex-col gap-4 text-[14px]">
        <div className="flex flex-row gap-4 items-center">
          <p className="border-[1px] border-white rounded-3xl px-[6px] py-[1px]">
            {t("signUp")}
          </p>
          <p className="p-1">{t("login")}</p>
        </div>
        <div>
          <div
            className="flex flex-row justify-between items-center cursor-pointer pr-[10px]"
            onClick={() => setDiscover(!discover)}
          >
            <p>{t("discover")}</p>
            {discover ? (
              <BiChevronUp color="white" size={20} />
            ) : (
              <BiChevronDown color="white" size={20} />
            )}
          </div>
          <Collapse open={discover}>
            <div className="flex flex-col gap-4 mt-4 pl-6">
              <Link href={"/price/market"} onClick={() => setOpen(false)}>
                {t("market")}
              </Link>
              <Link href={"/price/chance"} onClick={() => setOpen(false)}>
                {t("opportunities")}
              </Link>
            </div>
          </Collapse>
        </div>

        <div>
          <div
            className="flex flex-row justify-between items-center cursor-pointer pr-[10px]"
            onClick={() => setTrade(!trade)}
          >
            <p>{t("trade")}</p>
            {trade ? (
              <BiChevronUp color="white" size={20} />
            ) : (
              <BiChevronDown color="white" size={20} />
            )}
          </div>
          <Collapse open={trade}>
            <div className="flex flex-col gap-4 mt-4 pl-6">
              <Link href={"/cexchange"} onClick={() => setOpen(false)}>
                {t("convert")}
              </Link>
              <Link href={"/exchange/btc"} onClick={() => setOpen(false)}>
                {t("spot")}
              </Link>
            </div>
          </Collapse>
        </div>

        <div>
          <div
            className="flex flex-row justify-between items-center cursor-pointer pr-[10px]"
            onClick={() => setGrow(!grow)}
          >
            <p>{t("grow")}</p>
            {grow ? (
              <BiChevronUp color="white" size={20} />
            ) : (
              <BiChevronDown color="white" size={20} />
            )}
          </div>
          <Collapse open={grow}>
            <div className="flex flex-col gap-4 mt-4 pl-6">
              <Link href={"/saveCoins"} onClick={() => setOpen(false)}>
                {t("earn")}
              </Link>
              <Link href={"/financeLaunchpad"} onClick={() => setOpen(false)}>
                {t("launchpad")}
              </Link>
            </div>
          </Collapse>
        </div>
        <Link href={"/uzxdao"} onClick={() => setOpen(false)}>
          {t("uzxDao")}
        </Link>
        <Link href={"/noviceCommunity"} onClick={() => setOpen(false)}>
          {t("learn")}
        </Link>

        <div>
          <div
            className="flex flex-row justify-between items-center cursor-pointer pr-[10px]"
            onClick={() => setMore(!more)}
          >
            <p>{t("more")}</p>
            {more ? (
              <BiChevronUp color="white" size={20} />
            ) : (
              <BiChevronDown color="white" size={20} />
            )}
          </div>
          <Collapse open={more}>
            <div className="flex flex-col gap-4 mt-4 pl-6">
              <Link href={"/rewards"} onClick={() => setOpen(false)}>
                {t("rewardsCenter")}
              </Link>
              <Link href={"/partner"} onClick={() => setOpen(false)}>
                {t("afiliate")}
              </Link>
              <Link href={"/invite"} onClick={() => setOpen(false)}>
                {t("referral")}
              </Link>
            </div>
          </Collapse>
        </div>
        <hr className="border-t border-[#313131]" color="#313131" />

        <div>
          <div
            className="flex flex-row justify-between items-center cursor-pointer pr-[10px]"
            onClick={() => setLanguage(!language)}
          >
            <p>
              {
                supportLanguage.find(
                  (lang) =>
                    lang.code ===
                    (localStorage.getItem("language")
                      ? localStorage.getItem("language")
                      : "en")
                ).name
              }
            </p>
            {language ? (
              <BiChevronUp color="white" size={20} />
            ) : (
              <BiChevronDown color="white" size={20} />
            )}
          </div>
          <Collapse open={language}>
            <div className="flex flex-col gap-4 mt-4 pl-6">
              {supportLanguage.map((data, index) => (
                <p
                  className="cursor-pointer"
                  onClick={() => handleSelectLanguage(data.code)}
                  key={index}
                >
                  {data.name}
                </p>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;
