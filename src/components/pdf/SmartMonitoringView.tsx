import React from 'react';
import { useParams } from 'react-router-dom';

const SmartMonitoringView: React.FC = () => {
    const { page } = useParams<{ page: string }>(); // Define the expected parameter type
    console.log("params", page);
    const decodedPdfName = page ? decodeURIComponent(page) : ""; // Decode the URL parameter
    console.log("Decoded pdfName:", decodedPdfName);
    // Define a mapping for different pages and their corresponding URLs
    const pageMapping: Record<string, string> = {
        "TVAC Score Prediction": "https://online.flippingbook.com/view/842224291/",
        "Suspect Engine": "https://online.flippingbook.com/view/32529756/",
        "STB Predictive Maintenance": "https://online.flippingbook.com/view/32537940/",
        "(RAG) Based Q&A": "https://online.flippingbook.com/view/32643533/",
        "Predictive Maintenance": "https://online.flippingbook.com/view/32521540/",
        "Insurance Policy Recommendation": "https://online.flippingbook.com/view/32557433/",
        "FactFinder": "https://online.flippingbook.com/view/32546156/",
        "demand-forecasting": "https://online.flippingbook.com/view/32578828/",
        "smart-manufacturing": "https://online.flippingbook.com/view/843008421/",
        "Smart Monitoring": "https://online.flippingbook.com/view/843008421/",

        "gas-turbine": "",
        "customer-churn": "https://online.flippingbook.com/view/32622905/",
    };

    // Safely retrieve the corresponding URL for the current page
    const iframeUrl = decodedPdfName
        ? pageMapping[decodedPdfName] : undefined;

    if (!iframeUrl) {
        // Fallback for invalid or undefined pages
        return (
            <div>
                <h1>Page not found</h1>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '100%',
            width: '100%',
            height: '100vh',
        }}>
            <iframe
                src={iframeUrl}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                title={page}
            />
        </div>
    );
};

export default SmartMonitoringView;
