import {
  Badge,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiSolidBell } from "react-icons/bi";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "@/app/components/loading";

const Notification = ({ message }) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="md:block hidden">
      <div onClick={openDrawer}>
        <Badge>
          <BiSolidBell className="text-white w-6 h-6" />
        </Badge>
      </div>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="my-8 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {t("notificationCenter")}
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 text-center font-normal">
          {t("noDataAvailable")}
        </Typography>
      </Drawer>
    </div>
  );
};

export default Notification;
