import { useEffect, useState } from 'react';

import { MEDIA } from '@/theme';

export const useIsMobile = (breakpoint: string = MEDIA.tablet): boolean => {
  const numericBreakpoint = parseInt(breakpoint.replace('px', ''), 10);

  const [isMobile, setIsMobile] = useState(window.innerWidth < numericBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < numericBreakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [numericBreakpoint]);

  return isMobile;
};
