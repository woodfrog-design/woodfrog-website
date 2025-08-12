// import { FunctionComponent, ReactNode } from 'react';
// import styles from './PageHero.module.css';

// interface PageHeroProps {
//   title: string;
//   description?: string;
//   children?: ReactNode;
//   large?: boolean;
//   blueAccent?: boolean;
//   className?: string;
// }

// const PageHero: FunctionComponent<PageHeroProps> = ({
//   title,
//   description,
//   children,
//   large = false,
//   blueAccent = false,
//   className = '',
// }) => {
//   return (
//     <section
//       className={`${styles.heroSection} 
//                  ${large ? styles.heroLarge : ''} 
//                  ${blueAccent ? styles.heroBlue : ''}
//                  ${className}`}
//     >
//       <div className={styles.heroContainer}>
//         <h1 className={styles.heroTitle}>{title}</h1>

//         {description && <p className={styles.heroDescription}>{description}</p>}

//         {children && <div className={styles.contentArea}>{children}</div>}
//       </div>
//     </section>
//   );
// };

// export default PageHero;

import { FunctionComponent } from 'react';
import styles from './PageHero.module.css';

export type PageHeroProps = {
  className?: string;
  title: string;
  description: string;
  large?: boolean;
  children?: React.ReactNode;
};

const PageHero: FunctionComponent<PageHeroProps> = ({
  className = '',
  title,
  description,
  large = false,
  children,
}) => {
  return (
    <section className={`${styles.pageHero} ${large ? styles.large : ''} ${className}`}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroDescription}>{description}</p>
      {children}
    </section>
  );
};

export default PageHero;