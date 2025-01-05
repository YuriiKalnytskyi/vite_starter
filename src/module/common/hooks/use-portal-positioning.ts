import { RefObject, useEffect, useState } from 'react';

export const usePortalPositioning = <T extends HTMLElement>(ref: RefObject<T>, focused: boolean) => {
  const [setting, setSetting] = useState<
    { top: number; left: number, width: number }
  >({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const calculatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSetting({
          width: ref.current?.clientWidth,
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
    };


    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleScrollLock = () => {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        if (focused) {
          rootElement.style.overflow = 'hidden';
          rootElement.addEventListener('wheel', preventScroll, { passive: false });
        } else {
          rootElement.style.overflow = '';
          rootElement.removeEventListener('wheel', preventScroll);
        }
      }
    };

    calculatePosition();
    // const handleScrollOrResize = () => {
    //   calculatePosition();
    // };

    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    handleScrollLock();

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.removeEventListener('wheel', preventScroll);
      }
    };
  }, [focused]);

  return { setting };
};
