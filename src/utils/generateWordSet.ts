import wordsHard from "../wordle-bank-hard.txt";
import wordsRegular from "../wordle-bank-regular.txt";

export const generateWordSet = async (mode: string) => {
  let wordArray;
  let todaysWord = "";
  await fetch(mode === "regular" ? wordsRegular : wordsHard)
    .then((response) => response.text())
    .then((result) => {
      wordArray = result.split(/\r?\n/);
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    });
  if (wordArray) return { wordArray, todaysWord };
};
