"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillInfoCircle,
} from "react-icons/ai";
import LoginLeftPanel from "../components/login/leftPanel";
import { useLanguage } from "../../../context/LanguageProvider";
import { resetPassword, sendVerifyEmail } from "../api/auth";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loading";
import VerifyButton from "../components/verifyButton";

function isValidEmailPassword(email, verifyCode, password, confirmPassword) {
  if (!email || !verifyCode || !password || !confirmPassword) return false;
  else if (password != confirmPassword) return false;
  else return true;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const { t } = useLanguage();

  const { showAlert } = useAlert();
  const router = useRouter();

  const handleSendVerifyCode = async () => {
    let result = await sendVerifyEmail(email);
    if (result) showAlert(t("verifyCodeSent"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  const handleSubmit = async () => {
    if (!isValidEmailPassword(email, verifyCode, password, confirmPassword)) {
      showAlert(t("inputAllDetail"), "error");
      return;
    } else {
      let result = await resetPassword(email, verifyCode, password);
      if (result) {
        showAlert(t("resetPasswordSuccess"), "success");
        router.push("/login");
      } else {
        showAlert(t("resetPasswordFailed"), "error");
      }
    }
  };
  if (!t) return <LoadingScreen />;
  return (
    <div className="content">
      <div className="w-full flex items-center bg-white">
        <LoginLeftPanel />
        <div className="w-3/5 flex items-center justify-center">
          <div className="w-[500px]">
            <div className="w-full flex flex-col justify-between gap-10">
              <p className="text-2xl font-bold">{t("findPassword")}</p>
              <div className="w-full flex flex-col gap-12">
                <div className="w-full">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#f5f5f6]"
                    label={t("email")}
                  />
                </div>
                <div className="relative flex w-full">
                  <Input
                    type="email"
                    label={t("emailVeriCode")}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="pr-20 bg-[#f5f5f6]"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <VerifyButton
                    t={t}
                    email={email}
                    handleSendVerifyEmail={handleSendVerifyCode}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label={t("newLoginPassword")}
                    className="bg-[#f5f5f6]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordShow ? "text" : "password"}
                    icon={
                      <button onClick={() => setPasswordShow(!passwordShow)}>
                        {passwordShow ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </button>
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <Input
                      label={t("confirmPassword")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-[#f5f5f6]"
                      type={confirmPasswordShow ? "text" : "password"}
                      icon={
                        <button
                          onClick={() =>
                            setConfirmPasswordShow(!confirmPasswordShow)
                          }
                        >
                          {confirmPasswordShow ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </button>
                      }
                    />
                  </div>
                  <div className="text-[#D7A931] flex items-start gap-2">
                    <AiFillInfoCircle />
                    <p className="text-[13px]">{t("confirmPassDesc")}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue1 to-blue2 py-2 rounded-full mt-12 text-black w-min px-24 self-center"
              >
                {t("submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
