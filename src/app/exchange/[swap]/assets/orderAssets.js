"use client";

import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AssetPanel from "./assetPanel";
import { SwapTokenList } from "@/constants/supportCryptoInfo";
import { useRouter } from "next/navigation";
import { useAlert } from "../../../../../context/alertContext";
import { useLanguage } from "../../../../../context/LanguageProvider";
import { getProfile, swapToken } from "@/app/api/profile";
import { useSelector } from "react-redux";
import LoadingScreen from "@/app/components/loading";

const percentData = [0, 25, 50, 75, 100];

const OrderAssets = ({ swap }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isBuying, setIsBuying] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [userBalance, setUserBalance] = useState(null);
  const [swapAmount, setSwapAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();
  const { t } = useLanguage();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!t) return;
    if (!SwapTokenList.includes(swap.toUpperCase())) {
      showAlert(t("pageNotValid"), "error");
      router.push("/exchange/btc");
    }
  }, [t]);

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserBalance(result.user);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!userBalance) return;
    if (isBuying) {
      setAvailableBalance(userBalance.usdt || 0);
    } else setAvailableBalance(userBalance[swap] || 0);
  }, [isBuying, userBalance]);

  const handleInputSwapAmount = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || (!isNaN(inputValue) && Number(inputValue) >= 0)) {
      if (Number(inputValue) <= availableBalance) {
        setSwapAmount(inputValue);
      }
    }
  };

  const setActivePercentStep = (index) => {
    setActiveStep(index);
    setSwapAmount((percentData[index] * availableBalance) / 100);
  };

  const setActiveBuy = () => {
    setIsBuying(true);
    setSwapAmount(0);
    setActiveStep(0);
  };

  const setDeactiveBuy = () => {
    setIsBuying(false);
    setSwapAmount(0);
    setActiveStep(0);
  };

  const handleSwapToken = async () => {
    if (!isAuth) {
      showAlert(t("loginFirst"), "error");
      return;
    }
    let paramFrom, paramTo;
    setIsLoading(true);
    if (isBuying) {
      paramFrom = "usdt";
      paramTo = swap;
    } else {
      paramFrom = swap;
      paramTo = "usdt";
    }
    let result = await swapToken(paramFrom, paramTo, swapAmount);
    if (result) {
      showAlert(t("swapTokenSuccess"), "success");
      fetchProfile();
    } else {
      showAlert(t("swapTokenFailed"), "error");
    }
    setIsLoading(false);
  };

  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full h-full bg-mainblack p-4">
      <div className="w-full border-b border-white p-4">
        <p className="text-white text-sm">{t("spot")}</p>
      </div>
      <div className="w-full flex justify-center items-center mt-4 gap-2">
        <Button
          onClick={setActiveBuy}
          color="green"
          className="rounded-full w-full"
        >
          {t("buy")}
        </Button>
        <Button
          onClick={setDeactiveBuy}
          color="red"
          className="rounded-full w-full"
        >
          {t("sell")}
        </Button>
      </div>
      <div className="w-full border-b border-white mt-6 p-2">
        <p className="text-white text-sm">{t("marketOrder")}</p>
      </div>
      <p className="text-sm mt-6 text-[#939393]">
        {t("available")}{" "}
        <span className="text-white font-bold">
          {availableBalance?.toFixed(4) || 0}{" "}
          {isBuying ? "USDT" : swap?.toUpperCase()}
        </span>
      </p>
      <div className="relative w-full flex mt-4 flex-row items-end">
        <input
          type="number"
          placeholder={t("amount")}
          value={swapAmount}
          onChange={handleInputSwapAmount}
          className="w-full p-2 px-4 bg-mainblack rounded-md border border-1 border-hoverblack"
        />
        <p className="absolute right-2 self-center z-50 bg-mainblack px-3 text-[#939393]">
          {isBuying ? "USDT" : swap?.toUpperCase()}
        </p>
      </div>
      <Stepper
        className="my-8 px-3"
        activeStep={activeStep}
        lineClassName="bg-white/50"
        activeLineClassName="bg-white"
      >
        {percentData.map((data, index) => (
          <Step
            key={index}
            className="w-3 h-3 !bg-blue-gray-50 text-hoverblack cursor-pointer"
            activeClassName="h-4 w-4  ring-0 !bg-white text-white"
            completedClassName="h-3 w-3  !bg-white text-white"
            onClick={() => setActivePercentStep(index)}
          >
            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
              <Typography className="text-sm" color="inherit">
                {data}%
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
      <Button
        color={isBuying ? "green" : "red"}
        loading={isLoading}
        disabled={swapAmount == 0}
        className="w-full my-12 rounded-full flex justify-center"
        onClick={handleSwapToken}
      >
        {isBuying ? (
          <span>
            {t("buy")} {swap?.toUpperCase()}
          </span>
        ) : (
          <span>
            {t("sell")} {swap?.toUpperCase()}
          </span>
        )}
      </Button>
      <AssetPanel swap={swap} />
    </div>
  );
};

export default OrderAssets;
