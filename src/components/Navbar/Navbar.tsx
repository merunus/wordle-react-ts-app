import React, { useContext } from "react";
import styles from "./Navbar.module.scss";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoSettingsSharp, IoStatsChartSharp } from "react-icons/io5";
import { AppContext } from "../../app/App";
import { AppContextInterface } from "../../app/types";

const Navbar: React.FC = React.memo(() => {
  const { setModalOpen, modalOpen, checked } = useContext(
    AppContext
  ) as AppContextInterface;

  const handleModal = (modalName: string) => {
    if (modalName === "info") setModalOpen({ ...modalOpen, infoModal: true });
    else if (modalName === "settings")
      setModalOpen({ ...modalOpen, settingsModal: true });
    else setModalOpen({ ...modalOpen, statsModal: true });
  };

  return (
    <nav
      className={`${styles.container} ${
        checked.isDarkTheme && styles.darkTheme
      }`}
    >
      <div className={styles.titleContainer}>
        <h1>Wordle</h1>
      </div>
      <div className={styles.iconsContainer}>
        <span className={styles.icon} onClick={() => handleModal("info")}>
          <AiOutlineQuestionCircle />
        </span>
        <span className={styles.icon} onClick={() => handleModal("stats")}>
          <IoStatsChartSharp />
        </span>
        <span onClick={() => handleModal("settings")} className={styles.icon}>
          <IoSettingsSharp />
        </span>
      </div>
    </nav>
  );
});

export default Navbar;
