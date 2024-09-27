import words from "../shared/wordlist/words.json";

function getRandomWordsFromJSON(count: number): string[] {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default getRandomWordsFromJSON;
