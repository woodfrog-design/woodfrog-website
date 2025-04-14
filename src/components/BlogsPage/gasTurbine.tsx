import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const GasTurbine: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const gasTurbineDate = [
        {
            header: "Introduction",
            subHeader:
                "Revolutionizing Turbine Maintenance with Data-Driven Intelligence",
            content: (
                <>
                    <Paragraph>
                        Power generation companies rely on consistent turbine performance,
                        yet frequent mechanical failures disrupt operations and incur
                        substantial costs. Our client, a global energy provider, sought an
                        innovative solution to move beyond reactive maintenance and address
                        these challenges with data-driven intelligence. This blog details
                        how we deployed advanced machine learning models to revolutionize
                        their maintenance process.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Tackling Operational Inefficiencies in Turbine Maintenance",
            content: (
                <>
                    <Paragraph>
                        Client's Situation: The client operates a fleet of turbines across
                        multiple locations, each equipped with high-frequency sensors
                        tracking operational parameters like RPM, pressure, vibration, and
                        temperature. Despite access to vast sensor data, their existing
                        threshold-based system was failing to provide early anomaly
                        detection.
                    </Paragraph>
                    <h4>Key Challenges:</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>High Data Volume:</strong> Each turbine produced
                                terabytes of sensor data, making it hard to extract actionable
                                insights.
                            </li>
                            <li>
                                <strong>Reactive Maintenance: </strong> Alerts were triggered
                                too late, often after anomalies escalated into failures.
                            </li>
                            <li>
                                <strong>Environmental Variability:</strong> Diverse operational
                                environments (deserts, humid areas) complicated anomaly
                                detection due to localized conditions.
                            </li>
                        </ul>
                    </Paragraph>
                    <h4>Impact:</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Unplanned Downtime:</strong>Resulting in millions of
                                dollars lost annually.
                            </li>
                            <li>
                                <strong>Emergency Repairs: </strong> Increased operational and
                                logistical costs.
                            </li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },

        {
            header: "Solution",
            subHeader: "Machine Learning-Based Anomaly Detection",
            content: (
                <>
                    <Paragraph>
                        Our comprehensive, AI-driven system addressed the client's
                        challenges through advanced analytics, ensuring early identification
                        of anomalies and enabling predictive maintenance. To address the
                        challenges, we implemented a machine learning-powered anomaly
                        detection system designed to enable proactive maintenance and
                        optimize operations. The solution included:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Integration of Advanced Analytics:</strong> Leveraging
                                sensor data from turbines to monitor real-time performance and
                                detect early signs of equipment failure.
                            </li>
                            <li>
                                <strong>Anomaly Detection Models: </strong> Using AI algorithms
                                to identify patterns and deviations indicative of potential
                                failures.
                            </li>
                            <li>
                                <strong>Real-Time Insights:</strong>A dashboard provided
                                operators with actionable insights, enabling informed
                                decision-making.
                            </li>
                            <li>
                                <strong>Scalable and Adaptive Approach:</strong>Designed to
                                scale across diverse geographic regions and adaptable to
                                environmental variability.
                            </li>
                        </ol>
                    </Paragraph>
                    <Paragraph>
                        This holistic approach minimized downtime, optimized maintenance
                        schedules, and reduced operational costs while ensuring consistent
                        and reliable power generation.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Our Offerings",
            subHeader:
                "Tailored Machine Learning Solutions for Industrial Excellence",
            content: (
                <>
                    {" "}
                    <h4>
                        We offer end-to-end machine learning solutions tailored to
                        industrial needs:
                    </h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Predictive Maintenance:</strong> Reduce unplanned
                                downtime with early fault detection.
                            </li>
                            <li>
                                <strong>Edge Computing: </strong> Real-time processing to
                                minimize latency and bandwidth usage.
                            </li>
                            <li>
                                <strong>Custom Dashboards:</strong>Visualize operational health
                                with detailed analytics.
                            </li>
                            <li>
                                <strong>Scalable Solutions:</strong> Adaptable to large datasets
                                and multi-site operations.
                            </li>
                            <li>
                                <strong>Continuous Model Improvement: </strong> A feedback loop
                                ensures accuracy and adaptability.
                            </li>
                        </ul>
                    </Paragraph>
                    <h4>Comparison Table: Legacy vs. ML-Based Maintenance</h4>
                    <table className="gas">
                        <tr>
                            <th>Aspect</th>
                            <th>Legacy System</th>
                            <th>Our Solution</th>
                        </tr>
                        <tr>
                            <td>Detection Method</td>
                            <td>Threshold-based alerts</td>
                            <td>ML-driven predictive insights</td>
                        </tr>
                        <tr>
                            <td>Downtime Reduction</td>
                            <td>Reactive (limited)</td>
                            <td>15% decrease in unplanned downtime</td>
                        </tr>
                        <tr>
                            <td>Ernst Handel</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                        </tr>
                        <tr>
                            <td>Alert Accuracy</td>
                            <td>Low (false alarms)</td>
                            <td>High (96% precision)</td>
                        </tr>
                        <tr>
                            <td>Scalability</td>
                            <td>Limited to specific setups</td>
                            <td>Fully scalable to multiple sites</td>
                        </tr>
                        <tr>
                            <td>Cost Savings</td>
                            <td>None</td>
                            <td>10% reduction in maintenance costs</td>
                        </tr>
                    </table>
                </>
            ),
        },

        {
            header: "Business Outcomes",
            subHeader: "Key Achievements in Transforming Operational Efficiency",
            content: (
                <>
                    <h4>Key Achievements in Transforming Operational Efficiency</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Reduced Unplanned Downtime:</strong> Achieved a 15%
                                decrease within six months.
                            </li>
                            <li>
                                <strong>Cost Efficiency:</strong> Saved 10% in annual
                                maintenance costs by enabling proactive intervention.
                            </li>
                            <li>
                                <strong>Custom Dashboards:</strong>Visualize operational health
                                with detailed analytics.
                            </li>
                            <li>
                                <strong>Enhanced Operational Efficiency:</strong> Improved
                                turbine uptime and extended equipment life cycles.
                            </li>
                            <li>
                                <strong>Real-Time Insights: </strong> Enabled quick
                                decision-making through actionable data visualizations.
                            </li>
                            <li>
                                <strong>Future-Ready Architecture: </strong> Supported the
                                client’s scaling operations across diverse geographic locations.
                            </li>
                        </ol>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Conclusion",
            subHeader:
                "Achieving Operational Excellence with AI-Driven Predictive Maintenance",
            content: (
                <>
                    <h4>
                        Achieving Operational Excellence with AI-Driven Predictive
                        Maintenance
                    </h4>
                    <Paragraph>
                        By transitioning from reactive to predictive maintenance, our
                        AI-driven anomaly detection system not only addressed the client’s
                        operational inefficiencies but also delivered measurable value. With
                        reduced downtime, optimized costs, and improved reliability, this
                        solution empowers the client to ensure seamless power generation
                        across their fleet of turbines.
                    </Paragraph>
                </>
            ),
        },
    ];

    return (
        <BlogComponent className={className} blogData={gasTurbineDate} title={"Smart Monitoring"} desc={"Smart Monitoring: Machine Learning for Early Fault Detection in Gas Turbines"} />

    );
};

export default GasTurbine;
