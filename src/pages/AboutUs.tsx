import { FunctionComponent } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./AboutUs.module.css";
import HeaderComponet from "../components/HeaderComponent";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useTheme } from "../ThemeContext";


// TypeScript interfaces
interface ListItem {
  [key: string]: string;
}

interface Card {
  title: string;
  description: string;
  listItems?: string[];
  image?: string;
  imageAlt?: string;
}

interface SubSection {
  description: string;
  listItems?: string[];
}

interface Section {
  title: string;
  description?: string;
  listItems?: string[];
  image?: string;
  imageAlt?: string;
  imagePosition: 'left' | 'right' | 'top';
  subSection?: SubSection;
  subSections?: SubSection[];
  cardLayout?: boolean;
  cards?: Card[];
}

interface Header {
  title: string;
  description: string;
}

interface Closing {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imagePosition: 'left' | 'right';
}

interface AboutUsData {
  header: Header;
  sections: Section[];
  closing: Closing;
}

// Content data objects
const aboutUsData: AboutUsData = {
  header: {
    title: 'About Us',
    description: `Woodfrog, established in 2023 in Pune, India, is an innovative AI and Analytics firm. 
    With a bold vision and agile approach, we're disrupting traditional data solutions. Our team's creativity, 
    expertise, and enthusiasm enable us to craft cutting-edge solutions for data-driven decision making, 
    serving esteemed clients across industries and cementing our position as a rising star in the data analytics.`
  },
  sections: [
    {
      title: 'Our Story',
      description: `We began with a simple yet ambitious goal: to empower businesses to make informed decisions through data-driven insights.
      Our founder & core team, passionate about AI and analytics, assembled a team of talented individuals who share a common vision.`,
      image: '/images/OurStory/os2.png',
      imageAlt: 'Woodfrog team collaborating',
      imagePosition: 'right'
    },
    {
      title: 'Our Mission',
      description: `To revolutionize data analytics by:`,
      listItems: [
        'Developing innovative AI-powered solutions',
        'Delivering actionable insights for informed decision-making',
        'Fostering long-term partnerships with our clients',
        'Cultivating a culture of continuous learning and innovation',
      ],
      image: '/images/OurMission/om2.png',
      imageAlt: 'Data visualization dashboard',
      imagePosition: 'left'
    },
    {
      title: 'Our Values',
      listItems: [
        'Customer-centricity: Your success is our priority',
        'Innovation: We continuously push boundaries',
        'Collaboration: Together, we achieve more',
        'Integrity: Transparency and ethics guide our actions',
      ],
      image: '/images/OurValues/ov2.png',
      imageAlt: 'Team values illustration',
      imagePosition: 'right'
    },
    {
      title: 'Our Expertise',
      description: `Our team of seasoned data scientists, engineers, and AI specialists leverages decades of collective experience in:`,
      listItems: [
        'Advanced analytics: Uncovering hidden patterns and insights',
        'Data product: Crafting customizable, user-centric data solutions',
        'Data engineering: Building scalable, efficient data infrastructure',
        'Machine learning: Developing predictive models for informed decision-making',
      ],
      image: '/images/OurExpertise/oe2.png',
      imageAlt: 'Data analysis in progress',
      imagePosition: 'left'
    },
    {
      title: 'Our Approach',
      description: `We believe data should be accessible, actionable, and empowering for everyone. Our customizable analytics solutions and user-centric tools enable businesses to:`,
      listItems: [
        'Extract deep insights: Uncover hidden trends and opportunities',
        'Optimize processes: Streamline operations and enhance efficiency',
        'Anticipate future challenges: Proactively address potential obstacles',
      ],
      subSection: {
        description: `Our consultative, end-to-end approach guides clients through:`,
        listItems: [
          'Data preparation: Ensuring data quality and integrity',
          'Strategy development: Aligning data goals with business objectives',
          'Deployment: Seamless integration with existing systems',
          'Ongoing support: Continuous guidance and optimization'
        ]
      },
      image: '/images/OurApproach/oa2.png',
      imageAlt: 'Team consulting with clients',
      imagePosition: 'right'
    },
    {
      title: 'Why Woodfrog?',
      description: `Choose Woodfrog for impactful data-driven solutions:`,
      cardLayout: true,
      cards: [
        {
          title: 'Tailored AI Solutions',
          description: 'Customized models addressing specific business challenges',
          listItems: [
            'Predictive maintenance: Minimizing downtime and optimizing resource allocation',
            'Demand forecasting: Informing inventory management and supply chain optimization',
            'Customer experience enhancements: Personalizing interactions and improving satisfaction',
            'Large language model (LLM) agents: Revolutionizing customer support and engagement'
          ],
          image: '/images/TailoredSolutions/ts.png',
          imageAlt: 'AI customization illustration'
        },
        {
          title: 'Real-Time Insights',
          description: 'Seamless integration with existing systems, enabling:',
          listItems: [
            'Agile decision-making: Responding promptly to changing market conditions',
            'Data-driven strategy: Informing business decisions with up-to-the-minute information'
          ],
          image: '/images/RealTimeInsights/rti.png',
          imageAlt: 'Real-time data dashboard'
        },
        {
          title: 'Intuitive Tools',
          description: 'User-friendly dashboards and data visualization, facilitating:',
          listItems: [
            'Effective insights utilization: Empowering teams to make data-driven decisions',
            'Collaborative workflow: Enhancing cross-functional communication and alignment'
          ],
          image: '/images/IntuitiveTools/it.png',
          imageAlt: 'User-friendly interface'
        }
      ],
      imagePosition: 'top'
    }
  ],
  closing: {
    title: 'Join the Woodfrog Journey',
    description: `Discover how our cutting-edge AI and analytics solutions can transform your business. Let's collaborate to unlock data-driven growth, efficiency, and success.`,
    image: '/images/JoinWoodfrogJourney/jwj2.png',
    imageAlt: 'Collaboration illustration',
    imagePosition: 'right'
  }
};

