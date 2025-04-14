import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Items.module.css";

export type ItemsType = {
  className?: string;
  x?: string;
  fasterDataProcessingAnalytics?: string;
  icon?: string;
  reduceInfrastructureCosts?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propPadding1?: CSSProperties["padding"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const Items: FunctionComponent<ItemsType> = ({
  className = "",
  propPadding,
  x,
  fasterDataProcessingAnalytics,
  propPadding1,
  icon,
  reduceInfrastructureCosts,
  propAlignSelf,
}) => {
  const featureStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const feature1Style: CSSProperties = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const reduceInfrastructureCostsStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
    };
  }, [propAlignSelf]);

  return (
    <div className={[styles.items, className].join(" ")}>
      <div className={styles.feature} style={featureStyle}>
        <div className={styles.x}>{x}</div>
        <div className={styles.fasterDataProcessing}>
          {fasterDataProcessingAnalytics}
        </div>
      </div>
      <div className={styles.feature1} style={feature1Style}>
        <div className={styles.x}>{icon}</div>
        <div
          className={styles.fasterDataProcessing}
          style={reduceInfrastructureCostsStyle}
        >
          {reduceInfrastructureCosts}
        </div>
      </div>
    </div>
  );
};

export default Items;
