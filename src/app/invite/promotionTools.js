import { Drawer, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const PromotionTools = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="brands container mx-auto my-2 my-16">
      <p className="text-4xl font-bold mb-8">{t("promotionTools")}</p>
      <div onClick={openDrawer} className="w-[345px] cursor-pointer mb-16">
        <div className="w-full h-[210px] bg-[url('/invite/back.png')] bg-cover flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-2xl text-white">{t("invitePromoGra")}</p>
          <p className="font-bold  text-white">{t("promotionalMaterials")}</p>
        </div>
        <p className="font-bold text-2xl mt-4">{t("invitePromoGra")}</p>
        <p className="text-sm my-2 text-hoverblack">
          {t("invitePromoGraDesc")}
        </p>
      </div>
      <Drawer open={open} onClose={closeDrawer} className="p-4 text-center">
        <div className="mt-12 my-6">
          <Typography variant="h5" color="blue-gray">
            {t("invitePromoImage")}
          </Typography>
        </div>
        <Image src={"/invite/promo.png"} width={440} height={560} alt="PNG" />
        <button className="w-full rounded-full bg-black text-white mt-12 py-2">
          {t("confirm")}
        </button>
      </Drawer>
    </div>
  );
};
