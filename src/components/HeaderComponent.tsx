import { FunctionComponent, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import styles from "./HeaderComponent.module.css";
import ContactForm from "./ContactUs";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { BsList } from "react-icons/bs";
import { useTheme } from "../ThemeContext";
import ThemePreservingLink from './ThemePreservingLink';

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

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleMobileNavigation = (url: string) => {
    navigate(url);
    setShow(false);
  };

  const toggleEvent = () => {
    setShow(!show);
  };

  const handleContactUsClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;
      const isNotScrolling = Math.abs(prevScrollPos - currentScrollPos) < 10;

      setIsVisible(isScrollingUp || isAtTop || isNotScrolling);
      setPrevScrollPos(currentScrollPos);
      setIsScrolled(currentScrollPos > 10);
    };

    const handleResize = () => {
      if (window.innerWidth > 576 && show) {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [prevScrollPos, show]);

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
              <ThemePreservingLink to="/">
                <Logo />
              </ThemePreservingLink>
            </div>
            <nav className={styles.menu}>
              <ThemePreservingLink to="/blog" className={styles.ourSolutions}>Blogs</ThemePreservingLink>
              <ThemePreservingLink to="/offering" className={styles.ourSolutions}>Offering</ThemePreservingLink>
              <ThemePreservingLink to="/about-us" className={styles.ourSolutions}>About Us</ThemePreservingLink>
              <ThemePreservingLink to="/contact-us" className={styles.ourSolutions}>Contact Us</ThemePreservingLink>
            </nav>
            <ModeToggle />
          </div>
        </header>

        <div className={styles.headerSpacer}></div>
      </div>

      {show && (
  <div className={styles.overlayScroll}>
    <div className={styles.overlayContent}>
      <div className="row m-0">
        {/* <div className="col-1">
          <div className={styles.close} onClick={toggleEvent}>
            <img src={'/close_menu-dark.svg'} alt="" />
          </div>
        </div> */}
        {/* <div className="col-8">
          <ThemePreservingLink to="/">
            <Logo />
          </ThemePreservingLink>
        </div> */}
        {/* <div className="col-2 justify-content-center">
          <div style={{ position: 'absolute', right: '20px', top: '12px' }}>
            <ModeToggle />
          </div>
        </div> */}
      </div>
      <div className="row m-0">
        <div className="col-12 p-0">
          <ul className={styles.menus}>
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
