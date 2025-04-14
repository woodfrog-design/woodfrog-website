// modalScrollFix.ts
export const preventScrollbarShift = (isOpen: boolean): void => {
    if (isOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original styles
      const originalPaddingRight = document.body.style.paddingRight;
      const originalOverflow = document.body.style.overflow;
      
      // Apply styles to prevent scrolling and compensate for scrollbar
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Store for restoration
      document.body.setAttribute('data-original-padding', originalPaddingRight);
      document.body.setAttribute('data-original-overflow', originalOverflow);
    } else {
      // Restore original styles
      document.body.style.paddingRight = document.body.getAttribute('data-original-padding') || '';
      document.body.style.overflow = document.body.getAttribute('data-original-overflow') || '';
      
      // Clean up attributes
      document.body.removeAttribute('data-original-padding');
      document.body.removeAttribute('data-original-overflow');
    }
  };