import { FunctionComponent, useState } from "react";
import styles from "./Items2.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export type Items2Type = {
  className?: string;
  image?: string;
  text?: string;
  name?: string
};

const Items2: FunctionComponent<Items2Type> = ({ className = "", image, text = "Enabling next-gen digital expericence", name = "" }) => {
  const navigate = useNavigate()
  const { isDarkTheme } = useTheme();


  return (
    <div className={[styles.items, className].join(" ")} onClick={() => navigate(`/${name}`)}>
      <img className={styles.imageIcon} loading="lazy" alt="" src={image} />
      <div className={styles.enablingNextGenDigitalExpeParent}>
        <h5 className={styles.enablingNextGenDigital}>
          {text}
        </h5>
        <div className={styles.frameWrapper} >
          <img
            className={styles.frameIcon}
            loading="lazy"
            alt=""
            src={isDarkTheme ? "/frame-5.svg" : '/frame-5-light.svg'}
          />
        </div>
      </div>
    </div>
  );
};

export default Items2;
