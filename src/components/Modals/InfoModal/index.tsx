import { useContext } from "react";
import Modal from "react-modal";
import { AppContext } from "../../../app/App";
import { AppContextInterface } from "../../../app/types";
import styles from "./ModalScreen.module.scss";
import example1 from "../../../assets/images/first-example.png";
import example2 from "../../../assets/images/second-example.png";
import example3 from "../../../assets/images/third-example.png";
import exampleDark1 from "../../../assets/images/first-example-dark.png";
import exampleDark2 from "../../../assets/images/second-example-dark.png";
import exampleDark3 from "../../../assets/images/third-example-dark.png";

import { MdClose } from "react-icons/md";
import { handleCustomStyles } from "../../../utils/modalCustomStyles";

const ModalScreen = () => {
  const { modalOpen, setModalOpen, checked } = useContext(
    AppContext
  ) as AppContextInterface;
  const customStyles = handleCustomStyles({
    isDarkTheme: checked.isDarkTheme,
    type: "info",
  });

  const closeModal = () => {
    setModalOpen({ ...modalOpen, infoModal: false });
  };

  return (
    <div>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalOpen.infoModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className={`${styles.container} ${
            checked.isDarkTheme && styles.darkTheme
          }`}
        >
          <span onClick={closeModal} className={styles.closeBtn}>
            <MdClose />
          </span>
          <h1>HOW TO PLAY</h1>
          <div>
            <p>
              Guess the <span style={{ fontWeight: "700" }}>WORDLE</span> in 6
              tries.
            </p>
            <p>
              Each guess must be a valid 5-letter word. Hit the enter button to
              submit.
            </p>
            <p>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </p>
          </div>
          <div className={styles.helpExamples}>
            <p style={{ fontWeight: "700" }}>Examples</p>
            <div className={styles.exampleBlock}>
              <img
                src={checked.isDarkTheme ? exampleDark1 : example1}
                alt="first-example"
              />
              <p>
                The letter <span style={{ fontWeight: "700" }}>W</span> is in
                the word and in the correct spot
              </p>
            </div>
            <div className={styles.exampleBlock}>
              <img
                src={checked.isDarkTheme ? exampleDark2 : example2}
                alt="second-example"
              />
              <p>
                The letter <span style={{ fontWeight: "700" }}>I</span> is in
                the word but in the wrong spot.
              </p>
            </div>
            <div className={styles.exampleBlock}>
              <img
                src={checked.isDarkTheme ? exampleDark3 : example3}
                alt="third-example"
              />
              <p>
                The letter <span style={{ fontWeight: "700" }}>U</span> is not
                in the word in any spot.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalScreen;
