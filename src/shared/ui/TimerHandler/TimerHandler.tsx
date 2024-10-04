import React, { useEffect } from "react";
import { useMainStore } from "../../../app/stores/mainStore";

const WordsHandler: React.FC = () => {
  const { timer, changeTimer } = useMainStore();
  return (
    <div className="flex gap-2 cursor-pointer">
      <span
        className={
          timer === 15
            ? "text-primaryForeground font-bold text-xl"
            : "text-white font-bold text-xl"
        }
        onClick={() => changeTimer(15)}
      >
        15
      </span>
      <span
        className={
          timer === 30
            ? "text-primaryForeground font-bold text-xl"
            : "text-white font-bold text-xl"
        }
        onClick={() => changeTimer(30)}
      >
        30
      </span>
      <span
        className={
          timer === 60
            ? "text-primaryForeground font-bold text-xl"
            : "text-white font-bold text-xl"
        }
        onClick={() => changeTimer(60)}
      >
        60
      </span>
    </div>
  );
};

export default WordsHandler;
