import { FunctionComponent } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./OfferingPage.module.css";
import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/Footer";
import { useTheme } from "../ThemeContext";
import PageHero from "../components/PageHero";
import { FiSettings, FiCpu, FiDatabase, FiBarChart2, FiCode, FiTrello, FiAward } from "react-icons/fi";

// TypeScript interfaces for type safety
interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  features: ServiceFeature[];
  image?: string;
  imageAlt?: string;
}

// Content data for the Offering page
const offeringData = {
  hero: {
    title: "Unlock the Power of Data & AI",
    description: "Woodfrog provides cutting-edge data science and AI solutions that transform raw information into strategic business advantages.",
    backgroundImage: "/images/hero-pattern.svg"
  },
  categories: [
    {
      title: "Data Science Solutions",
      description: "We combine industry expertise with advanced data science capabilities to help you uncover opportunities, optimize operations, and make informed decisions.",
      image: "/images/DataScience/ds.jpg",
      imageAlt: "Data science visualization",
      features: [
        {
          title: "AI & ML Strategy Development",
          description: "We create customized AI/ML roadmaps aligned with your business goals. Our approach includes thorough assessment of your processes, identification of pain points, and development of strategic implementation plans.",
          icon: "strategy-icon",
          image: "/images/AiStrategy/aiStrat.png",
          imageAlt: "Strategic planning illustration"
        },
        {
          title: "Product Development",
          description: "Our team builds intelligent products that learn and evolve with your business. From concept to deployment, we deliver solutions that enhance customer experiences and drive growth.",
          icon: "product-icon",
          image: "/images/ProductDevelopment/prodDev.png",
          imageAlt: "Product development cycle"
        },
        {
          title: "Enterprise Data Management",
          description: "Transform your data landscape with our comprehensive approach to data management. We ensure seamless data democratization, reduce costs, and align your data with business priorities.",
          icon: "data-icon",
          image: "/images/EnterpriceDataManagement/edm.png",
          imageAlt: "Data management system"
        },
        {
          title: "Advanced Analytics",
          description: "Turn complex data into actionable insights with our analytics services. We provide data visualization, predictive analytics, and business intelligence solutions tailored to your needs.",
          icon: "analytics-icon",
          image: "/images/AdvancedAnalytics/aa.png",
          imageAlt: "Analytics dashboard"
        }
      ]
    },
    {
      title: "Large Language Models & AI Agents",
      description: "Harness the revolutionary power of LLMs and AI agents to automate complex tasks, unlock insights, and transform your business operations.",
      image: "/images/llm/llm2.png",
      imageAlt: "AI language model illustration",
      features: [
        {
          title: "Custom LLM Solutions",
          description: "Generic solutions don't address unique business challenges. We create tailored LLM implementations infused with your specific business context and domain expertise, ensuring you maintain control of your data.",
          icon: "custom-icon",
          image: "/images/CustomLLM/CustomLLM.jpg",
          imageAlt: "Custom AI solution"
        },
        {
          title: "Automation & Scaling",
          description: "Our LLM solutions can automate up to 100% of repetitive tasks, dramatically improving efficiency and accuracy while reducing costs. Scale your operations with confidence using our AI-powered tools.",
          icon: "automation-icon",
          image: "/images/AutomationScaling/autoScale.png",
          imageAlt: "Business automation"
        },
        {
          title: "Intelligent Agents",
          description: "Our LLM Agents and Small Language Models work together to tackle specific business needs. They enhance productivity, streamline workflows, and deliver personalized experiences with minimal computational resources.",
          icon: "agent-icon",
          image: "/images/IntelligentAgents/ia.png",
          imageAlt: "AI agents at work"
        }
      ]
    }
  ],
  useCases: {
    title: "Real-World Success Stories",
    description: "See how our solutions have created measurable impact for our clients",
    cases: [
      {
        industry: "Retail Analytics",
        description: "Helped a retail chain improve inventory forecasting accuracy by 22% and reduce out-of-stock instances by 35% through advanced predictive analytics.",
        image: "/images/RetailAnalytics/ra.png"
      },
      {
        industry: "Healthcare Operations",
        description: "Developed a patient flow optimization system that reduced average wait times by 40% and improved resource allocation for a major healthcare provider.",
        image: "/images/Healthcare/hc.png"
      },
      {
        industry: "Financial Services",
        description: "Created a custom LLM solution that automated document processing and reduced manual review time by 70% while maintaining strict compliance standards.",
        image: "/images/Finance/finance.jpg"
      },
      {
        industry: "Manufacturing",
        description: "Implemented a predictive maintenance system that decreased unplanned downtime by 27% and extended equipment lifespan by an estimated 15-20%.",
        image: "/images/Manufacturing/mf.png"
      }
    ]
  },
  process: {
    title: "Our Approach",
    description: "How we deliver exceptional results through a proven methodology",
    steps: [
      {
        number: "01",
        title: "Discovery",
        description: "We begin by understanding your business, challenges, and objectives through in-depth consultation."
      },
      {
        number: "02",
        title: "Assessment",
        description: "Our team analyzes your data landscape, identifies opportunities, and creates a tailored strategy."
      },
      {
        number: "03",
        title: "Development",
        description: "We build and refine customized solutions aligned with your specific business needs."
      },
      {
        number: "04",
        title: "Implementation",
        description: "Solutions are seamlessly integrated into your operations with minimal disruption."
      },
      {
        number: "05",
        title: "Optimization",
        description: "We continuously monitor, analyze, and improve performance to maximize long-term value."
      }
    ]
  }
};

