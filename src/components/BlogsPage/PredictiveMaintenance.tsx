import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";

import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const PredictiveMaintanance: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const predictiveData = [
        {
            header: "Introduction",
            subHeader:
                "Revolutionizing Manufacturing Efficiency with Predictive Maintenance",
            content: (
                <>
                    <Paragraph>
                        Operational downtime in manufacturing industries is a critical challenge, especially in aluminium casting processes, where mold failures can severely disrupt production schedules. With increasing competition and rising costs, manufacturers are seeking innovative ways to enhance efficiency and reduce unplanned downtimes. Leveraging predictive maintenance powered by machine learning, our solution enabled a proactive approach to identify potential mold failures before they occurred, optimizing resources and improving overall production reliability.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Overcoming Operational Hurdles in Aluminum Casting",
            content: (
                <>

                    <h4>The Problem:</h4>
                    <Paragraph>Frequent mold failures in the aluminum casting process were causing:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                30% unplanned downtime annually.

                            </li>
                            <li>
                                Significant financial losses due to halted production and urgent repair costs.

                            </li>
                            <li>
                                Decreased equipment lifespan due to reactive maintenance practices.

                            </li>
                        </ul>
                    </Paragraph>
                    <h4>Challenges Identified:</h4>
                    <Paragraph>
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Data Limitations:</strong>Gaps in continuous logging and inconsistent data quality.

                            </li>
                            <li>
                                <strong>Complex Failure Patterns:  </strong> Mold failures were influenced by multiple factors, making prediction difficult.

                            </li>
                            <li>
                                <strong>Imbalanced Data:   </strong> Failure events were rare compared to normal operations, creating a class imbalance.


                            </li>
                            <li>
                                <strong>Operational Variability  </strong> Differences in machine settings, materials, and environmental conditions added complexity.


                            </li>
                        </ol>
                    </Paragraph>
                </>
            ),
        },

        {
            header: "Solution",
            subHeader: "Transforming Aluminum Casting with Predictive Maintenance: A Strategic Approach",
            content: (
                <>
                    <Paragraph>
                        We implemented a high-level predictive maintenance framework to address these challenges. Here’s how:

                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Comprehensive Data Analysis:</strong> <ul>
                                    <li>
                                        Mapped the entire aluminum casting workflow to identify failure-prone stages.

                                    </li>
                                    <li>
                                        Consolidated sensor data (temperature, pressure, cycle times) and maintenance logs for detailed analysis.


                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Predictive Modeling:</strong> <ul>
                                    <li>
                                        Designed machine learning models that analyzed historical and real-time data to predict mold failures.


                                    </li>
                                    <li>
                                        Focused on balancing recall (capturing true failures) with precision (minimizing false alerts).



                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Real-Time Actionable Insights:</strong> <ul>
                                    <li>
                                        Deployed an intuitive dashboard providing early failure alerts to maintenance teams.


                                    </li>
                                    <li>
                                        Automated alerts ensured timely interventions, reducing downtime and repair costs.


                                    </li>
                                </ul>
                            </li>

                        </ol>
                    </Paragraph>

                </>
            ),
        },
        {
            header: "Our Offerings",
            subHeader:
                "Unlocking Value with Predictive Maintenance: Key Features and Benefits",
            content: (
                <>
                    {" "}
                    <Paragraph>
                        Our predictive maintenance solution is designed to deliver the following value:

                    </Paragraph>

                    <table className="predictive">
                        <tr>
                            <th>Feature</th>
                            <th>Value Delivered</th>
                        </tr>
                        <tr>
                            <td>Failure Prediction</td>
                            <td>Proactive alerts for potential mold failures.</td>
                        </tr>
                        <tr>
                            <td>Root Cause Insights</td>
                            <td>Identification of failure patterns for improved decision-making.</td>

                        </tr>
                        <tr>
                            <td>Real-Time Monitoring</td>
                            <td>Live dashboards with actionable insights.</td>
                        </tr>
                        <tr>
                            <td>Automated Alerts</td>
                            <td>Maintenance alerts with detailed failure probabilities</td>
                        </tr>
                        <tr>
                            <td>Customisable Models</td>
                            <td>Adaptable to specific workflows and evolving production needs.</td>
                        </tr>
                        <tr>
                            <td>Seamless Integration</td>
                            <td>Easy deployment with existing IoT and data systems</td>
                        </tr>
                    </table>
                </>
            ),
        },

        {
            header: "Business Outcomes",
            subHeader: "Transforming Operations: Measurable Impact of Our Predictive Maintenance Solution",
            content: (
                <>
                    <Paragraph>Our solution led to measurable improvements for the client:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>29.8% Reduction in Unplanned Downtime: </strong> Early warnings helped maintenance teams prevent failures before they occurred.

                            </li>
                            <li>
                                <strong>Cost Savings:</strong> Optimized maintenance schedules reduced repair costs and increased labor efficiency.

                            </li>
                            <li>
                                <strong>Increased Machine Utilization:</strong>Predictive insights allowed better production planning, boosting utilization rates.

                            </li>
                            <li>
                                <strong>Improved Operational Reliability:</strong> A shift from reactive to proactive maintenance enhanced overall workflow stability.

                            </li>

                        </ol>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader:
                "A Transformative Shift Toward Proactive Maintenance",
            content: (
                <>

                    <Paragraph>
                        The client described the solution as transformative, enabling their team to move from a “firefighting” approach to a well-planned, proactive maintenance strategy. They experienced increased confidence in production reliability, empowering their workforce and boosting overall efficiency.

                    </Paragraph>
                    <h4>
                        “This solution has redefined how we approach maintenance and operations. The insights are invaluable, and the results speak for themselves.”

                    </h4>
                </>
            ),
        },
    ];

    return (
        <BlogComponent className={className} blogData={predictiveData} title={"Predictive Maintenance"} desc={"Predictive Maintenance for Downtime Reduction in Aluminium Casting"} />


    );
};

export default PredictiveMaintanance;
