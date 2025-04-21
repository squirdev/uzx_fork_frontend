import {
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import { getTokenList } from "../api/token";
import { useAlert } from "../../../context/alertContext";
import { getProfile } from "../api/profile";
import { useRouter } from "next/navigation";

export default function DepositStep() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeNewworkIndex, setActiveNewworkIndex] = useState(-1);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const router = useRouter();
  const { showAlert } = useAlert();
  const { t } = useLanguage();

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserProfile(result.user);
    } else {
      // showAlert(t("alertErrorMsg"));
      router.push("/login");
    }
  };

  const fetchTokenInfo = async () => {
    let result = await getTokenList();
    if (result && result.data) {
      setTokenInfo(result.data);
    } else {
      showAlert(t("alertErrorMsg"), "error");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTokenInfo();
  }, []);

  useEffect(() => {
    setActiveNewworkIndex(-1);
  }, [activeIndex]);

  useEffect(() => {
    setUserWalletAddress(null);
    if (tokenInfo && tokenInfo[activeIndex]) {
      const token = tokenInfo[activeIndex]?.name;
      const addressName = token + "Address";
      if (userProfile && userProfile[addressName])
        setUserWalletAddress(userProfile[addressName]);
    }
  }, [activeIndex, tokenInfo, userProfile]);

  if (!t) return <p className="text-white">Loading translations...</p>;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      tokenInfo[activeIndex]?.network[activeNewworkIndex]?.address
    );
  };
  return (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
            1
          </TimelineIcon>
          <Typography variant="h5" color="blue-gray">
            {t("selectCurrency")}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="py-8">
          {tokenInfo && (
            <Select
              variant="static"
              size="lg"
              label={t("crypto")}
              className="w-96"
              onChange={(e) => {
                setActiveIndex(e);
              }}
            >
              {tokenInfo.map((data, index) => (
                <Option key={index} value={index}>
                  {data.name?.toUpperCase()}
                </Option>
              ))}
            </Select>
          )}
        </TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineHeader>
          <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
            2
          </TimelineIcon>
          <Typography variant="h5" color="blue-gray">
            {t("selectNetwork")}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="py-8">
          {tokenInfo && tokenInfo[activeIndex] && (
            <Select
              variant="static"
              size="lg"
              label="Network"
              className="w-96"
              onChange={(e) => setActiveNewworkIndex(e)}
            >
              {tokenInfo[activeIndex]?.network.map((data, subIndex) => (
                <Option key={subIndex} value={subIndex}>
                  {data.name}
                </Option>
              ))}
            </Select>
          )}
        </TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
            3
          </TimelineIcon>
          <Typography variant="h5" color="blue-gray">
            {t("chargeDetails")}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="py-8">
          <div className="flex flex-col gap-3">
            {/* {tokenInfo &&
              tokenInfo[activeIndex] &&
              tokenInfo[activeIndex].network &&
              tokenInfo[activeIndex].network[activeNewworkIndex] &&
              tokenInfo[activeIndex].network[activeNewworkIndex].address && (
                <div>
                  <p className="text-sm text-mainblack py-1">
                    {t("depositAddress")}1
                  </p>
                  <div className="flex items-center justify-between gap-8 w-96">
                    <p className="text-sm text-mainblack">
                      {tokenInfo &&
                        tokenInfo[activeIndex]?.network[activeNewworkIndex]
                          ?.address}
                    </p>
                    <div onClick={handleCopyAddress}>
                      <Popover>
                        <PopoverHandler>
                          <button className="text-blue1">{t("copy")}</button>
                        </PopoverHandler>
                        <PopoverContent className="p-2">
                          {t("copied")}
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )} */}
            {userWalletAddress && activeNewworkIndex !== -1 && (
              <>
                <p className="text-sm text-mainblack py-1">
                  {t("depositAddress")}2
                </p>
                <div className="flex items-center justify-between gap-8 w-96">
                  <p className="text-sm text-mainblack">{userWalletAddress}</p>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(userWalletAddress);
                    }}
                  >
                    <Popover>
                      <PopoverHandler>
                        <button className="text-blue1">{t("copy")}</button>
                      </PopoverHandler>
                      <PopoverContent className="p-2">
                        {t("copied")}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </>
            )}
          </div>
        </TimelineBody>
      </TimelineItem>
    </Timeline>
  );
}
