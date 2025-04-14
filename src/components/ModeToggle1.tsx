import { FunctionComponent } from "react";
import styles from "./ModeToggle1.module.css";

export type ModeToggle1Type = {
  className?: string;
};

const ModeToggle1: FunctionComponent<ModeToggle1Type> = ({
  className = "",
}) => {
  return (
    <div className={[styles.modeToggle, className].join(" ")}>
      <div className={styles.toggleIcon}>
        <img
          className={styles.vectorIcon}
          loading="lazy"
          alt=""
          src="/vector.svg"
        />
      </div>
    </div>
  );
};

export default ModeToggle1;
