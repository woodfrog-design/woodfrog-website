import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './OfferingPage.module.css';

const featureData = {
  title: 'Enterprise Data Management',
  description:
    'Our team builds intelligent products that learn and evolve with your business. From concept to deployment, we deliver solutions that enhance customer experiences and drive growth.',
};

const EnterpriseDataManagement: FunctionComponent = () => {
  return (
    <div className={styles.offeringPage}>
      <HeaderComponent />
      <main>
        <PageHero
          title={featureData.title}
          description={featureData.description}
        />
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--dark-secondary-text)' }}>
          <p>More content about Product Development will be added here soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnterpriseDataManagement;