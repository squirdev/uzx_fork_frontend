"use client";

import LoadingScreen from "@/app/components/loading";
import { useLanguage } from "../../../../context/LanguageProvider";

const { Button } = require("@material-tailwind/react");
const { default: Image } = require("next/image");
const {
  AiFillExclamationCircle,
  AiFillCheckCircle,
} = require("react-icons/ai");

export default function SecuritySettingItem({
  title,
  image,
  description,
  email,
  verified,
  onClick,
}) {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="w-full flex justify-between items-center py-4 border-b border-hoverblack/10">
      <div className="w-full flex items-center md:gap-4 gap-1">
        <Image src={image} width={36} height={36} alt="image" />
        <div className="flex flex-col">
          <p>{title}</p>
          <p className="text-sm text-hoverblack/70 md:block hidden">
            {description}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-2 justify-center items-center">
        {verified ? (
          <>
            <AiFillCheckCircle className="text-2xl text-green-500" />
            <p>{email}</p>
          </>
        ) : (
          <>
            <AiFillExclamationCircle className="text-2xl text-red-500" />
            <p>{t("notBound")}</p>
          </>
        )}
      </div>
      <div className="w-full flex justify-end">
        {verified ? (
          <p className="text-sm">{t("alreadyBound")}</p>
        ) : (
          <Button
            onClick={onClick}
            variant="outlined"
            className="rounded-full md:px-12 px-4"
          >
            {t("bind")}
          </Button>
        )}
      </div>
    </div>
  );
}
