import { FunctionComponent, useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import styles from './HeaderComponent.module.css';
import ContactForm from './ContactUs';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BsList } from 'react-icons/bs';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import ThemePreservingLink from './ThemePreservingLink';
import { offeringData } from '../pages/OfferingPage';

export type FrameComponentType = {
  className?: string;
};

const allServices = offeringData.categories.flatMap(category => category.features);
const firstServiceImage = allServices.length > 0 ? allServices[0].image : undefined;

const HeaderComponet: FunctionComponent<FrameComponentType> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isDarkTheme } = useTheme();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(firstServiceImage);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  
  const toggleEvent = () => { setShow(!show); };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsScrolled(currentScrollPos > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <div className={[styles.frameParent, className].join(' ')}>
        <header
          className={`${styles.logoContainerWrapper} ${isScrolled ? styles.scrolledHeader : ''}`}
          ref={headerRef}
          style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <BsList size="25px" color={isDarkTheme ? 'white' : 'black'} className={styles.mobileMenuIcon} onClick={toggleEvent} />
              <ThemePreservingLink to="/"> <Logo /> </ThemePreservingLink>
            </div>
            <nav className={styles.menu}>
              <ThemePreservingLink to="/blog" className={styles.ourSolutions}> Blogs </ThemePreservingLink>
              
              <div 
                className={styles.dropdown}
                onMouseEnter={() => { setIsDropdownOpen(true); setPreviewImage(firstServiceImage); }}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ThemePreservingLink to="/offering" className={styles.ourSolutions}>
                  Offering
                </ThemePreservingLink>
                <div className={`${styles.megaMenu} ${isDropdownOpen ? styles.isOpen : ''}`}>
                    <div className={styles.megaMenuContent}>
                        <div className={styles.linkColumn}>
                          {offeringData.categories.map((category) => (
                            <div key={category.title} className={styles.categorySection}>
                              <h3 className={styles.categoryTitle}>{category.title}</h3>
                              {category.features.map((service) => (
                                <div onMouseEnter={() => setPreviewImage(service.image)} key={service.link}>
                                  <ThemePreservingLink to={service.link} className={styles.dropdownLink}>
                                    {service.title}
                                  </ThemePreservingLink>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        {/* --- NEW: Entire preview column is now a link --- */}
                        <ThemePreservingLink to="/contact-us" className={styles.previewColumn}>
                          {previewImage && <img src={previewImage} alt="Service preview" className={styles.previewImage} />}
                          <div className={styles.previewText}>
                            <h4 className={styles.previewTitle}>Have a Custom Project?</h4>
                            <p className={styles.previewLink}>
                              Bring Your Idea <FiArrowRight />
                            </p>
                          </div>
                        </ThemePreservingLink>
                    </div>
                </div>
              </div>

              <ThemePreservingLink to="/about-us" className={styles.ourSolutions}> About Us </ThemePreservingLink>
              <ThemePreservingLink to="/contact-us" className={styles.ourSolutions}> Contact Us </ThemePreservingLink>
            </nav>
            <ModeToggle />
          </div>
        </header>
        <div className={styles.headerSpacer}></div>
      </div>

      <div className={`${styles.overlayScroll} ${show ? styles.isOpen : ''}`}>
        <div className={styles.overlayContent}>
          <ul className={styles.menus}>
            <li><ThemePreservingLink to="/blog" onClick={() => setShow(false)}> Blogs </ThemePreservingLink></li>
            <li className={styles.submenuContainer}>
              <div className={styles.submenuTrigger} onClick={() => setIsMobileSubmenuOpen(!isMobileSubmenuOpen)}>
                <span>Offering</span>
                <FiChevronDown className={`${styles.submenuIcon} ${isMobileSubmenuOpen ? styles.isOpen : ''}`} />
              </div>
              {isMobileSubmenuOpen && (
                <ul className={styles.submenu}>
                  {allServices.map(service => (
                    <li key={service.link}>
                      <ThemePreservingLink to={service.link} onClick={() => setShow(false)}>
                        {service.title}
                      </ThemePreservingLink>
                    </li>
                  ))}
                   <li><ThemePreservingLink to="/contact-us" onClick={() => setShow(false)}>Bring Your Idea</ThemePreservingLink></li>
                </ul>
              )}
            </li>
            <li><ThemePreservingLink to="/about-us" onClick={() => setShow(false)}> About Us </ThemePreservingLink></li>
            <li><ThemePreservingLink to="/contact-us" onClick={() => setShow(false)}> Contact Us </ThemePreservingLink></li>
          </ul>
        </div>
      </div>
      <ContactForm isModalVisible={isModalVisible} setIsModalVisible={() => setIsModalVisible(true)} />
    </>
  );
};

export default HeaderComponet;