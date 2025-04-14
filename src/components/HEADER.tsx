import { FunctionComponent } from "react";
import Logo from "./Logo";
import styles from "./HEADER.module.css";
import { useNavigate } from "react-router-dom";
import ModeToggle from "./ModeToggle";


export type HEADERType = {
  className?: string;
  tagline?: boolean;
};

const HEADER: FunctionComponent<HEADERType> = ({ className = "", tagline }) => {
  const navigate = useNavigate()
  
  const handleHome = () => {
    navigate('/')
  }
  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.headerContent}>
        <div className={styles.logoWrapper} onClick={handleHome}>
          <Logo tagline={tagline} />
        </div>

        <ModeToggle />
      </div>
    </header>
  );
};

export default HEADER;
