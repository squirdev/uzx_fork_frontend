import { useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function CommonProblem() {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="bg-white brands container mx-auto my-16">
      <div className="w-full rounded-xl flex flex-col pt-24 gap-8">
        <p className="text-4xl text-center font-bold">{t("commonProblem")}</p>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            {t("commonProblem1")}
          </AccordionHeader>
          <AccordionBody>{t("commonProblemAnswer1")}</AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            {t("commonProblem2")}
          </AccordionHeader>
          <AccordionBody>{t("commonProblemAnswer2")}</AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}
