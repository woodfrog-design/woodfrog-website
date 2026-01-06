import { FunctionComponent, useRef, useState } from 'react';
import Items2 from './Items2';
import styles from './PlatformBenefits1.module.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export type PlatformBenefits1Type = {
  className?: string;
  title?: string;
  padding?: string;
};

const PlatformBenefits1: FunctionComponent<PlatformBenefits1Type> = ({
  className = '',
  title = 'Our Latest Work',
  padding = '',
}) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);
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
    { image: '/image@2x.png', text: 'Gas Turbines', name: 'gas-turbine' },
    { image: '/image-1@2x.png', text: 'Predictive Maintenance', name: 'predictive-maintenance' },
    { image: '/image-2@2x.png', text: 'Smart Manufacturing', name: 'smart-manufacturing' },
    { image: '/image-2@2x.png', text: 'Demand Forecasting', name: 'demand-forecasting' },
    { image: '/image-2@2x.png', text: 'Customer Churn', name: 'customer-churn' },
    { image: '/image-2@2x.png', text: 'TVAC Score Prediction', name: 'tvac-score' },
    { image: '/image-2@2x.png', text: 'Suspect Engine', name: 'suspect-engine' },
    { image: '/image-2@2x.png', text: 'Insurance Policy', name: 'insurance-policy' },
    { image: '/image-2@2x.png', text: 'STB Predictive Maintenance', name: 'stb-predictive' },
    { image: '/image-2@2x.png', text: 'Fact Finder', name: 'fact-finder' },
  ];

  // Navigate to blog page
  const handleSeeAll = () => {
    navigate('/blog');
  };

  return (
    <section className={[styles.platformBenefits, className].join(' ')}>
      <h1 className={styles.latestInsights}>{title}</h1>

      <div className={styles.carouselLayout}>
        <div className={styles.carouselContainer}>
          <div className={styles.sliderWrapper}>
            <div className={styles.slider} ref={sliderRef}>
              {items.map((item, index) => (
                <Items2 key={index} image={item.image} text={item.text} name={item.name} />
              ))}
            </div>
          </div>
        </div>

        {/* Simple "Explore All" button with consistent styling */}
        <div className={styles.exploreAllCard} onClick={handleSeeAll}>
          <div className={styles.exploreAllContent}>
            <span className={styles.exploreAllText}>Explore All</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits1;
