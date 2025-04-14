import { FunctionComponent } from "react";
// import styles from "./UnOrderList.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./AboutUs.module.css";
import HeaderComponet from "../components/HeaderComponent";
import UnOrderList from "../components/UnorderList";
import Footer from "../components/Footer";
import PageDescription from "../components/PageDescription";
import PageDescriptionLeftTitle from "../components/PageDescriptionLeftTitle";
import UnOrderListOnly from "../components/UnOrderListOnly";
import Items from "../components/Items";
import { title } from "process";

const aboutUsPageDescription = {
    title: 'About Us',
    describe: `<p>Woodfrog, established in 2023 in Pune, India, is an innovative AI and Analytics firm. 
    With a bold vision and agile approach, we're disrupting traditional data solutions. Our team's creativity, 
    expertise, and enthusiasm enable us to craft cutting-edge solutions for data-driven decision making, 
    serving esteemed clients across industries and cementing our position as a rising star in the data analytics.</p>`
};
const ourStory = {
    title: 'Our Story',
    describe: `<p>We began with a simple yet ambitious goal: to empower businesses to make informed decisions through data-driven insights.
    Our founder & core team, passionate about AI and analytics, assembled a team of talented individuals who share a common vision.</p>`
};
const ourMission = {
    title: 'Our Mission',
    describe: `<p>To revolutionize data analytics by:</p>`,
    items: [
        'Developing innovative AI-powered solutions',
        'Delivering actionable insights for informed decision-making',
        'Fostering long-term partnerships with our clients',
        'Cultivating a culture of continuous learning and innovation',
    ]
};

const ourValues = {
    title: 'Our Values',
    // describe: `<p>To revolutionize data analytics by:</p>`,
    items: [
        'Customer-centricity: Your success is our priority',
        'Innovation: We continuously push boundaries',
        'Collaboration: Together, we achieve more',
        'Integrity: Transparency and ethics guide our actions',
    ]
};
const ourExpertise = {
    title: 'Our Expertise',
    describe: `Our team of seasoned data scientists, engineers, and AI specialists leverages decades of collective experience in:`,
    items: [
        'Advanced analytics: Uncovering hidden patterns and insights',
        'Data product: Crafting customizable, user-centric data solutions',
        'Data engineering: Building scalable, efficient data infrastructure',
        'Machine learning: Developing predictive models for informed decision-making',
    ]
};
const ourApproach = {
    title: 'Our Approach',
    describe: `We believe data should be accessible, actionable, and empowering for everyone. Our customizable analytics solutions and user-centric tools enable businesses to:`,
    items: [
        'Extract deep insights: Uncover hidden trends and opportunities',
        'Optimize processes: Streamline operations and enhance efficiency',
        'Anticipate future challenges: Proactively address potential obstacles',
        'Our consultative, end-to-end approach guides clients through:',
    ]
};
const ourApproach1 = {
    // title: 'Our Approach',
    describe: `Our consultative, end-to-end approach guides clients through:`,
    items: [
        // 'Our consultative, end-to-end approach guides clients through:',
        'Data preparation: Ensuring data quality and integrity',
        'Strategy development: Aligning data goals with business objectives',
        'Deployment: Seamless integration with existing systems',
        'Ongoing support: Continuous guidance and optimization'
    ]
};
const ourTeam = {
    // title: 'Our Approach',
    describe: `Our team of seasoned data scientists, engineers, and AI specialists brings decades of experience in advanced analytics, 
    data engineering, and machine learning. We craft customized data strategies tailored to your unique goals, 
    from precision-driven dashboards and real-time alerts to comprehensive AI and machine learning solutions.`,
    items: [
    ]
};


/* const aboutUs = [
    {
        title: 'Why Woodfrog?',
        items : [
            {
                title: 'Customized AI Solutions:',
                describe: `We offer tailored AI models to solve complex challenges, from predictive maintenance and demand forecasting to customer experience enhancements and large language model (LLM) agents. Our advanced analytics deliver actionable insights that keep businesses agile in fast-changing markets.`
            },
            {
                title: 'Real-Time Data Integration: ',
                describe: `Our solutions integrate seamlessly with your existing systems, delivering real-time insights for agile decision-making.`
            },
            {
                title: 'User-First Tools and Dashboards:',
                describe: ` Our intuitive dashboards and data visualization tools make it easy for every team member to understand and utilize data insights effectively.`
            },
        ]
    },
]; */
const whyWoodFrog ={
        title: 'Why Woodfrog?',
        describe:`Tailored AI Solutions: Customized models addressing specific business challenges, such as:`,
        items : [
            'Predictive maintenance: Minimizing downtime and optimizing resource allocation',
            'Demand forecasting: Informing inventory management and supply chain optimization',
            'Customer experience enhancements: Personalizing interactions and improving satisfaction',
            'Large language model (LLM) agents: Revolutionizing customer support and engagement'
        ]
    }
const whyWoodFrogOne ={
         describe: 'Real-Time Insights: Seamless integration with existing systems, enabling: ',
         items : [
            'Agile decision-making: Responding promptly to changing market conditions',
            'Data-driven strategy: Informing business decisions with up-to-the-minute information',
        ]
    }
const whyWoodFrogTwo ={
        describe: 'Intuitive Tools: User-friendly dashboards and data visualization, facilitating:',
        items : [
            'Effective insights utilization: Empowering teams to make data-driven decisions',
            'Collaborative workflow: Enhancing cross-functional communication and alignment',
        ]
    }
const joinOurJourney ={
        title: 'Join the Woodfrog Journey',
        describe: `"Discover how our cutting-edge AI and analytics solutions can transform your business. Let's collaborate to unlock data-driven growth, efficiency, and success."`,
    }

const AboutUs: FunctionComponent = () => {
    return (
        <section className={[styles.AboutUs].join(' ')} >
            <HeaderComponet />
            <main  className={styles.body}>
                <PageDescription details={aboutUsPageDescription}/>
                <PageDescriptionLeftTitle details={ourStory}/>
                <PageDescriptionLeftTitle details={ourMission}/>
                <UnOrderListOnly list={ourMission.items} />
                <PageDescriptionLeftTitle details={ourValues}/>
                <UnOrderListOnly list={ourValues.items}/>
                <PageDescriptionLeftTitle details={ourExpertise}/>
                <UnOrderListOnly list={ourExpertise.items}/>
                <PageDescriptionLeftTitle details={ourApproach}/>
                <UnOrderListOnly list={ourApproach.items}/>
                <PageDescriptionLeftTitle details={ourApproach1}/>
                <UnOrderListOnly list={ourApproach1.items}/>
                <PageDescriptionLeftTitle details={ourTeam}/>
                <PageDescriptionLeftTitle details={{title: '', describe: '', items: []}}/>
                <PageDescriptionLeftTitle details={whyWoodFrog}/>
                <UnOrderListOnly list={whyWoodFrog.items}/>
                <PageDescriptionLeftTitle details={whyWoodFrogOne}/>
                <UnOrderListOnly list={whyWoodFrogOne.items}/>
                <PageDescriptionLeftTitle details={whyWoodFrogTwo}/>
                <UnOrderListOnly list={whyWoodFrogTwo.items}/>
                <PageDescriptionLeftTitle details={joinOurJourney}/>
                
            </main>
            <Footer />
        </section>
    );
};

export default AboutUs;
