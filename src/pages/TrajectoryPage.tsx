import { FunctionComponent, useEffect, useRef } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './TrajectoryPage.module.css';
import { 
    FiFlag, FiUsers, FiPackage, FiGitBranch, FiTrendingUp, FiDownload, FiExternalLink
} from 'react-icons/fi';

// Data is structured for the new timeline layout
const pageData = {
  hero: {
    title: 'Woodfrog Tech Trajectory',
    description: 'Evolution from Data Consulting to Product-Led Intelligence Platform',
  },
  links: {
    pdf: '/Woodfrog-Trajectory.pdf',
    notion: 'https://www.notion.so/Woodfrog-Tech-Trajectory-2492428418a88045bde5dab89c37b0ca'
  },
  events: [
    { 
      icon: <FiFlag />, 
      era: '2023', 
      title: 'Foundation & Early Growth', 
      text: 'Founded in Pune by data specialists, our early phase focused on hands-on consulting, building a reputation for practical solutions and reliable delivery.' 
    },
    { 
      icon: <FiUsers />, 
      era: 'Growth Phase', 
      title: 'Expansion & Diversification', 
      text: 'We expanded our team to over 20+ professionals and broadened our client base, diversifying offerings into robust data engineering, analytics dashboards, and custom reporting frameworks.' 
    },
    { 
      icon: <FiPackage />, 
      era: 'Innovation', 
      title: 'Transition to Product Development', 
      text: 'Leveraging our consulting insights, we created tools like TrendViewer, Antvia, and Knowvia to solve recurring customer challenges more efficiently.' 
    },
    { 
      icon: <FiGitBranch />, 
      era: 'Expansion', 
      title: 'New Business Verticals', 
      text: 'Building on our core strengths, we expanded into new verticals, offering specialized services in advanced data visualization and benchmarking of modern data technologies.' 
    },
    { 
      icon: <FiTrendingUp />, 
      era: 'The Future', 
      title: 'Vision for the Future', 
      text: 'We are committed to expanding our suite of self-service analytics and industry-specific solutions, empowering clients to progress from data chaos to intelligence-led growth.' 
    },
  ],
  getStarted: {
    headline: 'Let\'s Build Together',
    description: 'From short-term PoCs to full-fledged data product builds, we\'ve got you covered.',
    cta: 'Get in Touch',
  }
};

const TrajectoryPage: FunctionComponent = () => {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      { threshold: 0.1 }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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

            <div className={styles.timelineContainer}>
                {pageData.events.map((event, index) => (
                    <div 
                        key={index}
                        className={styles.timelineBlock}
                        ref={el => { timelineRefs.current[index] = el; }}
                    >
                        <div className={styles.timelineDecorator}>
                            {event.icon}
                        </div>
                        <div className={styles.timelineContent}>
                            <span className={styles.timelineEra}>{event.era}</span>
                            <h3 className={styles.timelineTitle}>{event.title}</h3>
                            <p className={styles.timelineText}>{event.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles.getStartedSection}>
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

export default TrajectoryPage;