import { ReactNode } from 'react';
import { DateRange, DaySelectionMode } from 'react-day-picker';

import { IMargin } from './styles.type';
import { IInputProps } from '@/module/common/component';
import { IWProps } from '@/module/common/component/inputs/input/input.styled.ts';

interface ISize {
  height?: string;
  width?: string;
}

interface IInputDefault {
  name: string;
  label?: string;
  placeholder?: string;
}

export interface IInputPropsStyles {
  innerPads?: string;
  isError?: boolean;
  gapFromLabel?: string;
  placeholderColor?: string;
}
export type IOnSetValue = (name: string, value: string) => void;
export interface IInputMatchedWordsProps extends IWProps, ISize, IInputDefault {
  matchedWords: string[] | any[];
  isFilter?: boolean;
  isChip?: boolean;
  isDontChange?: boolean;
  isInput?: boolean;
  innerPads?: string;
  readOnly?: boolean;
  readOnlyKeyboard?: boolean;
  focused?: boolean;
  isEdit?: boolean;
  isFilterVisibleAllData?: boolean;
  visibleItem?: string;
  visibleIcon?: string;
  isAutoComplete?: boolean;
  isRequiredArrow?: boolean;
  noFormikValue?: { value: string | { name: string; icon: string }; onSetValue: IOnSetValue };
}

export interface IInputMatchedWordsDynamic extends IMargin, ISize, IInputDefault {
  readOnly?: boolean;
}

export interface IInputMask extends IInputProps, Omit<IInputDefault, 'placeholder' | 'label'> {
  mask: string;
  label: string;
  name: string;
  isHidePhone?: boolean;
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

export interface ICheckBox extends IMargin {
  label: string;
  onClick: () => void;
  isChecked: boolean;
  height?: string;
  colorText?: string;
  background?: string;
}

export interface ISwitch {
  name: string;
  label?: string;
}

export interface ICheckBoxFormik extends IMargin, Omit<IInputDefault, 'placeholder' | 'label'> {
  name: string;
  label: string | ReactNode | any;
  labelValue?: string;
  height?: string;
  colorText?: string;
  background?: string;
  isMulti?: boolean;
  visibleItem?: string
  noFormikValue?: { value: boolean; onSetValue: (name: string, value: boolean) => void };
}
export type DateSelection = DateRange | Date[] | Date | undefined;

export interface ICalendarProps extends IWProps {
  name: string;
  label: string;
  width?: string;
  height?: string;
  placeholder?: string;
  isIcon?: boolean;
  numberOfMonths?: number;
  noFormikValue?: {
    value: DateSelection;
    onSetValue: (name: string, value: DateSelection) => void;
  };
  disabledDay?: Date;
  mode?: DaySelectionMode | undefined;
  isFlexLabel?: boolean;
  isSelectYearOrMounts?: { fromYear?: number; toYear?: number };
}
