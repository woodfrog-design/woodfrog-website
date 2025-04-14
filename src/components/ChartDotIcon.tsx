import { FunctionComponent } from "react";
import styles from "./ChartDotIcon.module.css";

export type ChartDotIconType = {
  className?: string;
};

const ChartDotIcon: FunctionComponent<ChartDotIconType> = ({
  className = "",
}) => {
  return (
    <img
      className={[styles.chartDotIcon, className].join(" ")}
      alt=""
      src="/chart-dot.svg"
    />
  );
};

export default ChartDotIcon;
