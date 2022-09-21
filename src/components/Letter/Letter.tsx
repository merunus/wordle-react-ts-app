import React, { useContext, useEffect } from "react";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";
import styles from "./Letter.module.scss";

interface ILetterProps {
  attemptVal: number;
  letterPos: number;
}

const Letter: React.FC<ILetterProps> = ({ attemptVal, letterPos }) => {
  const {
    board,
    setAbsentLetters,
    currAttempt,
    correctWord,
    setPresentLetters,
    setCorrectLetters,
    checked,
  } = useContext(AppContext) as AppContextInterface;

  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const absent =
    !correct && letter !== "" && !correctWord.toUpperCase().includes(letter);
  const present =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const colorCheck = () => {
    if (currAttempt.attempt > attemptVal) {
      if (correct) {
        return checked.isDarkTheme ? "correct-dark" : "correct";
      } else if (present) {
        return checked.isDarkTheme ? "present-dark" : "present";
      } else {
        return checked.isDarkTheme ? "absent-dark" : "absent";
      }
    }
  };
  let letterState = colorCheck();

  useEffect(() => {
    if (letter !== "" && !correct && !present) {
      setAbsentLetters((prev) => [...prev, letter]);
    } else if (letter !== "" && !correct && !absent) {
      setPresentLetters((prev) => [...prev, letter]);
    } else {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div
      className={`${styles.letter} ${letter !== "" && styles.filled}  ${
        checked.isDarkTheme && styles.darkTheme
      }`}
      id={letterState}
    >
      {letter}
    </div>
  );
};

export default Letter;