// Component for section header with description
interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: FunctionComponent<SectionHeaderProps> = ({ title, description }) => (
  <div className={styles.sectionHeader}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {description && <div className={styles.sectionDescription} dangerouslySetInnerHTML={{ __html: description }} />}
  </div>
);

// Component for bullet list
interface BulletListProps {
  items: string[];
}

const BulletList: FunctionComponent<BulletListProps> = ({ items }) => (
  <ul className={styles.bulletList}>
    {items.map((item: string, index: number) => (
      <li key={index} className={styles.bulletItem}>{item}</li>
    ))}
  </ul>
);

// Card component for "Why Woodfrog" section
interface CardComponentProps {
  card: Card;
}

const CardComponent: FunctionComponent<CardComponentProps> = ({ card }) => (
  <div className={styles.card}>
    <div className={styles.cardImageContainer}>
      <img 
        src={card.image || "/api/placeholder/300/200"} 
        alt={card.imageAlt || "Feature illustration"} 
        className={styles.cardImage}
      />
    </div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <p className={styles.cardDescription}>{card.description}</p>
      {card.listItems && <BulletList items={card.listItems} />}
    </div>
  </div>
);

// Card grid component
interface CardGridProps {
  cards: Card[];
}

const CardGrid: FunctionComponent<CardGridProps> = ({ cards }) => (
  <div className={styles.cardGrid}>
    {cards.map((card: Card, idx: number) => (
      <CardComponent key={idx} card={card} />
    ))}
  </div>
);

// Component for alternating content sections
interface ContentSectionProps {
  section: Section;
  index: number;
}

