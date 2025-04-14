// HeroSection.tsx
import { FunctionComponent, ReactNode } from "react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  title: string;
  description: string | ReactNode;
}

const HeroSection: FunctionComponent<HeroSectionProps> = ({ title, description }) => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {typeof description === 'string' ? (
          <p className={styles.heroDescription}>{description}</p>
        ) : (
          <div className={styles.heroDescription}>{description}</div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;