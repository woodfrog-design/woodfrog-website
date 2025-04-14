import { FunctionComponent } from "react";
import { Typography } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";
import BlogComponent from "../BlogComponent";
const { Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const SuspectEngline: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const diseasePredictionData = [
        {
            header: "Introduction",
            subHeader: "Revolutionizing Disease Prediction with AI",
            content: (
                <>
                    <Paragraph>
                        Healthcare organizations are increasingly leveraging AI and ML to enable early disease detection, improve patient care, and streamline operations. At Woodfrog, we partnered with a healthcare provider to design an advanced ML-based classification pipeline that predicts diseases based on medical lab reports, X-rays, and other patient data.
                    </Paragraph>
                    <Paragraph>
                        The solution addressed challenges in handling unstructured healthcare data and maintaining compliance with strict data governance regulations such as GDPR. With innovative features like automated PDF extraction, multi-language OCR support, and tailored disease prediction models, this platform exemplifies the power of AI in transforming healthcare.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Overcoming Healthcare Data Complexities",
            content: (
                <>
                    <h4>Problem Statement</h4>
                    <Paragraph>
                        The client needed an ML classification pipeline capable of accurately predicting diseases using diverse healthcare data, including:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li>Medical lab reports in PDF format</li>
                            <li>X-ray images processed via image analysis</li>
                            <li>Handwritten prescriptions in PDF format</li>
                        </ul>
                    </Paragraph>
                    <h4>Challenges Faced</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li><strong>Unstructured Data Formats:</strong> Medical reports and X-rays were in varied, unstructured formats (e.g., PDF, handwritten notes). Data had to be transformed into tabular formats suitable for ML processing.</li>
                            <li><strong>Accuracy in Predictions:</strong> Ensuring high accuracy in disease classification was critical given the sensitivity of healthcare decisions.</li>
                            <li><strong>Compliance with Regulations:</strong> Data contained personally identifiable information (PII), requiring strict adherence to GDPR and other healthcare data governance policies.</li>
                            <li><strong>Scalability and Experimentation:</strong> Building a system that supports both experimental development and production-grade scalability.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "AI-Powered Disease Prediction System",
            content: (
                <>
                    <Paragraph>
                        Our solution consisted of the following high-level components:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li>
                                <strong>Data Extraction and Transformation:</strong>
                                <ul>
                                    <li>Built a pipeline for extracting data from PDFs and converting it into structured JSON format for storage in a data lake.</li>
                                    <li>Used Azure Computer Vision for OCR tasks, supporting multi-language and handwritten data extraction.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Disease Risk Prediction:</strong>
                                <ul>
                                    <li>Developed a diabetes risk prediction model leveraging features like blood glucose levels, lipid profiles, kidney health metrics, and more.</li>
                                    <li>Enabled integration with Kubeflow pipelines for automation and scalability.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>AI/ML Infrastructure:</strong>
                                <ul>
                                    <li>Deployed on Kubernetes for robust, scalable ML pipelines.</li>
                                    <li>Open-source frameworks ensured cost-effectiveness and ease of experimentation for data scientists.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Secure and Compliant Architecture:</strong>
                                <ul>
                                    <li>Ensured GDPR compliance by anonymizing PII and implementing secure data handling protocols.</li>
                                </ul>
                            </li>
                        </ol>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Tailored Healthcare AI/ML Solutions",
            content: (
                <>
                    <Paragraph>
                        Woodfrog’s healthcare ML solution offers:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <table>
                            <tr>
                                <th>Component</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>AI/ML Pipeline Development</td>
                                <td>End-to-end pipelines for disease prediction, data transformation, and risk assessment.</td>
                            </tr>
                            <tr>
                                <td>OCR & Image Processing</td>
                                <td>Tools for extracting and processing medical data from PDFs, handwritten notes, and X-rays.</td>
                            </tr>
                            <tr>
                                <td>Data Security & Governance</td>
                                <td>Ensures compliance with GDPR and other data protection regulations.</td>
                            </tr>
                            <tr>
                                <td>Dashboard Integration</td>
                                <td>Real-time insights for healthcare providers to monitor patient risks and model outcomes.</td>
                            </tr>
                            <tr>
                                <td>Customizable Models</td>
                                <td>Flexible model designs to address specific healthcare use cases and diseases.</td>
                            </tr>
                        </table>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Tangible Improvements in Healthcare",
            content: (
                <>
                    <Paragraph>
                        The implementation delivered significant results:
                    </Paragraph>
                    <table>
                        <tr>
                            <th>Metric</th>
                            <th>Result</th>
                        </tr>
                        <tr>
                            <td>Diabetes Risk Detection Rate</td>
                            <td>92% accuracy, ensuring reliable predictions for proactive healthcare interventions.</td>
                        </tr>
                        <tr>
                            <td>Data Processing Time</td>
                            <td>30 minutes per batch, enabling near real-time insights and quicker patient care.</td>
                        </tr>
                        <tr>
                            <td>Compliance Violations</td>
                            <td>Zero violations, demonstrating strict adherence to industry regulations.</td>
                        </tr>
                    </table>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "Empowering Healthcare with AI",
            content: (
                <>
                    <Paragraph>
                        "The AI/ML classification pipeline has revolutionized how we process medical data. The system not only meets strict compliance standards but also delivers actionable insights for early disease detection. The team’s expertise ensured seamless integration with our existing infrastructure."
                    </Paragraph>
                </>
            ),
        },
    ];



    return (
        <BlogComponent className={className} blogData={diseasePredictionData} title={"Suspect Engine"} desc={" AI-Powered Disease Prediction from Medical Reports"} />


    );
};

export default SuspectEngline;
