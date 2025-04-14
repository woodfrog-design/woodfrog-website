import { FunctionComponent } from "react";
import Pricing1 from "./Pricing1";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  return (
    <footer className={[styles.footer, className].join(" ")}>
      <Pricing1
        contactUsDisplay="inline-block"
        contactUsMinWidth="87px"
        line56="pending_1019:3851"
        policyStatementDisplay="inline-block"
        policyStatementMinWidth="97px"
      />
    </footer>
  );
};

export default Footer;
