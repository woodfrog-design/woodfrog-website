import { FunctionComponent } from "react";
import FeaturedCards1 from "./FeaturedCards1";
import styles from "./FeaturedContent.module.css";

export type FeaturedContentType = {
  className?: string;
  searchQuery?: string;
};

// Blog post data
const blogPosts = [
  {
    image: " /image-1@2x.png",
    text: "Smart Monitoring: Machine Learning for Early Fault Detection in Gas Turbines",
    name: "gas-turbine",
    title: "Gas Turbines"
  },
  {
    image: "/image@2x.png",
    text: "Predictive Maintenance for Downtime Reduction in Aluminium Casting",
    name: "predictive-maintenance",
    title: "Predictive Maintenance"
  },
  {
    image: "/image-2@2x.png",
    text: "Smart Manufacturing",
    name: "smart-manufacturing",
    title: "Smart Manufacturing"
  },
  {
    image: "/image-2@2x.png",
    text: "Demand Forecasting",
    name: "demand-forecasting",
    title: "Demand Forecasting"
  },
  {
    image: "/image-2@2x.png",
    text: "TVAC Score Prediction",
    name: "tvac-score",
    title: "TVAC Score Prediction"
  },
  {
    image: "/image-2@2x.png",
    text: "Customer Churn",
    name: "customer-churn",
    title: "Customer Churn"
  },
  {
    image: "/image-2@2x.png",
    text: "Suspect Engine",
    name: "suspect-engine",
    title: "Suspect Engine"
  },
  {
    image: "/image-2@2x.png",
    text: "Insurance Policy",
    name: "insurance-policy",
    title: "Insurance Policy"
  },
  {
    image: "/image-2@2x.png",
    text: "STB Predictive Maintenance",
    name: "stb-predictive",
    title: "STB Predictive Maintenance"
  },
  {
    image: "/image-2@2x.png",
    text: "Fact Finder",
    name: "fact-finder",
    title: "Fact Finder"
  }
];

const FeaturedContent: FunctionComponent<FeaturedContentType> = ({
  className = "",
  searchQuery = ""
}) => {
  // Filter blog posts based on search query
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <div className={[styles.featuredContent, "container", className].join(" ")}>
      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="col col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-4">
              <FeaturedCards1
                image={post.image}
                text={post.text}
                name={post.name}
                title={post.title}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <h3 style={{ color: 'var(--dark-secondary-text)' }}>No results found for "{searchQuery}"</h3>
            <p>Try adjusting your search terms or explore other topics.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedContent;