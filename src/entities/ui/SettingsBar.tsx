import React from "react";
import WordsAmountSpan from "../../shared/ui/WordsAmountSpan/WordsAmountSpan";
const SettingsBar: React.FC = () => {
  return (
    <div className="flex justify-between">
      <WordsAmountSpan />
    </div>
  );
};

export default SettingsBar;
