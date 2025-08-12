import { FunctionComponent } from 'react';
import styles from './ServiceHero.module.css'; // This will be a new CSS file

export type ServiceHeroProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const ServiceHero: FunctionComponent<ServiceHeroProps> = ({ title, description, imageUrl }) => {
  return (
    <section className={styles.serviceHero}>
        <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
        </div>
        <div className={styles.heroImageContainer}>
            <img src={imageUrl} alt={title} className={styles.heroImage} />
        </div>
    </section>
  );
};

export default ServiceHero;