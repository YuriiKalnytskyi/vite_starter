import { useEffect, useRef } from 'react';

import { pxToRem } from '@/utils';

export const useAutoResizeTextArea = (
  ref: HTMLTextAreaElement | null,
  value: string,
  rows?: number
) => {
  const initialHeight = useRef('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (ref) {
      if (isFirstRender.current) {
        initialHeight.current = pxToRem(ref.clientHeight);
        isFirstRender.current = false;
      }

      if (!value) {
        ref.style.height = initialHeight.current;
      }

      const { scrollHeight } = ref;

      if (rows) {
        if (rows * 44 < scrollHeight) {
          ref.style.height = pxToRem(scrollHeight);
        }
      } else {
        ref.style.height = pxToRem(scrollHeight);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, value]);
};
