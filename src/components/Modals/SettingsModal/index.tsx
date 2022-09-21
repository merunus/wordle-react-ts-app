import { useContext } from "react";
import Modal from "react-modal";
import styles from "./SettingsModal.module.scss";
import { AppContext } from "../../../app/App";
import { AppContextInterface } from "../../../app/types";
import Switch from "react-switch";
import { MdClose } from "react-icons/md";
import { addDataToLC } from "../../../utils/localStorage/addDataToLC";
import { handleCustomStyles } from "../../../utils/modalCustomStyles";

const SettingsModal = () => {
  const { modalOpen, checked, setChecked, setModalOpen } = useContext(
    AppContext
  ) as AppContextInterface;
  const customStyles = handleCustomStyles({
    isDarkTheme: checked.isDarkTheme ? checked.isDarkTheme : false,
    type: "settings",
  });
  const handleChange = (checkName: string) => {
    if (checkName === "darkTheme") {
      setChecked({ ...checked, isDarkTheme: !checked.isDarkTheme });
      addDataToLC({ value: !checked.isDarkTheme, type: "dark-theme" });
    } else {
      setChecked({ ...checked, isHardMode: !checked.isHardMode });
      addDataToLC({ value: !checked.isHardMode, type: "hard-mode" });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };

  const closeModal = () => {
    setModalOpen({ ...modalOpen, settingsModal: false });
  };
  return (
    <div>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalOpen.settingsModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className={`${styles.container} ${
            checked.isDarkTheme && styles.darkTheme
          }`}
        >
          <h1>Settings</h1>
          <span onClick={closeModal} className={styles.closeBtn}>
            <MdClose />
          </span>
          <div className={styles.settingBlock}>
            <div className={styles.block}>
              <h3>Hard Mode</h3>
              <p>Bigger vocabulary, more complex words</p>
            </div>
            <Switch
              height={20}
              width={48}
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={() => handleChange("hardMode")}
              checked={checked.isHardMode ? checked.isHardMode : false}
              className={` ${styles.switch}`}
            />
          </div>
          <div className={styles.settingBlock}>
            <div className={styles.block}>
              <h3>Dark Theme</h3>
            </div>
            <Switch
              height={20}
              width={48}
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={() => handleChange("darkTheme")}
              checked={checked.isDarkTheme ? checked.isDarkTheme : false}
              className={styles.switch}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsModal;
