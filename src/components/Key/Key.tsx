import React, { useContext } from "react";
import { FiDelete } from "react-icons/fi";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";
import styles from "./Key.module.scss";

type TKeyProps = {
  keyVal: string;
  bigKey?: boolean;
  absent?: boolean;
  correct?: boolean;
  present?: boolean;
};

const Key: React.FC<TKeyProps> = ({
  keyVal,
  bigKey,
  absent,
  correct,
  present,
}) => {
  const { gameOver, onSelectLetter, onDelete, onEnter, checked } = useContext(
    AppContext
  ) as AppContextInterface;
  const selectLetter = () => {
    if (gameOver.gameOver) return;

    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  const sizeAndColorCheck = () => {
    if (bigKey) return "big";
    else if (correct) return checked.isDarkTheme ? "correct-dark" : "correct";
    else if (present) return checked.isDarkTheme ? "present-dark" : "present";
    else if (absent) return checked.isDarkTheme ? "absent-dark" : "absent";
  };
  const keyState = sizeAndColorCheck();

  return (
    <div
      className={`${styles.key} ${checked.isDarkTheme && styles.darkTheme}`}
      id={keyState}
      onClick={selectLetter}
    >
      {keyVal === "DELETE" ? <FiDelete /> : keyVal}
    </div>
  );
};

export default Key;
