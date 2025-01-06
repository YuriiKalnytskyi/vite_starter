import { RefObject, useEffect, useState, Fragment } from 'react';
import { Portal } from '@/module/common/component';

export const usePortalPositioning = <T extends HTMLElement>(ref: RefObject<T>, focused: boolean) => {
  const [setting, setSetting] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const [parentHasScroll, setParentHasScroll] = useState<boolean>(false);

  useEffect(() => {
    const calculatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSetting({
          width: ref.current.clientWidth,
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
    };

    const checkParentOverflow = () => {
      let currentElement: HTMLElement | null = ref.current;
      while (currentElement && currentElement.parentElement) {
        const overflowX = getComputedStyle(currentElement.parentElement).overflowX;
        if (overflowX === 'auto' || overflowX === 'scroll') {

          setParentHasScroll(true);
          return;
        }
        currentElement = currentElement.parentElement;
      }
      setParentHasScroll(false);
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
    checkParentOverflow();
    handleScrollLock();

    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.removeEventListener('wheel', preventScroll);
      }
    };
  }, [focused]);

  return { setting: parentHasScroll ? setting : {}, Component: parentHasScroll ? Portal : Fragment };
};
