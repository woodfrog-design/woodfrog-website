import { FunctionComponent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LatestWork.module.css"; // You'll need to create this CSS module

// Register GSAP plugins to match your existing code
gsap.registerPlugin(ScrollTrigger);

// TypeScript interfaces
interface WorkCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
}

interface LatestWorkProps {
  title: string;
  description?: string;
  cards: WorkCard[];
}

const LatestWork: FunctionComponent<LatestWorkProps> = ({ title, description, cards }) => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  
  // Handle navigation to blog page
  const handleSeeAll = () => {
    navigate("/blog");
  };
  
  // Calculate total slides based on viewport and card width
  useEffect(() => {
    const updateTotalSlides = () => {
      if (!carouselRef.current) return;
      
      const containerWidth = carouselRef.current.clientWidth;
      const cardWidth = 320; // Adjust based on your card width + gap
      const visibleCards = Math.floor(containerWidth / cardWidth);
      setTotalSlides(Math.max(0, cards.length - visibleCards));
    };
    
    updateTotalSlides();
    window.addEventListener('resize', updateTotalSlides);
    
    return () => {
      window.removeEventListener('resize', updateTotalSlides);
    };
  }, [cards.length]);
  
  // Add GSAP animations to match your site's style
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(`.${styles.card}`),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
          }
        }
      );
    }
  }, []);
  
  // Handle carousel navigation
  const navigateTo = (index: number) => {
    if (index < 0) index = 0;
    if (index > totalSlides) index = totalSlides;
    
    setActiveIndex(index);
    
    if (carouselRef.current) {
      const cardWidth = 320; // Should match the card width + gap in CSS
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const next = () => navigateTo(activeIndex + 1);
  const prev = () => navigateTo(activeIndex - 1);
  
  return (
    <section className={styles.latestWorkSection} ref={sectionRef}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.seeAllButton} onClick={handleSeeAll}>
              <span className={styles.seeAllText}>See All</span>
              <span className={styles.seeAllIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </span>
            </div>
          </div>
          {description && <p className={styles.sectionDescription}>{description}</p>}
        </div>
        
        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navButton} ${styles.prevButton} ${activeIndex === 0 ? styles.disabled : ''}`} 
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous projects"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
            </svg>
          </button>
          
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselTrack} ref={carouselRef}>
              {cards.map((card) => (
                <div className={styles.card} key={card.id} onClick={() => navigate(card.link)}>
                  <div className={styles.cardImageContainer}>
                    <img src={card.image} alt={card.imageAlt} className={styles.cardImage} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton} ${activeIndex === totalSlides ? styles.disabled : ''}`} 
            onClick={next}
            disabled={activeIndex === totalSlides}
            aria-label="Next projects"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides + 1 }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${activeIndex === index ? styles.activeDot : ''}`}
              onClick={() => navigateTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestWork;