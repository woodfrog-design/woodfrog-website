import { useEffect, RefObject } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

/**
 * A custom hook that triggers a callback when a click is detected outside of a specified element.
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: AnyEvent) => void
) => {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export default useClickOutside;