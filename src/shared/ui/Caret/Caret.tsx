import { FC } from "react";
import "./Caret.css";
type CaretProps = {
  typedText: string;
};

const Caret: FC<CaretProps> = ({ typedText }) => {
  return (
    <div
      className="absolute bg-white w-[3px] h-[0.8em] caret-blink"
      style={{
        left: `${typedText.length * 0.6}em`,
        top: 9,
        transition: "left 0.08s ease-in-out",
      }}
    />
  );
};

export default Caret;
