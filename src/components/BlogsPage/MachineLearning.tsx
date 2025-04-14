import { FunctionComponent } from "react";
import styles from "../HorizontalTabs.module.css";
import Badge from "../Badge";
import HEADER from "../HEADER";
import PlatformBenefits1 from "../PlatformBenefits1";
import "./Common.css"
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
export type HorizontalTabsType = {
    className?: string;
};

const MachineLearning: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const navigate = useNavigate(); // Initialize navigate hook
    const { isDarkTheme } = useTheme(); // Get the current theme state and toggle function
    const BackLogo = isDarkTheme ? '/back-arrow.svg' : '/back-arrow-light.svg';
    return (
        <div className={styles.blogPage}>
            <HEADER tagline={true} />
            <div className={styles.horizontalTabsParent}>
                <div className={[styles.horizontalTabs, className].join(" ")}>
                    <div className={styles.frameParent}>
                        <div className={styles.frameGroup}>
                            <img className={styles.frameIcon} alt="" src={BackLogo}
                                onClick={() => navigate(-1)} // Navigate back on click
                                style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                            />
                            <div className={styles.insurance}>Machine Learning/</div>
                        </div>
                        <div className="mainheader">
                            Smart Monitoring: Machine Learning for Early Fault Detection
                            in Gas Turbines
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
                        <h2 className="subheader">1. Problem Statement</h2>
                        <p className="paragraph">
                            Our client, a global energy provider, operates a fleet of gas turbines across multiple locations. These turbines, essential for power generation, are equipped with sensors that measure critical operational parameters such as: Rotational speed (RPM), Exhaust temperature, Pressure ratios, Vibration signatures, etc.
                        </p>
                        <p className="paragraph">
                            Despite the vast amount of sensor data available, the client faced the challenge of translating this data into actionable insights for early anomaly detection. The existing threshold-based systems were reactive, often triggering alarms only after operational anomalies had escalated into significant failures. These late-stage alerts resulted in costly unplanned downtime and emergency repairs.
                        </p>
                        <ul className="list">
                            <li>Data Overload: The turbines generated high-frequency data streams at a rate of 100-500 Hz, resulting in terabytes of sensor data per turbine, which was difficult to manage effectively.</li>
                            <li>Delayed Response: The reliance on threshold-based alerts meant that many faults were detected too late, leading to reactive rather than preventive maintenance.</li>
                            <li>Environmental Variations: The turbines operated in diverse environments, complicating anomaly detection based on location-specific factors.</li>
                        </ul>

                        <h2 className="subheader">2. Workflow Mapping</h2>

                        <h3 className="subsubheader">2.1 Data Collection and Integration</h3>
                        <p className="paragraph">
                            The turbines were equipped with high-frequency sensors to capture operational parameters like vibration, RPM, temperature, and pressure. Data preprocessing and integration were handled locally, allowing real-time data transfer to a central warehouse.
                        </p>

                        <h3 className="subsubheader">2.2 Data Preprocessing</h3>
                        <p className="paragraph">
                            Outlier Detection and Noise Filtering were applied to remove environmental noise using Z-score analysis and low-pass filters. Feature engineering techniques like Fourier Transform and Wavelet Transforms were applied to extract key operational patterns.
                        </p>

                        <h3 className="subsubheader">2.3 Modeling and Anomaly Detection</h3>
                        <ul className="list">
                            <li>Autoencoders: Detect anomalies by learning compressed representations of normal operational data and identifying deviations during abnormal operations.</li>
                            <li>LSTM Networks: Capture sequential data patterns and forecast sensor values, flagging anomalies based on deviations from predicted values.</li>
                            <li>Isolation Forests: Identify outliers in high-dimensional sensor data, isolating turbine-specific anomalies.</li>
                        </ul>

                        <h3 className="subsubheader">2.4 Real-Time Monitoring and Alerts</h3>
                        <p className="paragraph">
                            Anomaly detection models processed data in real-time, generating alerts via a custom dashboard with key metrics such as anomaly scores and root-cause suggestions.
                        </p>

                        <h3 className="subsubheader">2.5 Model Retraining and Continuous Improvement</h3>
                        <p className="paragraph">
                            The system includes a feedback loop to integrate operator feedback on false positives and new faults, improving predictive accuracy over time.
                        </p>

                        <h2 className="subheader">3. Data Analysis</h2>

                        <h3 className="subsubheader">3.1 Data Exploration</h3>
                        <p className="paragraph">
                            1.5 terabytes of historical sensor data over two years were analyzed to identify patterns for anomaly detection models.
                        </p>

                        <h3 className="subsubheader">3.2 Data Cleaning and Preprocessing</h3>
                        <p className="paragraph">
                            Z-score analysis was used to detect and filter outliers, and sensor data was normalized using Min-Max scaling.
                        </p>

                        <h3 className="subsubheader">3.3 Feature Engineering</h3>
                        <p className="paragraph">
                            Statistical features were extracted, along with Fast Fourier Transform (FFT) for vibration data, highlighting mechanical resonance and rotor imbalance.
                        </p>

                        <h3 className="subsubheader">3.4 Synthetic Data Generation</h3>
                        <p className="paragraph">
                            Synthetic anomalies were generated based on historical fault patterns, simulating various environmental conditions to ensure generalization across different turbine sites.
                        </p>

                        <h3 className="subsubheader">3.5 Correlation and Multivariate Analysis</h3>
                        <p className="paragraph">
                            Correlation analysis identified dependencies between metrics, while PCA reduced dimensionality, focusing models on relevant sensor inputs.
                        </p>

                        <h3 className="subsubheader">3.6 Model Validation and Test Set Creation</h3>
                        <p className="paragraph">
                            The dataset was split 80% for training and 20% for testing, with metrics like Precision, Recall, and F1-score used to evaluate model performance.
                        </p>

                        <h2 className="subheader">4. Model Selection</h2>

                        <h3 className="subsubheader">4.1 Autoencoders</h3>
                        <p className="paragraph">
                            Autoencoders learned compressed representations of sensor data, flagging deviations during abnormal operations.
                        </p>

                        <h3 className="subsubheader">4.2 LSTM Networks</h3>
                        <p className="paragraph">
                            LSTM models forecasted sensor readings based on past trends, identifying performance drifts and emerging faults in real-time.
                        </p>

                        <h3 className="subsubheader">4.3 Isolation Forests</h3>
                        <p className="paragraph">
                            Isolation Forests isolated outliers in high-dimensional data, detecting rare anomalies.
                        </p>

                        <h3 className="subsubheader">4.4 Model Training Process</h3>
                        <p className="paragraph">
                            The training process used 80% historical data, with Adam optimizer for training and MSE as the loss function.
                        </p>

                        <h3 className="subsubheader">4.5 Hyperparameter Tuning</h3>
                        <p className="paragraph">
                            Grid search was applied for hyperparameter optimization, including the number of hidden layers, dropout rates, and reconstruction thresholds.
                        </p>

                        <h3 className="subsubheader">4.6 Performance Metrics</h3>
                        <p className="paragraph">
                            Precision, Recall, F1-Score, and AUC were used as performance metrics, with the autoencoder achieving an AUC of 0.96 and LSTM with an RMSE of 0.05.
                        </p>

                        <h2 className="subheader">5. Model Evaluation</h2>

                        <h3 className="subsubheader">5.1 Performance Metrics</h3>
                        <p className="paragraph">
                            Evaluation on 20% of the dataset showed strong results for Precision, Recall, and F1-score.
                        </p>

                        <h3 className="subsubheader">5.2 Real-Time Performance</h3>
                        <p className="paragraph">
                            Real-time processing latency remained under 150 milliseconds, supporting anomaly detection across up to 50 turbines.
                        </p>

                        <h3 className="subsubheader">5.3 False Positives and Negatives</h3>
                        <p className="paragraph">
                            The system balanced false positives (2%) and false negatives (3%) to minimize unnecessary alerts.
                        </p>

                        <h2 className="subheader">6. Simulation Setup</h2>

                        <h3 className="subsubheader">6.1 Test Scenarios</h3>
                        <p className="paragraph">
                            Test scenarios replicated real-world conditions, including normal operations and fault conditions.
                        </p>

                        <h3 className="subsubheader">6.2 Synthetic Data Integration</h3>
                        <p className="paragraph">
                            Synthetic data was generated to model rare faults and environmental variability, ensuring robustness across different operating conditions.
                        </p>

                        <h3 className="subsubheader">6.3 Performance Testing</h3>
                        <p className="paragraph">
                            Stress tests verified real-time performance, even with noisy and degraded sensor data.
                        </p>

                        <h3 className="subsubheader">6.4 Scalability and Distributed Processing</h3>
                        <p className="paragraph">
                            The system's distributed architecture enabled efficient scaling as the number of turbines increased.
                        </p>

                        <h3 className="subsubheader">6.5 Feedback Loop and Model Refinement</h3>
                        <p className="paragraph">
                            A feedback loop was incorporated to refine the model based on operator reviews, improving prediction accuracy over time.
                        </p>

                        <h2 className="subheader">7. Business Outcomes</h2>
                        <p className="paragraph">
                            The machine learning-based anomaly detection system led to a 15% reduction in unplanned downtime and a 10% decrease in maintenance costs. Real-time monitoring enhanced decision-making, operational efficiency, and future-proofed scalability across distributed turbine networks.
                        </p>
                    </div>
                    {/* <div className={styles.generativeAiAContainer}>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>
                                    {" "}
                                    Problem Statement
                                </span>
                            </span>
                        </p>
                        <p className={styles.blankLine}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    Our client, a global energy provider, operates a fleet of gas turbines across multiple locations.

                                    These turbines, essential for power generation, are equipped with sensors that measure criti-
                                    cal operational parameters such as: Rotational speed (RPM), Exhaust temperature, Pressure

                                    ratios, Vibration signatures, etc. Despite the vast amount of sensor data available, the client

                                    faced the challenge of translating this data into actionable insights for early anomaly detec-
                                    tion. The existing threshold-based systems were reactive, often triggering alarms only after

                                    operational anomalies had escalated into significant failures. These late-stage alerts resulted in
                                    costly unplanned downtime and emergency repairs.
                                </span>
                            </span>
                            <p className={styles.blankLine}>
                                <span>
                                    <span>&nbsp;</span>
                                </span>
                            </p>
                            <span>
                                Challenges Identified:

                            </span>
                            <p className={styles.blankLine}>
                                <span>
                                    <span>&nbsp;</span>
                                </span>
                            </p>
                            <span className={styles.subtext}>
                                Data Overload: The turbines generated high-frequency data streams at a rate of 100- 500 Hz, resulting in terabytes of sensor data per turbine, which was difficult to manage effectively.
                                 Delayed Response: The reliance on threshold-based alerts meant that many faults were detected too late, leading to reactive rather than preventive maintenance.
                                 Environmental Variations: The turbines operated in diverse environments (ranging from extreme desert heat to humid climates), complicating the detection of anomalies that might vary based on location-specific factors.
                                To address these issues, we developed and deployed a machine learning-based anomaly detection system. This system uses unsupervised learning algorithms and time-series forecasting models to detect early deviations from normal operational patterns, enabling the client to transition from reactive to predictive maintenance. This solution ensures that failures are identified before they escalate, reducing downtime and maintenance costs across all turbine sites.

                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span> Data Collection and Integration</span>
                            </span>
                        </p>
                        <p className={styles.blankLine}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    The turbines were equipped with high-frequency sensors to capture critical operational pa rameters like vibration, RPM, temperature, and pressure, with a data collection rate be tween 100-500 Hz. Data preprocessing and integration were handled locally through NVIDIA
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    Jetson devices using edge computing, significantly reducing network load and allowing near real-time data transfer to a central warehouse.

                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span> Real-World Applications</span>
                            </span>
                        </p>
                        <p className={styles.blankLine}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    Gen AI is reshaping industries by offering innovative solutions,
                                    including:
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Content Creation: Automating blog writing, social media posts,
                                    and marketing materials.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span className={styles.subtext}>
                                <span>- Design: Generating unique images, logos, and videos.</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Healthcare: Assisting in drug discovery by generating potential
                                    molecular compounds.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Customer Service: Powering chatbots that can handle more
                                    complex, human-like conversations.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span> Challenges and Ethical Considerations</span>
                            </span>
                        </p>
                        <p className={styles.blankLine}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>Despite its potential, Gen AI comes with challenges:</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Misinformation: The ease of creating fake but convincing content
                                    raises concerns about deepfakes and misleading information.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Bias: AI models trained on biased data can replicate and amplify
                                    those biases.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    - Intellectual Property: The line between inspiration and
                                    infringement is often blurred when AI generates content based on
                                    existing works.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span> The Future of Generative AI</span>
                            </span>
                        </p>
                        <p className={styles.blankLine}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    As the technology evolves, generative AI is likely to become even
                                    more integrated into creative and professional workflows. Its
                                    ability to augment human creativity and automate complex tasks
                                    makes it a promising tool, but with the power it holds,
                                    responsible development and ethical guidelines are crucial.
                                </span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span>&nbsp;</span>
                            </span>
                        </p>
                        <p className={styles.generativeAiAGameChanger}>
                            <span>
                                <span className={styles.subtext}>
                                    In conclusion, Gen AI is a transformative technology that holds
                                    vast potential for various industries. However, its development
                                    must be carefully managed to address ethical and societal
                                    concerns.
                                </span>
                            </span>
                        </p>
                    </div> */}
                </div>
                <div className={styles.platformBenefits}>

                    <PlatformBenefits1 title="Recommended Articles" padding="0px" />
                </div>
            </div>

        </div>

    );
};

export default MachineLearning;
