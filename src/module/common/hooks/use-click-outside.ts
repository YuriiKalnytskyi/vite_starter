import { useEffect, useRef } from 'react';

export const useClickOutside = (callback: any) => {
  const ref = useRef(null);

  const handleClick = (e: any) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return { ref };
};
