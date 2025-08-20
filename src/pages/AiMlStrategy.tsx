import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero'; // UPDATED: Use the standard PageHero
import styles from './ServiceDetailPage.module.css';
import { FiCompass, FiShield, FiTrendingUp, FiMap } from 'react-icons/fi';

// --- Data for this specific service page ---
const serviceData = {
  title: 'AI & ML Strategy Development',
  description: 'Navigate the complexities of AI adoption with a clear, strategic roadmap. We help you align technology with business goals to ensure your AI initiatives deliver measurable value and a competitive edge.',
  
  // Section 1: The Challenge
  challenge: {
    headline: 'Feeling Lost in the AI Hype?',
    description: 'Many organizations rush into AI without a clear plan, leading to wasted resources, failed projects, and missed opportunities. A solid strategy is the difference between a costly experiment and a transformational investment.',
    points: [
      {
        icon: <FiCompass />,
        title: 'Unclear Starting Point',
        text: 'Struggling to identify the most valuable use cases for AI within your operations.'
      },
      {
        icon: <FiTrendingUp />,
        title: 'Fear of Low ROI',
        text: 'Concerned that significant investment in AI won\'t translate into tangible business outcomes.'
      },
      {
        icon: <FiShield />,
        title: 'Risk & Compliance Hurdles',
        text: 'Navigating data privacy, security, and regulatory requirements in a rapidly evolving landscape.'
      }
    ]
  },

  // Section 2: Our Approach
  approach: {
      headline: 'Our Strategic Framework',
      image: '/images/AiStrategy/sf.png', // A visual for your process
      steps: [
          { title: '1. Business Deep Dive', text: 'We start by understanding your core objectives, operational challenges, and competitive landscape.' },
          { title: '2. Opportunity Assessment', text: 'We analyze your data and processes to identify high-impact opportunities for AI and machine learning.' },
          { title: '3. Roadmap & Prioritization', text: 'We build a phased implementation plan, prioritizing projects with the highest potential for quick wins and long-term value.' },
          { title: '4. Governance & Ethics', text: 'We establish a framework for responsible AI, ensuring your solutions are fair, transparent, and compliant.' }
      ]
  },

  // Section 3: Key Deliverables
  deliverables: {
      headline: 'What You Get: A Clear Path Forward',
      points: [
          'A comprehensive AI Readiness Assessment.',
          'A prioritized list of AI use cases with ROI projections.',
          'A multi-year strategic roadmap and implementation plan.',
          'A robust governance and risk management framework.',
          'Technology and talent stack recommendations.'
      ]
  }
};

// --- Main Page Component ---
const AiMlStrategy: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        {/* --- UPDATED: Replaced ServiceHero with the standard PageHero --- */}
        <PageHero
          title={serviceData.title}
          description={serviceData.description}
          large 
        />

        <div className={styles.contentWrapper}>
            {/* --- Section 1: The Challenge --- */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{serviceData.challenge.headline}</h2>
                    <p className={styles.sectionDescription}>{serviceData.challenge.description}</p>
                </div>
                <div className={styles.cardsGrid}>
                    {serviceData.challenge.points.map((point, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{point.icon}</div>
                            <h3 className={styles.cardTitle}>{point.title}</h3>
                            <p className={styles.cardText}>{point.text}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* --- Section 2: Our Approach --- */}
            <section className={`${styles.section} ${styles.approachSection}`}>
                <div className={styles.approachContent}>
                    <h2 className={styles.sectionHeadlineAlt}>{serviceData.approach.headline}</h2>
                    <ul className={styles.approachList}>
                        {serviceData.approach.steps.map((step, index) => (
                            <li key={index}>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.approachImage}>
                    <img src={serviceData.approach.image} alt="Strategic Framework" />
                </div>
            </section>

             {/* --- Section 3: Key Deliverables --- */}
            <section className={`${styles.section} ${styles.deliverablesSection}`}>
                <h2 className={styles.sectionHeadline}>{serviceData.deliverables.headline}</h2>
                <div className={styles.deliverablesGrid}>
                    {serviceData.deliverables.points.map((point, index) => (
                        <div key={index} className={styles.deliverableItem}>
                            <FiMap className={styles.deliverableIcon} />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Final CTA Section --- */}
            <section className={`${styles.section} ${styles.ctaSection}`}>
                <h2 className={styles.sectionHeadline}>Ready to Build Your AI Strategy?</h2>
                <p className={styles.sectionDescription}>Let's talk about how a tailored strategy can accelerate your success.</p>
                <a href="/contact-us" className={styles.ctaButton}>Get in Touch</a>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiMlStrategy;