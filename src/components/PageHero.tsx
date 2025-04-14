import { FunctionComponent, ReactNode } from "react";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  description?: string;
  children?: ReactNode;
  large?: boolean;
  blueAccent?: boolean;
  className?: string;
}

const PageHero: FunctionComponent<PageHeroProps> = ({
  title,
  description,
  children,
  large = false,
  blueAccent = false,
  className = "",
}) => {
  return (
    <section 
      className={`${styles.heroSection} 
                 ${large ? styles.heroLarge : ""} 
                 ${blueAccent ? styles.heroBlue : ""}
                 ${className}`}
    >
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>{title}</h1>
        
        {description && (
          <p className={styles.heroDescription}>{description}</p>
        )}
        
        {children && (
          <div className={styles.contentArea}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;