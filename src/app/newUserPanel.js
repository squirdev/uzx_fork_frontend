import Image from "next/image";
import { useLanguage } from "../../context/LanguageProvider";
import {
  Button,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const NewUserPanel = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md my-12">
      <div className="w-full">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  mt-16">
          {t("newUserOnly")}
        </p>
        <p className="text-white text-center mt-4 mb-12 text-xl">
          {t("newUserSignup")}
        </p>
        <div className="w-full grid grid-cols-2 gap-8 pt-12">
          <div>
            <Timeline className="h-full flex flex-col justify-between">
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
                    1
                  </TimelineIcon>
                  <Typography variant="h5" color="white">
                    {t("registerUZXAccount")}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="py-8 text-hoverblack">
                  <p className="text-[#939393]"> {t("unlockUZX")}</p>
                  {!isAuth && (
                    <Link href="/register">
                      <Button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full mt-8">
                        <p className="text-black">{t("register")}</p>
                      </Button>
                    </Link>
                  )}
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
                    2
                  </TimelineIcon>
                  <Typography variant="h5" color="white">
                    {t("invitefrientToUzx")}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="py-8 text-hoverblack">
                  <p className="text-[#939393]">{t("inviteFriendWin")}</p>
                  {isAuth && (
                    <Link href="/invite">
                      <Button className="bg-gradient-to-r from-blue1 to-blue2 rounded-full mt-8">
                        <p className="text-black">{t("invite")}</p>
                      </Button>
                    </Link>
                  )}
                </TimelineBody>
              </TimelineItem>
              <TimelineItem className="h-full">
                <TimelineHeader>
                  <TimelineIcon className="w-8 h-8 flex justify-center bg-blue1 items-center rounded-full">
                    3
                  </TimelineIcon>
                  <Typography variant="h5" color="white">
                    {t("completeFirstTransaction")}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="py-8"></TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
          <Image src="/newuser.png" alt="new" width={462} height={523} />
        </div>
      </div>
    </div>
  );
};

export default NewUserPanel;
