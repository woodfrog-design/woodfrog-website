import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './AdvancedAnalytics.module.css';
import { FiTrendingUp, FiUsers, FiBarChart2, FiMessageSquare, FiCpu, FiAlertTriangle, FiBriefcase, FiDatabase, FiZap, FiGitMerge } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  hero: {
    headline: 'Beyond the Dashboard: Unlocking Predictive Insights',
    subheadline: 'We help you move from reactive reporting to proactive decision-making by applying sophisticated statistical models and machine learning to your most complex business challenges.',
    cta: 'Discover Your Insights',
  },
  benefits: {
    headline: 'Transforming Data into a Competitive Advantage',
    description: 'Advanced analytics allows you to understand not just what happened, but why it happened and what will happen next. We build custom solutions that uncover deep insights to drive strategy and growth.',
    cards: [
      { icon: <FiTrendingUp />, title: 'Predictive Modeling', text: 'Forecast future trends, customer behavior, and operational outcomes with custom-built machine learning models that learn from your data.' },
      { icon: <FiUsers />, title: 'Customer Segmentation & LTV', text: 'Identify your most valuable customer segments and predict their lifetime value to optimize marketing spend and retention strategies.' },
      { icon: <FiBarChart2 />, title: 'Interactive BI Dashboards', text: 'Go beyond static reports with dynamic, interactive BI dashboards that provide deep, actionable insights for every level of your organization.' },
      { icon: <FiMessageSquare />, title: 'Natural Language Processing (NLP)', text: 'Analyze unstructured text from customer feedback, social media, and documents to uncover hidden insights and sentiment.' },
      { icon: <FiCpu />, title: 'Optimization & Simulation', text: 'Run complex simulations to optimize pricing, supply chain logistics, and resource allocation for maximum operational efficiency.' },
      { icon: <FiAlertTriangle />, title: 'Anomaly & Fraud Detection', text: 'Automatically identify unusual patterns and outliers in your data that could indicate fraud, system failures, or emerging opportunities.' },
    ],
  },
  featureSection: {
    headline: 'From Raw Data to Actionable Insight',
    text: 'Our process is designed to bridge the gap between your raw data and strategic action. We don\'t just build models; we create comprehensive analytics solutions that integrate seamlessly into your workflows, empowering your teams to make smarter, faster decisions.',
    image: '/images/AdvancedAnalytics/actionable-insights.png',
  },
  process: {
    headline: 'Our Advanced Analytics Project Lifecycle',
    subheadline: 'A Proven Path to Data-Driven Results',
    // --- UPDATED: Data structure for vertical steps ---
    steps: [
        { number: '01', title: 'Business Understanding', text: 'We work with your stakeholders to identify the highest-value business problems that can be solved with advanced analytics.' },
        { number: '02', title: 'Data Exploration & Prep', text: 'Our data scientists dive deep into your data, preparing and engineering the features needed for powerful, accurate modeling.' },
        { number: '03', title: 'Model Development & Validation', text: 'We build, train, and rigorously validate multiple models to find the most accurate and robust solution for your specific use-case.' },
        { number: '04', title: 'Deployment & Integration', text: 'We deploy the final model into your production environment and integrate its insights into your existing applications or BI tools.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Make Data-Driven Decisions?',
      description: 'Let\'s explore how advanced analytics can solve your most pressing business challenges.',
      cta: 'Book an Analytics Consultation',
  }
};

// --- Main Page Component ---
const AdvancedAnalytics: FunctionComponent = () => {
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

            <section className={`${styles.section} ${styles.featureSection}`}>
                <div className={styles.featureImage}> <img src={pageData.featureSection.image} alt={pageData.featureSection.headline} /> </div>
                <div className={styles.featureContent}>
                    <h2 className={styles.sectionHeadline}>{pageData.featureSection.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.featureSection.text}</p>
                </div>
            </section>

            {/* --- UPDATED: New JSX for Vertical Process List --- */}
            <section className={`${styles.section} ${styles.processSection}`}>
                <div className={styles.sectionHeader}>
                    <p className={styles.processSubheadline}>{pageData.process.subheadline}</p>
                    <h2 className={styles.sectionHeadline}>{pageData.process.headline}</h2>
                </div>
                <div className={styles.verticalTimeline}>
                    {pageData.process.steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.stepContent}>
                                <span className={styles.stepNumber}>{step.number}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepText}>{step.text}</p>
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

export default AdvancedAnalytics;