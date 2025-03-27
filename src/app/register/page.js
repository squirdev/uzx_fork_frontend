"use client";

import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";

import LoginLeftPanel from "../components/login/leftPanel";
import KeyRegisterPanel from "./keyRegister";
import EmailRegisterPanel from "./emailRegister";
import { useLanguage } from "../../../context/LanguageProvider";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const loginOption = [t("anonymous"), t("email")];
  return (
    <div className="content">
      <div className="w-full h-full flex bg-white">
        <LoginLeftPanel />
        <div className="w-3/5 h-full flex flex-row justify-center">
          <div className="w-[500px] h-full flex items-center">
            <div className="w-full flex flex-col gap-6 mt-24">
              <p className="text-4xl font-bold">{t("register")}</p>
              <Tabs id="custom-animation" value={activeTab} className="w-full">
                <TabsHeader
                  className="w-56 h-auto rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-[2px] border-white shadow-none rounded-none",
                  }}
                >
                  {loginOption.map((data, index) => (
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
                  <KeyRegisterPanel />
                  <EmailRegisterPanel />
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
