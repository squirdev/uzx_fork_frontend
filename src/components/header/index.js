import Image from "next/image";
import { useState } from "react";

import { BiWalletAlt } from "react-icons/bi";
import { BiWindowAlt, BiChevronDown } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";

import {
  Button,
  Badge,
  Drawer,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import DiscoverMenuItem from "./discover";
import TradeMenuItem from "./trade";
import GrowMenuItem from "./grow";
import Link from "next/link";
import MainMenuItem from "./mainMenu";
import UserProfileItem from "./userProfile";
import DownloadAppItem from "./downloadApp";
import LanguageSetting from "./languageSetting";
import Notification from "./notification";
import { useLanguage } from "../../../context/LanguageProvider";
import { useSelector } from "react-redux";
import LoadingScreen from "@/app/components/loading";
import MobileMenu from "./mobileMenu";

const Header = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full bg-black flex justify-between items-center p-3 px-5">
      <div className="flex items-center gap-12">
        <Link href="/">
          <Image src={"/logo.svg"} width={60} height={24} alt="logo" />
        </Link>
        <div className="hidden md:flex items-center gap-9">
          <MainMenuItem />
          <DiscoverMenuItem />
          <TradeMenuItem />
          <GrowMenuItem />
          <Link href="/uzxdao" className="text-white hover:text-blue1">
            {t("uzxDao")}
          </Link>
          <Link href="/noviceCommunity" className="text-white hover:text-blue1">
            {t("learn")}
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isAuth ? (
          <>
            <Link href="/recharge">
              <Button className="bg-[#05c3dd] flex items-center gap-1 px-3 py-[6px]">
                <BiWalletAlt className="w-5 h-5" />
                <span className="text-white text-md">{t("charge")}</span>
              </Button>
            </Link>
            <Link href="/management">
              <BiWindowAlt className="text-white w-6 h-6" />
            </Link>
            <UserProfileItem />
            <Notification message={0} />
            <BiMenu
              onClick={() => setOpen(true)}
              color="white"
              size={30}
              className="md:hidden block"
            />
          </>
        ) : (
          <>
            <Link href="/login" className="hidden md:flex">
              <Button className="px-8 py-2">
                <span className="text-white text-md">{t("login")}</span>
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#05c3dd] px-8 py-2">
                <span className="text-white text-md">{t("signUp")}</span>
              </Button>
            </Link>
            <BiMenu
              onClick={() => setOpen(true)}
              color="white"
              size={30}
              className="md:hidden block"
            />
          </>
        )}
        <LanguageSetting />
        <DownloadAppItem />
      </div>
      <MobileMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
