// ThemePreservingLink.tsx
// Create this as a new file in your components folder

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Adjust the path as needed

interface ThemePreservingLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ThemePreservingLink: React.FC<ThemePreservingLinkProps> = ({ 
  to, 
  children, 
  className = '',
  onClick
}) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call the provided onClick handler if it exists
    if (onClick) {
      onClick(e);
    }
    
    // Apply theme immediately before navigation
    const root = document.documentElement;
    
    // Set critical theme properties directly before navigation
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
    
    // Short delay to ensure styles are applied
    setTimeout(() => {
      navigate(to);
    }, 10);
  };
  
  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ThemePreservingLink;