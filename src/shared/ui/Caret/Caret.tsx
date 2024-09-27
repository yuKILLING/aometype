import { FC } from "react";
import "./Caret.css";
type CaretProps = {
  typedText: string;
};

const Caret: FC<CaretProps> = ({ typedText }) => {
  return (
    <div
      className="absolute bg-white w-[2px] h-[1em] caret-blink"
      style={{
        left: `${typedText.length * 0.6}em`,
        top: 6,
        transition: "left 0.08s ease-in-out",
      }}
    />
  );
};

export default Caret;
