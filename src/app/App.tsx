import { useState, createContext, useEffect } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import {
  Board,
  Firework,
  Keyboard,
  ModalScreen,
  Navbar,
  SettingsModal,
  StatsModal,
} from "../components";
import "../scss/app.scss";
import { generateWordSet } from "../utils/generateWordSet";
import { boardDefault } from "../utils/word-board";
import { AppContextInterface } from "./types";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { getDataFromLC } from "../utils/localStorage/getDataFromLc";
import { updateStatistic } from "../utils/localStorage/updateStatistic";

export const AppContext = createContext<AppContextInterface | null>(null);
const App = () => {
  Modal.setAppElement("#root");
  const [board, setBoard] = useState(boardDefault); // Letters Matrix-Board
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 }); // Current Attempt
  const [wordsArray, setWordsArray] = useState<string[]>([]); // Words vocabulary
  const [correctWord, setCorrectWord] = useState(""); // Correct Word
  const [absentLetters, setAbsentLetters] = useState<string[]>([]); // Not part of the correct word
  const [presentLetters, setPresentLetters] = useState<string[]>([]); // Part of the correct word
  const [correctLetters, setCorrectLetters] = useState<string[]>([]); // Part of the correct word and exact position
  const [modalOpen, setModalOpen] = useState({
    infoModal: true,
    settingsModal: false,
    statsModal: false,
  }); // Modals State
  let statistic = {
    wins: getDataFromLC("wins") | 0,
    losses: getDataFromLC("losses") | 0,
    played: getDataFromLC("played") | 0,
    currentStreak: getDataFromLC("currStreak") | 0,
  }; // Statistic
  const [shakeRow, setShakeRow] = useState(false); // Shake animation
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  }); // Game Over Info
  const [checked, setChecked] = useState({
    isHardMode: getDataFromLC("hard-mode"),
    isDarkTheme: getDataFromLC("dark-theme"),
  }); // Switch checks for settings

  // Getting Word Vocabulary
  useEffect(() => {
    generateWordSet(checked.isHardMode ? "hard" : "regular").then((words) => {
      if (words) {
        setWordsArray(words.wordArray);
        setCorrectWord(words.todaysWord);
      }
    });
  }, [checked.isHardMode]);

  // Update Statistic After Game Finished
  useEffect(() => {
    if (gameOver.gameOver)
      updateStatistic({
        played: statistic.played + 1,
        currStreak: gameOver.guessedWord ? statistic.currentStreak + 1 : 0,
        wins: gameOver.guessedWord ? statistic.wins + 1 : statistic.wins,
        losses: !gameOver.guessedWord ? statistic.losses + 1 : statistic.losses,
      });
  }, [gameOver.gameOver]);

  // Shaking Animation
  const shakeAnimation = () => {
    setShakeRow(true);
    setTimeout(() => {
      setShakeRow(false);
    }, 250);
  };

  const onEnter = () => {
    // Not Enough Letters
    if (currAttempt.letter !== 5) {
      toast("Not enough letters", {
        autoClose: 500,
        type: "info",
        transition: Zoom,
      });
      shakeAnimation();
      return;
    }
    // Current Word
    let currWord = "";

    // Adding letters to the row
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    // Check if word exists in word list
    if (wordsArray.includes(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      toast("Not in words list", {
        autoClose: 500,
        type: "info",
        transition: Zoom,
      });
      shakeAnimation();
    }
    // Check for correct answer
    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      setTimeout(() => {
        setModalOpen({ ...modalOpen, statsModal: true });
      }, 1000);
      return;
    }
    // Check for the last attempt done
    if (
      currAttempt.attempt === 5 &&
      wordsArray.includes(currWord.toLowerCase())
    ) {
      setGameOver({ gameOver: true, guessedWord: false });
      setTimeout(() => {
        setModalOpen({ ...modalOpen, statsModal: true });
      }, 1000);
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key: string) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  const initialValue: AppContextInterface = {
    board,
    setBoard,
    currAttempt,
    setCurrAttempt,
    correctWord,
    onSelectLetter,
    onDelete,
    onEnter,
    setAbsentLetters,
    absentLetters,
    presentLetters,
    setPresentLetters,
    setCorrectLetters,
    correctLetters,
    gameOver,
    setGameOver,
    shakeRow,
    setShakeRow,
    modalOpen,
    setModalOpen,
    checked,
    setChecked,
    statistic,
    wordsArray,
    setCorrectWord,
  };

  console.log(correctWord);
  return (
    <AppContext.Provider value={initialValue}>
      <div className="main" id={checked.isDarkTheme ? "dark-bg" : "light-bg"}>
        <Navbar />
        <div className="game">
          <ToastContainer
            theme="light"
            hideProgressBar
            icon={false}
            closeButton={false}
            position="top-center"
          />
          <Board />
          <Keyboard />
          <ModalScreen />
          <SettingsModal />
          <StatsModal />
          <Firework />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
