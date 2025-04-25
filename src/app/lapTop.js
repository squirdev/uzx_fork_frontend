import Image from "next/image";
import { useLanguage } from "../../context/LanguageProvider";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./components/loading";

const LeadingDigitalExchange = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;

  const [yPosition, setYPosition] = useState(0);
  const componentRef = useRef(null);
  const skew = Math.min(50 - (yPosition + 600) * 0.06, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const { top } = componentRef.current.getBoundingClientRect();
        setYPosition(top);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="brands container mx-auto my-2 mt-12">
      <div className="w-full flex flex-col items-center">
        <p className="text-4xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  mt-16">
          {t("leadingExchange")}
        </p>
        <p className="text-white text-xl text-center my-9">
          {t("leadingExchangeDesc")}
        </p>
        <div className="w-full h-[800px]">
          <div
            ref={componentRef}
            className="relative flex flex-col items-center transition-transform origin-top duration-300"
            style={{
              transform: `perspective(900px) rotateX(${skew}deg)`,
            }}
          >
            <Image
              src="/enuben.png"
              className="absolute w-full top-0  rounded-t-md"
              width={900}
              height={600}
              alt="trading"
            />
          </div>
          <Image
            src="/base.png"
            className="w-full"
            width={900}
            height={600}
            alt="trading"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadingDigitalExchange;
