import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import WebsiteLandingPageDarkMod from "./pages/WebsiteLandingPageDarkMod";
import MachineLearning from "./components/BlogsPage/MachineLearning";
import DemandForecasting from "./components/BlogsPage/DemandForecasting";
import PredictiveMaintanance from "./components/BlogsPage/PredictiveMaintenance";
import SmartManufacturing from "./components/BlogsPage/SmartMenufacturing";
import Offering from "./pages/Offering";
import AboutUs from "./pages/AboutUs";
import OfferingPage from "./pages/OfferingPage";
import StickyTalkButton from "./components/StickyTalkButton"; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import GasTurbine from "./components/BlogsPage/gasTurbine";
import TvacScorePrediction from "./components/BlogsPage/tvacScorePrediction";
import CustomerChurn from "./components/BlogsPage/CustomerChurn";
import SuspectEngline from "./components/BlogsPage/SuspectEngine";
import InsurancePolicy from "./components/BlogsPage/InsurancePolicy";
import StbPredictiveMaintance from "./components/BlogsPage/STBPredictiveMaintance";
import FactFinder from "./components/BlogsPage/FactFinder";
import SmartMonitoringView from "./components/pdf/SmartMonitoringView";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // ✅ Import Privacy Policy Page
import ContactPage from "./pages/ContactPage"; // ✅ Import the Contact Page
import NotFound from "./pages/NotFound";
import { useTheme } from "./ThemeContext"; // Import useTheme hook

// Add ThemeRouteListener component to prevent theme flickering during navigation
const ThemeRouteListener = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { isDarkTheme } = useTheme();
  
  useEffect(() => {
    // Apply theme directly during route changes
    const root = document.documentElement;
    
    // Apply critical styles immediately
    if (isDarkTheme) {
      root.style.backgroundColor = '#2f2f37';
      root.style.color = '#f9f8fa';
      
      // Apply your dark theme CSS variables directly
      root.style.setProperty('--color-gray-200', '#1e1e1e');
      root.style.setProperty('--color-gray-300', '#F5F5F5');
      root.style.setProperty('--dark-secondary-text', '#c7c6c8');
      root.style.setProperty('--color-darkslategray-100', '#2f2f37');
      root.style.setProperty('--color-gray-400', 'rgba(18, 18, 18, 0.95)');
      root.style.setProperty('--dark-primary-text', '#f9f8fa');
      root.style.setProperty('--color-darkgray', '#abafb5');
      root.style.setProperty('--color-darkslategray-200', '#2f2f2d');
      
      // Add dark mode classes
      root.classList.add('dark-theme', 'dark-mode');
      root.classList.remove('light-theme', 'light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      root.style.backgroundColor = '#ffffff';
      root.style.color = '#000000';
      
      // Apply your light theme CSS variables directly
      root.style.setProperty('--color-gray-200', '#F5F5F5');
      root.style.setProperty('--color-gray-300', '#F5F5F5');
      root.style.setProperty('--dark-secondary-text', '#000000');
      root.style.setProperty('--color-darkslategray-100', '#ffffff');
      root.style.setProperty('--color-gray-400', '#ffffff');
      root.style.setProperty('--dark-primary-text', '#000000');
      root.style.setProperty('--color-darkgray', '#808080');
      root.style.setProperty('--color-darkslategray-200', '#ffffff');
      
      // Add light mode classes
      root.classList.add('light-theme', 'light-mode');
      root.classList.remove('dark-theme', 'dark-mode');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [location, navigationType, isDarkTheme]);
  
  return null;
};

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  

  useEffect(() => {
  // Set a consistent title across all pages
  document.title = "woodfrog";
  
  // Still handle meta description if needed
  let metaDescription = "";
  
  switch (pathname) {
    case "/":
      metaDescription = "Welcome to Woodfrog Tech.";
      break;
    case "/websitelanding-page-dark-mode":
      metaDescription = "Experience our website in dark mode.";
      break;
    case "/contact-us":
      metaDescription = "Get in touch with the Woodfrog Tech team.";
      break;
  }

  if (metaDescription) {
    const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
      'head > meta[name="description"]'
    );
    if (metaDescriptionTag) {
      metaDescriptionTag.content = metaDescription;
    }
  }
}, [pathname]);

  return (
    <>
    {/* Add ThemeRouteListener here to prevent theme flickering during navigation */}
    <ThemeRouteListener />
    
    <Routes>
      <Route path="/" element={<WebsiteLandingPageDarkMod />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/services" element={<Offering />} />
      <Route path="/offering" element={<OfferingPage />} />
      <Route path="/about-us" element={<AboutUs />} />
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

      {/* Added routes for Privacy Policy and Terms & Conditions */}
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      
      {/* ✅ Add new route for Contact Us page */}
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <StickyTalkButton />
    </>
  );
}

export default App;