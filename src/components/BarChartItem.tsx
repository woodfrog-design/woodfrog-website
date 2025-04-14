import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./BarChartItem.module.css";

export type BarChartItemType = {
  className?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propJustifyContent?: CSSProperties["justifyContent"];
  propHeight1?: CSSProperties["height"];
};

const BarChartItem: FunctionComponent<BarChartItemType> = ({
  className = "",
  propHeight,
  propJustifyContent,
  propHeight1,
}) => {
  const barChartItemStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      justifyContent: propJustifyContent,
    };
  }, [propHeight, propJustifyContent]);

  const barStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);

  return (
    <div
      className={[styles.barChartItem, className].join(" ")}
      style={barChartItemStyle}
    >
      <div className={styles.bar} style={barStyle} />
      <div className={styles.bar1} />
    </div>
  );
};

export default BarChartItem;
