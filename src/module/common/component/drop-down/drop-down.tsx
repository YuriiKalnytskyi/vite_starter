import { ReactNode, RefObject, useState } from 'react';

import { useClickOutside, usePortalPositioning } from '@/module/common/hooks';
import { functionStub } from '@/utils';

import * as Styled from './drop-down.style.ts';
import { IMargin } from '@/module/common/types';

interface IDropDownProps extends IMargin {
  visibleBlock:
    | ReactNode
    | (({
          focused,
          onSetIsFocused
        }: {
    focused: boolean;
    onSetIsFocused: (flag?: boolean) => void;
  }) => ReactNode);
  popupBlock:
    | ReactNode
    | (({
          focused,
          onSetIsFocused
        }: {
    focused: boolean;
    onSetIsFocused: (flag?: boolean) => void;
    ItemTag: any
    variants: any
  }) => ReactNode);
  position?: 'left' | 'right';
  isHover?: boolean;
  isClick?: boolean;
  width?: string;
}

export const DropDown = ({
                           visibleBlock,
                           popupBlock,
                           position,
                           isHover,
                           isClick,
                           width,
                           ...props
                         }: IDropDownProps) => {
  const [focused, setFocused] = useState(false);

  const onSetIsFocused = (flag?: boolean) => {
    setFocused(flag ?? false);
  };

  const { ref } = useClickOutside(() => {
    if (focused) {
      console.log('dcjdncjdncjdcnjdcndcj');
      onSetIsFocused(false);
    }
  });

  console.log(focused , '=======');

  const { setting, Component, isParentScroll } = usePortalPositioning(ref.current, focused);

  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    closed: {
      scaleY: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        when: 'beforeChildren'
      }
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.1,
        when: 'afterChildren'
      }
    }
  };

  return (
    <Styled.Wrapper
      animate={focused ? 'open' : 'closed'}
      initial="closed"
      $focused={focused}
      ref={ref as RefObject<HTMLDivElement>}
      onMouseEnter={isHover ? onSetIsFocused.bind(this, true) : functionStub}
      onMouseLeave={isHover ? onSetIsFocused.bind(this, false) : functionStub}
      onClick={isClick ? onSetIsFocused.bind(this, !focused) : functionStub}
      width={width}
      {...props}
    >
      {typeof visibleBlock === 'function' ? visibleBlock({ focused: focused, onSetIsFocused }) : visibleBlock}

      {focused &&
        <Component>
          <Styled.ItemContainer
            id="DropDownChildren"
            width={width}
            position={position}
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            exit="closed"
            style={isParentScroll ? setting : {}}
          >
            {typeof popupBlock === 'function' ? popupBlock({
              focused: focused,
              onSetIsFocused,
              ItemTag: Styled.Item,
              variants: itemVariants
            }) : popupBlock}
          </Styled.ItemContainer>
        </Component>
      }
    </Styled.Wrapper>
  );
};
