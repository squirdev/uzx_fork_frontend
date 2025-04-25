"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { sendVerifyEmail } from "../api/auth";
import { useAlert } from "../../../context/alertContext";
import { useLanguage } from "../../../context/LanguageProvider";
import { AiFillInfoCircle } from "react-icons/ai";
import { getProfile, updatePassword } from "../api/profile";
import { useRouter } from "next/navigation";
import { isValidChangeLoginPassword } from "../helper";
import LoadingScreen from "../components/loading";

const LoginPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();
  const { t } = useLanguage();

  const handleSendVerifyEmail = async () => {
    let result = await sendVerifyEmail(userProfile?.email);
    if (result) showAlert(t("verifyCodeSent"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result?.user?.password) {
      setUserProfile(result.user);
    } else {
      showAlert(t("getUserprofileFailed"));
      router.push("/management");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    if (
      !isValidChangeLoginPassword(oldPassword, newPassword, confirmPassword)
    ) {
      showAlert(t("inputAllDetail"));
      return;
    }
    setIsLoading(true);
    let result = await updatePassword(verifyCode, oldPassword, newPassword);
    if (result) {
      showAlert(t("passwordUpdateSuccess"), "success");
      router.push("/management");
    } else {
      showAlert(t("passwordUpdateFailed"));
    }
    setIsLoading(false);
  };

  if (!t) return <LoadingScreen />;
  return (
    <div className="my-12 flex flex-col gap-8 w-96">
      <Typography variant="h4" className="font-bold">
        {t("changeLoginPassword")}
      </Typography>
      <Input
        value={oldPassword}
        type="password"
        label={t("oldLoginPassword")}
        className="bg-[#f5f5f6]"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <Input
        value={newPassword}
        type="password"
        label={t("newLoginPassword")}
        className="bg-[#f5f5f6]"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        value={confirmPassword}
        label={t("confirmPassword")}
        className="bg-[#f5f5f6]"
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <div className="w-full flex flex-col">
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
          <Button
            size="sm"
            disabled={!userProfile?.email}
            onClick={handleSendVerifyEmail}
            className="!absolute right-1 top-1 rounded bg-inherit shadow-none text-blue1"
          >
            {t("send")}
          </Button>
        </div>
        <div className="text-[#D7A931] flex items-start gap-2">
          <AiFillInfoCircle />
          <p className="text-[13px]">{t("confirmPassDesc")}</p>
        </div>
      </div>
      <Button
        disabled={!verifyCode}
        loading={isLoading}
        onClick={handleChangePassword}
        className="bg-mainblack/80 flex justify-center"
      >
        {t("save")}
      </Button>
    </div>
  );
};

export default LoginPassword;
