import { ReactNode } from 'react';

export type PositionType = 'bottom' | 'top' | 'left' | 'right' ;
export type ContentPositionType = PositionType | 'center';


export interface IDrawerProps {
  slidePosition?: ContentPositionType;
  contentPosition?: ContentPositionType;
  children: ReactNode;
  onClose: () => void;
  open: boolean;
}