const ContentSection: FunctionComponent<ContentSectionProps> = ({ section, index }) => {
  const isImageLeft = section.imagePosition === 'left';
  
  // For card layout sections (Why Woodfrog)
  if (section.cardLayout && section.cards) {
    return (
      <section className={`${styles.contentSection} ${index % 2 === 0 ? styles.bgLight : styles.bgFaint}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.fullWidthContent}>
            <SectionHeader title={section.title} description={section.description} />
            <CardGrid cards={section.cards} />
          </div>
        </div>
      </section>
    );
  }
  
  // For standard alternate layout sections
  return (
    <section className={`${styles.contentSection} ${index % 2 === 0 ? styles.bgLight : styles.bgFaint}`}>
      <div className={`${styles.sectionContainer} ${isImageLeft ? styles.imageLeft : styles.imageRight}`}>
        <div className={styles.textContent}>
          <SectionHeader title={section.title} description={section.description} />
          
          {section.listItems && <BulletList items={section.listItems} />}
          
          {section.subSection && (
            <div className={styles.subSection}>
              <div className={styles.subSectionDescription} dangerouslySetInnerHTML={{ __html: section.subSection.description }} />
              {section.subSection.listItems && <BulletList items={section.subSection.listItems} />}
            </div>
          )}
          
          {section.subSections && section.subSections.map((subSection: SubSection, idx: number) => (
            <div key={idx} className={styles.subSection}>
              <div className={styles.subSectionDescription} dangerouslySetInnerHTML={{ __html: subSection.description }} />
              {subSection.listItems && <BulletList items={subSection.listItems} />}
            </div>
          ))}
        </div>
        
        <div className={styles.imageContent}>
          {/* Use an image placeholder if you don't have the actual image */}
          <div className={styles.imagePlaceholder}>
            <img 
              src={section.image || "/api/placeholder/500/320"} 
              alt={section.imageAlt || "Placeholder image"} 
              className={styles.sectionImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Closing section component
interface ClosingSectionProps {
  closing: Closing;
}

const ClosingSection: FunctionComponent<ClosingSectionProps> = ({ closing }) => (
  <section className={styles.closingSection}>
    <div className={`${styles.sectionContainer} ${closing.imagePosition === 'left' ? styles.imageLeft : styles.imageRight}`}>
      <div className={styles.textContent}>
        <SectionHeader title={closing.title} description={closing.description} />
        <div className={styles.ctaContainer}>
          <a href="/contact-us" className={styles.ctaButton}>Let's Talk!</a>
        </div>
      </div>
      
      <div className={styles.imageContent}>
        <div className={styles.imagePlaceholder}>
          <img 
            src={closing.image || "/api/placeholder/500/320"} 
            alt={closing.imageAlt || "Placeholder image"} 
            className={styles.sectionImage}
          />
        </div>
      </div>
    </div>
  </section>
);

// Main About Us component
const AboutUs: FunctionComponent = () => {
  // We still use the ThemeContext but don't need to apply any special classes
  // The theme variables are already set at the document level by your ThemeContext
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={styles.aboutUsPage}>
      <HeaderComponet />
      
      <main className={styles.mainContent}>
        <PageHero
          title={aboutUsData.header.title}
          description={aboutUsData.header.description}
        />
        
        {aboutUsData.sections.map((section: Section, index: number) => (
          <ContentSection key={index} section={section} index={index} />
        ))}
        
        <ClosingSection closing={aboutUsData.closing} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
  // return (
  //   <div className={styles.aboutUsPage}>
  //     <HeaderComponet />
      
  //     <main className={styles.mainContent}>
  //       {/* Hero section that exactly matches the blog styling */}
  //       <div style={{
  //         width: '100%',
  //         padding: '80px 0 40px',
  //         backgroundColor: 'var(--color-gray-200)',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center'
  //       }}>
  //         <div style={{
  //           maxWidth: '900px',
  //           margin: '0 auto',
  //           padding: '0 20px',
  //           textAlign: 'center'
  //         }}>
  //           <h1 style={{
  //             fontSize: '2.5rem',
  //             fontWeight: 700,
  //             marginBottom: '16px',
  //             color: 'var(--dark-primary-text)',
  //             lineHeight: 1.2
  //           }}>{aboutUsData.header.title}</h1>
  //           <p style={{
  //             fontSize: '1rem',
  //             lineHeight: 1.6,
  //             color: 'var(--dark-secondary-text)',
  //             maxWidth: '800px',
  //             margin: '0 auto'
  //           }}>
  //             {aboutUsData.header.description}
  //           </p>
  //         </div>
  //       </div>
        
  //       {aboutUsData.sections.map((section: Section, index: number) => (
  //         <ContentSection key={index} section={section} index={index} />
  //       ))}
        
  //       <ClosingSection closing={aboutUsData.closing} />
  //     </main>
      
  //     <Footer />
  //   </div>
  // );
// };

// export default AboutUs;