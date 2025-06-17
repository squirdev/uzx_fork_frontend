import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Input,
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

import { useLanguage } from "../../../context/LanguageProvider";
import { createTokenDeposit, getTokenList } from "../api/token";
import { useAlert } from "../../../context/alertContext";
import { createWallet, getProfile } from "../api/profile";
import LoadingScreen from "../components/loading";

export default function DepositStep() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeNetworkIndex, setActiveNetworkIndex] = useState(-1);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [isLoadingAddress, setIsLoaindingAddress] = useState(false);
  const [txID, setTxID] = useState("");
  const [amount, setAmount] = useState(0);

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
    if (result && result.address) {
      setUserWalletAddress(result.address);
    } else {
      setUserWalletAddress(
        tokenInfo[activeIndex]?.network[activeNetworkIndex]?.address
      );
    }
    setIsLoaindingAddress(false);
  };

  useEffect(() => {
    if (!t) return;
    fetchProfile();
    fetchTokenInfo();
  }, [t]);

  useEffect(() => {
    if (activeIndex != -1) {
      setUserWalletAddress(null);
      setActiveNetworkIndex(-1);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeNetworkIndex != -1) {
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
  }, [activeNetworkIndex]);

  const handleConfirmDeposit = async () => {
    if (!txID) {
      showAlert("Please input correct transaction ID");
      return;
    } else if (!(Number(amount) > 0)) {
      showAlert("Please input your correct deposit amount");
      return;
    }

    const tokenName = tokenInfo[activeIndex].name;
    const networkName = tokenInfo[activeIndex].network[activeNetworkIndex].name;
    const networkAddress =
      tokenInfo[activeIndex].network[activeNetworkIndex].address;
    const result = await createTokenDeposit({
      tokenName,
      networkName,
      networkAddress,
      amount,
      txID,
    });
    if (result && result.data) {
      showAlert(t("depositSuccessMsg"), "success");
    } else {
      showAlert(t("alertErrorMsg"), "error");
    }
  };

  if (!t) return <LoadingScreen />;

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
              {tokenInfo?.map((data, index) => (
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
              value={activeNetworkIndex ?? ""}
              label="Network"
              className="md:w-96 w-64"
              onChange={(e) => setActiveNetworkIndex(e)}
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
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-sm text-mainblack py-1">
                    {t("depositAddress")}
                  </p>
                  <div className="flex  items-center justify-between gap-8 w-96">
                    <p className="text-sm text-mainblack">
                      {userWalletAddress}
                    </p>
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
                </div>
                <Input
                  variant="static"
                  value={txID}
                  onChange={(e) => setTxID(e.target.value)}
                  label="Transaction ID"
                  placeholder="充值后请输入交易ID"
                />
                <Input
                  variant="static"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="存款后请存入金额"
                />
                <span className="md:w-96 w-64 text-[12px]">
                  {t("depositDescMsg")}
                </span>
                <Button color="blue" onClick={handleConfirmDeposit}>
                  {t("confirm")}
                </Button>
              </div>
            )}
          </div>
        </TimelineBody>
      </TimelineItem>
    </Timeline>
  );
}
