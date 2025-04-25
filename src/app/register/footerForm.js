import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export default function FooterForm({
  inviteCode,
  setInviteCode,
  onSubmit,
  isLoading,
}) {
  const [isInviteCode, setIsInviteCode] = useState(false);
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => setIsInviteCode(!isInviteCode)}
          className="flex items-center gap-1"
        >
          <p className="text-sm">{t("inviteCodeOptional")}</p>
          <BsChevronUp
            className={`transition-all duration-200 w-3 h-3 ${!isInviteCode && "rotate-180"}`}
          />
        </button>
        {isInviteCode && (
          <div className="w-full">
            <Input
              value={inviteCode}
              label={t("inviteCode")}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>
        )}
      </div>
      <Checkbox
        defaultChecked
        color="blue"
        label={
          <Typography
            color="blue-gray"
            className="flex items-center text-sm font-medium"
          >
            Accept
            <Typography
              as="a"
              href="/aboutUZX"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700 text-sm"
            >
              &nbsp; {t("userAgreement")}
            </Typography>
            and
            <Typography
              as="a"
              href="/aboutUZX"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700 text-sm"
            >
              &nbsp; {t("privacyPolicy")}
            </Typography>
          </Typography>
        }
      />
      <Button
        onClick={onSubmit}
        loading={isLoading}
        className="px-24 self-center text-sm font-bold bg-gradient-to-r from-blue1 to-blue2 text-black py-2 rounded-full"
      >
        {t("register")}
      </Button>
      <div className="w-full flex justify-center gap-4 text-[13px]">
        <p>{t("existingAccount")}</p>
        <Link href={"/login"} className="text-blue1">
          {t("signIn")}
        </Link>
      </div>
    </>
  );
}
