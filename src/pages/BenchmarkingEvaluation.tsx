// import React, { useState, useEffect, FunctionComponent } from 'react';
// import HeaderComponent from '../components/HeaderComponent';
// import Footer from '../components/Footer';
// import PageHero from '../components/PageHero';
// import styles from './BenchmarkingEvaluation.module.css';
// import { FiShield, FiTrendingUp, FiCheckCircle, FiDollarSign, FiAlertTriangle, FiGitMerge, FiXCircle, FiCheck } from 'react-icons/fi';

// // --- Data for the page ---
// const pageData = {
//   hero: {
//     headline: 'Elevate Your GenAI Deployments with Rigorous Evaluation',
//     subheadline: 'Ensure your AI initiatives deliver real value. Our expert benchmarking mitigates risk, ensures compliance, and maximizes performance.',
//     cta: 'Schedule an Enterprise Consultation',
//   },
//   animatedStats: [
//     { text: '70-85% of GenAI deployment efforts are failing to meet their desired ROI.', source: 'NTT DATA' },
//     { text: 'Outsourcing evaluation can reduce associated costs by up to 45%.', source: 'Woodfrog Analysis' },
//     { text: 'Only about 54% of AI models move from pilot to production.', source: 'Digital CxO' },
//     { text: 'Enterprises report an average 41% ROI on successful GenAI projects.', source: 'Snowflake' },
//   ],
//   importance: {
//     headline: 'Why Benchmarking Is Indispensable for Enterprise GenAI Success',
//     description: 'In regulated and high-stakes environments, benchmarking and evaluations form the bedrock of reliable GenAI integration. These processes systematically assess model accuracy, robustness, and ethical alignment, mitigating risks and ensuring sustainable ROI.',
//     cards: [
//         { icon: <FiShield />, title: 'Safeguard Against Risks', text: 'Identify vulnerabilities like hallucinations or data biases that can compromise decision-making.' },
//         { icon: <FiTrendingUp />, title: 'Optimize Performance', text: 'Benchmark across metrics like latency and cost-efficiency to select optimal models for your use case.' },
//         { icon: <FiCheckCircle />, title: 'Ensure Compliance', text: 'Align with standards like India\'s RBI guidelines, preventing fines and reputational damage.' },
//         { icon: <FiDollarSign />, title: 'Enhance ROI', text: 'Uncover performance gaps early, transforming GenAI from experimental to production-ready.' },
//         { icon: <FiAlertTriangle />, title: 'Adapt to Challenges', text: 'Proactively address evolving threats, such as advanced agentic failures, ensuring resilience.' },
//         { icon: <FiGitMerge/>, title: 'Improve Integration', text: 'Ensure new AI models work seamlessly with your existing technology stack and workflows.' },
//     ],
//   },
//   partnership: {
//     headline: 'Opt for Expert External Collaboration',
//     subheadline: 'Why Internal Evaluation Falls Short',
//     image: '/images/BenchMarkingEvals/BE-Collab3.png', // Replace with your desired image
//     points: [
//         { title: 'Objective Insights', text: 'Our third-party perspective ensures unbiased, compliance-focused results, eliminating internal biases.' },
//         { title: 'Cost Efficiency', text: 'Access advanced methodologies and infrastructure, reducing your evaluation costs by up to 45%.' },
//         { title: 'Accelerated Timelines', text: 'Cut your time-to-insight by up to 50% with our streamlined processes and dedicated expertise.' },
//         { title: 'Enterprise Scalability', text: 'We seamlessly handle extensive models and complex datasets, ensuring your solutions are ready for enterprise-scale needs.' },
//     ]
//   },
//   getStarted: {
//       headline: 'Advance Your GenAI Strategy with Woodfrog Tech',
//       description: 'Discover how our tailored benchmarking services can fortify your enterprise operations.',
//       cta1: 'Schedule a Demo',
//       cta2: 'Request a Proposal'
//   }
// };


// // --- Animated Stats Component ---
// const AnimatedStats: FunctionComponent = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex(prevIndex => (prevIndex + 1) % pageData.animatedStats.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);
//     return (
//         <div className={styles.heroStatContainer}>
//             {pageData.animatedStats.map((stat, index) => (
//                 <p key={index} className={`${styles.heroStat} ${index === currentIndex ? styles.visible : ''}`}>
//                     "{stat.text}"
//                     <span className={styles.statSource}> - {stat.source}</span>
//                 </p>
//             ))}
//         </div>
//     );
// };


// // --- Main Page Component ---
// const BenchmarkingEvaluation: FunctionComponent = () => {
//   return (
//     <div className={styles.pageWrapper}>
//       <HeaderComponent />
//       <main>
//         <PageHero title={pageData.hero.headline} description={pageData.hero.subheadline} large>
//             <div className={styles.heroExtra}>
//                 <AnimatedStats />
//                 <a href="/contact-us" className={styles.ctaButton}>{pageData.hero.cta}</a>
//             </div>
//         </PageHero>

