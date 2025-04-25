import { Button, TabPanel } from "@material-tailwind/react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageProvider";
import { useState } from "react";
import { useAlert } from "../../../context/alertContext";
import { signPrivateKey } from "../api/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { InputOneTimePassword } from "../components/login/inputOneTimePassword";
import LoadingScreen from "../components/loading";

export default function KeyLoginPanel() {
  const [privateKey, setprivateKey] = useState("");
  const [userID, setUserID] = useState(null);
  const [otpDialogShow, setOtpDialogShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  const { showAlert } = useAlert();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLoginWithKey = async () => {
    if (!privateKey) {
      setIsLoading(false);
      showAlert(t("inputAllDetail"), "error");
      return;
    }
    setIsLoading(true);
    let result = await signPrivateKey(privateKey);
    if (result.success) {
      if (result.isOtp) {
        setUserID(result.id);
        setOtpDialogShow(true);
      } else {
        showAlert(t("signinSuccess"), "success");
        dispatch(login({ token: result.token, username: result.username }));
        router.push("/");
      }
    } else {
      showAlert(t("signinFailed"), "error");
    }
    setIsLoading(false);
  };
  return (
    <TabPanel value={0}>
      <InputOneTimePassword
        userId={userID}
        open={otpDialogShow}
        setOpen={setOtpDialogShow}
      />
      <div className="w-full flex flex-col">
        <p className="mb-2">{t("accountPrivateKey")}</p>
        <textarea
          value={privateKey}
          onChange={(e) => setprivateKey(e.target.value)}
          className="outline-none bg-[#f5f5f6] h-[98px] px-4 py-3 rounded-md text-sm focus:border focus:border-blue1"
        />
        <Link href={"/retrieveprivate"} className="text-[13px] self-end mt-2">
          {t("forgotPriKey")}
        </Link>
        <Button
          loading={isLoading}
          onClick={handleLoginWithKey}
          className="bg-gradient-to-r from-blue1 to-blue2 text-black py-2 rounded-full mt-12 flex justify-center items-center"
        >
          {t("logIn")}
        </Button>
        <div className="w-full flex justify-center gap-4 mt-6 text-[13px]">
          <p>{t("notHaveAccount")}</p>
          <Link href={"/register"} className="text-blue1">
            {t("signUp")}
          </Link>
        </div>
      </div>
    </TabPanel>
  );
}
