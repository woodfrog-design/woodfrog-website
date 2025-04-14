import React from "react";
import HeaderComponet from "../components/HeaderComponent";
import Footer from "../components/Footer";
import styles from "./TermsAndConditions.module.css";
import PageDescription from "../components/PageDescription";

const termsDescription = {
  title: 'Terms and Conditions',
  describe: 'Last Updated: February 26, 2025'
};

const TermsAndConditions: React.FC = () => {
  return (
    <section className={styles.TermsAndConditions}>
      <HeaderComponet />
      <main className={styles.body}>
        <div className={styles.pageDescriptionWrapper}>
          <PageDescription 
            data-aos="fade-in" 
            data-aos-duration="4000" 
            details={termsDescription} 
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.contentWrapper}>
            <section className={styles.section}>
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Woodfrog Tech</strong>. These terms and conditions outline the rules and 
                regulations for the use of our website and services. By accessing this website, we assume 
                you accept these terms and conditions in full. Do not continue to use Woodfrog Tech's website 
                if you do not accept all the terms and conditions stated here.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, Woodfrog Tech and/or its licensors own the intellectual 
                property rights for all material on this website. All intellectual property rights are 
                reserved. You may access this from Woodfrog Tech for your own personal use, subject to 
                restrictions set in these terms.
              </p>
              <h3>You must not:</h3>
              <ul>
                <li>Republish material from our website.</li>
                <li>Sell, rent, or sub-license material.</li>
                <li>Reproduce, duplicate, or copy material for commercial use.</li>
                <li>Redistribute content from our website without proper attribution.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Restrictions</h2>
              <p>You are specifically restricted from engaging in the following:</p>
              <ul>
                <li>Using this website in any way that is damaging.</li>
                <li>Using this website in any way that impacts user access.</li>
                <li>Engaging in data mining, data harvesting, or similar activities.</li>
                <li>Using this website for unlawful activities.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Limitation of Liability</h2>
              <p>
                Woodfrog Tech, its directors, employees, and affiliates shall not be held liable for 
                any damages arising from your use of this website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>5. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the website 
                signifies acceptance of any modifications.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Contact Information</h2>
              <p>
                If you have any questions regarding these terms, please contact us at{" "}
                <a href="mailto:info@woodfrog.tech" className={styles.email}>info@woodfrog.tech</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default TermsAndConditions;