import React, { useState, useEffect } from "react";
import getRandomWordsFromJSON from "../../../features/getWords";
import Caret from "../../../shared/ui/Caret/Caret";

let wordNumber: number = 0;

const TypeArea: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [wordsCount, setWordsCount] = useState<number>(40);
  const [typedText, setTypedText] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");

  // useEffect for initialization word list
  useEffect(() => {
    const newWords = getRandomWordsFromJSON(wordsCount);
    setWords(newWords);
    setCurrentWord(newWords[wordNumber]);
  }, [wordsCount]);

  useEffect(() => {
    // Handle Keys
    const handleKeyDown = (event: KeyboardEvent) => {
      // Setting typed symbol
      if (event.key.length === 1 && event.key !== " ") {
        if (typedText.length < currentWord.length) {
          setTypedText((prev) => prev + event.key);
        }
      }

      // Removing symbols
      if (event.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      }

      // Submittin word
      if (event.key === " ") {
        if (typedText === currentWord) {
          setTypedText("");
          wordNumber += 1;
          setCurrentWord(words[wordNumber]);
        }
      }
    };

    // Setting event listener and removing it.
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [words, currentWord, typedText]);

  // Letter classes
  const getLetterClass = (letter: string, index: number, wordIndex: number) => {
    // If word typed correctly, it will be WHITE COLOR
    if (wordIndex < wordNumber) {
      return "text-white";
    }
    // Letter checking
    if (wordIndex === wordNumber) {
      if (typedText[index] === undefined) {
        return "text-primaryForeground";
      } else if (typedText[index] === letter) {
        return "text-white";
      } else {
        return "text-red-500";
      }
    }

    return "text-primaryForeground";
  };

  return (
    <div className="flex flex-wrap gap-3 text-3xl items-center justify-center max-w-[1550px] break-words overflow-hidden">
      {/* Mapping words */}
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex flex-wrap relative">
          {/* Mapping Letters */}
          {word.split("").map((letter, letterIndex) => (
            <p
              key={letterIndex}
              className={`${getLetterClass(
                letter,
                letterIndex,
                wordIndex
              )} transition duration-75`}
            >
              {letter}
            </p>
          ))}
          {/* Caret  */}
          {wordIndex === wordNumber && <Caret typedText={typedText} />}
        </div>
      ))}
    </div>
  );
};

export default TypeArea;
