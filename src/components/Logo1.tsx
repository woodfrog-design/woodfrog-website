import { FunctionComponent } from "react";
import styles from "./Logo1.module.css";

export type Logo1Type = {
  className?: string;
  tagline?: boolean;
};

const Logo1: FunctionComponent<Logo1Type> = ({
  className = "",
  tagline = false,
}) => {
  return (
    <div className={[styles.logo, className].join(" ")}>
      <img
        className={styles.logoContainerIcon}
        loading="lazy"
        alt=""
        src="/frame-759.svg"
      />
      {tagline && (
        <div className={styles.insightsActionsInnovation}>
          Insights. Actions. Innovation.
        </div>
      )}
    </div>
  );
};

export default Logo1;
