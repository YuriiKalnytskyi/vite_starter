import { ReactNode, RefObject, useState } from 'react';

import { useClickOutside, usePortalPositioning } from '@/module/common/hooks';
import { functionStub } from '@/utils';

import * as Styled from './drop-down.style.ts';
import { IMargin } from '@/module/common/types';

interface IDropDownProps extends IMargin{
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
      onSetIsFocused(false);
  });

  const { setting, Component, isParentScroll } = usePortalPositioning(ref.current, focused);


  return (
    <Styled.Wrapper
      ref={ref as RefObject<HTMLDivElement>}
      onMouseEnter={isHover ? onSetIsFocused.bind(this, true) : functionStub}
      onMouseLeave={isHover ? onSetIsFocused.bind(this, false) : functionStub}
      onClick={isClick ? onSetIsFocused.bind(this, !focused) : functionStub}
      width={width}
      {...props}
    >
      {typeof visibleBlock === 'function' ? visibleBlock({ focused: focused, onSetIsFocused }) : visibleBlock}

      {focused && (
        <Component>
          <Styled.ItemContainer
            id="DropDownChildren"
            width={width}
            position={position}
            style={{ width: isParentScroll ? setting.width : (ref?.current?.clientWidth ?? width ?? '18.75rem') }}
          >
            {typeof popupBlock === 'function' ? popupBlock({
              focused: focused,
              onSetIsFocused,
              ItemTag: Styled.Item
            }) : popupBlock}
          </Styled.ItemContainer>


        </Component>
      )}
    </Styled.Wrapper>
  );
};
