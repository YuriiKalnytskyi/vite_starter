import { useEffect, useRef, useState } from 'react';

export const useAutoResizeTextArea = (
  ref: HTMLTextAreaElement | null,
  value: string,
  rows: number
) => {
  const [height, setHeight] = useState(0);
  const prevValue = useRef(value);
  const initialHeight = useRef('');
  const rowsInLine = useRef(0);

  useEffect(() => {
    if (ref) {
      if (initialHeight.current === '') {
        initialHeight.current = ref.style.height;
      }

      if (!value) {
        setHeight(parseInt(initialHeight.current, 10));
        return;
      }

      const paddingTop = parseInt(window.getComputedStyle(ref).paddingTop, 10);
      const paddingBottom = parseInt(window.getComputedStyle(ref).paddingBottom, 10);

      if (value === prevValue.current) {
        return;
      }

      const lineWidth = ref.clientWidth - paddingTop - paddingBottom;
      const lineHeight = parseInt(window.getComputedStyle(ref).fontSize, 10);

      const charactersPerLine = Math.floor(lineWidth / lineHeight);

      if (charactersPerLine !== rowsInLine.current) {
        rowsInLine.current = charactersPerLine;
      }

      const numLines = Math.ceil(value.length / rowsInLine.current);

      const newHeight = Math.max(
        numLines * lineHeight + paddingTop + paddingBottom,
        (rows + 1) * lineHeight + paddingTop + paddingBottom
      );

      setHeight(newHeight);
      prevValue.current = value;
    }
  }, [value, ref, rows]);

  useEffect(() => {
    if (ref && height) {
      ref.style.height = `${height}px`;
    }
  }, [height, ref]);
};
