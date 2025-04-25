"use client";

import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiHistory } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import HeaderPanel from "./headerPanel";
import { getExchangeRate, getProfile, swapToken } from "../api/profile";
import { useAlert } from "../../../context/alertContext";
import { getTokenList, getTokenProfit } from "../api/token";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading";

export default function Home() {
  const { isAuth } = useSelector((state) => state.auth);
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, settoIndex] = useState(0);
  const [sourceCoin, setsourceCoin] = useState([
    "BTC",
    "ETH",
    "DOGE",
    "XRP",
    "LTC",
    "FIL",
    "ADA",
    "EOS",
    "SHIB",
    "BNB",
    "DOT",
    "CRV",
    "TRUMP",
    "SUI",
    "CRO",
    "SOL",
  ]);
  const { showAlert } = useAlert();
  const [targetCoin, setTargetCoin] = useState(["USDT", "USDC"]);
  const [fromValue, setfromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currentCoinBalance, setCurrentCoinBalance] = useState(0);
  const [curCurrencyProfit, setCurCurrencyProfit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleSwapCoin = () => {
    setFromIndex(toIndex);
    settoIndex(fromIndex);
    setTargetCoin(sourceCoin);
    setsourceCoin(targetCoin);
    setToValue(0);
    setfromValue(0);
  };

  const getCurCurrencyProfit = async () => {
    if (sourceCoin[fromIndex] == "USDT" || sourceCoin[fromIndex] == "USDC") {
      let result = await getTokenProfit(targetCoin[toIndex]);
      if (result && result.data) {
        setCurCurrencyProfit(1 - result.data.profit / 100);
      }
    } else {
      let result = await getTokenProfit(sourceCoin[fromIndex]);
      if (result && result.data) {
        setCurCurrencyProfit(1 + result.data.profit / 100);
      }
    }
  };

  const fetchExchangeRate = async () => {
    let rateRes = await getExchangeRate(
      sourceCoin[fromIndex],
      targetCoin[toIndex]
    );
    if (rateRes && rateRes.rate) {
      console.log("current Real Rate:", rateRes.rate);
      setExchangeRate(rateRes.rate);
    } else {
      showAlert(t("alertErrorMsg"), "error");
    }
  };

  const fetchUserProfile = async () => {
    let result = await getProfile();
    if (result) setBalanceInfo(result.user);
    else {
      showAlert(t("alertErrorMsg"), "error");
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    if (balanceInfo)
      setCurrentCoinBalance(
        balanceInfo[sourceCoin[fromIndex]?.toLowerCase()] ?? 0
      );

    getCurCurrencyProfit();

    setToValue(0);
    setfromValue(0);
  }, [fromIndex, toIndex, targetCoin, sourceCoin]);

  useEffect(() => {
    if (isAuth) fetchUserProfile();
  }, [isAuth]);

  useEffect(() => {
    if (balanceInfo)
      setCurrentCoinBalance(
        balanceInfo[sourceCoin[fromIndex]?.toLowerCase()] ?? 0
      );
  }, [balanceInfo]);

  const handleFromChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || (Number(inputValue) > 0 && !isNaN(inputValue))) {
      if (inputValue <= currentCoinBalance) {
        setfromValue(inputValue);
        setToValue(inputValue * exchangeRate * curCurrencyProfit);
      }
    }
  };

  const handleConvert = async () => {
    if (fromValue <= 0) return;
    if (!isAuth) {
      showAlert(t("loginFirst"), "error");
      return;
    }
    setIsLoading(true);
    let from = sourceCoin[fromIndex].toLowerCase();
    let to = targetCoin[toIndex].toLowerCase();
    let amount = Number(fromValue);
    let result = await swapToken(from, to, amount);
    if (result) {
      showAlert(t("swapTokenSuccess"), "success");
      fetchUserProfile();
    } else {
      showAlert(t("swapTokenFailed"), "error");
    }
    setIsLoading(false);
  };

  const handleSetMaxValue = () => {
    const curCurrency = sourceCoin[fromIndex]?.toLowerCase();
    const balance = balanceInfo[curCurrency] ?? 0;
    if (balance !== undefined) {
      setfromValue(balance);
      setToValue(balance * exchangeRate * curCurrencyProfit);
    }
  };

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <HeaderPanel />
      <div className="w-full bg-white py-12 pb-36">
        <div className="brands container mx-auto flex flex-col overflow-hidden drop-shadow-md">
          <div className="w-2/3 self-center flex flex-col items-center gap-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-black text-3xl font-bold">{t("convert")}</p>
              <Link href={"#"} className="flex items-center gap-2">
                <BiHistory className="w-5 h-5" />
                <p className="text-hoverblack">{t("records")}</p>
              </Link>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <p className="">{t("from")}</p>
                <p className="">
                  {t("balance")}: {currentCoinBalance} {sourceCoin[fromIndex]}
                </p>
              </div>
              <div className="w-full relative">
                <input
                  type="number"
                  min={0}
                  value={fromValue}
                  onChange={handleFromChange}
                  className="w-full bg-[#f5f5f5] text-[20px] outline-none border-none p-5 font-bold text-black"
                />
                <div className="absolute bg-[#f5f5f5] z-50 h-full flex px-3 items-center right-0 top-0 gap-12">
                  <button onClick={handleSetMaxValue} className="text-blue1">
                    {t("max")}
                  </button>
                  <Menu inert>
                    <MenuHandler>
                      <button className="flex items-center gap-3 text-base capitalize tracking-normal font-bold">
                        <span>{sourceCoin[fromIndex]}</span>
                        <BiChevronDown className="w-6 h-6" />
                      </button>
                    </MenuHandler>
                    <MenuList className="outline-none">
                      <ul className="flex max-h-48 overflow-auto w-full flex-col gap-1 outline-none">
                        {sourceCoin.map((title, index) => (
                          <MenuItem
                            key={index}
                            className="w-full"
                            onClick={() => setFromIndex(index)}
                          >
                            <Typography variant="h6">{title}</Typography>
                          </MenuItem>
                        ))}
                      </ul>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
            <button onClick={handleSwapCoin}>
              <AiOutlineTransaction className="w-8 h-8" />
            </button>
            <div className="w-full flex flex-col gap-4">
              <p className="">{t("to")}</p>
              <div className="w-full relative">
                <input
                  type="number"
                  disabled
                  value={toValue}
                  className="w-full bg-[#f5f5f5] text-[20px] outline-none border-none p-5 font-bold text-black cursor-not-allowed"
                />
                <div className="absolute bg-[#f5f5f5] z-50 h-full flex px-3 items-center right-0 top-0 gap-12">
                  <Menu>
                    <MenuHandler>
                      <button className="flex items-center gap-3 text-base capitalize tracking-normal font-bold">
                        <span>{targetCoin[toIndex]}</span>
                        <BiChevronDown className="w-6 h-6" />
                      </button>
                    </MenuHandler>
                    <MenuList className="gap-3 outline-none">
                      <ul className="flex max-h-48 overflow-auto w-full flex-col gap-1 outline-none">
                        {targetCoin.map((title, index) => (
                          <MenuItem
                            key={index}
                            className="w-full"
                            onClick={() => settoIndex(index)}
                          >
                            <Typography variant="h6" className="mb-1">
                              {title}
                            </Typography>
                          </MenuItem>
                        ))}
                      </ul>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-[#94959e]">
                  {t("exchangePrice")}: 1{sourceCoin[fromIndex]} ≈{" "}
                  {exchangeRate * curCurrencyProfit} {targetCoin[toIndex]}
                </p>
                <p className="text-[#94959e]">
                  {t("fee")}: {0}
                </p>
              </div>
            </div>
            <Button
              loading={isLoading}
              onClick={handleConvert}
              className="rounded-full flex justify-center py-3 bg-gradient-to-r from-blue1 to-blue2 bg-[#e9e9e9] w-1/2"
            >
              <span className="text-black text-lg">{t("convert")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
