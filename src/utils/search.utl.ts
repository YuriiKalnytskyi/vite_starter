import { KeyboardEvent } from 'react';

interface IProps {
  setSelectedHint: React.Dispatch<React.SetStateAction<number | null>>;
  setInputValue: (str: string, index: number) => void;
  matchedWords: string[];
  selectedHint: number | null;
  ref: React.RefObject<HTMLDivElement | HTMLUListElement>;
}

export const searchKeyPressControlScrol =
  ({ setSelectedHint, setInputValue, matchedWords, selectedHint, ref }: IProps) =>
  (e: KeyboardEvent<HTMLInputElement>) => {
    if (ref.current && selectedHint !== null) {
      const container = ref.current;
      const itemHeight = container.scrollHeight / matchedWords.length;
      const visibleItems = Math.floor(container.clientHeight / itemHeight);
      const topVisibleIndex = Math.floor(container.scrollTop / itemHeight);

      if (e.key === 'ArrowDown') {
        const nextHint = selectedHint < matchedWords.length - 1 ? selectedHint + 1 : 0;

        container.scrollTo({
          top: nextHint * itemHeight,
          behavior: 'smooth'
        });
        setSelectedHint(nextHint);
      } else if (e.key === 'ArrowUp') {
        let prevHint = selectedHint > 0 ? selectedHint - 1 : matchedWords.length - 1;
        if (prevHint === 0) {
          prevHint = matchedWords.length - 1;
          container.scrollTo({
            top: (matchedWords.length - visibleItems) * itemHeight,
            behavior: 'smooth'
          });
        } else if (prevHint < topVisibleIndex) {
          container.scrollTo({
            top: prevHint * itemHeight,
            behavior: 'smooth'
          });
        }

        setSelectedHint(prevHint);
      } else if (e.key === 'Enter' && matchedWords.length > 0 && selectedHint !== null) {
        setInputValue(matchedWords[selectedHint], selectedHint);
      }
    }
  };
