export interface AppContextInterface {
  board: any;
  setBoard: any;
  currAttempt: { attempt: number; letter: number };
  setCurrAttempt: React.Dispatch<
    React.SetStateAction<{
      attempt: number;
      letter: number;
    }>
  >;
  correctWord: string;
  setAbsentLetters: React.Dispatch<React.SetStateAction<string[]>>;
  setPresentLetters: React.Dispatch<React.SetStateAction<string[]>>;
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
  absentLetters: string[];
  presentLetters: string[];
  correctLetters: string[];
  gameOver: {
    gameOver: boolean;
    guessedWord: boolean;
  };
  onSelectLetter: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  shakeRow: boolean;
  setShakeRow: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: {
    infoModal: boolean;
    settingsModal: boolean;
    statsModal: boolean;
  };
  setModalOpen: React.Dispatch<
    React.SetStateAction<{
      infoModal: boolean;
      settingsModal: boolean;
      statsModal: boolean;
    }>
  >;
  checked: {
    isHardMode: boolean;
    isDarkTheme: boolean;
  };
  setChecked: React.Dispatch<
    React.SetStateAction<{
      isHardMode: boolean | null;
      isDarkTheme: boolean | null;
    }>
  >;
  statistic: {
    played: number | null;
    currentStreak: number | null;
    wins: number | null;
    losses: number | null;
  };
  wordsArray: string[];
  setCorrectWord: React.Dispatch<React.SetStateAction<string>>;
  setGameOver: React.Dispatch<
    React.SetStateAction<{
      gameOver: boolean;
      guessedWord: boolean;
    }>
  >;
}