// Hero Section Component
const HeroSection: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <PageHero
      title="Unlock the Power of Data & AI"
      description="Woodfrog provides cutting-edge data science and AI solutions that transform raw information into strategic business advantages."
      large={true}
      // blueAccent={true}
    />
  );
};

// Category Overview Component
interface CategoryOverviewProps {
  category: ServiceCategory;
  isReversed: boolean;
}

const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({ category, isReversed }) => (
  <div className={`${styles.categoryOverview} ${isReversed ? styles.reversed : ''}`}>
    <div className={styles.categoryImageContainer}>
      <img 
        src={category.image || "/api/placeholder/600/400"} 
        alt={category.imageAlt || "Category illustration"} 
        className={styles.categoryImage}
      />
    </div>
    <div className={styles.categoryIntro}>
      <h2 className={styles.categoryTitle}>{category.title}</h2>
      <div className={styles.categoryTitleLine}></div>
      <p className={styles.categoryDescription}>{category.description}</p>
    </div>
  </div>
);

// Feature Card Component
interface FeatureCardProps {
  feature: ServiceFeature;
}

// Helper function to get the appropriate icon
const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case 'strategy-icon':
      return <FiSettings size={22} />;
    case 'product-icon':
      return <FiCpu size={22} />;
    case 'data-icon':
      return <FiDatabase size={22} />;
    case 'analytics-icon':
      return <FiBarChart2 size={22} />;
    case 'custom-icon':
      return <FiCode size={22} />;
    case 'automation-icon':
      return <FiTrello size={22} />;
    case 'agent-icon':
      return <FiAward size={22} />;
    default:
      return <FiCpu size={22} />;
  }
};

const FeatureCard: FunctionComponent<FeatureCardProps> = ({ feature }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureImageWrapper}>
      <img 
        src={feature.image || "/api/placeholder/400/240"} 
        alt={feature.imageAlt || "Feature illustration"} 
        className={styles.featureImage}
      />
      {feature.icon && (
        <div className={styles.featureIcon}>
          {getIconComponent(feature.icon)}
        </div>
      )}
    </div>
    <div className={styles.featureContent}>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
    </div>
  </div>
);

// Service Category Section
interface CategorySectionProps {
  category: ServiceCategory;
  index: number;
}

const CategorySection: FunctionComponent<CategorySectionProps> = ({ category, index }) => (
  <section className={`${styles.categorySection} ${index % 2 === 0 ? styles.evenSection : styles.oddSection}`}>
    <div className={styles.categoryContainer}>
      <CategoryOverview 
        category={category} 
        isReversed={index % 2 !== 0}
      />
      
      <div className={styles.featuresGrid}>
        {category.features.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </div>
  </section>
);

// Use Cases Component
const UseCasesSection: FunctionComponent = () => (
  <section className={styles.useCasesSection}>
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{offeringData.useCases.title}</h2>
        <p className={styles.sectionDescription}>{offeringData.useCases.description}</p>
      </div>
      
      <div className={styles.useCasesGrid}>
        {offeringData.useCases.cases.map((useCase, idx) => (
          <div key={idx} className={styles.useCaseCard}>
            <div className={styles.useCaseImageWrapper}>
              <img 
                src={useCase.image || "/api/placeholder/400/240"} 
                alt={`${useCase.industry} use case`} 
                className={styles.useCaseImage}
              />
            </div>
            <div className={styles.useCaseContent}>
              <h3 className={styles.useCaseIndustry}>{useCase.industry}</h3>
              <p className={styles.useCaseDescription}>{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Process Steps Component
const ProcessSection: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <section className={styles.processSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{offeringData.process.title}</h2>
          <p className={styles.sectionDescription}>{offeringData.process.description}</p>
        </div>
        
        <div className={styles.processSteps}>
          {offeringData.process.steps.map((step, idx) => (
            <div key={idx} className={styles.processStep}>
              <div className={`${styles.stepNumber} ${isDarkTheme ? styles.darkThemeNumber : ''}`}>
                <span className={styles.stepNumberText}>{idx + 1}</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <section className={`${styles.ctaSection} ${isDarkTheme ? styles.ctaSectionDark : ''}`}>
      <div className={styles.ctaSectionBg}></div>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
        <p className={styles.ctaDescription}>
          Let's discuss how our data science expertise and AI capabilities can drive innovation and growth for your organization.
        </p>
        <a href="/contact-us" className={styles.ctaButton}>Schedule a Consultation</a>
      </div>
    </section>
  );
};

// Main Offering Component
const OfferingPage: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={styles.offeringPage}>
      <HeaderComponent />
      
      <main className={styles.mainContent}>
        <HeroSection />
        
        {offeringData.categories.map((category, idx) => (
          <CategorySection 
            key={idx} 
            category={category}
            index={idx}
          />
        ))}
        
        <UseCasesSection />
        <ProcessSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default OfferingPage;