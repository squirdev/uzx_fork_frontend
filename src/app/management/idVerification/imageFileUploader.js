"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/api/upload";
import { useLanguage } from "../../../../context/LanguageProvider";
import { useAlert } from "../../../../context/alertContext";
import { Spinner } from "@material-tailwind/react";

const ImageFileUploader = ({ imageUrl, setImageUrl, description }) => {
  const { showAlert } = useAlert();
  const [isFullLoadImg, setIsFullLoadImg] = useState(false);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadImage(formData);
      setImageUrl(response.data?.url);
    } catch (error) {
      showAlert(t("fileUploadError"));
    }
  };

  return (
    <div>
      <div
        className="w-64 h-40 border-2 border-dashed flex items-center justify-center cursor-pointer"
        onClick={handleDivClick}
      >
        {imageUrl ? (
          <div className="w-full h-full relative">
            {!isFullLoadImg && (
              <div className="absolute w-full h-full flex justify-center items-center bg-black/40">
                <Spinner className="w-8 h-8" />
              </div>
            )}
            <img
              src={imageUrl}
              alt="Uploaded"
              onLoad={() => setIsFullLoadImg(true)}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <p className="text-center text-sm px-4">{description}</p>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageFileUploader;
