import React, { useState } from 'react';
import styles from './Evals.module.css';

const Evals: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend or Netlify forms
    setSubmitted(true);
  };

  return (
    <div className={styles.evalsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <h1>Secure Your GenAI Future with Expert Evaluation</h1>
        <h2>
          Avoid Deployment Failures—Partner with Woodfrog Tech to Benchmark and Validate AI Models for Enterprise Performance
        </h2>
        <button className={styles.ctaButton} onClick={() => document.getElementById('evalsForm')?.scrollIntoView({ behavior: 'smooth' })}>
          Book a Free Consultation
        </button>
        <div className={styles.keyStat}>
          <strong>70% of enterprises face GenAI reliability challenges—achieve precision from the start.</strong>
        </div>
      </section>

      {/* Why Evaluation & Benchmarking */}
      <section className={styles.whySection}>
        <h3>Why Evaluation & Benchmarking Is Essential</h3>
        <ul>
          <li>Prevent Catastrophic Risks: Identify vulnerabilities such as data leaks or compliance violations, aligning with stringent regulations like India's RBI guidelines to avert fines and reputational harm.</li>
          <li>Enhance ROI and Operational Efficiency: Optimize model selection to cut deployment timelines by 50%, ensuring scalability in complex use cases like multilingual processing or agentic systems.</li>
          <li>Uncover and Address Biases: Detect hidden disparities in applications like financial analysis, promoting fairness and reliability amid widespread enterprise concerns over GenAI consistency.</li>
          <li>Adapt to Emerging Threats: Benchmark against evolving risks, including advanced hallucinations, to sustain long-term performance in dynamic business landscapes.</li>
          <li>Integrate predictive analytics for scenario forecasting, tailored to India-centric challenges like diverse linguistic data in enterprise workflows.</li>
        </ul>
        <div className={styles.strategicGap}>
          <strong>Strategic Gap:</strong> Sparse data on enterprise-specific post-deployment metrics in emerging markets; additional cross-referencing with global reports could enhance localization.
        </div>
      </section>

      {/* Why Partner with Woodfrog */}
      <section className={styles.partnerSection}>
        <h3>Why Partner with Woodfrog for Expert Evaluation</h3>
        <ul>
          <li>Leverage Specialized Knowledge Without Internal Burden: Access advanced methodologies like synthetic data generation, optimizing costs and avoiding the 40% expense overruns common in self-managed efforts.</li>
          <li>Gain Objective, Third-Party Insights: Ensure unbiased validation free from internal assumptions, crucial for high-stakes sectors where neutrality underpins compliance and trust.</li>
          <li>Achieve Seamless Scalability: Handle evaluations across extensive model sets and datasets, with rapid onboarding that aligns with enterprise timelines.</li>
          <li>Accelerate Time-to-Market and Risk Mitigation: Reduce evaluation cycles by 50%, sidestepping the 40% failure rate of inadequately tested projects through proven frameworks.</li>
          <li>Facilitate hybrid collaboration sessions, merging Woodfrog&apos;s platform with your domain expertise for customized, enterprise-aligned insights.</li>
        </ul>
      </section>

      {/* Get Started Section */}
      <section className={styles.getStartedSection}>
        <h2>Ready to Strengthen Your GenAI Strategy?</h2>
        <p>Engage with our tailored benchmarking services designed for enterprise needs in BFSI, IT, and beyond.</p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaButton} onClick={() => document.getElementById('evalsForm')?.scrollIntoView({ behavior: 'smooth' })}>Book Demo Now</button>
          <button className={styles.ctaButton} onClick={() => document.getElementById('evalsForm')?.scrollIntoView({ behavior: 'smooth' })}>Inquire About Pricing</button>
        </div>
        <form id="evalsForm" className={styles.evalsForm} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <textarea name="requirements" placeholder="Specific Requirements" value={form.requirements} onChange={handleChange} rows={3} />
          <button type="submit" className={styles.ctaButton}>Submit</button>
          {submitted && <div className={styles.successMsg}>Thank you! We'll be in touch soon.</div>}
        </form>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>Woodfrog Tech &copy; {new Date().getFullYear()} | <a href="/privacy-policy">Privacy Policy</a></div>
        <div className={styles.tagline}>Empowering Enterprise AI with Precision</div>
      </footer>
    </div>
  );
};

export default Evals;
