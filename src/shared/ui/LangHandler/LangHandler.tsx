import React from "react";
import { useMainStore, Languages } from "../../../app/stores/mainStore";
const LangHandler: React.FC = () => {
  const { currentLang, changeLang } = useMainStore();

  const handleLanguages = () => {
    if (currentLang === "RU") {
      return changeLang(Languages.ENG);
    }
    changeLang(Languages.RU);
  };
  return (
    <span
      className="font-bold text-xl cursor-pointer"
      onClick={handleLanguages}
    >
      {currentLang}
    </span>
  );
};

export default LangHandler;
