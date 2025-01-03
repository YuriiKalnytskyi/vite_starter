import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IPortalProps } from '@/module/common/types';

const portalRoot = document.querySelector('#portal-root') as HTMLElement;

export const Portal = ({ children }: IPortalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    const el = elRef.current!;
    portalRoot.appendChild(el);

    return () => {
      portalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
};
