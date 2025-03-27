import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

const {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} = require("@material-tailwind/react");
const { AiOutlineCaretDown } = require("react-icons/ai");

const DiscoverMenuItem = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const menuData = [
    {
      icon: "/market.svg",
      title: t("market"),
      description: t("marketDesc"),
      href: "/price/market",
    },
    {
      icon: "/opportunities.svg",
      title: t("opportunities"),
      description: t("opportunitiesDesc"),
      href: "/price/chance",
    },
  ];
  return (
    <Menu allowHover className="border-none" placement="bottom-end">
      <MenuHandler>
        <div
          variant="text"
          className="flex items-center text-white gap-2 text-base font-normal capitalize tracking-normal"
        >
          {t("discover")}{" "}
          <AiOutlineCaretDown
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform `}
          />
        </div>
      </MenuHandler>
      <MenuList className="bg-mainblack border-none  ">
        {menuData.map((menu, index) => (
          <MenuItem key={index} className="p-0 my-3">
            <a
              href={menu.href}
              className="w-full h-full flex items-center gap-4 hover:bg-hoverblack p-2 rounded-sm group"
            >
              <Image src={menu.icon} width={30} height={30} alt="reward" />
              <div className="flex flex-col text-white group-hover:text-blue1 ">
                <p className="font-bold">{menu.title}</p>
                <p className="text-[#8d8d8d]">{menu.description}</p>
              </div>
            </a>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DiscoverMenuItem;
