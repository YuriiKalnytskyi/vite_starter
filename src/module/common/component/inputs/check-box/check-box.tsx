import { getIn, useFormikContext } from 'formik';
import {KeyboardEvent} from 'react'

import { IMargin } from '@/module/common/types';

import * as Styled from './check-box.styled.ts';

type Obj = Record<string, unknown>;
type Item = Obj | string;
type Items = Item[];

type TODO_ANY = any;

interface IDefaultProps {
  type: 'default';
  items: Obj | string;
  visibleItem?: string;
  noFormikValue?: {
    value: boolean;
    onSetValue: (name: string, value: unknown) => void;
  };
}

interface IRadioProps<T extends Items> {
  type: 'radio';
  items: T;
  visibleItem?: T extends Obj[] ? keyof T[number] : never | undefined;
  noFormikValue?: {
    value: boolean;
    onSetValue: (name: string, value: unknown) => void;
  };
}

interface IMultiProps<T extends Items> {
  type: 'multi';
  items: T;
  visibleItem?: T extends Obj[] ? keyof T[number] : never | undefined;
  noFormikValue?: {
    value: boolean;
    onSetValue: (name: string, value: unknown) => void;
    setValues: TODO_ANY;
  };
}

type ICheckBox<T extends Items> = IMargin & {
  name: string;
} & (IDefaultProps | IRadioProps<T> | IMultiProps<T>);

interface ICheckBoxIndex extends IMargin {
  name: string;
  type: string;
  checked: boolean;
  onChange: () => void;
  label: string | unknown;
  onDoubleClick?: () => void;
}

const CheckBoxIndex = ({
  name,
  checked,
  onChange,
  label,
  type,
  onDoubleClick,
  ...props
}: ICheckBoxIndex) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      onChange();
    }
  };
  return (
    <Styled.Label tabIndex={0} {...props} onDoubleClick={onDoubleClick}  onKeyDown={handleKeyDown}>
      <Styled.Input name={name} type='checkbox' checked={checked} onChange={onChange} />
      <Styled.Span className='text' type={type}>
        <span>{(label as string).toString()}</span>
      </Styled.Span>
    </Styled.Label>
  );
};

export const CheckBox = <T extends Items>({
  name,
  type,
  items,
  visibleItem,
  noFormikValue,
  ...props
}: ICheckBox<T>) => {
  const { setFieldValue, value, setValues } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.onSetValue,
        setValues: type === 'multi' ? noFormikValue.setValues : null
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { values, setFieldValue, setValues } = useFormikContext();
      return {
        value: getIn(values, name),
        setFieldValue: setFieldValue,
        setValues: type === 'multi' ? setValues : null
      };
    }
  })();

  const onChangeDefault = () => {
    const _value = visibleItem ? (value ? null : items) : !value;
    setFieldValue(name, _value);
  };

  const onChangeRadio = (item: TODO_ANY) => {
    setFieldValue(name, item);
  };

  const findMultiItem = (values: TODO_ANY, item: TODO_ANY) => {
    if (visibleItem) {
      return values.findIndex((v: TODO_ANY) => v[visibleItem] === item[visibleItem]);
    }
    return values.findIndex((v: TODO_ANY) => v === item);
  };

  const onChangeMulti = (item: TODO_ANY) => {
    if (setValues && type === 'multi') {
      setValues((v: any) => {
        const prevValue = getIn(v, name) ?? [];
        const updatedValue = [...(prevValue ?? [])];
        const itemIndex = prevValue ? findMultiItem(prevValue, item) : 1;

        if (itemIndex !== -1) {
          updatedValue.splice(itemIndex, 1);
        } else {
          updatedValue.push(item);
        }

        return { ...v, [name]: updatedValue };
      });
    }
  };

  const defaultProps = {
    name,
    type
  };

  if (type === 'default') {
    return (
      <CheckBoxIndex
        onChange={onChangeDefault}
        checked={!!value}
        label={visibleItem ? (items as Obj)[visibleItem] : items}
        {...defaultProps}
        {...props}
      />
    );
  }
  if (type === 'radio') {
    return (items as Item[]).map((item, index) => {
      return (
        <CheckBoxIndex
          key={`${index}_radio`}
          checked={visibleItem && value ? item[visibleItem] === value[visibleItem] : item === value}
          label={visibleItem ? (item as Obj)[visibleItem] : item}
          onChange={() => {
            onChangeRadio(item);
          }}
          onDoubleClick={() => {
            onChangeRadio(null);
          }}
          {...defaultProps}
          {...props}
        />
      );
    });
  }
  if (type === 'multi') {
    return (items as Item[]).map((item, index) => (
      <CheckBoxIndex
        key={`${index}_radio`}
        checked={findMultiItem(value ?? [], item) >= 0}
        label={visibleItem ? (item as Obj)[visibleItem] : item}
        onChange={() => {
          onChangeMulti(item);
        }}
        {...defaultProps}
        {...props}
      />
    ));
  }
};
