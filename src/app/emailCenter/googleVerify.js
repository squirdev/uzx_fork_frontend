"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { BiCopy } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useAlert } from "../../../context/alertContext";
import { useLanguage } from "../../../context/LanguageProvider";
import { QRCodeCanvas } from "qrcode.react";
import { getOTP, verifyOTP } from "../api/profile";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loading";

const GoogleVerify = () => {
  const { showAlert } = useAlert();
  const [verifyCode, setVerifyCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeStr, setQrCodeStr] = useState("");

  const router = useRouter();

  const { t } = useLanguage();

  const fetgetOTP = async () => {
    setQrLoading(true);
    let result = await getOTP();
    if (!result || !result.data) {
      showAlert(t("getOptError"));
    } else {
      setQrCodeUrl(result.data.link);
      setQrCodeStr(result.data.secret);
    }
    setQrLoading(false);
  };

  useEffect(() => {
    fetgetOTP();
  }, []);

  const handleGoogleVerify = async () => {
    if (!verifyCode || !qrCodeStr) return;
    let result = await verifyOTP(verifyCode, qrCodeStr);
    if (result) {
      showAlert(t("googleVerificationSuccess"), "success");
      router.push("/management");
    } else {
      showAlert(t("googleVerificationFailed"));
    }
  };
  if (!t) return <LoadingScreen />;
  return (
    <div className="my-12 flex flex-col gap-8 w-96">
      <Typography variant="h4" className="font-bold">
        {t("googleVerification")}
      </Typography>
      <div className="w-full flex flex-col">
        <Typography variant="h6">{t("scanCodeBinding")}</Typography>
        <div className="relative w-[140px] h-[140px] flex items-center justify-center">
          {qrLoading ? (
            <div className="absolute z-50 inset-0 w-full h-full flex items-center justify-center bg-gray-300 animate-pulse">
              <Spinner />
            </div>
          ) : (
            <QRCodeCanvas value={qrCodeUrl} size={140} />
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Typography variant="h6">{qrCodeStr}</Typography>
        <div onClick={() => navigator.clipboard.writeText(qrCodeStr)}>
          <Popover>
            <PopoverHandler>
              <BiCopy className="text-blue1" />
            </PopoverHandler>
            <PopoverContent className="p-2">{t("copied")}</PopoverContent>
          </Popover>
        </div>
      </div>
      <Input
        label={"Google Verification Code"}
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value)}
        className="pr-20 bg-[#f5f5f6]"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        disabled={!verifyCode}
        onClick={handleGoogleVerify}
        className="bg-mainblack/80"
      >
        {t("save")}
      </Button>
    </div>
  );
};

export default GoogleVerify;
