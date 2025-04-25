import { Button, Input, TabPanel } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import { useAlert } from "../../../context/alertContext";
import { signInEmail } from "../api/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { InputOneTimePassword } from "../components/login/inputOneTimePassword";
import LoadingScreen from "../components/loading";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidEmailandPassword(email, password) {
  if (!email || !password) return false;
  else if (!isValidEmail(email)) return false;
  else return true;
}

export default function EmailLoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [userID, setUserID] = useState(null);
  const [otpDialogShow, setOtpDialogShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmailandPassword(email, password)) {
      showAlert(t("inputAllDetail"), "error");
      return;
    }
    setIsLoading(true);
    let result = await signInEmail(email, password);
    if (!result) {
      showAlert(t("signinFailed"), "error");
      setIsLoading(false);
      return;
    }
    if (result.isOtp) {
      setIsLoading(false);
      setUserID(result.id);
      setOtpDialogShow(true);
    } else {
      setIsLoading(false);
      showAlert(t("signinSuccess"), "success");
      dispatch(login({ token: result.token, email: result.email }));
      router.push("/");
    }
  };

  return (
    <TabPanel value={1}>
      <InputOneTimePassword
        userId={userID}
        open={otpDialogShow}
        setOpen={setOtpDialogShow}
      />
      <div className="w-full flex flex-col">
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-12 mt-2"
        >
          <Input
            value={email}
            autoFocus={true}
            label={t("email")}
            className="bg-[#f5f5f6]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <Input
              label={t("password")}
              className="bg-[#f5f5f6]"
              value={password}
              autoFocus={true}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordShow ? "text" : "password"}
              icon={
                <button
                  className="outline-none"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {passwordShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              }
            />
            <Link
              href="/findPwd"
              className="text-[13px] self-end text-blue1 outline-none"
            >
              {t("forgetPassword")}
            </Link>
          </div>
          <div className="w-full flex flex-col gap-6 items-center">
            <Button
              loading={isLoading}
              onClick={handleLogin}
              type="submit"
              className="rounded-full bg-gradient-to-r from-blue1 to-blue2 py-2 px-24"
            >
              <span className="text-black">{t("logIn")}</span>
            </Button>
            <div className="w-full flex justify-center gap-4 text-[13px]">
              <p>{t("notHaveAccount")}</p>
              <Link href={"/register"} className="text-blue1">
                {t("signUp")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </TabPanel>
  );
}
