"use client";

import { Button, Card, Typography } from "@material-tailwind/react";
import { useLanguage } from "../../../../context/LanguageProvider";
import BasicVerification from "./basicVerification";
import { useEffect, useState } from "react";
import { getProfile } from "@/app/api/profile";
import { useAlert } from "../../../../context/alertContext";
import { useRouter } from "next/navigation";

const IDVerification = () => {
  const [isVerifyCardShow, setIsVerifyCardShow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchProfile = async () => {
    let result = await getProfile();
    if (result && result.user) {
      setUserProfile(result.user);
    } else {
      showAlert(t("alertErrorMsg"));
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full flex gap-12 mb-6">
      <div className="w-full my-8 flex flex-col gap-8">
        <Typography variant="h3">{t("idVerify")}</Typography>
        {isVerifyCardShow ? (
          <BasicVerification />
        ) : (
          <Card className="w-full p-8 bg-gradient-to-r from-blue2/10 to-white">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <Typography variant="h4">{t("basicVerification")}</Typography>
                <Typography variant="h7">
                  {t("basicVerificationDesc")}
                </Typography>
              </div>

              {userProfile?.isVerified == "notSent" ? (
                <Button
                  onClick={() => setIsVerifyCardShow(true)}
                  className="rounded-full bg-gradient-to-r from-blue1 to-blue2"
                >
                  <Typography className="text-black text-sm font-black">
                    {t("verifyOnWebsite")}
                  </Typography>
                </Button>
              ) : (
                <Typography className="text-black text-sm font-black uppercase">
                  {t("alreadySet")}
                </Typography>
              )}
            </div>
            <hr className="my-4" />
            <Typography className="text-black/60 text-sm">
              {t("governmentIssuedDocuments")}
            </Typography>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IDVerification;
