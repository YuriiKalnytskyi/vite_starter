import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import minusIcon from '@/assets/icons/minus.svg';
import plusIcon from '@/assets/icons/plus.svg';

import * as Styled from './accordion.styled';

export interface IAccordion {
  className?: string;
  title: string | ReactNode;
  children?: ReactNode;
  index: number;
  style?: any;
  icon?: any;
  onClickIcon?: () => void;
  onClick?: () => void;
  isOpen?: boolean;
  propComponent?: ReactNode;
  isDontSeeChildren?: boolean;
  iconHeight?: string;
}

export const Accordion = ({
  className,
  title,
  children,
  index = 0,
  style,
  icon,
  onClickIcon,
  onClick,
  isOpen,
  propComponent,
  iconHeight,
  isDontSeeChildren = false
}: IAccordion) => {
  const ref = useRef<HTMLDetailsElement | null>(null);

  const [isOpenDrawer, setOpenDrawer] = useState(isOpen || false);
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpenDrawer(isOpen);
    }
    if (isOpen && ref.current) {
      ref.current.open = true;
    }
  }, [isOpen, index]);

  const toggleDetails = (e: MouseEvent<HTMLDetailsElement>) => {
    if (isDontSeeChildren) {
      e.stopPropagation();
      e.preventDefault();
      onClick && onClick();
    } else {
      onClick && onClick();
      setOpenDrawer(!isOpenDrawer);
    }
  };

  return (
    <Styled.Details
      className={className}
      ref={ref}
      id={`details${index}`}
      styled={style}
      // onClick={toggleDetails}
      readOnly={!isDontSeeChildren && !icon}
    >
      <Styled.Summary className='summary' onClick={toggleDetails}>
        <Styled.Span>{title}</Styled.Span>
        <Styled.IconContainer iconHeight={iconHeight}>
          {icon && (
            <Styled.Icon
              onClick={onClickIcon}
              className={isOpenDrawer ? 'iconProps active' : 'iconProps'}
              height='0.5rem'
              src={icon}
              alt='icon'
            />
          )}

          {propComponent}

          {!isDontSeeChildren && !icon && (
            <img
              className={isOpenDrawer ? 'icon2' : 'icon'}
              src={!isOpenDrawer ? plusIcon : minusIcon}
              alt='arrow'
            />
          )}
        </Styled.IconContainer>
      </Styled.Summary>

      <div onClick={(e) => e.stopPropagation()} className='children'>
        {children}
      </div>
    </Styled.Details>
  );
};
