import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomModal.module.css';
import { useTheme } from "../ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
}

const CustomModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '',
  size = 'medium',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  preventScroll = true,
}) => {
  const { isDarkTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set dynamic classes
  const themeClass = isDarkTheme ? styles.darkTheme : styles.lightTheme;
  const sizeClass = styles[`size-${size}`];
  
  // Handle modal mounting and unmounting
  useEffect(() => {
    // Clear any existing timeouts to prevent issues
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (isOpen) {
      // When opening, make the modal immediately visible
      setModalVisible(true);
      setIsClosing(false);
      
      // Add body class to prevent scrolling
      if (preventScroll) {
        document.body.classList.add(styles.bodyWithModalOpen);
      }
    } else if (modalVisible) {
      // When closing, start the animation
      setIsClosing(true);
      
      // After animation duration, actually remove the modal
      closeTimeoutRef.current = setTimeout(() => {
        setModalVisible(false);
        setIsClosing(false);
        
        // Remove body class
        document.body.classList.remove(styles.bodyWithModalOpen);
      }, 300); // Match this to your animation duration
    }
    
    // Cleanup function
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      document.body.classList.remove(styles.bodyWithModalOpen);
    };
  }, [isOpen, modalVisible, preventScroll]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick && 
        modalVisible && 
        !isClosing &&
        modalRef.current && 
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    
    // Handle ESC key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && modalVisible && !isClosing) {
        handleClose();
      }
    };
    
    if (modalVisible && !isClosing) {
      // Add event listeners
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalVisible, isClosing, closeOnOutsideClick, closeOnEsc]);
  
  // Handle close with animation
  const handleClose = () => {
    if (!isClosing) {
      onClose();
    }
  };
  
  // If modal should not be visible at all, return null
  if (!modalVisible && !isOpen) return null;
  
  const modalClasses = [
    styles.modalContainer,
    themeClass,
    sizeClass,
    isClosing ? styles.closing : styles.opening,
    className
  ].filter(Boolean).join(' ');
  
  const overlayClasses = `${styles.modalOverlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`;
  
  return (
    <div className={overlayClasses} aria-modal="true" role="dialog">
      <div 
        className={modalClasses}
        ref={modalRef}
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          {showCloseButton && (
            <button 
              className={styles.closeButton} 
              onClick={handleClose}
              aria-label="Close modal"
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;