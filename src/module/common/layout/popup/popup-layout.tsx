import { MouseEvent, ReactNode } from 'react';

import '@/styles/popup-layout.css';

import * as Styled from './popup-layout.styled';

export interface IPopupLayout {
  onClose?: () => void;
  children?: ReactNode;
  width?: string;
  minWidth?: string;
  type: 'bottom';
  height?: string
}

export const PopupLayout = ({ children, onClose,  type, ...props  }: IPopupLayout) => (
  <div className={`popup ${type} above-all`} onClick={onClose}>
    <Styled.Container
      $type={type}
      {...props}
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
