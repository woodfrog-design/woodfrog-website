import { FunctionComponent, useState, useRef, useEffect } from "react";
import Items2 from "./Items2";
import styles from "./PlatformBenefits1.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export type PlatformBenefits1Type = {
  className?: string;
  title?: string;
  padding?: string
};

const PlatformBenefits1: FunctionComponent<PlatformBenefits1Type> = ({
  className = "", title = "Our Latest Work", padding = ""
}) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDark, setDark] = useState(true);
  
  // Handle theme change event
  window.addEventListener('themeChanged', (e) => {
    if (isDark) {
      setDark(false);
    } else {
      setDark(true);
    }
  });

  // Items data array for better maintainability
  const items = [
    { image: "/image@2x.png", text: "Gas Turbines", name: "gas-turbine" },
    { image: "/image-1@2x.png", text: "Predictive Maintenance", name: "predictive-maintenance" },
    { image: "/image-2@2x.png", text: "Smart Manufacturing", name: "smart-manufacturing" },
    { image: "/image-2@2x.png", text: "Demand Forecasting", name: "demand-forecasting" },
    { image: "/image-2@2x.png", text: "Customer Churn", name: "customer-churn" },
    { image: "/image-2@2x.png", text: "TVAC Score Prediction", name: "tvac-score" },
    { image: "/image-2@2x.png", text: "Suspect Engine", name: "suspect-engine" },
    { image: "/image-2@2x.png", text: "Insurance Policy", name: "insurance-policy" },
    { image: "/image-2@2x.png", text: "STB Predictive Maintenance", name: "stb-predictive" },
    { image: "/image-2@2x.png", text: "Fact Finder", name: "fact-finder" }
  ];

  // Calculate the maximum index based on viewport width and card width
  useEffect(() => {
    const calculateMaxIndex = () => {
      if (!sliderRef.current) return;
      
      const containerWidth = sliderRef.current.clientWidth;
      const cardWidth = 486; // Approximate width of each card including gap
      const visibleCards = Math.floor(containerWidth / cardWidth);
      setMaxIndex(Math.max(0, items.length - visibleCards));
    };
    
    calculateMaxIndex();
    window.addEventListener('resize', calculateMaxIndex);
    
    return () => {
      window.removeEventListener('resize', calculateMaxIndex);
    };
  }, [items.length]);

  // Navigation functions
  const scrollNext = () => {
    if (activeIndex < maxIndex) {
      setIsScrolling(true);
      setActiveIndex(activeIndex + 1);
      scrollToIndex(activeIndex + 1);
      
      // Reset animation flag after a delay
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    }
  };
  
  const scrollPrev = () => {
    if (activeIndex > 0) {
      setIsScrolling(true);
      setActiveIndex(activeIndex - 1);
      scrollToIndex(activeIndex - 1);
      
      // Reset animation flag after a delay
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    }
  };
  
  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = 486; // Approximate width of each card including gap
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  // Navigate to blog page
  const handleSeeAll = () => {
    navigate("/blog");
  };

  return (
    <section className={[styles.platformBenefits, className].join(" ")} >
      <h1 className={styles.latestInsights}>{title}</h1>
      
      <div className={styles.carouselLayout}>
        <div className={styles.carouselContainer}>
          {/* Hidden side navigation buttons (only visible on hover) */}
          <button 
            className={`${styles.navButton} ${styles.prevButton} ${activeIndex === 0 ? styles.disabledButton : ''}`}
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous items"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
            </svg>
          </button>
          
          <div className={styles.sliderWrapper}>
            <div className={styles.slider} ref={sliderRef}>
              {items.map((item, index) => (
                <Items2 
                  key={index}
                  image={item.image} 
                  text={item.text} 
                  name={item.name} 
                />
              ))}
            </div>
          </div>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton} ${activeIndex === maxIndex ? styles.disabledButton : ''}`}
            onClick={scrollNext}
            disabled={activeIndex === maxIndex}
            aria-label="Next items"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        {/* Simple "Explore All" button with consistent styling */}
        <div className={styles.exploreAllCard} onClick={handleSeeAll}>
          <div className={styles.exploreAllContent}>
            <span className={styles.exploreAllText}>Explore All</span>
          </div>
        </div>
      </div>
      
      {/* Centered scroll indicator with arrows positioned in the center */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollTrackContainer}>
          <div className={styles.scrollTrack}>
            <div 
              className={styles.scrollProgress} 
              style={{ 
                width: `${(activeIndex / Math.max(1, maxIndex)) * 100}%`, 
                display: maxIndex > 0 ? 'block' : 'none' 
              }}
            ></div>
          </div>
          
          {/* Arrow buttons positioned in the center of the track */}
          <div className={styles.arrowContainer}>
            <button 
              className={`${styles.scrollArrow} ${styles.scrollArrowLeft} ${isScrolling ? styles.scrollingAnimation : ''} ${activeIndex === 0 ? styles.disabledArrow : ''}`}
              onClick={activeIndex > 0 ? scrollPrev : undefined}
              disabled={activeIndex === 0}
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
              </svg>
            </button>
            
            <button 
              className={`${styles.scrollArrow} ${styles.scrollArrowRight} ${isScrolling ? styles.scrollingAnimation : ''} ${activeIndex === maxIndex ? styles.disabledArrow : ''}`}
              onClick={activeIndex < maxIndex ? scrollNext : undefined}
              disabled={activeIndex === maxIndex}
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits1;