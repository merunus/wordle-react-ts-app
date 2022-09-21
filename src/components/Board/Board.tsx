import styles from "./Board.module.scss";
import BoardRow from "./BoardRow";

const Board = () => {
  return (
    <div className={styles.board}>
      <BoardRow attempt={0} rowNumber={1} />
      <BoardRow attempt={1} rowNumber={2} />
      <BoardRow attempt={2} rowNumber={3} />
      <BoardRow attempt={3} rowNumber={4} />
      <BoardRow attempt={4} rowNumber={5} />
      <BoardRow attempt={5} rowNumber={6} />
    </div>
  );
};

export default Board;
