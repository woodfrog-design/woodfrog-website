import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './AutomationScaling.module.css'; // We'll create this next
import { FiPlayCircle, FiGitPullRequest, FiServer, FiDollarSign, FiShield, FiZap, FiBriefcase, FiDatabase, FiZap as FiZapAlt, FiGitMerge } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  hero: {
    headline: 'Automate Workflows, Scale Impact: Intelligent Automation for the Enterprise',
    subheadline: 'We engineer intelligent automation solutions and robust MLOps pipelines that eliminate repetitive tasks, streamline operations, and scale your AI initiatives reliably.',
    cta: 'Automate Your Enterprise',
  },
  benefits: {
    headline: 'The Power of Intelligent Automation & Scalable AI',
    description: 'Move beyond manual processes and proof-of-concept models. We help you build a scalable AI ecosystem that drives real-world efficiency and is built to last.',
    cards: [
      { icon: <FiPlayCircle />, title: 'Intelligent Process Automation', text: 'Automate complex, multi-step business processes using AI agents, reducing manual effort and minimizing human error.' },
      { icon: <FiGitPullRequest />, title: 'Production-Grade MLOps', text: 'Implement CI/CD pipelines for AI to automate the testing, deployment, and monitoring of your machine learning models.' },
      { icon: <FiServer />, title: 'Scalable Cloud Infrastructure', text: 'Design and deploy your AI solutions on scalable cloud infrastructure that can handle fluctuating workloads and massive datasets.' },
      { icon: <FiDollarSign />, title: 'Enhanced Cost Efficiency', text: 'Reduce operational costs by automating manual tasks. Studies show hyperautomation can yield up to a 30% reduction in operational costs.' },
      { icon: <FiShield />, title: 'Improved Reliability & Monitoring', text: 'Ensure your AI in production is continuously monitored for performance degradation, data drift, and unexpected behavior.' },
      { icon: <FiZap />, title: 'Faster Innovation Cycles', text: 'Automated deployment and monitoring allow your data science teams to experiment and deploy new models faster and more frequently.' },
    ],
  },
  featureSection: {
    headline: 'From Notebook to Production with MLOps',
    text: 'A great model is only the beginning. We build end-to-end MLOps pipelines that treat your AI systems like mission-critical software, enabling continuous integration, delivery, and monitoring for maximum uptime and reliability.',
    image: '/images/AutomationScaling/mlops.png',
  },
  process: {
    headline: 'Our Automation & MLOps Implementation Path',
    subheadline: 'A Disciplined Approach to Scalable AI',
    steps: [
        { number: '01', title: 'Process Discovery & Auditing', text: 'We analyze and map your existing workflows to identify the highest-value opportunities for intelligent automation.' },
        { number: '02', title: 'Solution Design & Architecture', text: 'We design the automation solution and the underlying MLOps architecture, selecting the right tools for your ecosystem.' },
        { number: '03', title: 'Pipeline Development & Integration', text: 'Our engineers build the CI/CD pipelines, model monitoring systems, and integrate the automated solution into your workflows.' },
        { number: '04', title: 'Deployment & Continuous Improvement', text: 'We manage the production rollout and establish a framework for continuously monitoring and improving your automated processes.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Scale Your AI Initiatives?',
      description: 'Let\'s build a robust automation and MLOps foundation to accelerate your AI journey.',
      cta: 'Book an MLOps Consultation',
  }
};

// --- Main Page Component ---
const AutomationScaling: FunctionComponent = () => {
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

export default AutomationScaling;