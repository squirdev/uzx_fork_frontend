"use client";

import {
  Button,
  Card,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useCountries } from "use-react-countries";
import ImageFileUploader from "./imageFileUploader";
import { isValidDocument } from "@/app/helper";
import { useAlert } from "../../../../context/alertContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageProvider";
import { createDocument } from "@/app/api/profile";
import LoadingScreen from "@/app/components/loading";

const BasicVerification = () => {
  const { countries } = useCountries();
  const [country, setCountry] = useState(null);
  const [documentType, setDocumentType] = useState(-1);
  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [handHeldImageUrl, setHandHeldImageUrl] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const handleSubmitDocument = async () => {
    if (
      !isValidDocument(
        country,
        documentType,
        frontImageUrl,
        backImageUrl,
        handHeldImageUrl
      )
    ) {
      showAlert(t("inputAllDetail"));
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("country", country);
    formData.append("type", DOCUMENT_TYPE_LIST[documentType]);
    formData.append("img_front", frontImageUrl);
    formData.append("img_hand", handHeldImageUrl);
    if (documentType != 1) formData.append("img_back", backImageUrl);

    let result = await createDocument(formData);
    if (result) {
      showAlert(t("submitDocumentSuccess"), "success");
      router.push("/management");
    } else {
      showAlert(t("submitDocumentFailed"));
    }
    setIsUploading(false);
  };

  const DOCUMENT_TYPE_LIST = [t("idCard"), t("passport"), t("driverLicense")];

  return (
    <Card className="w-full p-8 ">
      <Typography>{t("basicVerificationDocDesc")}</Typography>
      <div className="w-full flex md:flex-row flex-col justifyc-center items-center gap-8 my-12">
        <div className="w-full flex flex-col items-start gap-1">
          <Typography className="font-bold">{t("selectDocCountry")}</Typography>
          <div className="w-full">
            <Select size="lg" selected={(element) => element}>
              {countries.map(({ name, flags }) => (
                <Option
                  key={name}
                  value={name}
                  onClick={() => setCountry(name)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={flags.svg}
                    alt={name}
                    className="h-4 w-6 object-cover"
                  />
                  {name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <Typography className="font-bold">{t("documentType")}</Typography>
          <Select size="lg">
            {DOCUMENT_TYPE_LIST.map((type, index) => (
              <Option
                key={index}
                value={DOCUMENT_TYPE_LIST[documentType]}
                onClick={() => setDocumentType(index)}
                className="text-sm font-bold"
              >
                {type}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <Typography variant="h6">{t("documentPhotoRequirements")}</Typography>
      <div className="text-sm mt-2">
        <p>{t("documentPhotoRequirementsDesc1")}</p>
        <p>{t("documentPhotoRequirementsDesc2")}</p>
        <p>{t("documentPhotoRequirementsDesc3")}</p>
        <p>{t("documentPhotoRequirementsDesc4")}</p>
      </div>
      <div className="mt-6">
        <Typography variant="h6">{t("documentPhotos")}</Typography>
        <div className="w-full flex md:flex-row flex-col items-center gap-12">
          <ImageFileUploader
            imageUrl={frontImageUrl}
            description={t("uploadFrontSideDocument")}
            setImageUrl={setFrontImageUrl}
          />
          {documentType != 1 && (
            <ImageFileUploader
              imageUrl={backImageUrl}
              description={t("uploadBackSideDocument")}
              setImageUrl={setBackImageUrl}
            />
          )}
          <ImageFileUploader
            imageUrl={handHeldImageUrl}
            description={t("uploadHandHolderDocument")}
            setImageUrl={setHandHeldImageUrl}
          />
        </div>
      </div>
      <div className="mt-8">
        <Button
          loading={isUploading}
          onClick={handleSubmitDocument}
          className="rounded-full text-black bg-gradient-to-r from-blue1 to-blue2"
        >
          {t("submitForReview")}
        </Button>
        <Typography variant="h6" className="text-sm mt-2">
          {t("estimatedReviewTime")}
        </Typography>
      </div>
    </Card>
  );
};

export default BasicVerification;
