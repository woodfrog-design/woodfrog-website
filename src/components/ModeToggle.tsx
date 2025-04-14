import { FunctionComponent } from "react";
import styles from "./ModeToggle.module.css";
import { useTheme } from "../ThemeContext";

export type ModeToggleType = {
  className?: string;
};

const ModeToggle: FunctionComponent<ModeToggleType> = ({ className = "" }) => {
  const { isDarkTheme, toggleTheme } = useTheme(); // Get the current theme state and toggle function

  const logo = isDarkTheme ? '/vector.svg' : '/toggle_dark.png';

  return (
    <div className={[styles.modeToggle, className].join(" ")}>
      <div className={styles.toggleContainer} onClick={toggleTheme}>
        <img
          className={styles.toggleIcon}
          loading="lazy"
          alt=""
          src={logo}
        />
      </div>
    </div>
  );
};

export default ModeToggle;
