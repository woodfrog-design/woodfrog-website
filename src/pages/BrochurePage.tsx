// import { FunctionComponent } from 'react';
// import HeaderComponent from '../components/HeaderComponent';
// import Footer from '../components/Footer';
// import styles from './BrochurePage.module.css';

// const BrochurePage: FunctionComponent = () => {
//   return (
//     <div className={styles.pageWrapper}>
//       <HeaderComponent />
//       <main className={styles.mainContent}>
//         <div className={styles.container}>
//           <h1>Company Brochure</h1>
//           <p>You can view our company brochure on Notion or download it as a PDF.</p>
//           {/* We will add the links and buttons here next */}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default BrochurePage;

import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import styles from './BrochurePage.module.css';

const BrochurePage: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1>Company Brochure</h1>
          <p>You can view our complete company brochure on Notion.</p>
          <a
            href="https://www.notion.so/Woodfrog-Tech-Brochure-2242428418a880898d34cc88c64851b1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
          >
            View on Notion
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrochurePage;