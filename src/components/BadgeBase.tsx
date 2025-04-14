import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./BadgeBase.module.css";

export type BadgeBaseType = {
  className?: string;
  text?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
};

const BadgeBase: FunctionComponent<BadgeBaseType> = ({
  className = "",
  propBackgroundColor,
  text,
  propColor,
}) => {
  const badgeBaseStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const text1Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className={[styles.badgeBase, className].join(" ")}
      style={badgeBaseStyle}
    >
      <div className={styles.text} style={text1Style}>
        {text}
      </div>
    </div>
  );
};

export default BadgeBase;
