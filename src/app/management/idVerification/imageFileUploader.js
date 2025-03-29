"use client";

import { useRef } from "react";
import { uploadImage } from "@/app/api/upload";
import { useLanguage } from "../../../../context/LanguageProvider";
import { useAlert } from "../../../../context/alertContext";

const ImageFileUploader = ({ imageUrl, setImageUrl, description }) => {
  const { showAlert } = useAlert();
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
      console.error("Upload failed", error);
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
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
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
