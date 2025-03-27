"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import LoginLeftPanel from "../components/login/leftPanel";

import { AiFillInfoCircle } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import { sendVerifyEmail } from "../api/auth";
import { useAlert } from "../../../context/alertContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const { showAlert } = useAlert();

  const handleSendSmsCode = async () => {
    let result = await sendVerifyEmail(email);
    if (result) showAlert(t("verifyCodeSent"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  const handleRetrieveKey = async () => {
    if (!email || !verifyCode) {
      showAlert(t("inputAllDetail"), "error");
      return;
    }
    let result = await resetPrivateKey(email, verifyCode);
    if (result) showAlert(t("retrievePrivateKeySucceess"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  return (
    <div className="content">
      <div className="w-full flex items-center bg-white">
        <LoginLeftPanel />
        <div className="w-3/5 flex items-center justify-center">
          <div className="w-[500px]">
            <div className="w-full flex flex-col gap-6">
              <p className="text-4xl font-bold">{t("retrievePrivateKey")}</p>
              <div className="w-full flex flex-col gap-12 mt-2">
                <Input
                  label={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#f5f5f6]"
                  placeholder="Enter the email bound to this account"
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
                  <Button
                    size="sm"
                    disabled={!email}
                    onClick={handleSendSmsCode}
                    className="!absolute right-1 top-1 rounded bg-inherit shadow-none text-blue1"
                  >
                    {t("send")}
                  </Button>
                </div>
                <div className="text-[#D7A931] flex items-start gap-2">
                  <AiFillInfoCircle />
                  <p className="text-[13px]">{t("confirmPassDesc")}</p>
                </div>
                <Button
                  onClick={handleRetrieveKey}
                  className="w-min self-center rounded-full bg-gradient-to-r from-blue1 to-blue2 py-3 px-24"
                >
                  <span className="text-black text-sm">{t("continue")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
