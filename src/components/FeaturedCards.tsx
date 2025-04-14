import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
import Badge from "./Badge";
import styles from "./FeaturedCards.module.css";
import { useTheme } from "../ThemeContext";

export type FeaturedCardsType = {
  className?: string;
  image?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
};

const FeaturedCards: FunctionComponent<FeaturedCardsType> = ({
  className = "",
  propWidth,
  propFlex,
  propMinWidth,
  image,
}) => {
  const featuredCardsStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propWidth, propFlex, propMinWidth]);

  const { isDarkTheme } = useTheme();


  return (
    <div
      className={[styles.featuredCards, className].join(" ")}
      style={featuredCardsStyle}
    >
      <div className={styles.cardImage}>
        <img className={styles.imageIcon} loading="lazy" alt="" src={image} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardFooter}>
          <Badge
            propAlignSelf="unset"
            propMixBlendMode="unset"
            text="Artifical Intelligence"
            propBackgroundColor="#c1f8d7"
            propColor="#037a48"
          />
          <div className={styles.cardTitle}>
            <h2 className={styles.enablingNextGenDigital}>
              Enabling next-gen digital expericence
            </h2>
            <div className={styles.cardLink}>
              <div className={styles.linkContainer}>
                <img
                  className={styles.linkTargetIcon}
                  loading="lazy"
                  alt=""
                  src={isDarkTheme ? "/frame-5.svg" : '/frame-5-light.svg'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
