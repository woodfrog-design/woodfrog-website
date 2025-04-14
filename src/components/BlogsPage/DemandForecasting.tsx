import { FunctionComponent } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import styles from "../HorizontalTabs.module.css";
import Badge from "../Badge";
import HEADER from "../HEADER";
import PlatformBenefits1 from "../PlatformBenefits1";
import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import HeaderComponet from "../HeaderComponent";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
const { Title, Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const DemandForecasting: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const navigate = useNavigate(); // Initialize navigate hook
    const { isDarkTheme } = useTheme(); // Get the current theme state and toggle function
    const BackLogo = isDarkTheme ? '/back-arrow.svg' : '/back-arrow-light.svg';
    const gasTurbineDate = [
        {
            header: "Introduction",
            subHeader:
                "Optimizing Healthcare Supply Chains with Data-Driven Forecasting",
            content: (
                <>
                    <Paragraph>
                        In the healthcare industry, accurate demand forecasting for medical supplies is vital for maintaining efficiency, reducing costs, and ensuring patient satisfaction. Faced with unpredictable demand patterns and logistical challenges, our client—a leading healthcare provider—sought an innovative solution to optimize their supply chain, minimize losses, and improve patient outcomes.

                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Overcoming Inventory Management Hurdles in Healthcare",
            content: (
                <>

                    <Paragraph>Despite their significant role in the healthcare ecosystem, the client encountered critical inventory management challenges:

                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Distance and Logistics:</strong>The average distance from the central warehouse to providers was 150 miles, causing delays in stock replenishment.


                            </li>
                            <li>
                                <strong>Delivery Time Variability:  </strong> Delivery times ranged from 2 to 10 days, depending on urgency and external factors like transportation availability.


                            </li>
                            <li>
                                <strong>Revenue Losses:  </strong> <ul>
                                    <li>
                                        Overstock led to $500,000 annual losses due to tied-up capital, storage costs, and expired products.

                                    </li>
                                    <li>
                                        Stock shortages caused $750,000 in missed opportunities annually, driven by expensive expedited orders and missed sales.


                                    </li>
                                    <li>
                                        Combined revenue losses from both challenges amounted to $1.25 million annually.


                                    </li>
                                </ul>


                            </li>
                            <li>
                                <strong>Transportation Costs: </strong> Annual transportation costs total $50,000, further straining the budget.



                            </li>
                        </ul>
                    </Paragraph>

                </>
            ),
        },

        {
            header: "What Solution We Used",
            subHeader: "A Machine Learning-Powered Approach to Demand Forecasting",
            content: (
                <>
                    <Paragraph>
                        To address these challenges, we implemented a machine learning-powered demand forecasting solution.


                    </Paragraph>
                    <h4>
                        Key Features of the Solution:

                    </h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>High-Level Demand Insights:</strong>Using historical sales data, seasonal patterns, and anomalies, our models forecasted three-month demand accurately.

                            </li>
                            <li>
                                <strong>Advanced Modeling:</strong>
                                Leveraged timeseries forecasting models to capture seasonality, trends, and irregular demand patterns effectively.
                            </li>
                            <li>
                                <strong>Enhanced Integration: </strong>
                                The forecasting system was seamlessly integrated with the client’s existing inventory management platform for real-time updates.

                            </li>
                            <li>
                                <strong>Stakeholder Collaboration: </strong>
                                Developed dashboards for transparent forecasting insights, empowering decision-makers with actionable data.

                            </li>
                        </ul>
                    </Paragraph>

                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader:
                "Tailored Solutions for Complex Supply Chain Optimization",
            content: (
                <>
                    {" "}
                    <Paragraph>
                        We provide tailored solutions for complex supply chain challenges, including:

                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>
                                <strong>Demand Forecasting Systems:</strong>Machine learning models to predict demand with precision.
                                and anomalies, our models forecasted three-month demand accurately.

                            </li>
                            <li>
                                <strong>Real-Time Inventory Optimization:</strong>
                                Solutions that minimize overstocking and shortages.

                            </li>
                            <li>
                                <strong>Operational Efficiency Tools: </strong>
                                Dashboards and analytics platforms for decision-making.


                            </li>
                            <li>
                                <strong>Cost Reduction Strategies:</strong>
                                Recommendations to lower transportation and storage costs.

                            </li>
                        </ul>
                    </Paragraph>

                </>
            ),
        },

        {
            header: "Business Outcomes",
            subHeader: "Transforming Operations with Measurable Results",
            content: (
                <>
                    <Paragraph>The deployment of our solution generated transformative results:
                    </Paragraph>
                    <table className="predictive">
                        <tr>
                            <th>Metric</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Improvement</th>
                        </tr>
                        <tr>
                            <td>Annual Revenue Losses</td>
                            <td>$1.25M</td>
                            <td>$1M</td>
                            <td>$250,000 Savings</td>

                        </tr>
                        <tr>
                            <td>Stock Shortages</td>
                            <td>$750,000</td>
                            <td>$600,000</td>
                            <td>20% Reduction</td>

                        </tr>
                        <tr>
                            <td>Overstock Losses</td>
                            <td>$500,000</td>
                            <td>$400,000</td>
                            <td>20% Reduction</td>

                        </tr>
                        <tr>
                            <td>Failure Prediction</td>
                            <td>Proactive</td>
                            <td>Proactive</td>
                            <td>Proactive</td>

                        </tr>
                        <tr>
                            <td>Transportation Costs</td>
                            <td>$50,000</td>
                            <td>$42,500</td>
                            <td>15% Savings</td>

                        </tr>
                        <tr>
                            <td>Delivery Time</td>
                            <td>2–10 days</td>
                            <td>2–5 days</td>
                            <td>Faster replenishment</td>

                        </tr>

                    </table>
                    <Paragraph>
                        These enhancements not only streamlined the client’s supply chain but also ensured optimal inventory levels and improved patient care.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader:
                "Empowering Data-Driven Decision-Making for Better Healthcare",
            content: (
                <>

                    <Paragraph>
                        "The dual challenge of overstocking and stockouts was a constant drain on our resources. With the accurate predictions provided by the demand forecasting model, we’ve achieved a 30% decrease in excess inventory while ensuring critical supplies are always available."

                    </Paragraph>
                    <h4>
                        "The collaborative approach by the team ensured a solution tailored to our unique needs, empowering us to make data-driven decisions."
                    </h4>
                </>
            ),
        },
    ];

    return (
        <>
        <div className={styles.blogPage}>
            <HeaderComponet />
            <div className={styles.horizontalTabsParent}>
                <div className={[styles.horizontalTabs, className].join(" ")}>
                    <div className={styles.frameParent}>
                        <div className={styles.frameGroup}>
                            <img className={styles.frameIcon} alt="" src={BackLogo}
                                onClick={() => navigate(-1)} // Navigate back on click
                                style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                            />
                            <div className={styles.insurance}>Demand Forecasting/</div>
                        </div>
                        <div className="mainheader">
                            Enhancing Inventory Management in Healthcare Through Advanced Demand Forecasting
                        </div>
                    </div>
                    <div className={styles.badgeParent}>
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="unset"
                            text="Artifical Intelligence"
                            propBackgroundColor="#c1f8d7"
                            propColor="#037a48"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Machine Learning"
                            propBackgroundColor="#f0f9ff"
                            propColor="#026aa2"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Deep Learning"
                            propBackgroundColor="#fffaeb"
                            propColor="#b64708"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Natural Language Processing"
                            propBackgroundColor="#f4f3ff"
                            propColor="#5925dc"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Computer Vision"
                            propBackgroundColor="#fdf2fa"
                            propColor="#c11574"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Cloud"
                            propBackgroundColor="#fdf2fa"
                            propColor="#c11574"
                            textTextDecoration="unset"
                        />
                    </div>
                    <div className={styles.generativeAiAContainer}>
                        <div className="container py-4">
                            {/* Problem Statement Section */}
                            {gasTurbineDate.map((d) => {
                                return (
                                    <>
                                        <h2 className="subtitle text-start mt-2 mb-3">
                                            {d.header}
                                        </h2>
                                        <hr />
                                        <div className="row">
                                            {/* Client's Situation */}
                                            <div className="col-md-4 mb-3">
                                                <h3 className="subheader">{d.subHeader}</h3>
                                            </div>
                                            <div className="col-md-8">
                                                <Paragraph className="paragraph">{d.content}</Paragraph>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                        <div className="outcome-black-box" id="black-box-section">
                            <div className="flex-body">
                                <h4>Access the PDF version of this case study for convenient reference and easy sharing</h4>
                                <Link to={`/pdf/${encodeURIComponent('demand-forecasting')}/`} className="download-pdf-btn" type=""> Download now
                                    <img alt="Cutting Downtime in half with Deep Neural Networks" decoding="async" src="https://fractal.ai/wp-content/themes/fractal_new/images/icons/download-icon.svg" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.platformBenefits}>
                    <PlatformBenefits1 title="Recommended Articles" padding="0px" />
                </div>
            </div>
        </div>
        <Footer />
    </>
    );
};

export default DemandForecasting;
