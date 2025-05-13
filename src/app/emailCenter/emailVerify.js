"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { bindEmail, sendVerifyEmail } from "../api/auth";
import { useAlert } from "../../../context/alertContext";
import { useLanguage } from "../../../context/LanguageProvider";
import { useRouter } from "next/navigation";
import { getProfile } from "../api/profile";
import LoadingScreen from "../components/loading";
import VerifyButton from "../components/verifyButton";

const EmailVerify = () => {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [accountPrivateKey, setAccountPrivateKey] = useState("");
  const { showAlert } = useAlert();
  const [userProfile, setUserProfile] = useState(null);
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
    if (userProfile && userProfile.email) {
      showAlert(t("emailAlreadyBind"), "success");
      router.push("/management");
    }
  }, [userProfile]);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const handleSendVerifyEmail = async () => {
    let result = await sendVerifyEmail(email);
    if (result) showAlert(t("verifyCodeSent"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  const handleVerifyEmail = async () => {
    if (!email || !verifyCode || !accountPrivateKey) {
      showAlert(t("inputAllDetail"));
      return;
    }
    let result = await bindEmail(email, verifyCode, accountPrivateKey);
    if (result) {
      showAlert(t("bindEmailSuccess"), "success");
      router.push("/management");
    } else {
      showAlert(t("alertErrorMsg"));
    }
  };

  return (
    <div className="my-12 flex flex-col gap-8 w-96">
      <Typography variant="h4" className="font-bold">
        {t("emailVerify")}
      </Typography>
      <Input
        value={email}
        label={t("email")}
        className="bg-[#f5f5f6]"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative flex w-full">
        <Input
          label={t("emailVeriCode")}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          className="pr-20 bg-[#f5f5f6]"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <VerifyButton
          email={email}
          handleSendVerifyEmail={handleSendVerifyEmail}
        />
      </div>
      <div className="flex flex-col">
        <Typography className="text-sm">{t("accountPrivateKey")}</Typography>
        <textarea
          value={accountPrivateKey}
          onChange={(e) => setAccountPrivateKey(e.target.value)}
          className="outline-none bg-[#f5f5f6] h-[120px] overflow-auto px-4 py-3 rounded-md text-sm focus:border focus:border-blue1"
        />
      </div>
      <Button onClick={handleVerifyEmail} className="bg-mainblack/80">
        {t("save")}
      </Button>
    </div>
  );
};

export default EmailVerify;
