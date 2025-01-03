import { MouseEvent, ReactNode } from 'react';

import '@/styles/popup-layout.css';

import * as Styled from './popup-layout.styled';

export interface IPopupLayout {
  onClose?: () => void;
  children?: ReactNode;
  width?: string;
  minWidth?: string;
}

export const PopupLayout = ({ children, onClose, width, minWidth }: IPopupLayout) => (
  <div className='confirm_purchase above-all' onClick={onClose} style={{ height: '100dvh' }}>
    <Styled.Container
      width={width}
      minWidth={minWidth}
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <Styled.CloseBtn onClick={onClose} />

      {children}
    </Styled.Container>
  </div>
);

export interface IPopupLayoutBottom {
  onClose?: () => void;
  children?: ReactNode;
  styled?: any;
}

export const PopupLayoutBottom = ({ children, onClose, styled }: IPopupLayoutBottom) => (
  <div className='confirm_purchase2 above-all' onClick={onClose} style={{ height: '100dvh' }}>
    <Styled.ContainerBottom
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      styled={styled}
    >
      <Styled.CloseBtn onClick={onClose} />

      {children}
    </Styled.ContainerBottom>
  </div>
);
