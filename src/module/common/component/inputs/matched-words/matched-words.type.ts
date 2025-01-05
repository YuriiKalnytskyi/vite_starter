import { IIconInput, IInputDefault, IMargin } from '@/module/common/types';
export type Obj = Record<string, unknown>;
export type Item = Obj | string;
export type Items = Item[];

type BaseFilterOption = {
  includes: 'includes' | 'startsWith';
  type: 'sort' | 'filter';
};

export type filterOptionNew = BaseFilterOption & {
  mode: 'new';
  position?: 'sticky' | 'static';
};

type filterOptionDefault = BaseFilterOption & {
  mode: 'default';
  isSavePreviousSelection?: boolean;
};

export type FilterOptions = filterOptionNew | filterOptionDefault;

type IParseValue<I extends Items> = (value: string, valueObj: I[number]) => unknown;

type IInputMatchedWordsTypeMulti<I extends Items> = {
  mode: 'multi';
  parseValue?: IParseValue<I>;
  addNewItem?:
    | {
    onClick?: () => void;
  }
    | boolean;
};

export type IInputMatchedWordsType<I extends Items> = IInputMatchedWordsTypeMulti<I>;

export type IInputMatchedWordsProps<
  I extends Items,
  F extends FilterOptions,
  T extends IInputMatchedWordsType<I>
> = IMargin & IInputDefault & {
  type?: T;
  filterOption?: F;
  items: I;
  visibleItem?: I extends Obj[] ? keyof I[number] : never | undefined;
  parseValue?: IParseValue<I>;

  startIcon?: IIconInput;

  width?: string;
  readOnly?: boolean;

  noFormikValue?: {
    value: T extends IInputMatchedWordsType<I> ? I[number][] : I[number];
    setFieldValue: (name: string, value: I[number] | I[number][]) => void;
    error?: string;
  };
};
