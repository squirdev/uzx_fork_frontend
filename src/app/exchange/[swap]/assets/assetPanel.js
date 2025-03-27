import { useLanguage } from "../../../../../context/LanguageProvider";

const AssetPanel = ({ swap }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full border-t border-white">
      <p className="text-white my-6">{t("assets")}</p>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <p className="text-white">{swap?.toUpperCase()}</p>
          <p className="text-md text-white">0</p>
        </div>
        <div className="w-full flex justify-between pl-6 text-[#939393]">
          <p className="">{t("frozen")}</p>
          <p className="text-md">0</p>
        </div>
        <div className="w-full flex justify-between pl-6 text-[#939393]">
          <p className="">{t("pending")}</p>
          <p className="text-md">0</p>
        </div>
      </div>
      <div className="w-full flex flex-col mt-6 border-t border-white py-6 gap-4">
        <div className="w-full flex justify-between">
          <p className="text-white">USDT</p>
          <p className="text-md text-white">0</p>
        </div>
        <div className="w-full flex justify-between pl-6 text-[#939393]">
          <p className="">{t("frozen")}</p>
          <p className="text-md">0</p>
        </div>
        <div className="w-full flex justify-between pl-6 text-[#939393]">
          <p className="">{t("pending")}</p>
          <p className="text-md">0</p>
        </div>
      </div>
    </div>
  );
};

export default AssetPanel;
