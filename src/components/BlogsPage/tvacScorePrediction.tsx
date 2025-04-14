import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const TvacScorePrediction: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const tvacScoreData = [
        {
            header: "Introduction",
            subHeader:
                "Overcoming Contamination Detection Delays with Predictive Insights",
            content: (
                <>
                    <Paragraph>
                        Ensuring the quality of purified water (PW) is critical in pharmaceutical batch manufacturing, where it serves as a key ingredient. Chemical and microbiological testing of water samples is traditionally performed daily, but delays in contamination detection often lead to costly batch failures and operational inefficiencies.

                    </Paragraph>
                    <Paragraph>
                        To address this, Woodfrog partnered with the client to develop a predictive alert system. This system uses historical data and real-time sensor readings to anticipate microbial contamination risks, enabling proactive measures and minimizing batch losses.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Tackling the Risks of Microbial Contamination in Pharmaceutical Manufacturing",
            content: (
                <>

                    <h4>Problem Statement</h4>
                    <Paragraph>Batch failures due to microbial contamination caused by deviations in water quality metrics, such as conductivity and pH, result in significant waste and downtime. To address this:

                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                A predictive alert system was required to classify batches into risk levels (Red, Orange, Green) based on microbial contamination probability.


                            </li>
                            <li>
                                The solution had to identify key factors causing contamination, such as upper and lower threshold breaches and emerging patterns.



                            </li>

                        </ul>
                    </Paragraph>
                    <h4>
                        Background
                    </h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Daily Testing:</strong>Purified water undergoes daily chemical and microbiological analysis.


                            </li>
                            <li>
                                <strong>Process Delays: </strong>
                                Microbiological results are available only after several days, making early corrective actions impossible.

                            </li>
                            <li>
                                <strong>Critical Factors:</strong>
                                Deviations in water quality, such as pH, conductivity, and TOC, signal potential microbial contamination risks.


                            </li>

                        </ul>
                    </Paragraph>

                    <table >
                        <tr>
                            <th>Key Parameters</th>
                            <th>Impact on Microbial Contamination</th>

                        </tr>
                        <tr>
                            <td>Conductivity</td>
                            <td>Increased conductivity due to bacterial films releasing ammonium ions.</td>


                        </tr>
                        <tr>
                            <td>Stock Shortages</td>
                            <td>$750,000</td>


                        </tr>
                        <tr>
                            <td>pH</td>
                            <td>Higher pH caused by salts not removed during deionization or protein breakdown from dead bacteria.</td>


                        </tr>

                        <tr>
                            <td>Total Organic</td>
                            <td>Measures organic material from bacterial cell walls, including lignans and fatty acids.
                            </td>


                        </tr>
                        <tr>
                            <td>Membrane Back Pressure</td>
                            <td>Higher pressure indicates clogging due to contamination or bacterial films.</td>

                        </tr>

                    </table>
                </>
            ),
        },

        {
            header: "What Solution We Used",
            subHeader: "A Comprehensive Approach to Predicting Microbial Contamination Risks",
            content: (
                <>
                    <Paragraph>
                        Woodfrog developed a high-level solution with the following features:

                    </Paragraph>

                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Exploratory Analysis & Feature Engineering:
                                </strong>
                                <ul>
                                    <li>
                                        Identified critical factors influencing microbial contamination.
                                    </li>
                                    <li>Designed thresholds for early warning indicators.


                                    </li>
                                </ul>

                            </li>
                            <li>
                                <strong>Predictive Modeling:
                                </strong>
                                <ul>
                                    <li>
                                        Built a machine learning model to classify batches into risk levels (Red, Orange, Green) based on historical data patterns and chemical analysis results.
                                    </li>

                                </ul>

                            </li>
                            <li>
                                <strong>Dashboard Integration:
                                </strong>
                                <ul>
                                    <li>
                                        Deployed a user-friendly Power BI dashboard to visualize contamination probabilities, key contributing factors, and historical trends.
                                    </li>

                                </ul>

                            </li>
                            <li>
                                <strong>Actionable Insights:
                                </strong>
                                <ul>
                                    <li>
                                        Generated predictive alerts with explanations for the assigned risk level, enabling early intervention.

                                    </li>

                                </ul>

                            </li>
                        </ol>
                    </Paragraph>

                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader:
                "Tailored Solutions for Predictive Alerts and Operational Monitoring",
            content: (
                <>
                    {" "}
                    <Paragraph>
                        Woodfrog offers a comprehensive suite of solutions tailored for batch manufacturing and quality monitoring:

                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Predictive Alerts:</strong><ul>
                                    <li>
                                        Real-time classification of batches into risk levels (Red, Orange, Green).
                                    </li>
                                    <li>
                                        Explanation of contributing factors for transparency.
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <strong>Integrated Dashboards:</strong><ul>
                                    <li>
                                        Interactive BI dashboards for operational monitoring.
                                    </li>
                                    <li>
                                        Examples include:
                                        <ul>
                                            <li>
                                                <strong>Production Batch Dashboard: </strong>Batch tracking, contamination risks, and status monitoring.

                                            </li>
                                            <li>
                                                <strong>Purchasing Inventory Dashboard:  </strong>Inventory control and COGS tracking.


                                            </li>
                                            <li>
                                                <strong>Sales Dashboard: </strong>Sales and cost analysis for better planning.

                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <strong>ML Ops Support:</strong><ul>
                                    <li>
                                        Seamless model deployment and monitoring using cloud-based architecture.
                                    </li>
                                    <li>
                                        Capability for batch data uploads or direct sensor integrations.

                                    </li>
                                </ul>

                            </li>

                        </ul>
                    </Paragraph>

                </>
            ),
        },

        {
            header: "Business Outcomes",
            subHeader: "Transforming Microbial Contamination Management with Predictive Alerts",
            content: (
                <>
                    <Paragraph>The predictive alert system resulted in significant improvements:
                    </Paragraph>
                    <table >
                        <tr>
                            <th>Metric</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Improvement</th>
                        </tr>
                        <tr>
                            <td>Microbial Detection Time</td>
                            <td>Delayed by days</td>
                            <td>Real-time predictive alerts</td>
                            <td>Reduced to real-time</td>

                        </tr>
                        <tr>
                            <td>Batch Failure Rate</td>
                            <td>~10% per quarter</td>
                            <td>~2% per quarter</td>
                            <td>80% reduction</td>

                        </tr>
                        <tr>
                            <td>Risk Classification Accuracy</td>
                            <td>Not Available</td>
                            <td>95% accuracy for alerts</td>
                            <td>Reliable early intervention</td>

                        </tr>
                        <tr>
                            <td>Dashboard Visibility</td>
                            <td>Manual reports</td>
                            <td>Interactive BI dashboards</td>
                            <td>Proactive insights & transparency</td>

                        </tr>


                    </table>

                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader:
                "Empowering Data-Driven Decision Making for Improved Operational Efficiency",
            content: (
                <>

                    <Paragraph>
                        "This predictive alert system revolutionized our approach to microbial contamination management. By identifying risks early, we’ve minimized batch failures, reduced operational delays, and enhanced compliance with regulatory standards. The transparency of the dashboard has empowered our team to act decisively based on data-driven insights."

                    </Paragraph>

                </>
            ),
        },
    ];

    return (
        <BlogComponent className={className} blogData={tvacScoreData} title={"TVAC Score Prediction"} desc={" Predictive Alerts for Microbial Contamination in Batch Manufacturing"} />


    );
};

export default TvacScorePrediction;
