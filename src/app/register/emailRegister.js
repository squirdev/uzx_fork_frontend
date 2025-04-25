import { Input, TabPanel, Button } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FooterForm from "./footerForm";
import { useLanguage } from "../../../context/LanguageProvider";
import { sendVerifyEmail, signUpEmail } from "../api/auth";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import { isValidEmailRegister } from "../helper";
import LoadingScreen from "../components/loading";

export default function EmailRegisterPanel() {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleRegister = async () => {
    if (!isValidEmailRegister(email, verifyCode, password, confirmPassword)) {
      showAlert(t("inputAllDetail"), "error");
      return;
    } else {
      setIsLoading(true);
      let result = await signUpEmail(email, verifyCode, password);
      if (result) {
        showAlert(t("signupSuccess"), "success");
        router.push("/login");
      } else {
        showAlert(t("signupFailed"), "error");
      }
      setIsLoading(false);
    }
  };

  const handleSendVerifyEmail = async () => {
    let result = await sendVerifyEmail(email);
    if (result) showAlert(t("verifyCodeSent"), "success");
    else showAlert(t("alertErrorMsg"), "error");
  };

  return (
    <TabPanel value={1}>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-12 mt-4">
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
              onClick={handleSendVerifyEmail}
              className="!absolute right-1 top-1 rounded bg-inherit shadow-none text-blue1"
            >
              {t("send")}
            </Button>
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
                  {passwordShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              }
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Input
                type={confirmPasswordShow ? "text" : "password"}
                label={t("confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#f5f5f6]"
                icon={
                  <button
                    onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
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
            <FooterForm
              inviteCode={inviteCode}
              isLoading={isLoading}
              setInviteCode={setInviteCode}
              onSubmit={handleRegister}
            />
          </div>
        </div>
      </div>
    </TabPanel>
  );
}