//         <div className={styles.contentWrapper}>
//             <section className={styles.section}>
//                 <div className={styles.sectionHeader}>
//                     <h2 className={styles.sectionHeadline}>{pageData.importance.headline}</h2>
//                     <p className={styles.sectionDescription}>{pageData.importance.description}</p>
//                 </div>
//                 <div className={styles.cardsGrid}>
//                     {pageData.importance.cards.map((card, index) => (
//                         <div key={index} className={styles.featureCard}>
//                             <div className={styles.cardIcon}>{card.icon}</div>
//                             <h3 className={styles.cardTitle}>{card.title}</h3>
//                             <p className={styles.cardText}>{card.text}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//              <section className={`${styles.section} ${styles.imageSection}`}>
//                 <div className={styles.imageSectionContent}>
//                     <h2 className={styles.sectionHeadlineAlt}>A Data-Driven Approach to AI Validation</h2>
//                     <p className={styles.sectionDescriptionAlt}>We go beyond surface-level metrics, employing a multi-faceted evaluation framework that covers everything from performance and scalability to ethical alignment and bias detection. This ensures your AI solutions are not just powerful, but also responsible and ready for enterprise deployment.</p>
//                 </div>
//                 <div className={styles.imageSectionVisual}>
//                     <img src="/images/BenchMarkingEvals/BE-data.png" alt="Data-driven evaluation process" className={styles.featureImage}/>
//                 </div>
//             </section>

//             {/* --- REDESIGNED PARTNERSHIP SECTION --- */}
//             <section className={`${styles.section} ${styles.partnershipSection}`}>
//                 <div className={styles.partnershipImage}>
//                     <img src={pageData.partnership.image} alt="Expert Collaboration" />
//                 </div>
//                 <div className={styles.partnershipContent}>
//                     <p className={styles.partnershipSubheadline}>{pageData.partnership.subheadline}</p>
//                     <h2 className={styles.partnershipHeadline}>{pageData.partnership.headline}</h2>
//                     <ul className={styles.partnershipList}>
//                         {pageData.partnership.points.map((point, index) => (
//                             <li key={index}>
//                                 <div className={styles.pointIcon}><FiCheck /></div>
//                                 <div>
//                                     <h3 className={styles.pointTitle}>{point.title}</h3>
//                                     <p className={styles.pointText}>{point.text}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </section>

//              <section className={`${styles.section} ${styles.getStartedSection}`}>
//                 <h2 className={styles.sectionHeadline}>{pageData.getStarted.headline}</h2>
//                 <p className={styles.sectionDescription}>{pageData.getStarted.description}</p>
//                  <div className={styles.ctaGroup}>
//                     <a href="/contact-us" className={styles.ctaButton}>Schedule a Demo</a>
//                     <a href="/contact-us" className={styles.ctaButtonSecondary}>Request a Proposal</a>
//                 </div>
//             </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default BenchmarkingEvaluation;

