import {ReactNode, RefObject, useState} from 'react';

import {useClickOutside, usePortalPositioning} from '@/module/common/hooks';
import {functionStub} from '@/utils';

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
    position?: 'left' | 'right' | 'rightBlock';
    padding?: string;
    isHover?: boolean;
    width?: string;
    onClick?: (flag: boolean) => void;
    className?: string;
}

export const DropDown = ({
                             title,
                             children,
                             position,
                             isHover,
                             width,
                             padding,
                             onClick,
                             className
                         }: IDropDownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSetIsOpen = (flag?: boolean) => {
        setIsOpen(flag ?? false);
        onClick && onClick(flag ?? false);
    };
    const {ref} = useClickOutside(() => onSetIsOpen());
    // const titleRef = useRef<null | HTMLDivElement>(null);

    const [focused, setFocused] = useState(false);
    const { setting, Component, isParentScroll } = usePortalPositioning(ref.current, focused, true);

    const Children = Styled.Children(Component.toString().includes('fragment') ? 'div' : Component);
    return (
        <Styled.Wrapper
            ref={ref as RefObject<HTMLDivElement>}
            onMouseEnter={isHover ? onSetIsOpen.bind(this, true) : functionStub}
            onMouseLeave={isHover ? onSetIsOpen.bind(this, false) : functionStub}
            id='DropDown'
            className={className ? className : ''}
        >
            {/*<Styled.TitleWrapper*/}
            {/*    // ref={titleRef}*/}
            {/*    id='DropDownTitle'*/}
            {/*    $isOpen={isOpen}*/}
            {/*    onClick={(e) => {*/}
            {/*        e.stopPropagation();*/}
            {/*        onSetIsOpen(!isOpen);*/}
            {/*    }}*/}
            {/*    className='drop-down-title-wrapper'*/}
            {/*>*/}
                {typeof title === 'function' ? title({isOpen: isOpen, onSetIsOpen}) : title}
            {/*</Styled.TitleWrapper>*/}
            {isOpen && (
                <Children
                    style={{width: isParentScroll ? setting.width : (ref?.current?.clientWidth ?? width ?? '18.75rem')}}>
                    {/*    <Styled.SuggestedBlock*/}
                    {/*        id="SuggestedBlock"*/}
                    {/*        ref={childrenRef}*/}
                    {/*        $position={(filterOption as filterOptionNew)?.position}*/}
                    {/*        style={isParentScroll ? setting : {}}*/}
                    {/*    >*/}
                    {/*        {isOpen && (*/}
                    {/*            <Styled.ChildrenWrapper*/}
                    {/*                className='drop-down-children-wrapper'*/}
                    {/*                position={position}*/}
                    {/*                $isOpen={isOpen}*/}
                    {/*                width={padding === '0' ? titleRef?.current?.offsetWidth + 'px' : minWidthChildren}*/}
                    {/*                padding={padding}*/}
                    {/*            >*/}
                    {typeof children === 'function' ? children({isOpen: isOpen, onSetIsOpen}) : children}
                    {/*</Styled.ChildrenWrapper>*/}
                    {/*)}*/}
                    {/*    </Styled.SuggestedBlock>*/}
                </Children>
            )}
        </Styled.Wrapper>
    );
};
