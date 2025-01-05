// import { useEffect, useRef } from 'react';
//
// export const useClickOutside = (callback: any) => {
//   const ref = useRef(null);
//
//   const handleClick = (e: any) => {
//     // @ts-ignore
//     if (ref.current && !ref.current.contains(e.target)) {
//       callback();
//     }
//   };
//
//   useEffect(() => {
//     document.addEventListener('mousedown', handleClick);
//
//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//     };
//   });
//
//   return { ref };
// };

import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
  callback: () => void,
  additionalRefs?: RefObject<HTMLElement>[]
) => {
  const ref = useRef<HTMLElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (
      ref.current && !ref.current.contains(e.target as Node) &&
      ![ref, ...(additionalRefs ?? [])].some((additionalRef) => additionalRef.current?.contains(e.target as Node))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [additionalRefs]);

  return { ref };
};

