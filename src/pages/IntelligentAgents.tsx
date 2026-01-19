import { FunctionComponent } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import styles from './IntelligentAgents.module.css'; // We'll create this next
import { FiClock, FiGitBranch, FiUserCheck, FiTerminal, FiTool, FiTrendingUp, FiTarget, FiShare2, FiShield, FiPlay } from 'react-icons/fi';

// --- Page-specific data ---
const pageData = {
  hero: {
    headline: 'Beyond Automation: Deploying Intelligent Agents to Act on Your Data',
    subheadline: 'We build autonomous AI agents that can reason, plan, and use tools to execute complex tasks, acting as a force multiplier for your human teams.',
    cta: 'Deploy Your AI Workforce',
  },
  benefits: {
    headline: 'The Business Value of Autonomous AI Agents',
    description: 'Move beyond simple chatbots and unlock the next level of AI-driven productivity. Our intelligent agents are designed to function as capable, autonomous members of your digital workforce.',
    cards: [
      { icon: <FiClock />, title: '24/7 Autonomous Operation', text: 'Deploy agents that work around the clock to perform research, monitor systems, and execute multi-step workflows without supervision.' },
      { icon: <FiGitBranch />, title: 'Complex Problem Solving', text: 'Create agents that can break down complex goals into smaller steps and use multiple tools like APIs and databases to find solutions.' },
      { icon: <FiUserCheck />, title: 'Human-in-the-Loop Control', text: 'Design sophisticated systems with built-in checkpoints for human oversight and approval on critical tasks, ensuring safety and control.' },
      { icon: <FiTerminal />, title: 'Action-Oriented AI', text: 'Go beyond simple Q&A. Build agents that can take real-world actions, such as sending emails, updating CRMs, or booking appointments.' },
      { icon: <FiTool />, title: 'Custom Tool Integration', text: 'Equip your agents with custom tools that allow them to securely interact with your proprietary software and internal APIs.' },
      { icon: <FiTrendingUp />, title: 'Continuous Learning Loops', text: 'Implement learning frameworks that allow your agents to improve their performance over time based on feedback and successful outcomes.' },
    ],
  },
  featureSection: {
    headline: 'Safe, Controllable, and Aligned with Your Goals',
    text: 'Building powerful agents requires a deep focus on safety. We implement robust guardrails, validation steps, and human-in-the-loop controls to ensure your agents act reliably and stay aligned with your business objectives, preventing unintended actions.',
    image: '/images/IntelligentAgents/agents.png',
  },
  process: {
    headline: 'How We Build and Deploy Intelligent Agents',
    subheadline: 'A Framework for Trustworthy Autonomy',
    steps: [
        { number: '01', icon: <FiTarget />, title: 'Goal & Tool Definition', text: 'We define the agent\'s primary objective and identify the necessary tools, APIs, and data sources it needs to access.' },
        { number: '02', icon: <FiShare2 />, title: 'Cognitive Architecture Design', text: 'We design the agent\'s reasoning engine, including its planning capabilities, memory, and decision-making framework.' },
        { number: '03', icon: <FiShield />, title: 'Action & Guardrail Implementation', text: 'We develop the functions for the agent\'s actions and implement strict guardrails to define the boundaries of its operation.' },
        { number: '04', icon: <FiPlay />, title: 'Sandboxed Testing & Deployment', text: 'We rigorously test the agent in a secure, sandboxed environment before deploying it with real-time monitoring and logging.' },
    ]
  },
  getStarted: {
      headline: 'Ready to Build Your AI Workforce?',
      description: 'Let\'s explore how intelligent agents can revolutionize your business processes.',
      cta: 'Book an Agent Strategy Session',
  },
  serviceName: 'Intelligent Agents'
};

// --- Main Page Component ---
const IntelligentAgents: FunctionComponent = () => {
  return (
    <div className={styles.pageWrapper}>
      <HeaderComponent />
      <main>
        <PageHero title={pageData.hero.headline} description={pageData.hero.subheadline} large>
            <div className={styles.heroExtra}> <a href={`/contact-us?service=${encodeURIComponent(pageData.serviceName)}`} className={styles.ctaButton}>{pageData.hero.cta}</a> </div>
        </PageHero>
        <div className={styles.contentWrapper}>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionHeadline}>{pageData.benefits.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.benefits.description}</p>
                </div>
                <div className={styles.cardsGrid}>
                    {pageData.benefits.cards.map((card, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardText}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.section} ${styles.featureSection}`}>
                <div className={styles.featureContent}>
                    <h2 className={styles.sectionHeadline}>{pageData.featureSection.headline}</h2>
                    <p className={styles.sectionDescription}>{pageData.featureSection.text}</p>
                </div>
                <div className={styles.featureImage}> <img src={pageData.featureSection.image} alt={pageData.featureSection.headline} /> </div>
            </section>

            <section className={`${styles.section} ${styles.processSection}`}>
                <div className={styles.sectionHeader}>
                    <p className={styles.processSubheadline}>{pageData.process.subheadline}</p>
                    <h2 className={styles.sectionHeadline}>{pageData.process.headline}</h2>
                </div>
                <div className={styles.quadrantGrid}>
                    {pageData.process.steps.map((step, index) => (
                        <div key={index} className={styles.quadrantItem}>
                            <div className={styles.quadrantIcon}>{step.icon}</div>
                            <div className={styles.quadrantNumber}>{step.number}</div>
                            <h3 className={styles.quadrantTitle}>{step.title}</h3>
                            <p className={styles.quadrantText}>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.section} ${styles.getStartedSection}`}>
                <h2 className={styles.sectionHeadline}>{pageData.getStarted.headline}</h2>
                <p className={styles.sectionDescription}>{pageData.getStarted.description}</p>
                 <div className={styles.ctaGroup}> <a href={`/contact-us?service=${encodeURIComponent(pageData.serviceName)}`} className={styles.ctaButton}>{pageData.getStarted.cta}</a> </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntelligentAgents;