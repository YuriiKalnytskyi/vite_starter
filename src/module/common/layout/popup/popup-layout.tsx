import {MouseEvent, ReactNode} from 'react';

import '@/styles/popup-layout.css';

import * as Styled from './popup-layout.styled';
import {Drawer} from "@/module/common/component";
import {ContentPositionType} from "@/module/common/types";
import {useIsMobile} from "@/module/common/hooks";

export interface IPopupLayout {
    onClose: () => void;
    children?: ReactNode;
    width?: string;
    minWidth?: string;
    slidePosition: ContentPositionType;
    contentPosition: ContentPositionType;
    height?: string;
    open: boolean;
}

export const PopupLayout = ({
                                children,
                                onClose,
                                open,
                                contentPosition = 'center',
                                slidePosition = 'right',
                                ...props
                            }: IPopupLayout) => {
    const contentPositionProps = useIsMobile()
        ? ['bottom', 'top', 'left', 'right'].includes(contentPosition)
            ? contentPosition
            : 'center'
        : ['bottom', 'top', 'left', 'right'].includes(contentPosition)
            ? 'center'
            : contentPosition;

    return (
        <Drawer
            onClose={onClose}
            open={open}
            slidePosition={slidePosition}
            contentPosition={contentPositionProps}
        >

            <div className={`popup ${contentPositionProps} above-all`} onClick={onClose}>
                <Styled.Container
                    $type={contentPositionProps}
                    {...props}
                    onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    <Styled.CloseBtn onClick={onClose}/>
                        {children}
                </Styled.Container>
            </div>

        </Drawer>
    )

};

export interface IPopupLayoutBottom {
    onClose?: () => void;
    children?: ReactNode;
    styled?: any;
}
