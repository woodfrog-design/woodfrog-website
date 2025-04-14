import React from 'react';
import styles from './CustomButton.module.css';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  rounded?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ 
  type = 'primary', 
  size = 'medium', 
  onClick, 
  children, 
  className = '', 
  disabled = false,
  icon,
  htmlType = 'button',
  style,
  rounded = false
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button-${type}`],
    styles[`button-${size}`],
    rounded ? styles.rounded : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={htmlType}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default CustomButton;