import { ReactNode, useRef, useState } from 'react';

import { useClickOutside } from '@/module/common/hooks';
import { functionStub } from '@/utils';

import * as Styled from './drop-down.style.ts';

interface IDropDownProps {
  title:
    | ReactNode
    | (({
        isOpen,
        onSetIsOpen
      }: {
        isOpen: boolean;
        onSetIsOpen: (flag?: boolean) => void;
      }) => ReactNode);
  children:
    | ReactNode
    | (({
        isOpen,
        onSetIsOpen
      }: {
        isOpen: boolean;
        onSetIsOpen: (flag?: boolean) => void;
      }) => ReactNode);
  position?: 'left' | 'right' | 'center' | 'rightBlock';
  padding?: string;
  isHover?: boolean;
  minWidthChildren?: string;
  onClick?: (flag: boolean) => void;
  className?: string;
}

export const DropDown = ({
  title,
  children,
  position,
  isHover,
  minWidthChildren,
  padding,
  onClick,
  className
}: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSetIsOpen = (flag?: boolean) => {
    setIsOpen(flag ?? false);
    onClick && onClick(flag ?? false);
  };
  const { ref } = useClickOutside(() => onSetIsOpen());
  const titleRef = useRef<null | HTMLDivElement>(null);

  return (
    <Styled.Wrapper
      ref={ref}
      onMouseEnter={isHover ? onSetIsOpen.bind(this, true) : functionStub}
      onMouseLeave={isHover ? onSetIsOpen.bind(this, false) : functionStub}
      id='DropDown'
      className={className ? className : ''}
    >
      <Styled.TitleWrapper
        ref={titleRef}
        id='DropDownTitle'
        isOpen={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onSetIsOpen(!isOpen);
        }}
        className='drop-down-title-wrapper'
      >
        {typeof title === 'function' ? title({ isOpen: isOpen, onSetIsOpen }) : title}
      </Styled.TitleWrapper>
      {isOpen && (
        <Styled.ChildrenWrapper
          // className='children-wrapper'
          className='drop-down-children-wrapper'
          position={position}
          isOpen={isOpen}
          minWidth={padding === '0' ? titleRef?.current?.offsetWidth + 'px' : minWidthChildren}
          padding={padding}
        >
          {typeof children === 'function' ? children({ isOpen: isOpen, onSetIsOpen }) : children}
        </Styled.ChildrenWrapper>
      )}
    </Styled.Wrapper>
  );
};
