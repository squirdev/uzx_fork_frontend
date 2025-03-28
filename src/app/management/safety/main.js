"use client";

import Image from "next/image";
import SecuritySettingItem from "./securitySetting";
import SecurityAuthItem from "./securityPassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "@/app/api/profile";

const SafetyPanel = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEmailBind, setIsEmailBind] = useState(false);
  const [isGoogleAuthBind, setIsGoogleAuthBind] = useState(false);
  const router = useRouter();
  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserProfile(result.user);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.email) setIsEmailBind(true);
    if (userProfile && userProfile.isOpt) setIsGoogleAuthBind(true);
  }, [userProfile]);

  return (
    <div className="w-full flex flex-col mb-6 text-black">
      <p className="text-3xl font-bold mt-8">Security</p>
      <p className="text-2xl font-bold mt-6">Security Settings</p>
      <div className="w-full flex flex-col gap-6">
        <SecuritySettingItem
          verified={isEmailBind}
          title="Bind email"
          email={userProfile && userProfile.email}
          onClick={() => router.push("/emailCenter?classify=1")}
          description="Anonymous users can recover their account by binding an email"
          image="/management/bindmail.png"
        />
        <SecuritySettingItem
          title="GoogleAuth"
          description="Please bind GoogleAuth"
          onClick={() => router.push("/emailCenter?classify=2")}
          image="/management/google.png"
          verified={isGoogleAuthBind}
        />
        {userProfile && userProfile.password && (
          <SecurityAuthItem
            title="Login password"
            onClick={() => router.push("/emailCenter?classify=3")}
            description="Use when logging in to the platform"
            image="/management/login.png"
            button="Modify"
          />
        )}
        <SecurityAuthItem
          title="Fund password"
          onClick={() => router.push("/emailCenter?classify=4")}
          description="When account funds change, you need to verify the funds password first"
          image="/management/fund.png"
          button="Setting"
        />
      </div>
    </div>
  );
};

export default SafetyPanel;
