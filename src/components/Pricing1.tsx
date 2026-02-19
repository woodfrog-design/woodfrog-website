// import { FunctionComponent } from 'react';
// import styles from './Pricing1.module.css';
// import { Link } from 'react-router-dom';
// import { FiLinkedin } from 'react-icons/fi';

// export type Pricing1Type = {
//   className?: string;
// };

// const Pricing1: FunctionComponent<Pricing1Type> = ({ className = '' }) => {
//   return (
//     <footer className={[styles.footerContainer, className].join(' ')}>
//       <div className={styles.footerContent}>
//         <div className={styles.footerTop}>
//           {/* New wrapper for logo and links */}
//           <div className={styles.logoAndLinks}>
//             <Link to="/" className={styles.logoLink}>
//               <img className={styles.logoIcon} loading="lazy" alt="Home" src="/vector-289.svg" />
//             </Link>
//             <nav className={styles.mainLinks}>
//               <Link to="/about-us" className={styles.footerLink}>About Us</Link>
//               <Link to="/contact-us" className={styles.footerLink}>Contact Us</Link>
//               <Link to="/brochure" className={styles.footerLink}>Brochure</Link>
//               <Link to="/trajectory" className={styles.footerLink}>Trajectory</Link>
//             </nav>
//           </div>
          
//           {/* Social link is now a direct child for alignment */}
//           <a
//             className={styles.socialLink}
//             href="https://www.linkedin.com/company/woodfrogtech"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FiLinkedin />
//             <span>Linkedin</span>
//           </a>
//         </div>

//         <hr className={styles.divider} />

//         <div className={styles.footerBottom}>
//           <Link to="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
//           <Link to="/terms-and-conditions" className={styles.footerLink}>Terms & Conditions</Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Pricing1;

import { FunctionComponent } from 'react';
import styles from './Pricing1.module.css';
import { Link } from 'react-router-dom';

export type Pricing1Type = {
  className?: string;
};

const Pricing1: FunctionComponent<Pricing1Type> = ({ className = '' }) => {
  const handleLinkedInClick = () => {
    (window as any).gtag('event', 'click', {
      event_category: 'social',
      event_label: 'linkedin',
      transport_type: 'beacon'
    });
  };

  return (
    <footer className={[styles.footerContainer, className].join(' ')}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.logoAndLinks}>
            <Link to="/" className={styles.logoLink}>
              <img className={styles.logoIcon} loading="lazy" alt="Home" src="/vector-289.svg" />
            </Link>
            <nav className={styles.mainLinks}>
              <Link to="/about-us" className={styles.footerLink}>About Us</Link>
              <Link to="/contact-us" className={styles.footerLink}>Contact Us</Link>
              <Link to="/brochure" className={styles.footerLink}>Brochure</Link>
              <Link to="/trajectory" className={styles.footerLink}>Trajectory</Link>
            </nav>
          </div>
          
          {/* Restored original social link structure */}
          <div className={styles.social}>
            <img className={styles.image9Icon} alt="LinkedIn" src="/image-9@2x.png" />
            <a
              className={styles.linkedinLink}
              href="https://www.linkedin.com/company/woodfrogtech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkedInClick}
            >
              Linkedin
            </a>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.footerBottom}>
          <Link to="/privacy-policy" className={styles.footerLinkSmall}>Privacy Policy</Link>
          <Link to="/terms-and-conditions" className={styles.footerLinkSmall}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Pricing1;