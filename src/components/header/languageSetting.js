import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Radio,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";

const { CiGlobe } = require("react-icons/ci");

const supportLanguage = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ch",
    name: "中文(简体)",
  },
  {
    code: "zh",
    name: "中文(繁體)",
  },
  {
    code: "de",
    name: "Deutsch",
  },
  {
    code: "jp",
    name: "日本語",
  },
  {
    code: "sp",
    name: "İspanyol",
  },
  {
    code: "tr",
    name: "Türkçe",
  },
];

const LanguageSetting = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    setLocale(selected);
  }, []);

  const { t, setLocale } = useLanguage();
  if (!t) return <p>Loading translations...</p>;

  const handleOpen = () => setOpen(!open);

  const handleSelectLanguage = () => {
    localStorage.setItem("language", selected);
    setOpen(!open);
    console.log(selected);
    setLocale(selected);
  };

  const handleChange = (value) => {
    setSelected(value.target.value);
  };
  return (
    <div>
      <button onClick={handleOpen} href="/management">
        <CiGlobe className="text-white w-6 h-6" />
      </button>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader>Select Language</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-2">
            {supportLanguage.map((data, index) => (
              <Radio
                key={index}
                name="type"
                value={data.code}
                checked={selected === data.code}
                onChange={handleChange}
                label={data.name}
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSelectLanguage}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default LanguageSetting;
