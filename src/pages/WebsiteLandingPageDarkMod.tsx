import { FunctionComponent, useEffect, useRef } from "react";
import FrameComponent from "../components/FrameComponent";
import ServicesContent from "../components/ServicesContent";
import TrustedBy from "../components/TrustedBy";
import PlatformBenefits from "../components/PlatformBenefits";
import PlatformBenefits1 from "../components/PlatformBenefits1";
import Pricing from "../components/Pricing";
import Pricing1 from "../components/Pricing1";
import styles from "./WebsiteLandingPageDarkMod.module.css";
import { useTheme } from "../ThemeContext";
import OptimizedImage from "../components/OptimizedImage";
import { initializeAnimations, cleanupAnimations } from "../utils/animation";
import gsap from "gsap";

const WebsiteLandingPageDarkMod: FunctionComponent = () => {
  const { isDarkTheme } = useTheme(); // Get the current theme state
  const animationContext = useRef<gsap.Context | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const heroGraphicRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize animations once on component mount
  useEffect(() => {
    console.log("Initializing animations, image ref:", imageRef.current);
    
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize content animations
      animationContext.current = initializeAnimations(
        '.animate-on-scroll', 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        },
        {
          start: "top 85%",
          toggleActions: "play none none none" // Never reverse animations
        }
      );
      
      // Target both the container and the image for better animation control
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, {
          autoAlpha: 1  // Make sure container is visible
        });
      }
      
      // Animate the hero image with GSAP
      if (imageRef.current) {
        // Start with image invisible
        gsap.set(imageRef.current, { 
          opacity: 0,
          y: 40,
          scale: 0.95
        });
        
        // Animate the hero image in
        gsap.to(imageRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          onStart: () => console.log("Animation started for image"),
          onComplete: () => console.log("Animation completed for image")
        });
      } else {
        console.warn("Image ref not available for animation");
      }
      
      // Animate the hero graphic glow
      if (heroGraphicRef.current) {
        gsap.fromTo(heroGraphicRef.current, 
          { 
            opacity: 0,
            scale: 0.8 
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out"
          }
        );
      }
      
    }, 300); // Increased delay to ensure DOM and refs are ready
    
    // Create subtle floating animation for the dashboard image
    const floatAnimation = () => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: "+=10",
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5
        });
      }
      
      if (heroGraphicRef.current) {
        gsap.to(heroGraphicRef.current, {
          scale: 1.05,
          opacity: 0.9,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2
        });
      }
    };
    
    // Start floating animation after initial entrance
    const floatTimer = setTimeout(floatAnimation, 1800);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearTimeout(floatTimer);
      if (animationContext.current) {
        cleanupAnimations(animationContext.current);
      }
      
      // Kill all GSAP animations for cleaned up elements
      if (imageRef.current) {
        gsap.killTweensOf(imageRef.current);
      }
      if (heroGraphicRef.current) {
        gsap.killTweensOf(heroGraphicRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className={styles.websiteLandingPageDarkMod}>
      <FrameComponent />
      
      {/* Use container ref for better animation control */}
      <div ref={imageContainerRef} className={styles.imageContainer}>
        <OptimizedImage
          ref={imageRef}
          src={isDarkTheme ? "/image_17.svg" : '/image_20.svg'}
          alt="Dashboard visualization"
          className={styles.image17Icon}
          animate={false} // We're handling animation with GSAP instead
          loading="eager" // Ensure image loads immediately
        />
      </div>
      
      <div className={styles.heroGraphic}>
        <div 
          ref={heroGraphicRef}
          className={styles.heroGraphicChild} 
        />
        <div className={styles.heroImage}></div>
      </div>
      
      <main className={styles.services}>
        {/* Add animate-on-scroll class to components you want to animate */}
        <div className="animate-on-scroll">
          <ServicesContent />
        </div>
        
        <div className="animate-on-scroll">
          <TrustedBy />
        </div>
        
        <div className="animate-on-scroll">
          <PlatformBenefits />
        </div>
        
        <div className="animate-on-scroll">
          <PlatformBenefits1 />
        </div>
        
        <div className="animate-on-scroll">
          <Pricing />
        </div>
        
        <div className="animate-on-scroll">
          <Pricing1 />
        </div>
      </main>
    </div>
  );
};

export default WebsiteLandingPageDarkMod;