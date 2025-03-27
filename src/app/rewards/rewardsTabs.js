import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import Link from "next/link";

const {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} = require("@material-tailwind/react");
const { useState } = require("react");

export const RewardsPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const themeData = [
    t("digitalCurrency"),
    t("commissionCard"),
    t("tradeBonusExper"),
  ];
  return (
    <Tabs id="custom-animation" value={activeTab}>
      <TabsHeader
        className="w-[600px] rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-[2px] border-white shadow-none rounded-none",
        }}
      >
        {themeData.map((data, index) => (
          <Tab
            key={index}
            value={index}
            onClick={() => setActiveTab(index)}
            className={
              activeTab === index
                ? "text-blue1 text-sm"
                : "text-[#939393] text-sm"
            }
          >
            {data}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { x: -1000 },
          mount: { x: 0 },
          unmount: { x: 1000 },
        }}
      >
        <TabPanel key={0} value={0}>
          <div className="w-full flex flex-col p-12 items-center gap-8">
            <Image
              src={"/rewards/nodata.png"}
              width={88}
              height={65}
              alt="No data"
            />
            <p className="text-sm text-hoverblack">{t("emptyRewardsDesc")}</p>
            <Link href="/partner" className="rounded-full bg-gradient-to-r from-blue1 to-blue2 px-12 py-1">
              <span className="text-sm font-bold text-black">
                {t("referral")}
              </span>
            </Link>
          </div>
        </TabPanel>
        <TabPanel key={1} value={1}>
          <div className="w-full flex flex-col p-12 items-center gap-4">
            <Image
              src={"/rewards/nodata.png"}
              width={88}
              height={65}
              alt="No data"
            />
            <p className="text-sm text-hoverblack">{t("noDataAvailable")}</p>
          </div>
        </TabPanel>
        <TabPanel key={2} value={2}>
          <div className="w-full flex flex-col p-12 items-center gap-4">
            <Image
              src={"/rewards/nodata.png"}
              width={88}
              height={65}
              alt="No data"
            />
            <p className="text-sm text-hoverblack">{t("noDataAvailable")}</p>
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};
