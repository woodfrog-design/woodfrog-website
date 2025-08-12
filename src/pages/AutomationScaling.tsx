import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './OfferingPage.module.css';

const featureData = {
  title: 'Automation & Scaling',
  description:
    'Our LLM solutions can automate up to 100% of repetitive tasks, dramatically improving efficiency and accuracy while reducing costs. Scale your operations with confidence using our AI-powered tools.',
};

const AutomationScaling: FunctionComponent = () => {
  return (
    <div className={styles.offeringPage}>
      <HeaderComponent />
      <main>
        <PageHero
          title={featureData.title}
          description={featureData.description}
        />
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--dark-secondary-text)' }}>
          <p>More content about Automation & Scaling will be added here soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AutomationScaling;