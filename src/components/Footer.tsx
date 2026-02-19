import { FunctionComponent } from 'react';
import Pricing1 from './Pricing1';
import styles from './Footer.module.css';

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = '' }) => {
  return (
    <footer className={[styles.footer, className].join(' ')}>
      <Pricing1 />
    </footer>
  );
};

export default Footer;