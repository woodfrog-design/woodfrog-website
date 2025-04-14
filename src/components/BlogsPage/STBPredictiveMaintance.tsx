import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";

import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const StbPredictiveMaintance: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const stbHealthMonitoringData = [
        {
            header: "Introduction",
            subHeader: "Enhancing Viewer Experience with Smarter Set-Top Box Monitoring Solutions",
            content: (
                <>
                    <Paragraph>
                        In today’s competitive media landscape, user experience is paramount. Frequent restarts in set-top boxes (STBs) disrupt seamless viewing and erode customer satisfaction. A leading media company faced challenges in ensuring the stability of their new set-top box builds.
                    </Paragraph>
                    <Paragraph>
                        They needed an intelligent, proactive approach to predict and address potential stability issues before deployment.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Stability Challenges: Ensuring Smooth Operations for Set-Top Boxes",
            content: (
                <>
                    <h4>The Problem</h4>
                    <Paragraph>
                        The media company encountered persistent instability issues with their new set-top box builds, leading to frequent device restarts and poor user experiences.
                    </Paragraph>
                    <h4>Challenges Identified</h4>
                    <Paragraph>
                        <ul>
                            <li><strong>High Complexity of Metrics:</strong> Multiple interdependent factors like memory utilization, network performance, and temperature made pinpointing root causes difficult.</li>
                            <li><strong>Dynamic Environmental Conditions:</strong> Variability due to factors like humidity and network latency added complexity to stability assessments.</li>
                            <li><strong>User Experience Impact:</strong> Frequent device restarts directly affected user satisfaction, loyalty, and brand reputation.</li>
                            <li><strong>Reactive Maintenance:</strong> Existing systems relied on post-deployment fixes rather than proactive problem prevention.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "Proactive Monitoring with Predictive Insights for Set-Top Box Stability",
            content: (
                <>
                    <Paragraph>
                        To address these challenges, we developed a predictive health monitoring solution with the following features:
                    </Paragraph>
                    <Paragraph>
                        <ul>
                            <li><strong>Comprehensive Feature Analysis:</strong> Analyzed factors influencing STB stability, including system resource utilization, network metrics, and environmental conditions.</li>
                            <li><strong>Machine Learning-Powered Predictive Model:</strong> Leveraged historical data to predict the likelihood of stability issues in new builds.</li>
                            <li><strong>Real-Time Dashboard Integration:</strong> Enabled monitoring of critical metrics, providing actionable insights for preemptive maintenance.</li>
                            <li><strong>Tailored Recommendations:</strong> Provided targeted optimizations such as adjusting system resource allocations or fine-tuning network parameters.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Revolutionizing Media Operations with Smarter STB Management Tools",
            content: (
                <>
                    <Paragraph>
                        Woodfrog’s tailored offerings for set-top box stability monitoring include:
                    </Paragraph>
                    <table>
                        <tr><th>Component</th><th>Description</th></tr>
                        <tr><td>Predictive Models</td><td>AI-driven models to forecast stability issues based on comprehensive system metrics.</td></tr>
                        <tr><td>Real-Time Monitoring</td><td>Dashboards to track key parameters like memory utilization, network latency, and error logs for live health assessments.</td></tr>
                        <tr><td>Optimized Alerts</td><td>Configurable alerts for early detection of critical issues, enabling timely interventions.</td></tr>
                        <tr><td>Data-Driven Insights</td><td>Insights on performance bottlenecks and system optimization opportunities for enhanced stability and user satisfaction.</td></tr>
                        <tr><td>Custom Integrations</td><td>Seamless integration with existing monitoring tools and media operations systems for a unified stability management experience.</td></tr>
                    </table>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Transformative Impact on Device Stability and User Experience",
            content: (
                <>
                    <Paragraph>
                        The implementation of our solution led to measurable improvements:
                    </Paragraph>
                    <table>
                        <tr><th>Metric</th><th>Before</th><th>After</th><th>Improvement</th></tr>
                        <tr><td>Device Restarts</td><td>Frequent (15/day/build)</td><td>Minimal (2/day/build)</td><td>87% reduction</td></tr>
                        <tr><td>Customer Satisfaction (CSAT)</td><td>62%</td><td>81%</td><td>19% increase</td></tr>
                        <tr><td>Issue Detection Time</td><td>Reactive (post-deployment)</td><td>Proactive (pre-deployment)</td><td>Real-time predictive alerts</td></tr>
                        <tr><td>Operational Downtime</td><td>High</td><td>Reduced</td><td>Faster resolution, 30% efficiency</td></tr>
                    </table>
                    <Paragraph>
                        By proactively identifying stability risks, the client improved device reliability and strengthened customer trust.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "Empowering Media Excellence Through Predictive Technology",
            content: (
                <>
                    <Paragraph>
                        "Woodfrog’s predictive solution has revolutionized our approach to set-top box stability. We’ve moved from reactive troubleshooting to proactive maintenance, significantly enhancing our customers’ viewing experience."
                    </Paragraph>
                    <Paragraph>
                        The seamless integration and actionable insights provided by their platform have empowered our team to deliver unparalleled reliability.
                    </Paragraph>
                </>
            ),
        },
    ];


    return (
        <BlogComponent className={className} blogData={stbHealthMonitoringData} title={"STB Predictive Maintenance"} desc={"STB Health Monitoring and Predictive Maintenance"} />


    );
};

export default StbPredictiveMaintance;
