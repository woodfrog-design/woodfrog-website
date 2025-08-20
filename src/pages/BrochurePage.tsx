import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './BrochurePage.module.css';
import { 
    FiUsers, FiZap, FiEye, FiAward, FiDownload, FiExternalLink, FiCheckCircle,
    FiLayers, FiPackage, FiTool, FiTarget, FiCode, FiGitMerge, FiTrello
} from 'react-icons/fi';

const pageData = {
  hero: {
    title: 'Woodfrog Tech Brochure',
    description: 'An innovative AI and analytics firm specializing in next-generation data engineering and analytics solutions. We help businesses transition from chaotic, unstructured systems to streamlined, scalable, and insight-driven operations.',
  },
  links: {
    pdf: '/Woodfrog-Brochure.pdf',
    notion: 'https://www.notion.so/Woodfrog-Tech-Brochure-2242428418a880898d34cc88c64851b1'
  },
  howWeWork: {
    headline: 'How We Work',
    cards: [
      { icon: <FiUsers />, title: 'Collaborative Partnership', text: 'We partner closely with clients to understand their unique needs and deliver practical, effective solutions.' },
      { icon: <FiZap />, title: 'Agile & Iterative', text: 'Our team uses flexible methods to ensure rapid delivery and continuous improvement.' },
      { icon: <FiEye />, title: 'Transparent & Ethical', text: 'We believe in open, honest communication and ethical business practices in every engagement.' },
      { icon: <FiAward />, title: 'Client-Focused Results', text: 'We measure our success by our clients’ results, ensuring our solutions drive real, measurable value.' },
    ],
  },
  offerings: {
    headline: 'Our Offerings',
    columns: [
      { icon: <FiLayers />, title: 'Core Services', items: ['Data Engineering', 'Analytics & BI', 'Machine Learning', 'LLMs & Automation', 'Data Visualization'] },
      { icon: <FiPackage />, title: 'Products', items: ['Custom Reporting', 'TrendViewer', 'Antvia', 'Text-to-SQL Assistant'] },
      { icon: <FiTool />, title: 'Custom Solutions', items: ['Digitization Services', 'Open Source Benchmarking', 'ML/LLM Integration Strategy'] },
    ]
  },
  techStack: {
    headline: 'Technology Stack',
    tools: ['Airbyte', 'Fivetran', 'Kafka', 'Apache Iceberg', 'Delta Lake', 'ADLS', 'S3', 'Trino', 'DuckDB', 'ClickHouse', 'Apache Superset', 'Metabase', 'Power BI', 'Looker', 'MLflow', 'LangChain', 'MindsDB', 'Kubernetes', 'Azure', 'GCP', 'AWS']
  },
  whyUs: {
    headline: 'Why Woodfrog?',
    points: [
      { icon: <FiTrello />, title: 'Proven Expertise', text: 'Proven expertise in enterprise data systems across diverse domains like finance, manufacturing, and public sector.' },
      { icon: <FiZap />, title: 'Rapid Implementation', text: 'Go live with analytics, AI, and reporting platforms in weeks, not months.' },
      { icon: <FiTarget />, title: 'Strategic Approach', text: 'We build solutions designed for long-term usability, governance, and self-service.' },
      { icon: <FiCode />, title: 'Open-Source Driven', text: 'Deep experience with tools like Airbyte, Trino, and Superset, ensuring flexibility and cost efficiency.' },
      { icon: <FiGitMerge />, title: 'Scalable Architecture', text: 'Our solutions are designed to handle increasing data volumes and evolving business needs.' },
    ]
  },
  getStarted: {
    headline: 'Let\'s Build Together',
    description: 'From short-term PoCs to full-fledged data product builds, we\'ve got you covered. If you\'re looking to make sense of your data, deliver powerful reports, or automate insights—we are your ideal partner.',
    cta: 'Get in Touch',
  }
};

const BrochurePage: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        <PageHero title={pageData.hero.title} description={pageData.hero.description} />
        
        <div className={styles.contentWrapper}>
            <section className={styles.linksSection}>
                <a href={pageData.links.pdf} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                <FiDownload /> Download PDF
                </a>
                <a href={pageData.links.notion} target="_blank" rel="noopener noreferrer" className={styles.ctaButtonSecondary}>
                <FiExternalLink /> View on Notion
                </a>
            </section>
            
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.howWeWork.headline}</h2>
                </div>
                <div className={styles.cardsGrid}>
                    {pageData.howWeWork.cards.map((card, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.offerings.headline}</h2>
                </div>
                <div className={styles.offeringsGrid}>
                    {pageData.offerings.columns.map((col, index) => (
                        <div key={index} className={styles.offeringColumn}>
                            <h3 className={styles.offeringTitle}>
                                <span className={styles.offeringIcon}>{col.icon}</span>
                                {col.title}
                            </h3>
                            <ul className={styles.offeringList}>
                                {col.items.map(item => <li key={item}><FiCheckCircle className={styles.listIcon}/> {item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.whyUs.headline}</h2>
                </div>
                <div className={styles.whyUsGrid}>
                    {pageData.whyUs.points.map((card, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.techStack.headline}</h2>
                </div>
                <div className={styles.pillsGrid}>
                    {pageData.techStack.tools.map(tool => <div key={tool} className={styles.pill}>{tool}</div>)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.getStartedSection}`}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.getStarted.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.getStarted.description}</p>
                    <div className={styles.ctaGroup}>
                        <a href="/contact-us" className={styles.ctaButton}>{pageData.getStarted.cta}</a>
                    </div>
                </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrochurePage;