import { FunctionComponent, useMemo, type CSSProperties } from "react";
import BadgeBase from "./BadgeBase";
import styles from "./Badge.module.css";

export type BadgeType = {
  className?: string;
  text?: string;
  propBackgroundColor?: string;
  propColor?: string;
  textTextDecoration?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propMixBlendMode?: CSSProperties["mixBlendMode"];
};

const Badge: FunctionComponent<BadgeType> = ({
  className = "",
  propAlignSelf,
  propMixBlendMode,
  text,
  propBackgroundColor,
  propColor,
}) => {
  const badgeStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      mixBlendMode: propMixBlendMode,
    };
  }, [propAlignSelf, propMixBlendMode]);

  return (
    <div className={[styles.badge, className].join(" ")} style={badgeStyle}>
      <BadgeBase
        propBackgroundColor={propBackgroundColor}
        text={text}
        propColor={propColor}
      />
    </div>
  );
};

export default Badge;
