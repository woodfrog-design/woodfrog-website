import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './CustomLlmSolutions.module.css'; // We'll create this next
import { FiDatabase, FiTarget, FiLock, FiDollarSign, FiGitMerge, FiKey, FiSearch, FiCpu, FiShield, FiCloud } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  serviceName: "Custom LLM Solutions",
  hero: {
    headline: 'Beyond Off-the-Shelf AI: Building Your Custom LLM Solution',
    subheadline: 'We design, build, and deploy bespoke Large Language Model applications that are fine-tuned on your data and optimized for your unique business processes.',
    cta: 'Build Your Custom LLM',
  },
  benefits: {
    headline: 'The Advantage of a Custom-Built LLM',
    description: 'While generic LLMs are powerful, a custom model trained on your own data provides a significant competitive advantage, offering unparalleled accuracy, security, and cost-efficiency.',
    cards: [
      { icon: <FiDatabase />, title: 'Proprietary Data Mastery', text: 'Train and fine-tune models on your private data to create a powerful AI asset that understands your specific business context.' },
      { icon: <FiTarget />, title: 'Enhanced Accuracy & Relevance', text: 'Dramatically reduce hallucinations by grounding models in your knowledge base using advanced Retrieval-Augmented Generation (RAG).' },
      { icon: <FiLock />, title: 'Improved Security & Privacy', text: 'Maintain full control over your data by deploying custom LLMs in your own secure cloud environment, ensuring total privacy.' },
      { icon: <FiDollarSign />, title: 'Significant Cost Optimization', text: 'Optimized open-source models can reduce inference costs by up to 90% compared to leading proprietary APIs for specific tasks.' },
      { icon: <FiGitMerge />, title: 'Seamless Workflow Integration', text: 'Build LLM-powered features and agents that integrate directly into your existing applications, CRMs, and internal tools.' },
      { icon: <FiKey />, title: 'Full Ownership & No Vendor Lock-In', text: 'You own the final model and the intellectual property. There is no reliance on third-party APIs or vendor constraints.' },
    ],
  },
  featureSection: {
    headline: 'Reliable AI with Retrieval-Augmented Generation',
    text: 'The key to trustworthy enterprise AI is grounding your LLM in verifiable facts. We specialize in building robust RAG systems that connect your model to your internal documents and knowledge bases. This ensures every response is accurate, relevant, and backed by your own data.',
    image: '/images/CustomLLM/cllm.png',
  },
  process: {
    headline: 'Our Custom LLM Development Process',
    subheadline: 'From Use-Case to Production-Ready Model',
    stages: [
        { icon: <FiSearch />, title: 'Use-Case & Data Analysis', text: 'We identify the highest-impact use-case and analyze your data to determine the optimal strategy (fine-tuning vs. RAG).' },
        { icon: <FiCpu />, title: 'Model Selection & Fine-Tuning', text: 'We benchmark and select the best open-source model for your needs and fine-tune it on your proprietary data for specialized tasks.' },
        { icon: <FiShield />, title: 'RAG & Guardrail Implementation', text: 'We build the retrieval systems for RAG and implement strict guardrails to ensure safe, on-topic, and reliable responses.' },
        { icon: <FiCloud />, title: 'Deployment & MLOps', text: 'We deploy your custom LLM to your secure cloud, establishing a full MLOps pipeline for ongoing monitoring and updates.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Build a Proprietary AI Asset?',
      description: 'Let\'s discuss how a custom LLM can create a lasting competitive advantage for your business.',
      cta: 'Book an LLM Strategy Session',
  }
};

// --- Main Page Component ---
const CustomLlmSolutions: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        <PageHero title={pageData.hero.headline} description={pageData.hero.subheadline} large>
            <div className={styles.heroExtra}> <a href={`/contact-us?service=${encodeURIComponent(pageData.serviceName)}`} className={styles.ctaButton}>{pageData.hero.cta}</a> </div>
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
                 <div className={styles.ctaGroup}> <a href={`/contact-us?service=${encodeURIComponent(pageData.serviceName)}`} className={styles.ctaButton}>{pageData.getStarted.cta}</a> </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomLlmSolutions;