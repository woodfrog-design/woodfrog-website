import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './ProductDevelopment.module.css';
import { FiFastForward, FiServer, FiUsers, FiLayers, FiLock, FiRefreshCw, FiSearch, FiLayout, FiCode, FiTrendingUp } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  hero: {
    headline: 'From Idea to Impact: Building Real-World AI Products',
    subheadline: 'We partner with you to transform innovative ideas into scalable, high-performance AI-powered applications that deliver tangible business value and delight users.',
    cta: 'Book a Strategy Call',
  },
  benefits: {
    headline: 'Why a Specialized AI Product Development Partner is Crucial',
    description: 'Building a successful AI product requires more than just coding. It demands a deep understanding of data science, user experience, scalable infrastructure, and a clear path to market. Our integrated approach ensures all pieces work together seamlessly.',
    cards: [
      { icon: <FiFastForward />, title: 'Accelerate Speed to Market', text: 'Launch faster with our agile development cycles. High-performing companies are 3x more likely to use agile frameworks to accelerate innovation.' },
      { icon: <FiServer />, title: 'Scalable & Robust Architecture', text: 'Build on a resilient, cloud-native foundation designed for enterprise growth and high-volume usage from day one.' },
      { icon: <FiUsers />, title: 'Intuitive, User-Centric Design', text: 'We create intuitive and engaging products that solve real-world problems, ensuring high user adoption and satisfaction.' },
      { icon: <FiLayers />, title: 'End-to-End Technical Expertise', text: 'Leverage our full-stack capabilities, from data engineering and model training to front-end development and MLOps.' },
      { icon: <FiLock />, title: 'Secure & Protected IP', text: 'Ensure your valuable intellectual property is secure with best-in-class security protocols and development practices.' },
      { icon: <FiRefreshCw />, title: 'Post-Launch Support & Iteration', text: 'Benefit from our ongoing maintenance, performance monitoring, and iteration to keep your product competitive and evolving.' },
    ],
  },
  // --- NEW: Image and Text Feature Section ---
  featureSection: {
    headline: 'User-Centric AI by Design',
    text: 'The most powerful AI is useless if it\'s not intuitive. Our development process is rooted in human-centered design, ensuring your final product is not only technologically advanced but also accessible, engaging, and solves real problems for your users.',
    image: '/images/ProductDevelopment/prod.png', // Placeholder image path
  },
  process: {
    headline: 'Our Collaborative Product Development Lifecycle',
    subheadline: 'A Transparent Partnership from Idea to Impact',
    stages: [
        { icon: <FiSearch />, title: 'Discovery & Strategy', text: 'We start by aligning on your vision, defining key metrics, and creating a strategic product roadmap.' },
        { icon: <FiLayout />, title: 'Design & Prototyping', text: 'Our UX/UI experts design intuitive interfaces and build interactive prototypes for early feedback and validation.' },
        { icon: <FiCode />, title: 'Agile Development & AI Integration', text: 'We build your product in iterative sprints, integrating complex AI models and ensuring high-quality, maintainable code.' },
        { icon: <FiTrendingUp />, title: 'Deployment & Scaling', text: 'We handle the seamless deployment to your preferred cloud environment and ensure it scales flawlessly with your user base.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Build Your Next-Generation AI Product?',
      description: 'Let\'s discuss how we can turn your vision into a market-leading reality.',
      cta: 'Book a Product Strategy Session',
  },
  serviceName: 'Product Development'
};

const ProductDevelopment: FunctionComponent = () => {
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

            {/* --- NEW: Image and Text Feature Section --- */}
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

export default ProductDevelopment;