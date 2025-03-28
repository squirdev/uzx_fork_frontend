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
  const { showAlert } = useAlert();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  if (!t) return <p className="text-white">Loading translations...</p>;

  const handleLogin = async () => {
    if (!isValidEmailandPassword(email, password)) {
      showAlert(t("inputAllDetail"), "error");
      return;
    } else {
      let result = await signInEmail(email, password);
      if (!result) showAlert(t("signinFailed"), "error");
      else {
        showAlert(t("signinSuccess"), "success");
        dispatch(login({ token: result.token, email: result.email }));
        router.push("/");
      }
    }
  };

  return (
    <TabPanel value={1}>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-12 mt-2">
          <Input
            value={email}
            label={t("email")}
            className="bg-[#f5f5f6]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <Input
              label={t("password")}
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
            <Link href="/findPwd" className="text-[13px] self-end text-blue1">
              {t("forgetPassword")}
            </Link>
          </div>
          <div className="w-full flex flex-col gap-6 items-center">
            <Button
              onClick={handleLogin}
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
        </div>
      </div>
    </TabPanel>
  );
}
