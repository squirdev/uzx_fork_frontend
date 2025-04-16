"use client";

import SecuritySettingItem from "./securitySetting";
import SecurityAuthItem from "./securityPassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";

const SafetyPanel = ({userProfile}) => {
  const [isEmailBind, setIsEmailBind] = useState(false);
  const [isGoogleAuthBind, setIsGoogleAuthBind] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (userProfile && userProfile.email) setIsEmailBind(true);
    if (userProfile && userProfile.isOtp) setIsGoogleAuthBind(true);
  }, [userProfile]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full flex flex-col mb-6 text-black">
      <p className="text-3xl font-bold mt-8">{t("security")}</p>
      <p className="text-2xl font-bold mt-6">{t("securitySettings")}</p>
      <div className="w-full flex flex-col gap-6">
        <SecuritySettingItem
          verified={isEmailBind}
          title={t("bindEmail")}
          email={userProfile && userProfile.email}
          onClick={() => router.push("/emailCenter?classify=1")}
          description={t("bindEmailDesc")}
          image="/management/bindmail.png"
        />
        <SecuritySettingItem
          title={t("googleAuth")}
          description={t("googleAuthDesc")}
          onClick={() => router.push("/emailCenter?classify=2")}
          image="/management/google.png"
          verified={isGoogleAuthBind}
        />
        {userProfile && userProfile.password && (
          <SecurityAuthItem
            title={t("loginPassword")}
            onClick={() => router.push("/emailCenter?classify=3")}
            description={t("loginPasswordDesc")}
            image="/management/login.png"
            button={t("modify")}
          />
        )}
        <SecurityAuthItem
          title={t("fundPassword")}
          onClick={() => router.push("/emailCenter?classify=4")}
          description={t("fundPasswordDesc")}
          image="/management/fund.png"
          button={t("setting")}
        />
      </div>
    </div>
  );
};

export default SafetyPanel;
