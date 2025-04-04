import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../context/LanguageProvider";
import { logout } from "../../../redux/authSlice";
import Link from "next/link";

const {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} = require("@material-tailwind/react");

const UserProfileItem = () => {
  const { username, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
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
  return (
    <Menu allowHover className="border-none" placement="bottom-end">
      <MenuHandler>
        <BiUser className="text-white w-6 h-6" />
      </MenuHandler>
      <MenuList className="bg-mainblack border-none  py-4">
        <p className="text-white font-bold outline-none">{username || email}</p>
        <p>UID:8380656588</p>
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
