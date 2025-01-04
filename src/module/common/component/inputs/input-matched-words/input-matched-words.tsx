import { IIconInput, IMargin } from '@/module/common/types';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import * as Styled from './input-matched-words.styled';
import { Input } from '@/module/common/component';
import { ReactNode, useRef, useState } from 'react';
import { getIn, useFormikContext } from 'formik';
import { functionStub } from '@/utils';
import { useClickOutside } from '@/module/common/hooks';


type Obj = Record<string, unknown>
type Item = Obj | string;
type Items = Item[];

type IInputMatchedWordsProps<T extends Items> = IMargin & {
  name: string;

  items: T;
  visibleItem?: T extends Obj[] ? keyof T[number] : never | undefined;
  parseValue?: (value: string, valueObj: T[number]) => unknown;
  label?: string | ReactNode | {
    text: string | ReactNode,
    required?: boolean
  };
  placeholder?: string;
  startIcon?: IIconInput;

  width?: string;
  readOnly?: boolean;

  noFormikValue?: {
    value: T[number];
    setFieldValue: (name: string, value: T[number]) => void;
    error?: string,
  };
}

//TODO add filtering

export const InputMatchedWords = <T extends Items>({
                                                     name,
                                                     placeholder, label,
                                                     visibleItem,
                                                     items,
                                                     readOnly,
                                                     noFormikValue,
                                                     startIcon,
                                                     parseValue,
                                                     ...props
                                                   }: IInputMatchedWordsProps<T>) => {

  const [focused, setFocused] = useState(false);

  const inputHintBlockRef = useRef<HTMLUListElement | null>(null);


  const { setFieldValue, value, error } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        error: '',
        setFieldValue: noFormikValue.setFieldValue

      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { values, setFieldValue, errors } = useFormikContext();

      return {
        value: getIn(values, name),
        error: getIn(errors, name),
        setFieldValue
      };
    }
  })();

  const onClickHintOption = (item: Item) => {
    setFieldValue(name, item);
    setFocused(false);
  };

  const visibleValue = visibleItem ? (value ?? {})[visibleItem] : value ?? '';

  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
    }
  });
  return (
    <Styled.Wrapper $focused={focused} {...props} ref={ref}>
      <Input
        name={name}
        placeholder={placeholder}
        label={label}
        {...(startIcon ? { startIcon } : {})}
        endIcon={{
          icon: arrowBottom,
          height: '1.5rem',
          onClick: () => {
            setFocused(!focused);
          },
          cursor: 'pointer'
        }}
        noFormikValue={{
          value: visibleValue,
          setFieldValue: functionStub,
          error,
          setFieldFocus: (_, isTouched) => {
            setFocused(isTouched);
          }
        }}
        isDontChange
        readOnly={readOnly}
      />

      {items?.length > 0 && (
        <Styled.SuggestedBlock id="SuggestedBlock" ref={inputHintBlockRef}>
          {items.map((item, ind) => {
            const visible = visibleItem ? item[visibleItem] : item;
            const selected = visible === visibleValue;

            const _visible = parseValue ? parseValue(visible as string, item) : visible;
            return (
              <Styled.HintOption
                key={`${ind}}`}
                $isChip={false}
                $selected={selected}
                $padding={undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickHintOption(item);
                }
                }
              >
                {_visible as string | ReactNode}
              </Styled.HintOption>
            );
          })}
        </Styled.SuggestedBlock>
      )}
    </Styled.Wrapper>
  );
};
