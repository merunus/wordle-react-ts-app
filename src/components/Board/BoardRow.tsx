import React from "react";
import styles from "./Board.module.scss";
import { useContext } from "react";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";
import { Letter } from "../Letter";

interface TBoardRowProps {
  rowNumber: number;
  attempt: number;
}

const BoardRow: React.FC<TBoardRowProps> = ({ rowNumber, attempt }) => {
  const { shakeRow, currAttempt } = useContext(
    AppContext
  ) as AppContextInterface;
  return (
    <div
      className={`${styles.row} ${
        shakeRow && currAttempt.attempt + 1 === rowNumber && styles.shake
      }`}
    >
      <Letter letterPos={0} attemptVal={attempt} />
      <Letter letterPos={1} attemptVal={attempt} />
      <Letter letterPos={2} attemptVal={attempt} />
      <Letter letterPos={3} attemptVal={attempt} />
      <Letter letterPos={4} attemptVal={attempt} />
    </div>
  );
};

export default BoardRow;
