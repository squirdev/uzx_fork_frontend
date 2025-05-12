"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";
import { cancelEarnTask, getEarnTaskList } from "@/app/api/earn";
import { getSimplifiedDateTime } from "@/app/helper";
import Countdown from "@/app/components/countDown";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useAlert } from "../../../../context/alertContext";

const Home = () => {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const [earnTaskList, setEarnTaskList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [cancelEarnTaskIndex, setCancelEarnTaskIndex] = useState(-1);

  const fetchEarnTaskList = async () => {
    const result = await getEarnTaskList();
    if (result && result.data) setEarnTaskList(result.data);
    console.log("DATA", result.data);
  };

  useEffect(() => {
    fetchEarnTaskList();
  }, []);

  const handleCancelEarnTask = async (earnTaskId) => {
    try {
      setIsLoading(true);
      console.log("earnTaskId", earnTaskId);
      const result = await cancelEarnTask({ earnTaskId });
      if (result) showAlert(t("cancelEarnTaskSuccess"), "success");
      else showAlert(t("cancelEarnTaskError"));
    } catch (error) {
      console.log("ERROR", error);
      showAlert(t("cancelEarnTaskError"));
    } finally {
      setIsLoading(false);
      setConfirmModalShow(false);
    }
  };

  const handleConfirmCancelEarnTask = () => {
    const earnTaskId = earnTaskList[cancelEarnTaskIndex]._id;
    handleCancelEarnTask(earnTaskId);
  };

  const handleClickCancelEarnTask = (index) => {
    setCancelEarnTaskIndex(index);
    setConfirmModalShow(true);
  };

  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full flex flex-col items-center py-32 bg-white md:px-0 px-4">
      <Dialog open={confirmModalShow} handler={setConfirmModalShow}>
        <DialogHeader>{t("warning")}</DialogHeader>
        <DialogBody>{t("cancelEarnWaring")}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setConfirmModalShow(false)}
            className="mr-1"
          >
            <span>{t("cancel")}</span>
          </Button>
          <Button
            variant="gradient"
            loading={isLoading}
            color="green"
            onClick={handleConfirmCancelEarnTask}
          >
            <span>{t("confirm")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="w-full md:overflow-hidden overflow-x-scroll">
        <div className="w-[1000px] md:w-full grid grid-cols-7 px-6 pb-3 items-center">
          <p>{t("amount")}</p>
          <p>{t("token")}</p>
          <p>{t("percent")}</p>
          <p>{t("completeTime")}</p>
          <p>{t("restTime")}</p>
          <p>{t("status")}</p>
          <p>{t("operation")}</p>
        </div>
        <div className="w-[1000px] md:w-full">
          {earnTaskList &&
            earnTaskList.map((data, index) => (
              <div
                key={index}
                className="w-full grid grid-cols-7 items-center text-black font-bold cursor-pointer p-6 border-b hover:bg-[#f0f0f0]"
              >
                <p>{Number(data.amount).toFixed(3)}</p>
                <p>{data.token?.toUpperCase()}</p>
                <p>{data.percent}%</p>
                <p>{getSimplifiedDateTime(data.expireAt)}</p>
                <Countdown expireAt={data.expireAt} />
                <p>{data.isFinished ? t("finished") : t("waiting")}</p>
                <div>
                  {!data.isFinished && (
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleClickCancelEarnTask(index)}
                    >
                      {t("cancel")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
