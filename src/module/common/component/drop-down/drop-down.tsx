import {ReactNode, RefObject, useState} from 'react';

import {useClickOutside, usePortalPositioning} from '@/module/common/hooks';
import {functionStub} from '@/utils';

import * as Styled from './drop-down.style.ts';

interface IDropDownProps {
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
                         }: IDropDownProps) => {
    const [focused, setFocused] = useState(false);

    const onSetIsFocused = (flag?: boolean) => {
        setFocused(flag ?? false);
    };

    const {ref} = useClickOutside(() => {
        if (focused) {
            onSetIsFocused();
        }
    });

    const { setting, Component, isParentScroll } = usePortalPositioning(ref.current, focused, true);



    const PopupBlock = Styled.PopupBlock(Component.toString().includes('fragment') ? 'div' : Component);

    return (
        <Styled.VisibleBlock
            ref={ref as RefObject<HTMLDivElement>}
            onMouseEnter={isHover ? onSetIsFocused.bind(this, true) : functionStub}
            onMouseLeave={isHover ? onSetIsFocused.bind(this, false) : functionStub}
            onClick={isClick ? onSetIsFocused.bind(this, !focused) : functionStub}
            id='DropDown'
        >

                {typeof visibleBlock === 'function' ? visibleBlock({focused: focused, onSetIsFocused}) : visibleBlock}

            {focused && (
                <PopupBlock
                    width={width}
                    position={position}
                    style={{width: isParentScroll ? setting.width : (ref?.current?.clientWidth ?? width ?? '18.75rem')}}
                >
                    {typeof popupBlock === 'function' ? popupBlock({focused: focused, onSetIsFocused}) : popupBlock}

                </PopupBlock>
            )}
        </Styled.VisibleBlock>
    );
};