import React, { useState, useEffect, FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './BenchmarkingEvaluation.module.css';
// --- UPDATED: Icons to match the /offering page for consistency ---
import { FiShield, FiTrendingUp, FiCheckCircle, FiCpu, FiAlertTriangle, FiGitMerge, FiCheck } from 'react-icons/fi';


// --- Data for the page ---
const pageData = {
  hero: {
    headline: 'Elevate Your GenAI Deployments with Rigorous Evaluation',
    subheadline: 'Ensure your AI initiatives deliver real value. Our expert benchmarking mitigates risk, ensures compliance, and maximizes performance.',
    cta: 'Schedule an Enterprise Consultation',
  },
  animatedStats: [
    { text: '70-85% of GenAI deployment efforts are failing to meet their desired ROI.', source: 'NTT DATA' },
    { text: 'Outsourcing evaluation can reduce associated costs by up to 45%.', source: 'Woodfrog Analysis' },
    { text: 'Only about 54% of AI models move from pilot to production.', source: 'Digital CxO' },
    { text: 'Enterprises report an average 41% ROI on successful GenAI projects.', source: 'Snowflake' },
  ],
  importance: {
    headline: 'Why Benchmarking Is Indispensable for Enterprise GenAI Success',
    description: 'In regulated and high-stakes environments, benchmarking and evaluations form the bedrock of reliable GenAI integration. These processes systematically assess model accuracy, robustness, and ethical alignment, mitigating risks and ensuring sustainable ROI.',
    // --- UPDATED: Reworked cards with new copy and consistent icons ---
    cards: [
        { icon: <FiShield />, title: 'Prevent Catastrophic Risks', text: 'Identify vulnerabilities like data leaks or compliance violations before they impact your operations.' },
        { icon: <FiTrendingUp />, title: 'Enhance ROI & Efficiency', text: 'Optimize model selection to cut deployment timelines and ensure your investment delivers measurable returns.' },
        { icon: <FiCheckCircle />, title: 'Ensure Regulatory Compliance', text: 'Align with stringent standards like India\'s RBI guidelines to avert fines and reputational harm.' },
        { icon: <FiGitMerge/>, title: 'Uncover & Address Bias', text: 'Detect hidden disparities in applications like financial analysis, promoting fairness and reliability.' },
        { icon: <FiAlertTriangle />, title: 'Adapt to Emerging Threats', text: 'Benchmark against evolving risks, including advanced hallucinations, to sustain long-term performance.' },
        { icon: <FiCpu/>, title: 'Optimize for Scalability', text: 'Ensure your models can handle enterprise-level demands for complex use cases and large datasets.' },
    ],
  },
  // --- UPDATED: New copy for this section ---
  safeguard: {
      headline: 'An Essential Safeguard for Enterprise AI',
      description: 'With project abandonment rates reaching 30% due to unaddressed issues like inaccuracies or biases, rigorous evaluation is indispensable. We help you prevent catastrophic risks, enhance ROI, and ensure your deployments align with stringent regulations.'
  },
  partnership: {
    headline: 'Opt for Expert External Collaboration',
    subheadline: 'Why Internal Evaluation Falls Short',
    image: '/images/BenchMarkingEvals/BE-Collab3.png',
    points: [
        { title: 'Objective Insights', text: 'Our third-party perspective ensures unbiased, compliance-focused results, eliminating internal biases.' },
        { title: 'Cost Efficiency', text: 'Access advanced methodologies and infrastructure, reducing your evaluation costs by up to 45%.' },
        { title: 'Accelerated Timelines', text: 'Cut your time-to-insight by up to 50% with our streamlined processes and dedicated expertise.' },
        { title: 'Enterprise Scalability', text: 'We seamlessly handle extensive models and complex datasets, ensuring your solutions are ready for enterprise-scale needs.' },
    ]
  },
  getStarted: {
      headline: 'Advance Your GenAI Strategy with Woodfrog Tech',
      description: 'Discover how our tailored benchmarking services can fortify your enterprise operations.',
      cta1: 'Schedule a Demo',
      cta2: 'Request a Proposal'
  }
};


// --- Animated Stats Component ---
const AnimatedStats: FunctionComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % pageData.animatedStats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.heroStatContainer}>
            {pageData.animatedStats.map((stat, index) => (
                <p key={index} className={`${styles.heroStat} ${index === currentIndex ? styles.visible : ''}`}>
                    "{stat.text}"
                    <span className={styles.statSource}> - {stat.source}</span>
                </p>
            ))}
        </div>
    );
};


// --- Main Page Component ---
const BenchmarkingEvaluation: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        <PageHero title={pageData.hero.headline} description={pageData.hero.subheadline} large>
            <div className={styles.heroExtra}>
                <AnimatedStats />
                <a href="/contact-us" className={styles.ctaButton}>{pageData.hero.cta}</a>
            </div>
        </PageHero>

        <div className={styles.contentWrapper}>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.importance.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.importance.description}</p>
                </div>
                <div className={styles.cardsGrid}>
                    {pageData.importance.cards.map((card, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* --- UPDATED SECTION --- */}
             <section className={`${styles.section} ${styles.imageSection}`}>
                <div className={styles.imageSectionContent}>
                    <h2 className={styles.sectionHeadlineAlt}>{pageData.safeguard.headline}</h2>
                    <p className={styles.sectionDescriptionAlt}>{pageData.safeguard.description}</p>
                </div>
                <div className={styles.imageSectionVisual}>
                    <img src="/images/BenchMarkingEvals/BE-data.png" alt="Data-driven evaluation process" className={styles.featureImage}/>
                </div>
            </section>

            <section className={`${styles.section} ${styles.partnershipSection}`}>
                <div className={styles.partnershipImage}>
                    <img src={pageData.partnership.image} alt="Expert Collaboration" />
                </div>
                <div className={styles.partnershipContent}>
                    <p className={styles.partnershipSubheadline}>{pageData.partnership.subheadline}</p>
                    <h2 className={styles.partnershipHeadline}>{pageData.partnership.headline}</h2>
                    <ul className={styles.partnershipList}>
                        {pageData.partnership.points.map((point, index) => (
                            <li key={index}>
                                <div className={styles.pointIcon}><FiCheck /></div>
                                <div>
                                    <h3 className={styles.pointTitle}>{point.title}</h3>
                                    <p className={styles.pointText}>{point.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

             <section className={`${styles.section} ${styles.getStartedSection}`}>
                <h2 className={styles.sectionHeadline}>{pageData.getStarted.headline}</h2>
                <p className={styles.sectionDescription}>{pageData.getStarted.description}</p>
                 <div className={styles.ctaGroup}>
                    <a href="/contact-us" className={styles.ctaButton}>Schedule a Demo</a>
                    <a href="/contact-us" className={styles.ctaButtonSecondary}>Request a Proposal</a>
                </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BenchmarkingEvaluation;