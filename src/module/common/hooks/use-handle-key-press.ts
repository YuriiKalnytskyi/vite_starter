import { KeyboardEvent, RefObject } from 'react';

type  selectedItemIndex = number | null

interface IProps<T> {
  selectedItemIndex: selectedItemIndex;
  setSelectedItemIndex: (value: number) => void;
  setInputValue: (value: T, index: selectedItemIndex) => void;
  items: T[];
  ref: RefObject<HTMLUListElement>;
}

export const useHandleKeyPress = <T, >(
  e: KeyboardEvent<HTMLInputElement>,
  { items, ref, selectedItemIndex = 0, setSelectedItemIndex, setInputValue }: IProps<T>
) => {
  if (!ref.current || selectedItemIndex === null || items.length === 0) return;

  const container = ref.current;
  const itemHeight = container.scrollHeight / items.length;
  const containerHeight = container.clientHeight;

  const nextHint =
    e.key === 'ArrowDown'
      ? (selectedItemIndex + 1) % items.length
      : e.key === 'ArrowUp'
        ? (selectedItemIndex - 1 + items.length) % items.length
        : selectedItemIndex;

  const itemTop = nextHint * itemHeight;

  const scrollOffset = (containerHeight - itemHeight) / 2;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    let scrollTop = itemTop - scrollOffset;

    if (e.key === 'ArrowUp' && itemTop < scrollOffset) {
      scrollTop = 0;
    }

    if (e.key === 'ArrowDown' && itemTop > container.scrollHeight - containerHeight + scrollOffset) {
      scrollTop = container.scrollHeight - containerHeight;
    }

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    });

    setSelectedItemIndex(nextHint);
  }

  if (e.key === 'Enter') {
    setInputValue(items[selectedItemIndex], selectedItemIndex);
  }
};
