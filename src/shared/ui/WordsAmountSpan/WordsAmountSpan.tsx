import React, { useEffect } from "react";
import { useMainStore } from "../../../app/stores/mainStore";

const WordsAmountSpan: React.FC = () => {
  const { timer, isTypeActive, changeTimer, changeTypeActive } = useMainStore();

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isTypeActive && timer > 0) {
      timerInterval = window.setInterval(() => {
        changeTimer(timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(timerInterval);
      changeTypeActive(false); 
    }

    return () => clearInterval(timerInterval); 
  }, [isTypeActive, timer, changeTimer, changeTypeActive]);

  return <span className="text-white font-bold text-3xl">{timer}</span>;
};

export default WordsAmountSpan;
