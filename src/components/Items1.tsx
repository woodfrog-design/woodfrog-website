import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Items1.module.css";

export type Items1Type = {
  className?: string;
  subtract?: string;
  marcusSeptimus?: string;
  dataScientistAtFintechTechnolog?: string;
  weStruggledToManageLargeVolum?: string;

  /** Style props */
  propBorderRadius?: CSSProperties["borderRadius"];
  propHeight?: CSSProperties["height"];
};

const Items1: FunctionComponent<Items1Type> = ({
  className = "",
  subtract,
  propBorderRadius,
  propHeight,
  marcusSeptimus,
  dataScientistAtFintechTechnolog,
  weStruggledToManageLargeVolum,
}) => {
  const subtractIconStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
    };
  }, [propBorderRadius]);

  const quotesStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div className={[styles.items, className].join(" ")}>
      <img
        className={styles.subtractIcon}
        alt=""
        src={subtract}
        style={subtractIconStyle}
      />
      <img
        className={styles.indicatorsIcon}
        loading="lazy"
        alt=""
        src="/frame-2.svg"
      />
      <div className={styles.quotes} style={quotesStyle}>
        <div className={styles.items1}>
          <h3 className={styles.marcusSeptimus}>{marcusSeptimus}</h3>
          <div className={styles.dataScientistAt}>
            {dataScientistAtFintechTechnolog}
          </div>
        </div>
        <div className={styles.weStruggledTo}>
          {weStruggledToManageLargeVolum}
        </div>
      </div>
    </div>
  );
};

export default Items1;
