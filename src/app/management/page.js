"use client";

import { useEffect, useState } from "react";
import GeneralView from "./generalView/main";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import SafetyPanel from "./safety/main";
import IDVerification from "./idVerification/main";
import { getProfile } from "../api/profile";
import { useAlert } from "../../../context/alertContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const { t } = useLanguage();
  const { showAlert } = useAlert();

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserProfile(result.user);
    } else {
      showAlert(t("alertErrorMsg"));
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!t) return <p className="text-white">Loading translations...</p>;
  const themeData = [t("generalView"), t("safety"), t("idVerify")];
  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <Tabs id="custom-animation" value={activeTab}>
          <TabsHeader
            className="w-[600px] rounded-none border-b border-blue-gray-50 mt-8 bg-transparent p-0"
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
                    ? "text-blue1 text-xl font-bold"
                    : "text-[#939393] text-xl font-bold"
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
              <GeneralView userProfile={userProfile} />
            </TabPanel>
            <TabPanel key={1} value={1}>
              <SafetyPanel userProfile={userProfile} />
            </TabPanel>
            <TabPanel key={2} value={2}>
              <IDVerification userProfile={userProfile} />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
