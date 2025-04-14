// useModal.ts - A custom hook for modal management
import { useEffect, useState } from 'react';

interface UseModalOptions {
  preventBodyScroll?: boolean;
}

export const useModal = (initialState = false, options: UseModalOptions = {}) => {
  const { preventBodyScroll = true } = options;
  const [isOpen, setIsOpen] = useState(initialState);
  
  // This function calculates scrollbar width
  const getScrollbarWidth = (): number => {
    // Create a temporary div to measure scrollbar width
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    // Create inner div
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    // Calculate the difference between outer and inner width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    
    // Clean up
    outer.parentNode?.removeChild(outer);
    
    return scrollbarWidth;
  };

  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      // Get the current padding of the body
      const currentPaddingRight = parseInt(
        window.getComputedStyle(document.body).paddingRight || '0',
        10
      );
      
      // Calculate the scrollbar width
      const scrollbarWidth = getScrollbarWidth();
      
      // Store the original overflow style
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Apply new styles to prevent scrolling and adjust for scrollbar width
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      
      // Add a class to help with any additional styling
      document.body.classList.add('modal-open');
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen, preventBodyScroll]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, open, close, toggle };
};