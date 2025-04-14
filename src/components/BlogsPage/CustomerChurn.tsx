import { FunctionComponent } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import styles from "../HorizontalTabs.module.css";
import Badge from "../Badge";
import HEADER from "../HEADER";
import PlatformBenefits1 from "../PlatformBenefits1";
import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import HeaderComponet from "../HeaderComponent";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { useTheme } from "../../ThemeContext";
const { Title, Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const CustomerChurn: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const customerChurnData = [
        {
            header: "Introduction",
            subHeader: "Tackling Telecom Churn with Predictive Insights and Personalization",
            content: (
                <>
                    <Paragraph>
                        Customer churn is a persistent challenge in the telecom industry, where intense competition and commoditized services often lead to high attrition rates. Addressing this requires a deep understanding of customer behavior and proactive strategies that cater to individual needs.
                    </Paragraph>
                    <Paragraph>
                        At Woodfrog, we partnered with a leading telecom company to develop a data-driven solution for churn reduction. Using advanced machine learning models, we identified high-risk customers and deployed personalized offers, achieving a 5% reduction in churn rates and improving customer satisfaction.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Overcoming Customer Churn in the Telecom Industry",
            content: (
                <>
                    <h4>Problem Statement</h4>
                    <Paragraph>
                        The telecom industry struggles with customer churn rates as high as 20-30% annually in competitive markets. Retaining customers requires proactive identification of churn risks and personalized interventions.
                    </Paragraph>
                    <h4>Challenges Faced</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li><strong>Lack of Predictive Insights:</strong> Limited visibility into customers likely to churn, making interventions reactive.</li>
                            <li><strong>Generic Retention Offers:</strong> One-size-fits-all strategies lacked effectiveness in addressing customer-specific pain points.</li>
                            <li><strong>Cost of Retention Campaigns:</strong> High campaign costs due to inefficient targeting of customers who wouldn’t churn anyway.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "A Three-Phase Approach to Predict and Prevent Churn",
            content: (
                <>
                    <Paragraph>
                        Woodfrog implemented a three-phase, high-level solution:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Churn Prediction Model:</strong>
                                <ul>
                                    <li>Developed a machine learning model using customer data such as usage patterns, billing history, and complaint logs.</li>
                                    <li>The model identified high-risk customers with 90% accuracy, enabling focused retention efforts.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Personalized Retention Offers:</strong>
                                <ul>
                                    <li>Segmented customers based on predicted churn probability and preferences.</li>
                                    <li>Deployed tailored offers, such as data bundles, discounts, or exclusive services, for maximum impact.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Dashboard for Real-Time Insights:</strong>
                                <ul>
                                    <li>Built an interactive dashboard for the client’s marketing team to track churn predictions, offer performance, and ROI in real-time.</li>
                                </ul>
                            </li>
                        </ol>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Comprehensive Churn Management Solutions",
            content: (
                <>
                    <Paragraph>
                        Woodfrog’s churn management solution offers:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li><strong>Churn Prediction Models:</strong> High-accuracy predictive models to identify at-risk customers early. Continuous model improvement through feedback loops and new data.</li>
                            <li><strong>Customer Segmentation:</strong> Segmentation based on churn drivers like price sensitivity, usage, and engagement patterns.</li>
                            <li><strong>Personalized Offer Deployment:</strong> Customized offers designed to retain specific customer segments, enhancing the customer experience.</li>
                            <li><strong>Visualization Dashboards:</strong> Dynamic dashboards for churn monitoring, ROI analysis, and campaign effectiveness tracking.</li>
                            <li><strong>Cost Optimization:</strong> By focusing on high-risk customers, the solution reduced retention costs by 30% while increasing offer acceptance rates.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Tangible Results from Our Churn Reduction Strategy",
            content: (
                <>
                    <Paragraph>
                        Our solution delivered tangible benefits for the client:
                    </Paragraph>
                    <table>
                        <tr>
                            <th>Metric</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Improvement</th>
                        </tr>
                        <tr>
                            <td>Churn Rate</td>
                            <td>18% annually</td>
                            <td>13% annually</td>
                            <td>5% reduction</td>
                        </tr>
                        <tr>
                            <td>Offer Acceptance Rate</td>
                            <td>20%</td>
                            <td>35%</td>
                            <td>75% increase</td>
                        </tr>
                        <tr>
                            <td>Retention Campaign ROI</td>
                            <td>1.5x</td>
                            <td>2.3x</td>
                            <td>53% improvement</td>
                        </tr>
                        <tr>
                            <td>Retention Cost per Customer</td>
                            <td>$30 per intervention</td>
                            <td>$21 per intervention</td>
                            <td>30% cost reduction</td>
                        </tr>
                    </table>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "How Predictive Insights Transformed Customer Retention",
            content: (
                <>
                    <Paragraph>
                        "This solution has been a game-changer for us. The ability to predict customer churn and deploy personalized retention strategies has enhanced our customer satisfaction and significantly reduced churn-related losses. The user-friendly dashboard has empowered our team to make data-driven decisions in real time."
                    </Paragraph>
                </>
            ),
        },
    ];
    const navigate = useNavigate(); // Initialize navigate hook
    const { isDarkTheme } = useTheme(); // Get the current theme state and toggle function
    const BackLogo = isDarkTheme ? '/back-arrow.svg' : '/back-arrow-light.svg';

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
                            <div className={styles.insurance}>Customer Churn/</div>
                        </div>
                        <div className="mainheader">
                            Reducing Telecom Churn Through Customized Customer Retention Strategies
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
                            {customerChurnData.map((d) => {
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
                                <Link to={`/pdf/${encodeURIComponent('customer-churn')}/`} className="download-pdf-btn" type=""> Download now
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

export default CustomerChurn;
