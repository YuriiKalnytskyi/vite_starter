import { IMargin } from './styles.type';
import { ReactNode } from 'react';

export interface IInputDefault {
  name: string;
  label?:
    | string
    | ReactNode
    | {
    text: string | ReactNode;
    required?: boolean;
  };
  placeholder?: string;
}

export interface IInputPropsStyles {
  innerPads?: string;
  isError?: boolean;
  gapFromLabel?: string;
  placeholderColor?: string;
}


export interface IInputTextareaProps extends IMargin, IInputDefault {
  rows: number;
  margin?: string;
  isEmail?: boolean;
  maxLength?: number;
  resizable?: boolean;
  readOnly?: boolean;

  value?: string;
  onChange?: (value: any) => void;
}


export interface ISwitch {
  name: string;
  label?: string;
}

