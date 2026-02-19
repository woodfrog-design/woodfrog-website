// // import { FunctionComponent } from 'react';
// // import HeaderComponent from '../components/HeaderComponent';
// // import Footer from '../components/Footer';
// // import styles from './BrochurePage.module.css';

// // const BrochurePage: FunctionComponent = () => {
// //   return (
// //     <div className={styles.pageWrapper}>
// //       <HeaderComponent />
// //       <main className={styles.mainContent}>
// //         <div className={styles.container}>
// //           <h1>Company Brochure</h1>
// //           <p>You can view our complete company brochure on Notion.</p>
// //           <a
// //             href="https://www.notion.so/Woodfrog-Tech-Brochure-2242428418a880898d34cc88c64851b1"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className={styles.actionButton}
// //           >
// //             View on Notion
// //           </a>
// //         </div>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default BrochurePage;

// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom';
// import BlogPage from './pages/BlogPage';
// import Evals from './pages/Evals';
// import WebsiteLandingPageDarkMod from './pages/WebsiteLandingPageDarkMod';
// import MachineLearning from './components/BlogsPage/MachineLearning';
// import DemandForecasting from './components/BlogsPage/DemandForecasting';
// import PredictiveMaintanance from './components/BlogsPage/PredictiveMaintenance';
// import SmartManufacturing from './components/BlogsPage/SmartMenufacturing';

// import Offering from './pages/Offering';
// import AiMlStrategy from './pages/AiMlStrategy';
// import ProductDevelopment from './pages/ProductDevelopment';
// import EnterpriseDataManagement from './pages/EnterpriseDataManagement';
// import AdvancedAnalytics from './pages/AdvancedAnalytics';
// import CustomLlmSolutions from './pages/CustomLlmSolutions';
// import AutomationScaling from './pages/AutomationScaling';
// import IntelligentAgents from './pages/IntelligentAgents';
// import BenchmarkingEvaluation from './pages/BenchmarkingEvaluation';

// import AboutUs from './pages/AboutUs';
// import OfferingPage from './pages/OfferingPage';
// import StickyTalkButton from './components/StickyTalkButton';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import GasTurbine from './components/BlogsPage/gasTurbine';
// import TvacScorePrediction from './components/BlogsPage/tvacScorePrediction';
// import CustomerChurn from './components/BlogsPage/CustomerChurn';
// import SuspectEngline from './components/BlogsPage/SuspectEngine';
// import InsurancePolicy from './components/BlogsPage/InsurancePolicy';
// import StbPredictiveMaintance from './components/BlogsPage/STBPredictiveMaintance';
// import FactFinder from './components/BlogsPage/FactFinder';
// import SmartMonitoringView from './components/pdf/SmartMonitoringView';
// import TermsAndConditions from './pages/TermsAndConditions';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import ContactPage from './pages/ContactPage';
// import NotFound from './pages/NotFound';
// import { useTheme } from './ThemeContext';

// import BrochurePage from './pages/BrochurePage'; // Import the brochure page

// const ThemeRouteListener = () => {
//   const location = useLocation();
//   const navigationType = useNavigationType();
//   const { isDarkTheme } = useTheme();

//   useEffect(() => {
//     const root = document.documentElement;
//     if (isDarkTheme) {
//       root.style.backgroundColor = '#2f2f37';
//       root.style.color = '#f9f8fa';
//       root.classList.add('dark-theme', 'dark-mode');
//       root.classList.remove('light-theme', 'light-mode');
//       document.body.classList.add('dark-mode');
//       document.body.classList.remove('light-mode');
//     } else {
//       root.style.backgroundColor = '#ffffff';
//       root.style.color = '#000000';
//       root.classList.add('light-theme', 'light-mode');
//       root.classList.remove('dark-theme', 'dark-mode');
//       document.body.classList.add('light-mode');
//       document.body.classList.remove('dark-mode');
//     }
//   }, [location, navigationType, isDarkTheme]);

//   return null;
// };

