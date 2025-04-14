import { FunctionComponent } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./Offering.module.css";
import HeaderComponet from "../components/HeaderComponent";
import Footer from "../components/Footer";
import { useTheme } from "../ThemeContext";

// TypeScript interfaces for type safety
interface ServiceFeature {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  features: ServiceFeature[];
  backgroundClass?: string;
}

// Content data for the Offering page
const offeringData = {
  hero: {
    title: "Our Services & Solutions",
    description: "Woodfrog delivers a comprehensive suite of data analytics and AI services to transform your business. Our solutions combine cutting-edge technology with deep domain expertise to unlock the full potential of your data."
  },
  categories: [
    {
      title: "Core Platform Features",
      description: "Our platform provides powerful built-in capabilities that form the foundation of all our solutions:",
      backgroundClass: "bgLight",
      features: [
        {
          title: "High-Performance Data Management",
          description: "Process massive datasets with minimal latency. Our optimized data handling supports real-time analytics and historical analysis, enabling agile operations in fast-paced environments.",
          image: "/images/data-management.jpg",
          imageAlt: "Data management visualization"
        },
        {
          title: "Advanced Analytics Engine",
          description: "Explore complex datasets with our powerful analysis tools. Generate custom reports with key metrics and KPIs to support strategic initiatives across finance, operations, marketing, and supply chain.",
          image: "/images/analytics-engine.jpg",
          imageAlt: "Analytics dashboard"
        },
        {
          title: "Intelligent Monitoring & Alerts",
          description: "Set granular rules and thresholds for your data streams and receive instant notifications. Seamless integration with communication tools ensures you never miss critical changes or anomalies.",
          image: "/images/monitoring.jpg",
          imageAlt: "Monitoring and alert system"
        }
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Harness the power of artificial intelligence to automate processes and unlock predictive insights:",
      backgroundClass: "bgFaint",
      features: [
        {
          title: "Streamlined ML Workflows",
          description: "Build, train, and deploy machine learning models with minimal effort using our integrated AutoML and AutoAnalytics capabilities. Perfect for demand forecasting, predictive maintenance, and marketing optimization.",
          image: "/images/ml-workflows.jpg",
          imageAlt: "Machine learning workflow diagram"
        },
        {
          title: "LLM & Conversational AI",
          description: "Make data accessible to everyone with natural language querying. Our Large Language Model integration and chatbot features provide conversational, real-time data interaction for technical and non-technical users alike.",
          image: "/images/llm-ai.jpg",
          imageAlt: "Conversational AI interface"
        },
        {
          title: "Custom AI Solutions",
          description: "Our expert team develops bespoke AI models tailored to your specific business challenges, from predictive analytics to computer vision and NLP applications.",
          image: "/images/custom-ai.jpg",
          imageAlt: "Custom AI solution diagram"
        }
      ]
    },
    {
      title: "Visualization & Reporting",
      description: "Transform complex data into clear, actionable insights with our visualization capabilities:",
      backgroundClass: "bgLight",
      features: [
        {
          title: "Interactive Dashboards",
          description: "Create stunning, interactive visualizations that bring your data to life. Our dashboards combine technical precision with psychological insights to make data interpretation intuitive and engaging.",
          image: "/images/dashboards.jpg",
          imageAlt: "Interactive dashboard example"
        },
        {
          title: "Custom Reporting Suite",
          description: "Design reports tailored to your unique business metrics and KPIs. Choose from a wide range of visualization options and filters to explore your data from every angle.",
          image: "/images/custom-reporting.jpg",
          imageAlt: "Custom report example"
        },
        {
          title: "Weekly Insights Delivery",
          description: "Receive regular reports highlighting key performance metrics, inefficiencies, and opportunities for improvement, complete with actionable recommendations from our analytics experts.",
          image: "/images/insights.jpg",
          imageAlt: "Weekly insights report"
        }
      ]
    },
    {
      title: "Enterprise Solutions",
      description: "Comprehensive offerings designed for organization-wide implementation and scalability:",
      backgroundClass: "bgFaint",
      features: [
        {
          title: "End-to-End Data Management",
          description: "Transform your entire data landscape with Woodfrog. We handle everything from data democratization and user persona analysis to infrastructure optimization and governance implementation.",
          image: "/images/enterprise-data.jpg",
          imageAlt: "Enterprise data management"
        },
        {
          title: "Custom Applications & Workflows",
          description: "Develop bespoke applications tailored to your specific business processes. Automate complex workflows, from inventory tracking to sales pipeline management, for improved operational efficiency.",
          image: "/images/custom-apps.jpg",
          imageAlt: "Custom application interface"
        },
        {
          title: "Mobile Experience",
          description: "Access the full power of Woodfrog on the go with our optimized mobile experience. View dashboards, generate reports, and receive alerts anytime, anywhere to ensure timely decision-making.",
          image: "/images/mobile-access.jpg",
          imageAlt: "Mobile application interface"
        }
      ]
    }
  ],
  closing: {
    title: "Ready to Unlock Your Data's Potential?",
    description: "Discover how Woodfrog's comprehensive suite of analytics and AI solutions can transform your business operations and decision-making capabilities.",
    ctaText: "Schedule a Consultation"
  }
};

// Hero Section Component
const HeroSection: FunctionComponent = () => (
  <section className={styles.heroSection}>
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>{offeringData.hero.title}</h1>
      <p className={styles.heroDescription}>{offeringData.hero.description}</p>
    </div>
  </section>
);

// Feature Component - for displaying individual features
interface FeatureProps {
  feature: ServiceFeature;
  isEven: boolean;
}

const Feature: FunctionComponent<FeatureProps> = ({ feature, isEven }) => (
  <div className={`${styles.featureContainer} ${isEven ? styles.imageRight : styles.imageLeft}`}>
    <div className={styles.featureContent}>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
    </div>
    <div className={styles.featureImageWrapper}>
      <div className={styles.featureImageContainer}>
        <img 
          src={feature.image || "/api/placeholder/400/300"} 
          alt={feature.imageAlt || "Feature illustration"} 
          className={styles.featureImage}
        />
      </div>
    </div>
  </div>
);

// Category Section Component - for displaying service categories
interface CategorySectionProps {
  category: ServiceCategory;
  index: number;
}

const CategorySection: FunctionComponent<CategorySectionProps> = ({ category, index }) => (
  <section className={`${styles.categorySection} ${styles[category.backgroundClass || '']}`}>
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{category.title}</h2>
        <p className={styles.sectionDescription}>{category.description}</p>
      </div>
      
      <div className={styles.featuresContainer}>
        {category.features.map((feature, featureIndex) => (
          <Feature 
            key={featureIndex} 
            feature={feature} 
            isEven={(featureIndex % 2 === 0) ? false : true}
          />
        ))}
      </div>
    </div>
  </section>
);

// Closing CTA Section
const ClosingSection: FunctionComponent = () => (
  <section className={styles.closingSection}>
    <div className={styles.closingContainer}>
      <h2 className={styles.closingTitle}>{offeringData.closing.title}</h2>
      <p className={styles.closingDescription}>{offeringData.closing.description}</p>
      <button className={styles.ctaButton}>{offeringData.closing.ctaText}</button>
    </div>
  </section>
);

// Main Offering Component
const Offering: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={styles.offeringPage}>
      <HeaderComponet />
      
      <main className={styles.mainContent}>
        <HeroSection />
        
        {offeringData.categories.map((category, index) => (
          <CategorySection 
            key={index} 
            category={category} 
            index={index} 
          />
        ))}
        
        <ClosingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Offering;