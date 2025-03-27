"use client";

import { useState } from "react";

import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Image from "next/image";
import FlexibleEarnTab from "./flexibleEarn";
import FixedEarnTab from "./fixedEarn";
import Link from "next/link";
import { DialogDefault } from "../components/defaultDialog";
import { useLanguage } from "../../../context/LanguageProvider";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const tabHeaderData = [t("flexible"), t("fixed")];
  return (
    <div className="content">
      <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
        <div className="w-full flex items-center mt-9">
          <div className="w-1/2 flex flex-col items-start gap-6 ">
            <p className="text-5xl text-white">{t("earn")}</p>
            <p className="text-white text-xl">{t("journey")}</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="mt-9 rounded-full bg-gradient-to-r from-blue1 to-blue2 text-black text-lg px-12 py-3"
            >
              {t("whatIsEarn")}
            </button>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <Image src="/earnCoin.png" width={460} height={250} alt="image" />
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-12">
        <div className="brands container mx-auto overflow-hidden">
          <div className="relative flex w-full items-center justify-center my-9">
            <Tabs id="custom-animation" value={activeTab} className="w-full">
              <TabsHeader
                className="w-96 rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-[2px] border-white shadow-none rounded-none",
                }}
              >
                {tabHeaderData.map((data, index) => (
                  <Tab
                    key={index}
                    value={index}
                    onClick={() => setActiveTab(index)}
                    className={
                      activeTab === index
                        ? "text-black border-b-2 border-black font-bold"
                        : "text-[#AAA]"
                    }
                  >
                    {data}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { x: 1000 },
                  mount: { x: 0 },
                  unmount: { x: -1000 },
                }}
              >
                <FlexibleEarnTab />
                <FixedEarnTab />
              </TabsBody>
            </Tabs>
            <Link
              href="/saveCoins/order"
              className="text-blue1 absolute top-0 right-0"
            >
              {t("myOrder")}
            </Link>
          </div>
        </div>
      </div>
      <DialogDefault
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={t("whatIsEarn")}
        description={t("whatIsEarnDesc")}
      />
    </div>
  );
}
