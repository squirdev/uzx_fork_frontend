import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import Image from "next/image";
import { getProfile } from "../api/profile";
import { createEarnTask, getEarns } from "../api/earn";
import { useAlert } from "../../../context/alertContext";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";
import { useRouter } from "next/navigation";

export function FixedEarnDialog({ token, open, setOpen }) {
  const [userProfile, setUserProfile] = useState(null);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [earnAmount, setEarnAmount] = useState(0);
  const [earnSetting, setEarnSetting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { t } = useLanguage();
  const router = useRouter();

  const fetchBalanceDetail = async () => {
    const result = await getProfile();
    if (result && result.user) setUserProfile(result.user);
  };

  const fetchEarns = async () => {
    const result = await getEarns();
    if (result && result.data) setEarnSetting(result.data);
  };

  useEffect(() => {
    fetchBalanceDetail();
    fetchEarns();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile[token]) {
      setAvailableAmount(userProfile[token]);
    }
  }, [userProfile, token]);

  const handleOpen = () => setOpen(!open);
  const [earnTypeIndex, setEarnTypeIndex] = useState(0);

  const handleConfirmEarn = async () => {
    try {
      setIsLoading(true);
      const duration = earnSetting[earnTypeIndex].duration;
      const percent = earnSetting[earnTypeIndex].percent;
      const amount = earnAmount;
      const result = await createEarnTask({
        percent: percent,
        duration: duration,
        amount: amount,
        token: token,
      });
      if (result) {
        showAlert(result.message, "success");
        router.push("/saveCoins/detail");
      }
    } catch (error) {
      showAlert(t("alertErrorMsg"));
    } finally {
      setIsLoading(false);
      handleOpen();
    }
  };

  if (!t) return <LoadingScreen />;
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <div className="flex gap-2 items-center">
          <Image
            src={`/coin/${token.toUpperCase()}.png`}
            width={36}
            height={36}
            alt="LL"
          />
          <div className="flex flex-col">
            <Typography variant="h5">{token.toUpperCase()}</Typography>
            <Typography variant="small">
              Est DPR0.014664%Est APR5.35236%
            </Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="flex flex-col gap-6">
        <div className="flex flex-col">
          <p>{t("ARPTerm")}</p>
          <div className="flex items-center gap-2">
            {earnSetting &&
              earnSetting.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setEarnTypeIndex(index)}
                  className={`rounded-sm cursor-pointer p-3 ${earnTypeIndex == index ? "bg-white border-blue1 border text-black" : "bg-gray-100"} flex flex-col`}
                >
                  <p className="font-bold">{item.percent} %</p>
                  <p className="text-[12px]">
                    {item.duration} {t("days")}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>{t("amount")}</p>
          <div className="relative flex w-full">
            <Input
              type="number"
              label={t("amount")}
              min={0}
              max={availableAmount}
              value={earnAmount}
              onChange={(e) =>
                setEarnAmount(Math.min(e.target.value, availableAmount))
              }
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              onClick={() => setEarnAmount(availableAmount)}
              className="!absolute right-1 top-1 rounded"
            >
              {t("all")}
            </Button>
          </div>
          <div className="flex text-sm gap-2">
            <p>{t("available")}</p>
            <p>{availableAmount}</p>
          </div>
        </div>
        <p>{t("cancelEarnWaring")}</p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>{t("cancel")}</span>
        </Button>
        <Button
          color="green"
          variant="gradient"
          loading={isLoading}
          onClick={handleConfirmEarn}
        >
          <span>{t("confirm")}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
