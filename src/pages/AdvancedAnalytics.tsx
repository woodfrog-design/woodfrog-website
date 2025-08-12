import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import styles from './OfferingPage.module.css'; // We can reuse some styles

const AdvancedAnalytics: FunctionComponent = () => {
  return (
    <div className={styles.offeringPage}>
      <HeaderComponent />
      <main className={styles.mainContent}>
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <h1 className={styles.sectionTitle}>AI & ML Strategy Development</h1>
                <p className={styles.sectionDescription}>
                    This is the new page for Advanced Analytics. We will add more content here soon.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdvancedAnalytics;