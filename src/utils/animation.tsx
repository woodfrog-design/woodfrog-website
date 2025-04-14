import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

/**
 * Safely initializes animations with proper cleanup
 * This helps prevent memory leaks and animation conflicts
 */
export const initializeAnimations = (
  selector: string, 
  animationOptions: gsap.TweenVars,
  scrollTriggerOptions?: gsap.plugins.ScrollTriggerInstanceVars
) => {
  // Create a context for these animations so they can be easily cleaned up
  const ctx = gsap.context(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      if (scrollTriggerOptions) {
        gsap.fromTo(
          element,
          { opacity: 0.3, y: 20 }, // Start with partial opacity to prevent disappearing
          {
            ...animationOptions,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none", // Only plays once
              ...scrollTriggerOptions
            }
          }
        );
      } else {
        gsap.fromTo(
          element,
          { opacity: 0.3, y: 20 },
          animationOptions
        );
      }
    });
  });
  
  // Return the context for cleanup
  return ctx;
};

/**
 * Adds data-animate attributes to elements that should be animated
 * This makes it easier to selectively animate elements
 */
export const markForAnimation = (element: HTMLElement | null) => {
  if (!element) return;
  element.setAttribute('data-animate', 'true');
};

/**
 * Lazy loads animations only when elements are in viewport
 * Significantly improves performance for pages with many animations
 */
export const setupLazyAnimations = () => {
  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When element is in view
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Simple fade in animation
        gsap.to(element, {
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out"
        });
        
        // Stop observing once animation is applied
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  // Select all elements to lazy animate
  const elementsToAnimate = document.querySelectorAll('[data-lazy-animate="true"]');
  
  // Set initial styles and observe
  elementsToAnimate.forEach(element => {
    gsap.set(element, { opacity: 0, y: 20 });
    observer.observe(element);
  });
  
  // Return cleanup function
  return () => {
    elementsToAnimate.forEach(element => {
      observer.unobserve(element);
    });
  };
};

/**
 * Cleanup all GSAP animations to prevent memory leaks
 * Call this when component unmounts
 */
export const cleanupAnimations = (ctx?: gsap.Context) => {
  // If a specific context was provided, kill that
  if (ctx) {
    ctx.revert();
    return;
  }
  
  // Otherwise kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // And kill all active animations
  gsap.killTweensOf("*");
};