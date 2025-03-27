import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  TabPanel,
} from "@material-tailwind/react";
import { AiFillInfoCircle } from "react-icons/ai";
import FooterForm from "./footerForm";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { getPrivateKey, signUpPrivate } from "../api/auth";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";

export default function KeyRegisterPanel() {
  const [accountPrivateKey, setAccountPrivateKey] = useState("");
  const [nickName, setNickName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const { showAlert } = useAlert();
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  const router = useRouter();

  useEffect(() => {
    const fetchPrivateKey = async () => {
      let privateKey = await getPrivateKey();
      if (privateKey) setAccountPrivateKey(privateKey.privateKey);
      else showAlert(t("getPrivateKeyError"), "error");
    };
    fetchPrivateKey();
  }, []);

  const handleSubmit = async () => {
    if (!accountPrivateKey || !nickName) {
      showAlert(t("inputAllDetail"), "error");
      return;
    }
    let signUpResult = await signUpPrivate(accountPrivateKey, nickName);
    if (signUpResult) {
      showAlert(t("signupSuccess"), "success");
      router.push("/login");
    } else showAlert(t("signupFailed"), "error");
  };

  return (
    <TabPanel value={0}>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <p className="mb-2 text-sm">{t("accountPrivateKey")}</p>
          <div onClick={() => navigator.clipboard.writeText(accountPrivateKey)}>
            <Popover>
              <PopoverHandler>
                <button className="text-blue1 text-sm">{t("copy")}</button>
              </PopoverHandler>
              <PopoverContent className="p-2">{t("copied")}</PopoverContent>
            </Popover>
          </div>
        </div>
        <textarea
          value={accountPrivateKey}
          onChange={(e) => setAccountPrivateKey(e.target.value)}
          className="outline-none bg-[#f5f5f6] h-[120px] overflow-auto px-4 py-3 rounded-md text-sm focus:border focus:border-blue1"
        />
        <div className="text-[#D7A931] flex items-start gap-2">
          <div className="flex flex-col items-start pt-1">
            <AiFillInfoCircle className="w-4 h-4" />
          </div>
          <p className="text-[13px]">{t("registerDesc")}</p>
        </div>
        <div className="w-full">
          <Input
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            label="Nick Name"
          />
        </div>
        <FooterForm
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          onSubmit={handleSubmit}
        />
      </div>
    </TabPanel>
  );
}
