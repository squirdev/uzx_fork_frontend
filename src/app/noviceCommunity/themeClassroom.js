import { useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

const ThemeClassroom = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const themeData = [
    {
      label: t("noviceStrategy"),
      mainVideoUrl: "/video/theme1.mp4",
      desc: [
        {
          image: "/theme1.png",
          desc: t("howDepositDigital"),
          date: "2024-01-16",
        },
        {
          image: "/theme2.jpg",
          desc: t("howBeginnersAllocate"),
          date: "2023-11-10",
        },
        {
          image: "/theme3.jpg",
          desc: t("gasFee"),
          date: "2023-09-15",
        },
      ],
    },
    {
      label: t("advancedTrading"),
      mainVideoUrl: "/video/theme2.mp4",
      desc: [
        {
          image: "/theme4.jpg",
          desc: t("optionsContract"),
          date: "2023-09-15",
        },
        {
          image: "/theme5.png",
          desc: t("whatUContractTrading"),
          date: "2023-09-15",
        },
        {
          image: "/theme6.png",
          desc: t("whatCoinMargined"),
          date: "2023-09-15",
        },
      ],
    },
  ];

  return (
    <div className="brands container mx-auto my-12 overflow-hidden  drop-shadow-md">
      <p className="text-white font-bold text-4xl my-12">
        {t("themeClassroom")}
      </p>
      <Tabs id="custom-animation" value={activeTab}>
        <TabsHeader
          className="w-96 rounded-none border-b border-blue-gray-50 bg-transparent p-0"
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
              className={activeTab === index ? "text-white" : "text-[#939393]"}
            >
              {data.label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { x: 250 },
            mount: { x: 0 },
            unmount: { x: -250 },
          }}
        >
          {themeData.map((data, index) => (
            <TabPanel key={index} value={index}>
              {/* {data.label} */}
              <div className="flex w-full items-center gap-8">
                <div className="w-2/3">
                  <video
                    autoPlay
                    muted
                    loop
                    controls
                    className="lazyload w-full border border-hoverblack rounded-lg"
                  >
                    <source src={data.mainVideoUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="w-1/3 h-full flex flex-col items-start justify-between gap-8">
                  {data.desc.map((detail, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <Image
                        src={detail.image}
                        width={154}
                        height={86}
                        alt="img"
                        className="border border-mainblack rounded-lg"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-white font-bold">{detail.desc}</p>
                        <p className="text-sm">{detail.date}</p>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-full bg-gradient-to-r from-blue1 to-blue2 p-[1px]">
                    <button className="rounded-full w-full h-full bg-black py-1 px-8">
                      {t("showMore")}
                    </button>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ThemeClassroom;
