import { IIconInput, IInputDefault, IMargin } from '@/module/common/types';
import { KeyboardEvent, RefObject } from 'react';

export interface IInputProps extends IMargin, IInputDefault {
  type?: 'password' | 'email' | 'text' | 'number';
  isAutoComplete?: boolean;
  isAutoFocus?: boolean;
  isSpellCheck?: boolean;
  height?: string;
  width?: string;
  readOnly?: boolean;
  isDontChange?: boolean;
  noFormikValue?: {
    value: string;
    setFieldValue: (name: string, value: string) => void;
    setFieldTouched?: (name: string, isTouched: boolean) => void;
    setFieldFocus?: (name: string, isTouched: boolean) => void;
    error?: string;
    touched?: boolean;
  };
  startIcon?: IIconInput;
  endIcon?: IIconInput;
  optionOnChange?: (
    name: string,
    value: string,
    setFieldValue: (name: string, value: string) => void
  ) => void;
  refProps?: RefObject<HTMLInputElement>;
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
