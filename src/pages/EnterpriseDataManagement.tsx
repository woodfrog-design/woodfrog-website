import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './EnterpriseDataManagement.module.css';
import { FiShield, FiDatabase, FiTarget, FiCheckCircle, FiGitMerge, FiBookOpen, FiMap, FiLayers, FiServer, FiBarChart2 } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  hero: {
    headline: 'Harness Your Data: Building the Foundation for Enterprise AI',
    subheadline: 'We design and implement robust data management strategies that ensure data quality, governance, and accessibility, turning your data into a reliable, high-value asset.',
    cta: 'Build Your Data Foundation',
  },
  benefits: {
    headline: 'The Cornerstones of an Enterprise Data Strategy',
    description: 'Effective data management is the bedrock of digital transformation. It enables reliable analytics, empowers AI initiatives, and ensures you can trust the data that drives your most critical business decisions.',
    cards: [
      { icon: <FiShield />, title: 'Data Governance & Compliance', text: 'Establish clear frameworks to ensure your data is secure, private, and compliant with regulations like GDPR and CCPA.' },
      { icon: <FiDatabase />, title: 'Unified Data Architecture', text: 'Break down data silos by creating a modern, unified data platform, whether it\'s a data lake, warehouse, or a hybrid model.' },
      { icon: <FiTarget />, title: 'Master Data Management (MDM)', text: 'Create a single source of truth for your critical data entities, eliminating inconsistencies and improving decision-making.' },
      { icon: <FiCheckCircle />, title: 'Data Quality & Cleansing', text: 'Poor data quality costs organizations an average of $12.9 million annually. We implement automated processes to cleanse and monitor your data.' },
      { icon: <FiGitMerge />, title: 'Scalable ETL & Data Pipelines', text: 'Build efficient ETL/ELT pipelines to ingest and process data from diverse sources in real-time or in batches.' },
      { icon: <FiBookOpen />, title: 'Data Cataloging & Discovery', text: 'Empower your teams to easily find, understand, and trust your corporate data assets with a comprehensive data catalog.' },
    ],
  },
  // --- NEW: Image and Text Feature Section (reversed order) ---
  featureSection: {
    headline: 'Building Your Single Source of Truth',
    text: 'We architect and build unified data platforms that eliminate silos and create a reliable, single source of truth. This foundational asset provides the clean, consistent, and trusted data needed to power your most critical analytics and AI models.',
    image: '/images/EnterpriceDataManagement/sst.png', // Placeholder image path
  },
  process: {
    headline: 'Our Data Management Implementation Roadmap',
    subheadline: 'A Structured Approach to Data Excellence',
    stages: [
        { icon: <FiMap />, title: 'Assessment & Strategy', text: 'We audit your existing data landscape and co-create a strategic roadmap aligned with your specific business goals.' },
        { icon: <FiLayers />, title: 'Architecture & Design', text: 'We design a future-proof data architecture, selecting the right technologies and tools for your technical and business needs.' },
        { icon: <FiServer />, title: 'Implementation & Migration', text: 'Our engineers build and deploy the new platform, migrating your data securely and with minimal operational disruption.' },
        { icon: <FiBarChart2 />, title: 'Optimization & Governance', text: 'We establish long-term governance and continually optimize your data operations for performance and cost-efficiency.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Unlock the Full Potential of Your Data?',
      description: 'Let\'s create a data strategy that drives growth and innovation for your enterprise.',
      cta: 'Schedule a Data Strategy Call',
  }
};

const EnterpriseDataManagement: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        <PageHero title={pageData.hero.headline} description={pageData.hero.subheadline} large>
            <div className={styles.heroExtra}> <a href="/contact-us" className={styles.ctaButton}>{pageData.hero.cta}</a> </div>
        </PageHero>
        <div className={styles.contentWrapper}>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.benefits.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.benefits.description}</p>
                </div>
                <div className={styles.cardsGrid}>
                    {pageData.benefits.cards.map((card, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* --- NEW: Image and Text Feature Section (reversed order) --- */}
            <section className={`${styles.section} ${styles.featureSection}`}>
                <div className={styles.featureContent}>
                    <h2 className={styles.sectionHeadline}>{pageData.featureSection.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.featureSection.text}</p>
                </div>
                <div className={styles.featureImage}> <img src={pageData.featureSection.image} alt={pageData.featureSection.headline} /> </div>
            </section>

            <section className={`${styles.section} ${styles.processSection}`}>
                <div className={styles.sectionHeader}>
                    <p className={styles.processSubheadline}>{pageData.process.subheadline}</p>
                    <h2 className={styles.sectionHeadline}>{pageData.process.headline}</h2>
                </div>
                <div className={styles.timeline}>
                    {pageData.process.stages.map((stage, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineIcon}>{stage.icon}</div>
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineTitle}>{stage.title}</h3>
                                <p className={styles.timelineText}>{stage.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className={`${styles.section} ${styles.getStartedSection}`}>
                <h2 className={styles.sectionHeadline}>{pageData.getStarted.headline}</h2>
                <p className={styles.sectionDescription}>{pageData.getStarted.description}</p>
                 <div className={styles.ctaGroup}> <a href="/contact-us" className={styles.ctaButton}>{pageData.getStarted.cta}</a> </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnterpriseDataManagement;