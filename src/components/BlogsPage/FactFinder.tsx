import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";

import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const FactFinder: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const factFinderData = [
        {
            header: "Introduction",
            subHeader: "Transforming Manufacturing Intelligence with LLM-Powered Analytics",
            content: (
                <>
                    <Paragraph>
                        In the fast-paced manufacturing industry, decision-makers rely on timely and accurate insights to drive productivity and efficiency. Traditionally, teams have depended heavily on data analysts and SQL experts to uncover trends in production, cycle times, sensor data, and defect rates. This dependency slows decision-making and increases costs.
                    </Paragraph>
                    <Paragraph>
                        To address this gap, we developed FactFinder, an AI-powered application leveraging large language models (LLMs). FactFinder enables manufacturing professionals to query databases in natural language and instantly access KPIs without technical expertise.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Reducing Dependency on Data Analysts for Smarter Manufacturing Decisions",
            content: (
                <>
                    <h4>The Problem</h4>
                    <Paragraph>
                        The manufacturing sector faced these persistent challenges:
                    </Paragraph>
                    <h4>Challenges Identified</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>Over-Reliance on Data Analysts:</strong> Teams depended on analysts for routine queries like production trends, sensor readings, and reject counts.</li>
                            <li><strong>Lack of Agility:</strong> Insights often took hours or days, hindering real-time decision-making.</li>
                            <li><strong>Limited SQL Expertise:</strong> Non-technical staff struggled with SQL-based systems to extract data independently.</li>
                        </ul>
                    </Paragraph>
                    <h4>Challenges Identified</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>Natural Language Complexity:</strong> Translating complex user queries into SQL accurately while considering diverse data structures.</li>
                            <li><strong>System Scalability:</strong> Designing a solution that scales across massive datasets in manufacturing environments.</li>
                            <li><strong>User Experience:</strong> Delivering results in an intuitive, user-friendly interface for non-technical users.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "Harnessing the Power of LLMs to Democratize Manufacturing Data",
            content: (
                <>
                    <Paragraph>
                        Our solution, FactFinder, combines the capabilities of large language models and intuitive UI design to deliver real-time insights.
                    </Paragraph>
                    <h4>Key Features of FactFinder:</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>Natural Language Querying:</strong> Users enter queries in plain English (e.g., "Show total good counts for last month").</li>
                            <li><strong>Automated SQL Generation:</strong> FactFinder converts queries into optimized SQL to fetch data from the manufacturing database.</li>
                            <li><strong>Real-Time Data Insights:</strong> Instantly retrieves KPIs, such as cycle time trends, defect counts, and sensor analytics.</li>
                            <li><strong>Intuitive Dashboard:</strong> Displays results in a visually appealing and easy-to-interpret interface.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Comprehensive Data Solutions for Manufacturing Excellence",
            content: (
                <>
                    <Paragraph>
                        Woodfrog’s tailored offerings for manufacturing data insights include:
                    </Paragraph>
                    <table>
                        <tr><th>Component</th><th>Description</th></tr>
                        <tr><td>LLM-Powered Insights</td><td>Translate natural language queries into actionable SQL insights.</td></tr>
                        <tr><td>Real-Time Analytics</td><td>Instantly fetch production trends, good counts, rejects, and sensor metrics.</td></tr>
                        <tr><td>Intuitive Dashboards</td><td>Interactive UI for seamless visualization of results.</td></tr>
                        <tr><td>Scalable Architecture</td><td>Supports high-volume manufacturing data across multiple locations.</td></tr>
                        <tr><td>Customizable KPIs</td><td>Tailored metrics aligned to specific manufacturing processes and workflows.</td></tr>
                    </table>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Revolutionizing Manufacturing Analytics with FactFinder",
            content: (
                <>
                    <Paragraph>
                        The implementation of FactFinder delivered significant operational improvements:
                    </Paragraph>
                    <table>
                        <tr><th>Metric</th><th>Before FactFinder</th><th>After FactFinder</th><th>Improvement</th></tr>
                        <tr><td>Query Turnaround Time</td><td>Hours to days (analyst-dependent)</td><td>Real-time (1 minute)</td><td>95% faster</td></tr>
                        <tr><td>Data Analyst Dependency</td><td>High</td><td>Minimal (self-service analytics)</td><td>80% reduction</td></tr>
                        <tr><td>User Satisfaction (CSAT)</td><td>65%</td><td>90%</td><td>25% increase</td></tr>
                        <tr><td>Cost of Data Access</td><td>High</td><td>Reduced due to self-service adoption</td><td>20% cost savings</td></tr>
                    </table>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "A Game-Changer for Manufacturing Insights",
            content: (
                <>
                    <Paragraph>
                        "FactFinder has transformed the way we approach data analytics. Our teams no longer rely on analysts for basic queries, enabling faster decision-making and improved efficiency. The intuitive interface and real-time capabilities have made advanced analytics accessible to everyone in our organization."
                    </Paragraph>
                    <h4>
                        Ready to Revolutionize Your Manufacturing Data Access?
                    </h4>

                    <Paragraph>
                        Experience the power of FactFinder to unlock real-time insights and drive operational excellence. Contact us today to learn more!
                    </Paragraph>
                </>
            ),
        }
    ];







    return (
        <BlogComponent className={className} blogData={factFinderData} title={"FactFinder"} desc={"Empowering Manufacturing with AI-Driven Insights"} />


    );
};

export default FactFinder;
