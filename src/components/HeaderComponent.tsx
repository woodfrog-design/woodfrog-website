import { FunctionComponent, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import styles from "./HeaderComponent.module.css";
import ContactForm from "./ContactUs";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { BsList } from "react-icons/bs";
import { useTheme } from "../ThemeContext";
import ThemePreservingLink from './ThemePreservingLink'; // Import the ThemePreservingLink component


export type FrameComponentType = {
  className?: string;
};

const HeaderComponet: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isDarkTheme } = useTheme();
  const [show, setShow] = useState(false);
  
  // State for header visibility
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // State for showing shadow when scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use useRef to store the header element for calculating height
  const headerRef = useRef<HTMLDivElement>(null);

  const handleMobileNavigation = (url: string) => {
    navigate(url);
    setShow(false); // Close the menu after navigation
  };

  const toggleEvent = () => {
    setShow(!show);
  };
  
  const handleContactUsClick = () => {
    setIsModalVisible(true);
  };
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Make navbar visible when:
      // 1. Scrolling up
      // 2. At the top of the page
      // 3. Not scrolling (difference is minimal)
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;
      const isNotScrolling = Math.abs(prevScrollPos - currentScrollPos) < 10;
      
      setIsVisible(isScrollingUp || isAtTop || isNotScrolling);
      setPrevScrollPos(currentScrollPos);
      
      // Update shadow state based on scroll position
      setIsScrolled(currentScrollPos > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className={[styles.frameParent, className].join(" ")}>
        <header 
          className={`${styles.logoContainerWrapper} ${isScrolled ? styles.scrolledHeader : ''}`} 
          ref={headerRef}
          style={{ 
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
          }}
        >
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <BsList
                size="25px"
                color={isDarkTheme ? "white" : "black"}
                className="d-block d-sm-none"
                style={{ margin: '10px' }}
                onClick={toggleEvent}
              />
              {/* Replace Logo component with ThemePreservingLink wrapped Logo */}
              <ThemePreservingLink to="/">
                <Logo />
              </ThemePreservingLink>
            </div>
            <nav className={styles.menu}>
              {/* Replace all navigation links with ThemePreservingLink */}
              <ThemePreservingLink to="/blog" className={styles.ourSolutions}>Blogs</ThemePreservingLink>
              <ThemePreservingLink to="/offering" className={styles.ourSolutions}>Offering</ThemePreservingLink>
              <ThemePreservingLink to="/about-us" className={styles.ourSolutions}>About Us</ThemePreservingLink>
              <ThemePreservingLink to="/contact-us" className={styles.ourSolutions}>Contact Us</ThemePreservingLink>
            </nav>
            <ModeToggle />
          </div>
        </header>
        {/* Add spacer to prevent content from jumping under fixed header */}
        <div className={styles.headerSpacer}></div>
      </div>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <div className="row m-0">
              <div className="col-1">
                <div className={styles.close} onClick={toggleEvent}>
                  <img src={'/close_menu-dark.svg'} alt="" />
                </div>
              </div>
              <div className="col-8">
                {/* Also wrap the Logo in mobile menu with ThemePreservingLink */}
                <ThemePreservingLink to="/">
                  <Logo />
                </ThemePreservingLink>
              </div>
              <div className="col-2 justify-content-center">
                <div style={{ position: 'absolute', right: '20px', top: '12px' }}>
                  <ModeToggle />
                </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-12 p-0">
                <ul className={styles.menus}>
                  {/* Replace mobile menu click handlers with ThemePreservingLink */}
                  <li>
                    <ThemePreservingLink to="/blog" onClick={() => setShow(false)}>Blogs</ThemePreservingLink>
                  </li>
                  <li>
                    <ThemePreservingLink to="/offering" onClick={() => setShow(false)}>Offering</ThemePreservingLink>
                  </li>
                  <li>
                    <ThemePreservingLink to="/about-us" onClick={() => setShow(false)}>About Us</ThemePreservingLink>
                  </li>
                  <li>
                    <ThemePreservingLink to="/contact-us" onClick={() => setShow(false)}>Contact Us</ThemePreservingLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <ContactForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default HeaderComponet;