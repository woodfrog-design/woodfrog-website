// modalFix.ts - TypeScript-friendly version

// Add proper exports to make it a module
export const initModalFix = (): void => {
  // Store original document body style with proper typing
  const originalBodyStyle: Record<string, string> = {};
  
  // Store current scrollbar width
  let scrollbarWidth = 0;
  
  // Calculate scrollbar width
  const getScrollbarWidth = (): number => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    const width = outer.offsetWidth - inner.offsetWidth;
    
    // Safe null check for parentNode
    if (outer.parentNode) {
      outer.parentNode.removeChild(outer);
    }
    
    return width;
  };
  
  // Add global styles to head with proper typing
  const addGlobalStyle = (css: string): HTMLStyleElement => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.head.appendChild(style);
    return style;
  };
  
  // Add the global CSS that will prevent the shifting
  addGlobalStyle(`
    .ant-modal-mask, .ant-modal-wrap {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
    }
    
    .ant-modal-centered .ant-modal {
      margin: 0 !important;
      padding: 0 !important;
      top: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: 100% !important;
    }
    
    body.ant-modal-open {
      position: fixed !important;
      width: 100% !important;
      /* paddingRight will be set dynamically */
    }
  `);
  
  // Watch for DOM changes to catch when Ant Design adds modal classes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && 
          document.body.classList.contains('ant-modal-open')) {
        
        // Calculate scrollbar width if we haven't yet
        if (scrollbarWidth === 0) {
          scrollbarWidth = getScrollbarWidth();
        }
        
        // Save all current body styles
        for (const key in document.body.style) {
          if (typeof document.body.style[key] === 'string' && document.body.style[key]) {
            originalBodyStyle[key] = document.body.style[key] as string;
          }
        }
        
        // Force our styles to prevent shifting
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else if (mutation.attributeName === 'class' && 
                !document.body.classList.contains('ant-modal-open') &&
                Object.keys(originalBodyStyle).length > 0) {
        
        // Restore original body styles
        for (const key in originalBodyStyle) {
          if (Object.prototype.hasOwnProperty.call(originalBodyStyle, key)) {
            // Type assertion to handle style property assignment
            (document.body.style as any)[key] = originalBodyStyle[key];
          }
        }
        
        // Clear the stored styles
        for (const key in originalBodyStyle) {
          if (Object.prototype.hasOwnProperty.call(originalBodyStyle, key)) {
            delete originalBodyStyle[key];
          }
        }
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, { attributes: true });
};

// Export an empty object as default to make this a proper module
export default { initModalFix };