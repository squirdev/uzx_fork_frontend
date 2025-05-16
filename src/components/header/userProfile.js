import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../context/LanguageProvider";
import { logout } from "../../../redux/authSlice";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading";
import { getProfile } from "@/app/api/profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUID } from "@/app/helper";

const {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} = require("@material-tailwind/react");

const UserProfileItem = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const [userProfile, setUserProfile] = useState(null);

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result?.user) {
      setUserProfile(result.user);
      console.log("result.user", result.user);
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menuData = [
    {
      icon: "/general.svg",
      title: t("generalView"),
      href: "/management",
    },
    {
      icon: "/security.svg",
      title: t("deposit"),
      href: "/recharge",
    },
    {
      icon: "/preference.svg",
      title: t("withdraw"),
      href: "/withdraw",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!t) return <LoadingScreen />;
  return (
    <Menu allowHover className="border-none" placement="bottom-end">
      <MenuHandler>
        <BiUser className="text-white w-6 h-6" />
      </MenuHandler>
      <MenuList className="bg-mainblack border-none  py-4">
        <p className="text-white font-bold outline-none">
          {userProfile?.email || userProfile?.username}
        </p>
        <p>UID: {getUID(userProfile)}</p>
        {menuData.map((menu, index) => (
          <MenuItem key={index} className="p-0 my-3">
            <Link
              href={menu.href}
              className="w-full h-full flex items-center gap-4 hover:bg-hoverblack py-2 px-1 rounded-sm group"
            >
              <Image src={menu.icon} width={20} height={20} alt="reward" />
              <p className="font-bold text-white hover:text-blue1">
                {menu.title}
              </p>
            </Link>
          </MenuItem>
        ))}
        <Button
          onClick={handleLogout}
          className="w-full text-white"
          variant="outlined"
        >
          {t("logout")}
        </Button>
      </MenuList>
    </Menu>
  );
};

export default UserProfileItem;
