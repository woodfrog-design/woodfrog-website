import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./TabButtonBase.module.css";

export type TabButtonBaseType = {
  className?: string;
  text?: string;
  bottomBorder?: boolean;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propColor?: CSSProperties["color"];
  propHeight?: CSSProperties["height"];
  propDisplay?: CSSProperties["display"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const TabButtonBase: FunctionComponent<TabButtonBaseType> = ({
  className = "",
  text,
  propWidth,
  propColor,
  propHeight,
  propDisplay,
  bottomBorder,
  propBackgroundColor,
}) => {
  const textStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      color: propColor,
      height: propHeight,
      display: propDisplay,
    };
  }, [propWidth, propColor, propHeight, propDisplay]);

  const bottomBorderStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div className={[styles.tabButtonBase, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.text} style={textStyle}>
          {text}
        </div>
      </div>
      {!bottomBorder && (
        <div className={styles.bottomBorder} style={bottomBorderStyle} />
      )}
    </div>
  );
};

export default TabButtonBase;
