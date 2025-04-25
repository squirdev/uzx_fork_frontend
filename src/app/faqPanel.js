import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import LoadingScreen from "./components/loading";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open && "rotate-180"} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const FaqPanel = () => {
  const [open, setOpen] = useState(-1);

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  const { t } = useLanguage();

  if (!t) return <LoadingScreen />;

  const faqQuenstionAnswer = [
    {
      title: t("whatIsUzxDao"),
      description: t("whatIsUzxDaoDescription"),
    },
    {
      title: t("servicesUZXProvide"),
      description: t("servicesUZXProvideDescription"),
    },
    {
      title: t("UzxWorthyTserTrust"),
      description: t("UzxWorthyTserTrustDescroption"),
    },
  ];

  return (
    <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md my-12">
      <div className="w-full">
        <p className="text-5xl font-black text-center bg-gradient-to-r from-blue1 to-blue2 bg-clip-text text-transparent  mt-16">
          {t("faq")}
        </p>
        <div className="w-full gap-8 mt-12">
          {faqQuenstionAnswer.map((data, index) => (
            <Accordion
              key={index}
              open={open === index}
              icon={<Icon id={index} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(index)}
                className="text-white"
              >
                {data.title}
              </AccordionHeader>
              <AccordionBody className="text-md">
                {data.description}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPanel;
