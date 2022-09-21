import React, { useCallback, useContext, useEffect, useMemo } from "react";
import Key from "../Key/Key";
import styles from "./Keyboard.module.scss";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";
const Keyboard: React.FC = () => {
  const keys1 = useMemo(
    () => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    []
  );
  const keys2 = useMemo(
    () => ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    []
  );
  const keys3 = useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], []);
  const {
    absentLetters,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
    presentLetters,
    correctLetters,
  } = useContext(AppContext) as AppContextInterface;

  const handleKeyboard = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [gameOver.gameOver, keys1, keys2, keys3, onDelete, onEnter, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  useEffect(() => {
    if (gameOver.gameOver)
      document.removeEventListener("keydown", handleKeyboard);
  }, [gameOver.gameOver, handleKeyboard]);

  return (
    <div className={styles.keyboard} onKeyDown={handleKeyboard}>
      <div className={styles.line1}>
        {keys1.map((key: string) => {
          return (
            <Key
              present={presentLetters.includes(key)}
              correct={correctLetters.includes(key)}
              absent={absentLetters.includes(key)}
              key={key}
              keyVal={key}
            />
          );
        })}
      </div>
      <div className={styles.line2}>
        {keys2.map((key) => {
          return (
            <Key
              present={presentLetters.includes(key)}
              correct={correctLetters.includes(key)}
              absent={absentLetters.includes(key)}
              key={key}
              keyVal={key}
            />
          );
        })}
      </div>
      <div className={styles.line3}>
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return (
            <Key
              present={presentLetters.includes(key)}
              correct={correctLetters.includes(key)}
              absent={absentLetters.includes(key)}
              key={key}
              keyVal={key}
            />
          );
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
