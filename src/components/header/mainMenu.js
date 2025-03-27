import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

const {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} = require("@material-tailwind/react");
const { AiOutlineAppstore } = require("react-icons/ai");

const MainMenuItem = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const menuData = [
    {
      icon: "/reward.svg",
      title: t("rewardsCenter"),
      description: t("rewardsCenterDesc"),
      href: "/rewards",
    },
    {
      icon: "/afiliate.svg",
      title: t("afiliate"),
      description: t("afiliateDesc"),
      href: "/partner",
    },
    {
      icon: "/referral.svg",
      title: t("referral"),
      description: t("referralNDesc"),
      href: "/invite",
    },
    // {
    //   icon: "/uzxLab.svg",
    //   title: "UZX LAB",
    //   description: "Discover potential projects",
    //   href: "/uzxLab",
    // },
    // {
    //   icon: "/proof.svg",
    //   title: "Proof of Reserves",
    //   description: "Discover potential projects",
    //   href: "/proofReserve",
    // },
  ];

  return (
    <Menu allowHover className="border-none" placement="bottom-end">
      <MenuHandler>
        <AiOutlineAppstore className="w-6 h-6 text-white hover:text-blue1" />
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

export default MainMenuItem;
