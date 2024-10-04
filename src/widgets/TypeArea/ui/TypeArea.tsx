import React, { useState, useEffect, useCallback } from "react";
import SettingsBar from "../../../entities/ui/SettingsBar";
import getRandomWordsFromJSON from "../../../features/getWords";
import Caret from "../../../shared/ui/Caret/Caret";
import { useMainStore } from "../../../app/stores/mainStore";

const TypeArea: React.FC = () => {
  const { wordsAmount, currentLang, isTypeActive, changeTypeActive, timer } =
    useMainStore();

  const [words, setWords] = useState<string[]>([]);
  const [typedText, setTypedText] = useState<string>("");
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [wordNumber, setWordNumber] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [netWpm, setNetWpm] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  const [typingFinished, setTypingFinished] = useState<boolean>(false);

  useEffect(() => {
    const newWords = getRandomWordsFromJSON(wordsAmount, currentLang);
    setWords(newWords);
    setCurrentWord(newWords[0]);
    setTypedText("");
    setTypedWords([]);
    setWordNumber(0);
    setErrorCount(0);
    setTotalTypedChars(0);
    setStartTime(null);
    setWpm(0);
    setNetWpm(0);
    setTypingFinished(false);
  }, [wordsAmount, currentLang]);

  const handleWordSubmit = () => {
    if (typingFinished) return;

    const isCorrect = typedText === currentWord;

    if (!isCorrect) {
      setErrorCount((prev) => prev + 1);
    }

    setTypedWords((prev) => [...prev, typedText]);
    setTotalTypedChars((prev) => prev + typedText.length);

    const nextWordNumber = wordNumber + 1;
    if (nextWordNumber < wordsAmount) {
      setWordNumber(nextWordNumber);
      setCurrentWord(words[nextWordNumber]);
      setTypedText("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typingFinished) return;

      if (
        event.key === "Alt" ||
        event.key === "Control" ||
        event.key === "Tab" ||
        event.key === "Shift"
      ) {
        return;
      }

      if (!isTypeActive) {
        changeTypeActive(true);
      }

      if (!startTime) {
        setStartTime(Date.now());
      }

      if (event.key.length === 1 && event.key !== " ") {
        if (typedText.length < currentWord.length) {
          setTypedText((prev) => prev + event.key);
        }
      }

      if (event.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      }

      if (event.key === " ") {
        event.preventDefault();
        handleWordSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    typedText,
    currentWord,
    wordNumber,
    isTypeActive,
    changeTypeActive,
    startTime,
    typingFinished,
  ]);

  useEffect(() => {
    if (!startTime || typingFinished) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTypingFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, typingFinished]);

  useEffect(() => {
    if (typingFinished) {
      calculateWPM();
    }
  }, [typingFinished]);

  const calculateWPM = useCallback(() => {
    if (!startTime || totalTypedChars === 0) return;

    const elapsedTime = (Date.now() - startTime) / 1000;
    const timeInMinutes = elapsedTime / 60;

    const grossWPM = totalTypedChars / 5 / timeInMinutes;
    const netWPM = grossWPM - errorCount / timeInMinutes;

    setWpm(grossWPM > 0 ? grossWPM : 0);
    setNetWpm(netWPM > 0 ? netWPM : 0);
  }, [startTime, totalTypedChars, errorCount]);

  const getLetterClass = useCallback(
    (letter: string, index: number, wordIndex: number) => {
      const currentTypedWord =
        wordIndex === wordNumber ? typedText : typedWords[wordIndex] || "";

      if (!currentTypedWord[index]) return "text-primarySelected";

      if (currentTypedWord[index] === letter) return "text-primaryForeground";

      return "text-primaryError";
    },
    [typedText, typedWords, wordNumber]
  );

  return (
    <div>
      {!typingFinished && (
        <>
          <SettingsBar />
          <div className="flex flex-wrap gap-2 font-semibold text-3xl items-center max-w-[1200px] break-words overflow-hidden wordsection">
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="flex flex-wrap relative">
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
                {wordIndex === wordNumber && <Caret typedText={typedText} />}
              </div>
            ))}
          </div>
        </>
      )}

      {typingFinished && (
        <div className="mt-4 flex flex-col gap-5 text-3xl">
          <h2 className="font-bold text-primaryForeground">Time is up.</h2>
          <div className="flex gap-10 text-2xl">
            <p>Errors: {errorCount}</p>
            <div className="flex flex-col gap-2">
              <p className="text-primaryForeground">
                Speed (WPM): {wpm.toFixed(2)}
              </p>
              <p>Speed including errors (Net WPM): {netWpm.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeArea;
