import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/Footer";
import { useTheme } from "../ThemeContext";

const NotFound: FunctionComponent = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={styles.notFoundPage}>
      <HeaderComponent />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.errorCode}>404</div>
          
          <h1 className={styles.title}>Page Not Found</h1>
          
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className={styles.illustration}>
            {/* Using SVG file from public folder */}
            <img 
              src="/images/WoodfrogLogomark.svg" 
              alt="Woodfrog logomark" 
              className={styles.svgImage}
            />
          </div>
          
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;