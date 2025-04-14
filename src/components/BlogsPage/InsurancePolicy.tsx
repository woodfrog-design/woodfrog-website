import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const InsurancePolicy: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const insurancePolicyRecommendationData = [
        {
            header: "Introduction",
            subHeader: "Bridging the Gap: Addressing the Challenges of Personalized Policy Recommendations in Insurance",
            content: (
                <>
                    <Paragraph>
                        In today’s competitive insurance landscape, delivering personalized and comprehensive policy recommendations is crucial to retain customers and enhance loyalty. A leading insurance provider in Brazil faced challenges in offering tailored policies to meet the diverse needs of its clients.
                    </Paragraph>
                    <Paragraph>
                        While in-house experts excelled in crafting customized solutions, third-party agents were limited in their ability to provide suitable options. This gap led to missed opportunities and impacted customer satisfaction, driving the need for a more intelligent, data-driven approach.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Navigating Constraints: Understanding the Limitations of Third-Party Insurance Agents",
            content: (
                <>
                    <h4>Challenges in Policy Customization</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>Limited Offerings by Third-Party Agents:</strong> In-house experts could offer a wide range of policies with customized riders, but third-party agents were restricted to specific policies with limited riders.</li>
                            <li><strong>Customer Dissatisfaction:</strong> Many customers received policies that did not adequately match their needs, affecting customer loyalty and retention.</li>
                            <li><strong>Operational Inefficiencies:</strong> Agents struggled to recommend policies efficiently without comprehensive data support.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "Empowering Agents with Data-Driven Insights for Tailored Policy Recommendations",
            content: (
                <>
                    <Paragraph>
                        To bridge the gap, we implemented an AI-driven policy recommendation system designed to enhance the capabilities of third-party agents.
                    </Paragraph>
                    <h4>Core Features</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>Data-Driven Personalization:</strong> The solution analyzed data on region, income, age, dependents, and more to recommend suitable policies and riders.</li>
                            <li><strong>Personalized Policy Suggestions:</strong> Tailored recommendations based on individual customer profiles.</li>
                            <li><strong>Optimal Coverage Recommendations:</strong> Suggested coverage amounts based on financial situation, asset values, and risk factors.</li>
                            <li><strong>Seamless Agent Integration:</strong> Provided user-friendly dashboards for agents to access insights easily.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Innovative Solutions for Insurance Personalization and Operational Excellence",
            content: (
                <>
                    <Paragraph>
                        Woodfrog’s solution offers a comprehensive suite to revolutionize insurance policy recommendations:
                    </Paragraph>
                    <Paragraph>
                        <ul>
                            <li><strong>Policy Personalization:</strong> Accurate policy and rider recommendations tailored to customer profiles.</li>
                            <li><strong>Coverage Optimization:</strong> Intelligent suggestions for coverage amounts based on risk factors and liabilities.</li>
                            <li><strong>Agent Enablement:</strong> Dashboards for real-time insights, improving agent efficiency and decision-making.</li>
                            <li><strong>Enhanced Risk Management:</strong> Better coverage reduces liability exposure and improves customer satisfaction.</li>
                            <li><strong>Scalable Architecture:</strong> Designed to integrate seamlessly into existing systems and support future growth.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Transforming Customer Satisfaction with Smarter Insurance Recommendations",
            content: (
                <>
                    <Paragraph>
                        The implementation of the solution resulted in measurable improvements for the client:
                    </Paragraph>
                    <table>
                        <tr><th>Metric</th><th>Before Implementation</th><th>After Implementation</th><th>Improvement</th></tr>
                        <tr><td>Customer Satisfaction Rate</td><td>75%</td><td>88%</td><td>13% increase</td></tr>
                        <tr><td>Policy Recommendation Accuracy</td><td>60%</td><td>92%</td><td>32% improvement</td></tr>
                        <tr><td>Sales by Third-Party Agents</td><td>Limited to predefined policies</td><td>Access to 50+ policies</td><td>Broader offerings enhanced flexibility</td></tr>
                        <tr><td>Operational Efficiency</td><td>Manual, slow processes</td><td>Automated recommendations</td><td>Faster decision-making and efficiency</td></tr>
                    </table>

                    <Paragraph>
                        The system now performs tasks previously requiring 5 full-time resources with just 0.5 resources, achieving a 90% reduction in manual effort and saving over 100 hours per month.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "Delivering Exceptional Value through Intelligent Policy Recommendations",
            content: (
                <>
                    <Paragraph>
                        "The AI-powered recommendation system has significantly enhanced our ability to serve customers effectively. By empowering third-party agents with intelligent insights, we’ve improved customer satisfaction and strengthened market competitiveness."
                    </Paragraph>
                </>
            ),
        },
    ];





    return (
        <BlogComponent className={className} blogData={insurancePolicyRecommendationData} title={"Insurance Policy Recommendation"} desc={"Enhancing Customer Satisfaction with Personalized Solutions"} />


    );
};

export default InsurancePolicy;
