import { FunctionComponent } from "react";
import { Layout, Menu, Typography, Button } from "antd";

import "./Common.css";
import "bootstrap/dist/css/bootstrap.css";

import BlogComponent from "../BlogComponent";
const { Title, Paragraph } = Typography;
export type HorizontalTabsType = {
    className?: string;
};

const RagBaseQA: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const ragBasedQAData = [
        {
            header: "Introduction",
            subHeader: "Harnessing the Power of RAG for Intelligent Q&A",
            content: (
                <>
                    <Paragraph>
                        In the era of advanced AI solutions, providing accurate and contextually relevant answers to complex user queries remains a challenge. Retrieval-Augmented Generation (RAG) offers an innovative approach by combining the power of large language models with retrieval mechanisms to leverage structured and unstructured knowledge bases.
                    </Paragraph>
                    <Paragraph>
                        This blog explores how we developed a robust RAG-based Question-and-Answer (Q&A) system to address this challenge effectively.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Problem Statement and Challenges",
            subHeader: "Overcoming Barriers to Accurate and Scalable Q&A",
            content: (
                <>
                    <h4>Problem Statement</h4>
                    <Paragraph>
                        Develop a Q&A bot capable of delivering precise and contextually accurate responses by integrating a retrieval mechanism with a large language model.
                    </Paragraph>
                    <h4>Challenges</h4>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li><strong>Data Complexity:</strong> Handling unstructured and structured documents, and ensuring efficient chunking and embedding for accurate information retrieval.</li>
                            <li><strong>Performance Requirements:</strong> Ensuring high accuracy and relevance in responses.</li>
                            <li><strong>Security & Personalization:</strong> Implementing identity-based access to ensure data privacy and user-specific context retrieval.</li>
                            <li><strong>Scalability:</strong> Designing a system expandable from pilot to full-scale deployment while managing large knowledge bases.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "What Solution We Used",
            subHeader: "Building the RAG-Based Q&A System",
            content: (
                <>
                    <Paragraph>
                        We adopted a high-level solution architecture for developing the RAG-based Q&A bot with the following key components:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ol>
                            <li><strong>Data Preparation:</strong> Processed a structured knowledge base and unstructured documents into vector embeddings using a robust embedding model. Deployed chunking strategies to split documents for optimal storage and retrieval.</li>
                            <li><strong>Inference Pipeline:</strong> Implemented a retrieval mechanism to fetch relevant document chunks. Integrated prompt engineering to refine user queries for better alignment with the language model and generated responses enriched with retrieved context.</li>
                            <li><strong>Development Lifecycle:</strong> Used an iterative approach starting with a subset of data for pilot implementation, gradually expanding to a full-scale solution.</li>
                        </ol>
                    </Paragraph>
                    <h4>Stages</h4>
                    <table>
                        <tr><th>Key Activities</th><th>Description</th></tr>
                        <tr><td>Data Preprocessing</td><td>Document cleaning, chunking, and embedding creation</td></tr>
                        <tr><td>RAG Development</td><td>Retrieval algorithms, LLM integration, and prompt tuning</td></tr>
                        <tr><td>UI/API Development</td><td>Chatbot interface or Flask API for integration</td></tr>
                        <tr><td>Deployment</td><td>Dockerized setup with optional CI/CD pipeline</td></tr>
                        <tr><td>Post-Production</td><td>Debugging and continuous improvements</td></tr>
                    </table>
                </>
            ),
        },
        {
            header: "What Are Our Offerings",
            subHeader: "Tailored RAG Solutions for Seamless Q&A",
            content: (
                <>
                    <Paragraph>
                        Woodfrog offers a comprehensive suite of tailored RAG solutions:
                    </Paragraph>
                    <Paragraph style={{ paddingLeft: "20px" }}>
                        <ul>
                            <li><strong>Comprehensive RAG Solutions:</strong> From architecture design to deployment, tailored to unique needs.</li>
                            <li><strong>Customizable Components:</strong> Identity-based retrieval, flexible integrations, and scalability.</li>
                            <li><strong>User-Friendly Interfaces:</strong> Interactive chatbot or API-based implementation.</li>
                            <li><strong>Security & Compliance:</strong> GDPR-compliant processes for handling sensitive data.</li>
                        </ul>
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Business Outcome",
            subHeader: "Transforming Operations with Scalable and Efficient Q&A",
            content: (
                <>
                    <Paragraph>
                        Our solution delivered impactful results that streamlined operations and significantly reduced manual effort:
                    </Paragraph>
                    <table>
                        <tr><th>KPIs</th><th>Impact</th></tr>
                        <tr><td>Query Resolution Speed</td><td>30% improvement</td></tr>
                        <tr><td>Accuracy of Responses</td><td>90%+ relevance achieved</td></tr>
                        <tr><td>Manual Effort Savings</td><td>90% reduction</td></tr>
                        <tr><td>Data Handling Capacity</td><td>Scaled to handle 1M+ documents</td></tr>
                    </table>
                    <Paragraph>
                        Previously requiring 5 full-time resources for manual processing, the system now performs the same tasks with 0.5 resources, achieving a 90% reduction in manual effort and saving over 100 hours per month.
                    </Paragraph>
                </>
            ),
        },
        {
            header: "Client Perspective",
            subHeader: "Empowering Efficient and Accurate Query Responses",
            content: (
                <>
                    <Paragraph>
                        "The RAG-based Q&A application significantly improved our ability to deliver fast and accurate answers to our users. Its scalability and personalization features allow us to address complex queries efficiently, creating a seamless user experience."
                    </Paragraph>
                </>
            ),
        },
    ];




    return (
        <BlogComponent className={className} blogData={ragBasedQAData} title={"(RAG) Based Q&A"} desc={" Retrieval-Augmented Generation (RAG) Based Q&A Application"} />


    );
};

export default RagBaseQA;
