import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
import styles from "./Pricing1.module.css";
import ContactForm from "./ContactUs";
import { Link } from "react-router-dom";

export type Pricing1Type = {
  className?: string;
  line56?: string;

  /** Style props */
  contactUsDisplay?: CSSProperties["display"];
  contactUsMinWidth?: CSSProperties["minWidth"];
  policyStatementDisplay?: CSSProperties["display"];
  policyStatementMinWidth?: CSSProperties["minWidth"];
};

const Pricing1: FunctionComponent<Pricing1Type> = ({
  className = "",
  contactUsDisplay,
  contactUsMinWidth,
  line56,
  policyStatementDisplay,
  policyStatementMinWidth,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const contactUsStyle: CSSProperties = useMemo(() => {
    return {
      display: contactUsDisplay,
      minWidth: contactUsMinWidth,
      cursor: "pointer",
    };
  }, [contactUsDisplay, contactUsMinWidth]);

  const policyStatementStyle: CSSProperties = useMemo(() => {
    return {
      display: policyStatementDisplay,
      minWidth: policyStatementMinWidth,
    };
  }, [policyStatementDisplay, policyStatementMinWidth]);

  return (
    <>
      <footer className={[styles.pricing, className].join(" ")}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Link to="/" className={styles.logoLink}>
              <img
                className={styles.logoIcon}
                loading="lazy"
                alt="Home"
                src="/vector-289.svg"
              />
            </Link>
            <div className={styles.information}>
              <div className={styles.links}>
                <Link
                  to="/about-us"
                  className={styles.aboutUs}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  className={styles.aboutUs}
                  style={{
                    ...contactUsStyle,
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "500",
                  }}
                >
                  Contact Us
                </Link>
              </div>
              <div className={styles.social}>
                <img
                  className={styles.image9Icon}
                  alt=""
                  src="/image-9@2x.png"
                />
                <a
                  className={styles.linkedin}
                  href="https://www.linkedin.com/company/woodfrogtech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </div>
            </div>
          </div>
          <div className={styles.separator}>
            <img
              className={styles.separatorChild}
              loading="lazy"
              alt=""
              src={line56}
            />
          </div>
          <hr className={styles.line} />
          <div className={styles.footerLinks}>
            <Link
              to="/privacy-policy"
              className={styles.footerLink}
              style={policyStatementStyle}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className={styles.footerLink}
              style={policyStatementStyle}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Pricing1;  