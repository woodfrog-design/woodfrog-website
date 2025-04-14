import React from "react";
import HeaderComponet from "../components/HeaderComponent";
import Footer from "../components/Footer";
import styles from "./PrivacyPolicy.module.css";
import PageDescription from "../components/PageDescription";

const privacyPolicyDescription = {
  title: 'Privacy Policy',
  describe: 'Last Updated: February 26, 2025'
};

const PrivacyPolicy: React.FC = () => {
  return (
    <section className={styles.PrivacyPolicy}>
      <HeaderComponet />
      <main className={styles.body}>
        <div className={styles.pageDescriptionWrapper}>
          <PageDescription
            data-aos="fade-in"
            data-aos-duration="4000"
            details={privacyPolicyDescription}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.contentWrapper}>
            <p>
              At <strong>Woodfrog Tech</strong>, we value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect the following types of personal data:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company details</li>
              <li>Usage data (IP address, browser type, pages visited, etc.)</li>
            </ul>

            <h2>2. How We Use Your Data</h2>
            <p>We use collected data for:</p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Enhancing website functionality and user experience</li>
              <li>Marketing and communication purposes</li>
              <li>Ensuring compliance with legal and regulatory obligations</li>
            </ul>

            <h2>3. Data Protection & Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal data. However, 
              no system is completely secure. We recommend using strong passwords and keeping your login details private.
            </p>

            <h2>4. GDPR Compliance (For EU Residents)</h2>
            <p>Residents of the European Economic Area (EEA) have the right to:</p>
            <ul>
              <li>Access, update, or delete personal data</li>
              <li>Restrict processing of personal data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>info@woodfrog.tech</strong>.</p>

            <h2>5. CCPA Compliance (For California Residents)</h2>
            <p>Under the California Consumer Privacy Act (CCPA), you have the right to:</p>
            <ul>
              <li>Request access to collected personal data</li>
              <li>Request deletion of personal data</li>
              <li>Opt-out of the sale of personal data (Woodfrog Tech does not sell personal data)</li>
            </ul>

            <h2>6. Cloud Computing and Data Storage</h2>
            <p>
              Our services operate on secure cloud infrastructure, ensuring high availability 
              and compliance with data protection laws.
            </p>

            <h2>7. Client Data Sharing & Third-Party Services</h2>
            <p>
              We may share data with trusted third-party providers to enhance services. However, 
              we do not sell client data, and all integrations follow strict data protection protocols.
            </p>

            <h2>8. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies to enhance your experience. You can manage cookies in your browser settings.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this policy periodically. Changes will be posted on our website.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, contact us at{" "}
              <a href="mailto:info@woodfrog.tech" className={styles.email}>info@woodfrog.tech</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default PrivacyPolicy;