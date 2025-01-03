import { ReactNode } from 'react';

export interface IDrawerProps {
  slidePosition?: 'left' | 'right' | 'bottom';
  contentPosition?: 'left' | 'right' | 'bottom';
  className?: string;
  children: ReactNode;
  onClose: (arg: boolean) => void;
  open: boolean;
  component?: string;
  style?: any;
}
