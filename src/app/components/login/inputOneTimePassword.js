import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Typography,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { signInEmailOtp } from "@/app/api/auth";
import { login } from "../../../../redux/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAlert } from "../../../../context/alertContext";
import { useLanguage } from "../../../../context/LanguageProvider";

export function InputOneTimePassword({ userId, open, setOpen }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { showAlert } = useAlert();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const signInOtp = async (otp, id) => {
    let result = await signInEmailOtp(otp, id);
    console.log("resultresult", result);
    if (result && result.success) {
      let token = result?.token;
      showAlert(t("signinSuccess"), "success");
      dispatch(login({ token: token }));
      router.push("/");
    } else {
      setOpen(false);
      showAlert(t("signinFailed"), "error");
      console.log("ERROR");
    }
  };

  useEffect(() => {
    if (otp.some((letter) => letter === "")) return;

    const otpString = otp.join("");
    signInOtp(otpString, userId);
  }, [otp]);

  function handleBackspace(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      open={open}
      size="xs"
      handler={handleOpen}
      className="flex items-center bg-black justify-center"
    >
      <DialogBody className="px-0">
        <div className="w-full px-0 py-8 rounded-xl backdrop-blur-xl bg-black">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-center font-medium text-white"
          >
            {t("enterDigitOTP")}
          </Typography>
          <div className="my-4 flex items-center justify-center gap-2">
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <Input
                  type="text"
                  maxLength={1}
                  className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "!min-w-0 !w-10 !shrink-0",
                  }}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
                {index === 2 && (
                  <span className="text-2xl text-slate-700">-</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <Typography
            variant="small"
            className="text-center font-normal text-white"
          >
            {t("googleAuthentication")}
          </Typography>
        </div>
      </DialogBody>
    </Dialog>
  );
}