// function App() {
//   const action = useNavigationType();
//   const location = useLocation();
//   const pathname = location.pathname;

//   useEffect(() => {
//     if (action !== 'POP') {
//       window.scrollTo(0, 0);
//     }
//   }, [action, pathname]);

//   useEffect(() => {
//     document.title = 'woodfrog';
//     let metaDescription = '';
//     switch (pathname) {
//       case '/':
//         metaDescription = 'Welcome to Woodfrog Tech.';
//         break;
//       case '/contact-us':
//         metaDescription = 'Get in touch with the Woodfrog Tech team.';
//         break;
//     }
//     if (metaDescription) {
//       const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
//         'head > meta[name="description"]',
//       );
//       if (metaDescriptionTag) {
//         metaDescriptionTag.content = metaDescription;
//       }
//     }
//   }, [pathname]);

//   return (
//     <>
//       <ThemeRouteListener />
//       <Routes>
//         <Route path="/" element={<WebsiteLandingPageDarkMod />} />
//         <Route path="/blog" element={<BlogPage />} />
//         <Route path="/services" element={<Offering />} />
//         <Route path="/services/ai-ml-strategy" element={<AiMlStrategy />} />
//         <Route path="/services/product-development" element={<ProductDevelopment />} />
//         <Route path="/services/enterprise-data-management" element={<EnterpriseDataManagement />} />
//         <Route path="/services/advanced-analytics" element={<AdvancedAnalytics />} />
//         <Route path="/services/custom-llm-solutions" element={<CustomLlmSolutions />} />
//         <Route path="/services/automation-scaling" element={<AutomationScaling />} />
//         <Route path="/services/intelligent-agents" element={<IntelligentAgents />} />
//         <Route path="/services/benchmarking-and-evaluation" element={<BenchmarkingEvaluation />} />
//         <Route path="/evals" element={<BenchmarkingEvaluation />} />
//         <Route path="/offering" element={<OfferingPage />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/brochure" element={<BrochurePage />} />
//         <Route path="/demand-forecasting" element={<DemandForecasting />} />
//         <Route path="/Smart-Monitoring" element={<MachineLearning />} />
//         <Route path="/pdf/:page" element={<SmartMonitoringView />} />
//         <Route path="/predictive-maintenance" element={<PredictiveMaintanance />} />
//         <Route path="/smart-manufacturing" element={<SmartManufacturing />} />
//         <Route path="/gas-turbine" element={<GasTurbine />} />
//         <Route path="/tvac-score" element={<TvacScorePrediction />} />
//         <Route path="/customer-churn" element={<CustomerChurn />} />
//         <Route path="/suspect-engine" element={<SuspectEngline />} />
//         <Route path="/insurance-policy" element={<InsurancePolicy />} />
//         <Route path="/stb-predictive" element={<StbPredictiveMaintance />} />
//         <Route path="/fact-finder" element={<FactFinder />} />
//         <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/contact-us" element={<ContactPage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <StickyTalkButton />
//     </>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { Routes, Route, useNavigationType, useLocation, Link } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import WebsiteLandingPageDarkMod from './pages/WebsiteLandingPageDarkMod';
import MachineLearning from './components/BlogsPage/MachineLearning';
import DemandForecasting from './components/BlogsPage/DemandForecasting';
import PredictiveMaintanance from './components/BlogsPage/PredictiveMaintenance';
import SmartManufacturing from './components/BlogsPage/SmartMenufacturing';

import Offering from './pages/Offering';
import AiMlStrategy from './pages/AiMlStrategy';
import ProductDevelopment from './pages/ProductDevelopment';
import EnterpriseDataManagement from './pages/EnterpriseDataManagement';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import CustomLlmSolutions from './pages/CustomLlmSolutions';
import AutomationScaling from './pages/AutomationScaling';
import IntelligentAgents from './pages/IntelligentAgents';
import BenchmarkingEvaluation from './pages/BenchmarkingEvaluation';

