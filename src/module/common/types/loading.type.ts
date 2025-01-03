import { HTMLAttributes } from 'react';

export interface ILoadingProps extends HTMLAttributes<HTMLDivElement> {
  withAnimation?: boolean;
}

export interface ILoaderProps {
  margin?: string;
  size?: 'small' | 'medium' | 'large' | 'btnSmall';
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  position?: string;
  translateX?: string;
  translateY?: string;
  color?: string;
  height?: string;
  className?: string;
  id?: string;
}
