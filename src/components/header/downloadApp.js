import Image from "next/image";

const { Menu, MenuHandler, MenuList } = require("@material-tailwind/react");
import { BiArrowToBottom } from "react-icons/bi";

const DownloadAppItem = () => {
  return (
    <Menu allowHover className="border-none" placement="bottom-end">
      <MenuHandler>
        <BiArrowToBottom className="text-white w-7 h-7 hidden md:flex" />
      </MenuHandler>
      <MenuList className="bg-mainblack border-none">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <Image src={"/appstore.png"} width={120} height={120} alt="app" />
            <p className="text-white">App store</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/googlestore.png"}
              width={120}
              height={120}
              alt="app"
            />
            <p className="text-white">Google store</p>
          </div>
        </div>
      </MenuList>
    </Menu>
  );
};

export default DownloadAppItem;
