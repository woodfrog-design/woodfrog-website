import { FunctionComponent, useState } from "react";
import styles from "./Logo.module.css";
import { useTheme } from "../ThemeContext";

export type LogoType = {
  className?: string;
  tagline?: boolean;
};

const Logo: FunctionComponent<LogoType> = ({
  className = "",
  tagline = false,
}) => {


  const { isDarkTheme } = useTheme();

  return (
    <div className={[styles.logo, className].join(" ")}>
      <a href="/">
        <img
          className={styles.logoSpacerIcon}
          loading="lazy"
          alt=""
          style={{ height: '30px' }}
          src={isDarkTheme ? "/frame-759.svg" : '/logo_dark.png'}
        />
      </a>
      {/* {tagline && (
        <div className={styles.insightsActionsInnovation}>
          Insights. Actions. Innovation.
        </div>
      )} */}
    </div>
  );
};

export default Logo;
