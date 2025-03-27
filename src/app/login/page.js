"use client";

import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import KeyLoginPanel from "./keyLogin";
import EmailLoginPanel from "./emailLogin";
import AppLoginPanel from "./appLogin";
import LoginLeftPanel from "../components/login/leftPanel";
import { useLanguage } from "../../../context/LanguageProvider";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [appLogin, setAppLogin] = useState(false);

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const loginOption = [t("anonymous"), t("email")];

  return (
    <div className="content">
      <div className="w-full flex items-center bg-white">
        <LoginLeftPanel />
        <div className="w-3/5 flex items-center justify-center">
          <div className="w-[500px]">
            <div className="w-full flex justify-between">
              <p className="text-4xl font-bold">{t("login")}</p>
              <button onClick={() => setAppLogin(!appLogin)}>
                {appLogin ? (
                  <Image
                    src={"/login_pc.png"}
                    width={40}
                    height={40}
                    alt="qr"
                  />
                ) : (
                  <Image
                    src={"/login_qr.png"}
                    width={40}
                    height={40}
                    alt="qr"
                  />
                )}
              </button>
            </div>
            {appLogin ? (
              <AppLoginPanel />
            ) : (
              <Tabs id="custom-animation" value={activeTab} className="w-full">
                <TabsHeader
                  className="w-56 h-auto rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-8"
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
                  <KeyLoginPanel />
                  <EmailLoginPanel />
                </TabsBody>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
