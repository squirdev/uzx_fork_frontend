import {
  Button,
  Input,
  Option,
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
import { getTokenList, withdraw } from "../api/token";
import { useAlert } from "../../../context/alertContext";
import { getProfile } from "../api/profile";
import LoadingScreen from "../components/loading";
import { useRouter } from "next/navigation";

export default function WithdrawStep() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [address, setAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [activeNewworkIndex, setActiveNewworkIndex] = useState(0);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [currentCoinBalance, setCurrentCoinBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();
  const { t } = useLanguage();
  const router = useRouter();

  const fetchUserProfile = async () => {
    let result = await getProfile();
    if (result) setBalanceInfo(result.user);
    else {
      showAlert(t("alertErrorMsg"), "error");
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
    fetchTokenInfo();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!tokenInfo || !balanceInfo) return;
    let tokenName = tokenInfo[activeIndex]?.name;
    setCurrentCoinBalance(balanceInfo[tokenName] ?? 0);
  }, [balanceInfo, activeIndex]);

  const handleChangeAmount = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "" || (Number(inputValue) >= 0 && !isNaN(inputValue))) {
      if (inputValue <= currentCoinBalance) {
        setWithdrawAmount(inputValue);
      }
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      const network = tokenInfo[activeIndex]?.network[activeNewworkIndex].name;
      const amount = withdrawAmount;
      const token = tokenInfo[activeIndex].name;
      const withdrawAddress = address;

      let result = await withdraw(token, amount, network, withdrawAddress);
      if (result) {
        showAlert(t("withdrawSuccess"), "success");
      } else {
        showAlert(t("withdrawFailed"), "error");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
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
            {t("selectWithdrawCurrency")}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="py-8">
          {tokenInfo && (
            <Select
              variant="static"
              size="lg"
              label={t("crypto")}
              className="md:w-96 w-64"
            >
              {tokenInfo.map((data, index) => (
                <Option key={index} onClick={() => setActiveIndex(index)}>
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
            {t("withdrawalDetails")}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="py-8">
          {tokenInfo && (
            <Select
              variant="static"
              size="lg"
              label={t("network")}
              className="md:w-96 w-64"
            >
              {tokenInfo[activeIndex]?.network.map((data, subIndex) => (
                <Option
                  key={subIndex}
                  onClick={() => setActiveNewworkIndex(subIndex)}
                >
                  {data.name}
                </Option>
              ))}
            </Select>
          )}
          <div className="mt-12">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("enterAddress")}
              label={t("address")}
            />
          </div>
          <div className="mt-12 flex flex-col items-end">
            <p className="text-sm">
              {t("current")}: {currentCoinBalance}{" "}
              {tokenInfo && tokenInfo[activeIndex]?.name.toUpperCase()}
            </p>
            <Input
              placeholder={t("enterWithdrawAmount")}
              label={t("withdrawAmount")}
              value={withdrawAmount}
              onChange={handleChangeAmount}
            />
          </div>
          <div className="mt-12">
            <Button
              disabled={!withdrawAmount}
              loading={isLoading}
              onClick={handleWithdraw}
              className="bg-blue1"
            >
              {t("withdraw")}
            </Button>
          </div>
          <Typography variant="small" className="mt-8 whitespace-pre-line">
            {t("withdrawNote")}
          </Typography>
        </TimelineBody>
      </TimelineItem>
    </Timeline>
  );
}
