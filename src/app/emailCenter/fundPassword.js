"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAlert } from "../../../context/alertContext";
import { useLanguage } from "../../../context/LanguageProvider";
import {
  getProfile,
  setInitFundPassword,
  updateFundPassword,
} from "../api/profile";
import { isValidPassword } from "../helper";
import LoadingScreen from "../components/loading";

const FundPassword = () => {
  const [oldFundPassword, setOldFundPassword] = useState("");
  const [fundPassword, setFundPassword] = useState("");
  const [isAleadyFund, setIsAleadyFund] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const { showAlert } = useAlert();
  const { t } = useLanguage();

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result?.user) {
      setUserProfile(result.user);
    } else {
      showAlert(t("getUserprofileFailed"));
      router.push("/management");
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userProfile?.fundPassword) setIsAleadyFund(true);
  }, [userProfile]);

  const handleSetFundPassword = async () => {
    if (!isValidPassword(fundPassword, confirmPassword)) {
      showAlert(t("inputAllDetail"));
      return;
    }
    if (isAleadyFund && !oldFundPassword) {
      showAlert(t("inputAllDetail"));
      return;
    }
    let result;
    if (isAleadyFund) {
      result = await updateFundPassword(oldFundPassword, fundPassword);
    } else {
      result = await setInitFundPassword(fundPassword);
    }

    if (result) {
      showAlert(t("setFundPasswordSuccess"), "success");
    } else {
      showAlert(t("setFundPasswordFailed"));
    }
  };

  if (!t) return <LoadingScreen />;
  return (
    <div className="my-12 flex flex-col gap-8 w-96">
      <Typography variant="h4" className="font-bold">
        {t("setFundPassword")}
      </Typography>
      {isAleadyFund && (
        <Input
          type="password"
          value={oldFundPassword}
          label={t("oldFundPassword")}
          onChange={(e) => setOldFundPassword(e.target.value)}
        />
      )}
      <Input
        type="password"
        value={fundPassword}
        label={t("fundPassword")}
        onChange={(e) => setFundPassword(e.target.value)}
      />
      <Input
        type="password"
        value={confirmPassword}
        label={t("confirmPassword")}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <Button onClick={handleSetFundPassword} className="bg-mainblack/80">
        {t("save")}
      </Button>
    </div>
  );
};

export default FundPassword;
