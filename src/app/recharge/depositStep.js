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
import { createWallet, getProfile } from "../api/profile";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loading";

export default function DepositStep() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeNewworkIndex, setActiveNewworkIndex] = useState(-1);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [isLoadingAddress, setIsLoaindingAddress] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();
  const { t } = useLanguage();

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserProfile(result.user);
    } else {
      showAlert(t("alertErrorMsg"));
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

  const fetchDepositAddress = async (token) => {
    setIsLoaindingAddress(true);
    const formData = new FormData();
    formData.append("token", token);
    let result = await createWallet(formData);
    if (result) {
      setUserWalletAddress(result.address);
    } else {
      showAlert(t("alertErrorMsg"), "error");
    }
    setIsLoaindingAddress(false);
  };

  useEffect(() => {
    fetchProfile();
    fetchTokenInfo();
  }, []);

  useEffect(() => {
    if (activeIndex != -1) {
      setUserWalletAddress(null);
      setActiveNewworkIndex(-1);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeNewworkIndex != -1) {
      if (tokenInfo && tokenInfo[activeIndex]) {
        const token = tokenInfo[activeIndex]?.name;
        const addressName = token + "Address";
        if (userProfile) {
          if (userProfile[addressName])
            setUserWalletAddress(userProfile[addressName]);
          else {
            fetchDepositAddress(token);
          }
        }
      }
    }
  }, [activeNewworkIndex]);

  if (!t) return <LoadingScreen />;
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
              className="md:w-96 w-64"
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
              value={activeNewworkIndex ?? ""}
              label="Network"
              className="md:w-96 w-64"
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
            {isLoadingAddress && (
              <div className="max-w-full animate-pulse">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-6 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            )}

            {userWalletAddress && (
              <>
                <p className="text-sm text-mainblack py-1">
                  {t("depositAddress")}
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
