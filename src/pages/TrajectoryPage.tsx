import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import styles from './TrajectoryPage.module.css'; // We will create this next

const TrajectoryPage: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1>Company Trajectory</h1>
          <p>You can view our complete company trajectory on Notion.</p>
          <a
            href="https://www.notion.so/Woodfrog-Tech-Trajectory-2492428418a88045bde5dab89c37b0ca"
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

export default TrajectoryPage;