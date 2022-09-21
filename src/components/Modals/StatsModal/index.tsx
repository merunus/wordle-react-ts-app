import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { AppContext } from "../../../app/App";
import { AppContextInterface } from "../../../app/types";
import { getDataFromLC } from "../../../utils/localStorage/getDataFromLc";
import { handleCustomStyles } from "../../../utils/modalCustomStyles";
import styles from "./StatsModal.module.scss";

const StatsModal = () => {
  const {
    modalOpen,
    checked,
    setModalOpen,
    gameOver,
    correctWord,
    wordsArray,
    setCorrectWord,
    setCurrAttempt,
    setAbsentLetters,
    setCorrectLetters,
    setPresentLetters,
    setBoard,
    setGameOver,
  } = useContext(AppContext) as AppContextInterface;
  const customStyles = handleCustomStyles({
    isDarkTheme: checked.isDarkTheme,
    type: "stats",
  });

  const closeModal = () => {
    setModalOpen({ ...modalOpen, statsModal: false });
  };

  const restartGame = () => {
    let newWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    setCorrectWord(newWord);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setAbsentLetters([]);
    setCorrectLetters([]);
    setPresentLetters([]);
    setModalOpen({ ...modalOpen, statsModal: false });
    setGameOver({ gameOver: false, guessedWord: false });
    const newBoard = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    setBoard(newBoard);
  };

  return (
    <div>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalOpen.statsModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className={`${styles.container} ${
            checked.isDarkTheme && styles.darkTheme
          }`}
        >
          <h1>Statistics</h1>
          <span onClick={closeModal} className={styles.closeBtn}>
            <MdClose />
          </span>
          <div className={styles.statistic}>
            <div className={styles.statBlock}>
              <h2>{getDataFromLC("played") | 0}</h2>
              <p>Played</p>
            </div>
            <div className={styles.statBlock}>
              <h2>{getDataFromLC("wins") | 0}</h2>
              <p>Wins</p>
            </div>
            <div className={styles.statBlock}>
              <h2>{getDataFromLC("losses") | 0}</h2>
              <p>Losses</p>
            </div>
            <div className={styles.statBlock}>
              <h2>{getDataFromLC("currStreak") | 0}</h2>
              <p>Current Streak</p>
            </div>
          </div>
          <div className={styles.correctAnswer}>
            {gameOver.gameOver && (
              <h1 style={{ marginTop: "15px" }}>
                {gameOver.guessedWord ? "Guessed Word" : "Correct Word"}
              </h1>
            )}

            {gameOver.gameOver && <h3 id="correctGuess">{correctWord}</h3>}
          </div>
          <div className={styles.restartGame}>
            <button onClick={restartGame}>Guess new wordle!</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StatsModal;