import AboutUs from './pages/AboutUs';
import OfferingPage from './pages/OfferingPage';
import StickyTalkButton from './components/StickyTalkButton';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import GasTurbine from './components/BlogsPage/gasTurbine';
import TvacScorePrediction from './components/BlogsPage/tvacScorePrediction';
import CustomerChurn from './components/BlogsPage/CustomerChurn';
import SuspectEngline from './components/BlogsPage/SuspectEngine';
import InsurancePolicy from './components/BlogsPage/InsurancePolicy';
import StbPredictiveMaintance from './components/BlogsPage/STBPredictiveMaintance';
import FactFinder from './components/BlogsPage/FactFinder';
import SmartMonitoringView from './components/pdf/SmartMonitoringView';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { useTheme } from './ThemeContext';
import BrochurePage from './pages/BrochurePage';
import TrajectoryPage from './pages/TrajectoryPage';

// Import the Cookie Consent component
import CookieConsent from "react-cookie-consent";

const ThemeRouteListener = () => {
  const location = useLocation();
  const { isDarkTheme } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark-theme', 'dark-mode');
      root.classList.remove('light-theme', 'light-mode');
    } else {
      root.classList.add('light-theme', 'light-mode');
      root.classList.remove('dark-theme', 'dark-mode');
    }
  }, [location, isDarkTheme]);

  return null;
};

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    document.title = 'woodfrog';
  }, [pathname]);

  return (
    <>
      <ThemeRouteListener />
      <Routes>
        <Route path="/" element={<WebsiteLandingPageDarkMod />} />
        <Route path="/blog" element={<BlogPage />} />
        
        <Route path="/offering" element={<OfferingPage />} />
        <Route path="/services" element={<Offering />} />
        <Route path="/services/ai-ml-strategy" element={<AiMlStrategy />} />
        <Route path="/services/product-development" element={<ProductDevelopment />} />
        <Route path="/services/enterprise-data-management" element={<EnterpriseDataManagement />} />
        <Route path="/services/advanced-analytics" element={<AdvancedAnalytics />} />
        <Route path="/services/custom-llm-solutions" element={<CustomLlmSolutions />} />
        {/* --- FIX: Corrected route path --- */}
        <Route path="/services/automation-and-scaling" element={<AutomationScaling />} />
        <Route path="/services/intelligent-agents" element={<IntelligentAgents />} />
        <Route path="/services/benchmarking-and-evaluation" element={<BenchmarkingEvaluation />} />
        
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/brochure" element={<BrochurePage />} />
        <Route path="/trajectory" element={<TrajectoryPage />} />

        <Route path="/demand-forecasting" element={<DemandForecasting />} />
        <Route path="/Smart-Monitoring" element={<MachineLearning />} />
        <Route path="/pdf/:page" element={<SmartMonitoringView />} />
        <Route path="/predictive-maintenance" element={<PredictiveMaintanance />} />
        <Route path="/smart-manufacturing" element={<SmartManufacturing />} />
        <Route path="/gas-turbine" element={<GasTurbine />} />
        <Route path="/tvac-score" element={<TvacScorePrediction />} />
        <Route path="/customer-churn" element={<CustomerChurn />} />
        <Route path="/suspect-engine" element={<SuspectEngline />} />
        <Route path="/insurance-policy" element={<InsurancePolicy />} />
        <Route path="/stb-predictive" element={<StbPredictiveMaintance />} />
        <Route path="/fact-finder" element={<FactFinder />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <StickyTalkButton />

      {/* --- Added the Cookie Consent banner --- */}
      <CookieConsent
        location="bottom"
        buttonText="I Understand"
        cookieName="woodfrogCookieConsent"
        style={{ background: "#1e1e1e", fontSize: "14px", zIndex: "10000" }}
        buttonStyle={{ color: "#fff", background: "#117afa", fontSize: "14px", borderRadius: "6px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience. By using this site, you agree to our use of cookies.{" "}
        <Link to="/privacy-policy" style={{ color: "#fff", textDecoration: "underline" }}>
            Learn more
        </Link>
      </CookieConsent>
    </>
  );
}

export default App;