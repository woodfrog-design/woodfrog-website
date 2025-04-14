import { FunctionComponent } from "react";
import styles from "../HorizontalTabs.module.css";
import Badge from "../Badge";
import HEADER from "../HEADER";
import PlatformBenefits1 from "../PlatformBenefits1";
import "./Common.css"
import HeaderComponet from "../HeaderComponent";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

export type HorizontalTabsType = {
    className?: string;
};

const SmartManufacturing: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
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
                            <div className={styles.insurance}>AI-Powered Manufacturing/</div>
                        </div>
                        <div className={styles.theEvolutionAnd}>
                            Smart Manufacturing: An AI-Powered Production
                        </div>
                    </div>
                    <div className={styles.badgeParent}>
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="unset"
                            text="Artificial Intelligence"
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
                            text="Cloud"
                            propBackgroundColor="#fdf2fa"
                            propColor="#c11574"
                            textTextDecoration="unset"
                        />
                    </div>
                    <div className={styles.generativeAiAContainer}>
                        <h2 className="subheader" >1. Introduction</h2>

                        <h3 className="subsubheader">1.1 Who We Are</h3>
                        <p className="paragraph">
                            At WoodFrog, we specialize in delivering AI-driven solutions tailored for the manufacturing industry,
                            where precision, efficiency, and reliability are critical. Our team leverages cutting-edge state-of-the-art
                            artificial intelligence techniques to address real-world production challenges, from predictive maintenance
                            to quality control and workflow optimization. Our approach is rooted in a deep understanding of manufacturing
                            operations, allowing us to provide intelligent, data-driven solutions that align seamlessly with industry demands.
                        </p>

                        <h3 className="subsubheader">1.2 What We Offer</h3>
                        <p className="paragraph">
                            Our AI solutions are designed to enhance productivity, reduce costs, and maximize operational efficiency.
                            Specifically, our offerings include:
                        </p>
                        <ul className="list">
                            <li>Predictive Maintenance: Using real-time sensor data and historical trends, our predictive maintenance models identify potential equipment failures, reducing unplanned downtime by as much as 30%.</li>
                            <li>Automated Quality Control: Leveraging advanced defect detection models, we’ve improved product quality by up to 18%, reducing rework and enhancing product reliability.</li>
                            <li>Process Optimization: Our optimization models streamline workflows and machine settings, leading to higher throughput and energy efficiency, with energy consumption reductions of up to 15%.</li>
                        </ul>

                        <h3 className="subsubheader">1.3 What We Need from You</h3>
                        <p className="paragraph">
                            Our solutions are most effective when based on a deep understanding of your unique operational context.
                            We will need access to relevant production data, including historical and real-time sensor data, as well as
                            insights from your team on key performance challenges. This collaboration enables us to align our models
                            precisely with your processes, ensuring measurable and impactful outcomes.
                        </p>

                        <h3 className="subsubheader">1.4 What You Will Gain</h3>
                        <p className="paragraph">
                            By partnering with WoodFrog, you’ll gain access to actionable intelligence tailored to your specific production
                            environment. Our models are designed to evolve with your data, continuously learning to maintain and improve
                            performance over time. Expect immediate benefits like reduced downtime and increased productivity, as well
                            as long-term gains in operational resilience and cost savings.
                        </p>

                        <h3 className="subsubheader">1.5 Why Us?</h3>
                        <p className="paragraph">
                            WoodFrog offers a focused, results-driven approach that goes beyond deploying technology. Our team’s technical
                            expertise and deep industry knowledge allow us to deliver solutions that integrate smoothly into your existing systems.
                            We work closely with you from project initiation to deployment, optimizing our models to adapt to changing conditions
                            and consistently deliver ROI. Our commitment is to build a resilient, future-ready production environment for your
                            business, leveraging AI to transform your data into a strategic asset.
                        </p>

                        <h2 className="subheader">2. Predictive Maintenance for Downtime Reduction in Aluminum Casting</h2>

                        <h3 className="subsubheader">2.1 Problem Statement</h3>
                        <p className="paragraph">
                            Frequent mold failures in the aluminum casting process were causing significant operational downtime and financial
                            losses for our client. The primary challenge was to predict these failures in advance, allowing the client to take
                            preventive actions that would reduce unplanned downtime, improve efficiency, and minimize associated costs.
                        </p>

                        <h3 className="subsubheader">2.2 Auditing the Client Workflow Setup</h3>
                        <p className="paragraph">
                            To design an effective predictive maintenance solution, we began by conducting a thorough audit of the client’s
                            aluminum casting workflow. This audit aimed to identify the primary factors contributing to mold failures, data
                            collection points, and potential areas where deep learning models could add value.
                        </p>

                        <h4 className="subsubheader">2.2.1 Workflow Mapping</h4>
                        <p className="paragraph">
                            We mapped out the entire casting workflow, detailing each stage from raw material input to final product inspection.
                            Special focus was placed on understanding the machinery involved in the casting process, specifically the mold machines,
                            their operational settings, and historical maintenance records.
                        </p>

                        <h4 className="subsubheader">2.2.2 Stakeholder Discussions</h4>
                        <p className="paragraph">
                            In collaboration with production managers, engineers, and quality control teams, we gathered insights into frequent
                            production challenges, common causes of mold failure, and downtime patterns. These discussions helped pinpoint key
                            operational metrics relevant to predicting mold performance and failure.
                        </p>

                        <h4 className="subsubheader">2.2.3 Data Collection Points</h4>
                        <p className="paragraph">
                            Our audit highlighted critical data points, including:
                        </p>
                        <ul className="list">
                            <li>Sensor data from mold machines (temperature, pressure, and position readings)</li>
                            <li>Historical maintenance logs and breakdown records</li>
                            <li>Production quality inspection reports</li>
                            <li>Real-time operational parameters (e.g., cycle times, pushout speeds)</li>
                        </ul>

                        <h4 className="subsubheader">2.2.4 Challenges Identified</h4>
                        <p className="paragraph">
                            Several challenges were identified, including a lack of continuous data logging in certain stages, data inconsistencies,
                            and class imbalance due to infrequent failure events. These insights informed our data preprocessing and feature
                            engineering steps, allowing us to ensure robust data quality for the predictive model.
                        </p>

                        <h3 className="subsubheader">2.3 Data Analysis</h3>
                        <p className="paragraph">
                            After auditing the client’s workflow, we conducted a deep dive into their dataset to uncover patterns and relationships
                            within their operational data. This stage was crucial for identifying hidden insights that could assist in predicting mold
                            failures and refining maintenance schedules, providing a clearer understanding of the data’s predictive potential.
                        </p>

                        <h4 className="subsubheader">2.3.1 Data Overview</h4>
                        <p className="paragraph">
                            The dataset comprised nearly 1 million records of sensor readings and operational metrics from various stages of the aluminum
                            casting process. Each record served as a snapshot of critical parameters, capturing metrics such as pushout command position,
                            pushout speed, and mold lowering speed.
                        </p>

                        <h4 className="subsubheader">2.3.2 Data Processing and Feature Engineering</h4>
                        <p className="paragraph">
                            To translate raw sensor data into actionable predictive insights, we focused on engineering specific features that could capture
                            signals of inactivity, abnormal pressure, and position irregularities within the pushout and mold-lowering systems.
                        </p>

                        <h3 className="subsubheader">2.4 Model Selection</h3>
                        <p className="paragraph">
                            For predicting downtime in aluminum casting, model selection was guided by the unique characteristics of our problem:
                            handling time-series sensor data, addressing class imbalance, and ensuring interpretability for actionable insights.
                        </p>

                        <h3 className="subsubheader">2.5 Simulation Setup</h3>
                        <p className="paragraph">
                            To evaluate and fine-tune our selected models, we set up simulations using the preprocessed dataset with engineered downtime
                            labels. Our primary goal was to achieve a high recall rate for downtime events while maintaining precision, as misclassifying
                            downtime could lead to unnecessary maintenance or production interruptions.
                        </p>

                        <h3 className="subsubheader">2.6 Model Evaluation and Results</h3>
                        <p className="paragraph">
                            The evaluation phase focused on determining which model provided the best balance of precision and recall, enabling effective
                            downtime prediction without excessive false positives. Each model—Random Forest, LSTM, and Hybrid CNN-LSTM—was evaluated on
                            the test set using key metrics such as accuracy, recall, precision, F1-score, and ROC-AUC.
                        </p>

                        <h2 className="subheader">3. Smart Monitoring: Machine Learning for Early Fault Detection in Gas Turbines</h2>

                        <h3 className="subsubheader">3.1 Problem Statement</h3>
                        <p className="paragraph">
                            Our client, a global energy provider, operates a fleet of gas turbines across multiple locations. These turbines, essential
                            for power generation, are equipped with sensors that measure critical operational parameters such as rotational speed (RPM),
                            exhaust temperature, and pressure ratios. The challenge was to develop a system that would detect anomalies early enough to
                            prevent failures, enabling predictive maintenance.
                        </p>

                        <h3 className="subsubheader">3.2 Workflow Mapping</h3>
                        <p className="paragraph">
                            The following workflow was developed to systematically address the client’s need for predictive maintenance and anomaly detection
                            for gas turbines. This included data collection, preprocessing, model selection, real-time monitoring, and continuous improvement.
                        </p>

                        <h4 className="subsubheader">3.2.1 Data Collection and Integration</h4>
                        <p className="paragraph">
                            The turbines were equipped with high-frequency sensors to capture critical operational parameters like vibration, RPM, temperature,
                            and pressure, with a data collection rate between 100-500 Hz.
                        </p>

                        <h4 className="subsubheader">3.2.2 Data Preprocessing</h4>
                        <p className="paragraph">
                            Outlier detection and noise filtering were applied to remove environmental noise using Z-score analysis and low-pass filters.
                            Feature engineering techniques like Fourier Transform (FFT) and Wavelet Transforms were used to extract key operational patterns.
                        </p>

                        <h3 className="subsubheader">3.3 Data Analysis</h3>
                        <p className="paragraph">
                            The data analysis process involved exploring over 1.5 terabytes of historical sensor data to uncover patterns that could be used
                            for anomaly detection models.
                        </p>

                        <h4 className="subsubheader">3.3.1 Feature Engineering</h4>
                        <p className="paragraph">
                            Key statistical features (mean, variance, kurtosis) were extracted, along with Fast Fourier Transform (FFT) for vibration data,
                            highlighting mechanical resonance and rotor imbalance. Lag features were created to capture temporal dependencies for time-series models.
                        </p>

                        <h3 className="subsubheader">3.4 Model Selection</h3>
                        <p className="paragraph">
                            Several models were considered for anomaly detection in turbine operations, including Autoencoders, LSTM networks, and Isolation Forests.
                        </p>

                        <h3 className="subsubheader">3.5 Model Evaluation and Results</h3>
                        <p className="paragraph">
                            After training and validation, a comprehensive evaluation was conducted to ensure the models met the client’s requirements for real-time
                            anomaly detection. Metrics such as accuracy, precision, recall, F1-score, and processing latency were evaluated.
                        </p>

                        <h3 className="subsubheader">3.6 Simulation Setup</h3>
                        <p className="paragraph">
                            To ensure robustness, we developed a simulation framework that mimicked real-world turbine operations under varying conditions, testing
                            the models' ability to detect early-stage anomalies.
                        </p>

                        <h2 className="subheader">4. Business Outcomes</h2>
                        <p className="paragraph">
                            The deployment of machine learning-based anomaly detection resulted in significant improvements in turbine operations, including a 15%
                            reduction in unplanned downtime within the first six months, a 10% decrease in maintenance costs, and increased operational efficiency.
                        </p>
                    </div>
                    <div className="outcome-black-box" id="black-box-section">
                        <div className="flex-body">
                            <h4>Access the PDF version of this case study for convenient reference and easy sharing</h4>
                            <Link to={`/pdf/${encodeURIComponent('smart-manufacturing')}/`} className="download-pdf-btn" type=""> Download now
                                <img alt="Cutting Downtime in half with Deep Neural Networks" decoding="async" src="https://fractal.ai/wp-content/themes/fractal_new/images/icons/download-icon.svg" />
                            </Link>
                        </div>
                    </div>
                    {/* <div className={styles.generativeAiAContainer}>
                        <h2>1. Introduction</h2>
                        <h3 className="subsubheader">1.1 Who We Are</h3>
                        <p className="paragraph">
                            At WoodFrog, we specialize in delivering AI-driven solutions tailored for the manufacturing industry, where precision, efficiency, and reliability are critical. Our team leverages cutting-edge AI techniques to address real-world production challenges, from predictive maintenance to quality control and workflow optimization.
                        </p>

                        <h3 className="subheader">1.2 What We Offer</h3>
                        <p className="paragraph">
                            Our AI solutions are designed to enhance productivity, reduce costs, and maximize operational efficiency. Specifically, our offerings include:
                        </p>
                        <ul className="list">
                            <li>Predictive Maintenance: Reducing unplanned downtime by up to 30% using real-time sensor data and historical trends.</li>
                            <li>Automated Quality Control: Improved product quality by up to 18%, reducing rework and enhancing product reliability.</li>
                            <li>Process Optimization: Energy consumption reductions of up to 15% through optimized workflows and machine settings.</li>
                        </ul>

                        <h3 className="subheader">1.3 What We Need from You</h3>
                        <p className="paragraph">
                            To ensure success, we require access to relevant production data, including historical and real-time sensor data, along with insights from your team regarding performance challenges. This helps us align our models precisely with your processes.
                        </p>

                        <h3 className="subheader">1.4 What You Will Gain</h3>
                        <p className="paragraph">
                            You will gain actionable intelligence tailored to your production environment, resulting in reduced downtime, increased productivity, and long-term operational resilience and cost savings.
                        </p>

                        <h3 className="subheader">1.5 Why Us?</h3>
                        <p className="paragraph">
                            WoodFrog offers a results-driven approach with a focus on technical expertise and deep industry knowledge. Our solutions integrate smoothly with your existing systems, delivering tangible ROI through AI-powered predictive maintenance and optimization.
                        </p>

                        <h2>2. Predictive Maintenance for Downtime Reduction in Aluminum Casting</h2>

                        <h3 className="subheader">2.1 Problem Statement</h3>
                        <p className="paragraph">
                            Frequent mold failures in the aluminum casting process were causing significant operational downtime and financial losses. Our goal was to develop a predictive maintenance solution leveraging machine learning models to mitigate these issues.
                        </p>

                        <h3 className="subheader">2.2 Auditing the Client Workflow Setup</h3>
                        <p className="paragraph">
                            We conducted a thorough audit of the client’s aluminum casting workflow to identify the main factors contributing to mold failures and define critical data collection points.
                        </p>

                        <h4 className="subheader">2.2.1 Workflow Mapping</h4>
                        <p className="paragraph">
                            We mapped the entire casting process, focusing on machinery operations, historical maintenance records, and sensor data relevant to mold performance.
                        </p>

                        <h4 className="subheader">2.2.2 Stakeholder Discussions</h4>
                        <p className="paragraph">
                            Discussions with production managers, engineers, and quality control teams helped identify operational metrics crucial for predicting mold failures.
                        </p>

                        <h4 className="subheader">2.2.3 Data Collection Points</h4>
                        <p className="paragraph">
                            Critical data points included sensor readings from mold machines, historical logs, and production quality inspection reports.
                        </p>

                        <h3 className="subheader">2.3 Data Analysis and Feature Engineering</h3>
                        <p className="paragraph">
                            After collecting the data, we performed exploratory data analysis and feature engineering to uncover patterns related to downtime and mold failures.
                        </p>

                        <h3 className="subheader">2.4 Model Selection</h3>
                        <p className="paragraph">
                            We experimented with several models, including Random Forest, LSTM networks, and a hybrid CNN-LSTM model. The CNN-LSTM model performed best in predicting downtime, offering a balance between recall and precision.
                        </p>

                        <h3 className="subheader">2.5 Impact Analysis and Deployment</h3>
                        <p className="paragraph">
                            Our solution reduced unplanned downtime by 29.8%, resulting in cost savings and improved resource allocation. Real-time data processing and automated alerts enabled proactive interventions, improving operational efficiency.
                        </p>

                        <h3 className="subheader">2.6 The Client’s Perspective</h3>
                        <p className="paragraph">
                            The client described the solution as transformative, noting significant improvements in operational control, predictability, and efficiency. Predictive maintenance helped them shift from a reactive to a proactive maintenance strategy.
                        </p>
                    </div> */}
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

export default SmartManufacturing;
