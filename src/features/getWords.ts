import wordsRU from "../shared/wordlist/wordsRU.json";
import wordsEN from "../shared/wordlist/wordsEN.json";

function getRandomWordsFromJSON(count: number, currentLang: string): string[] {
  const wordList = currentLang === "RU" ? wordsRU : wordsEN;

  return wordList
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

export default getRandomWordsFromJSON;
