import { IIconInput, IMargin } from '@/module/common/types';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import searchIcon from '@/assets/icons/default/search.svg';
import * as Styled from './input-matched-words.styled';
import { Input } from '@/module/common/component';
import { ReactNode, useRef, useState } from 'react';
import { getIn, useFormikContext } from 'formik';
import { useClickOutside } from '@/module/common/hooks';

type Obj = Record<string, unknown>
type Item = Obj | string;
type Items = Item[];

type filterOptionNew = {
  mode: 'new';
  position?: string;
  includes: 'includes' | 'startsWith'
};

type filterOptionDefault = {
  mode: 'default';
  position?: 'sticky' | 'static';
  includes: 'includes' | 'startsWith'
};

type FilterOptions = filterOptionNew | filterOptionDefault;


type IInputMatchedWordsProps<T extends Items, F extends FilterOptions> = IMargin & {
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
  filterOption?: F;
}

//TODO filterOption.includes improve the text matching logic
//TODO when filterOption.mode === 'new' move focus to search input
//TODO search input correct startIcon
//TODO add a block that will reflect that there are no such items according to the entered search
//TODO  make logic with display of many items
//TODO  make logic that will allow you to add new items quite easily
//TODO check for errors

export const InputMatchedWords = <T extends Items, F extends FilterOptions>({
                                                                              name,
                                                                              placeholder, label,
                                                                              visibleItem,
                                                                              items,
                                                                              readOnly,
                                                                              noFormikValue,
                                                                              startIcon,
                                                                              parseValue,
                                                                              filterOption,
                                                                              ...props
                                                                            }: IInputMatchedWordsProps<T, F>) => {

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


  const onTransformValue = (_value: Item): string => {
    if (visibleItem && typeof _value === 'object' && _value !== null) {
      return String((_value as Obj)[visibleItem] ?? '');
    }
    return String(_value ?? '');
  };

  const visibleValue = onTransformValue(value);

  const [search, setSearch] = useState(filterOption?.mode === 'default' ? visibleValue : '');


  const onClickHintOption = (item: Item) => {
    setFieldValue(name, item);
    setFocused(false);
    setSearch(filterOption?.mode === 'default' ? onTransformValue(item) : '');
  };


  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
      setSearch(filterOption?.mode === 'default' ? visibleValue : '');
    }
  });


  const _items = search.length ?
    filterOption?.mode === 'default' ?
      items.sort((a, b) => {
        const aVisible = (visibleItem ? a[visibleItem] : a).toString().toLowerCase();
        const bVisible = (visibleItem ? b[visibleItem] : b).toString().toLowerCase();

        const aIncludes = aVisible.includes(search.toLowerCase());
        const bIncludes = bVisible.includes(search.toLowerCase());

        if (aIncludes && bIncludes) return 0;

        if (aIncludes) return -1;

        if (bIncludes) return 1;

        return 0;
      })
      :
      items.filter((item) => {
        const visible = (visibleItem ? item[visibleItem] : item).toString().toLowerCase();
        return visible.includes(search.toLowerCase());
      })
    : items;

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
          value: filterOption?.mode === 'default' ? search : visibleValue,
          setFieldValue: (_, value) => {
            filterOption?.mode === 'default' && setSearch(value);
          },
          error,
          setFieldFocus: (_, isTouched) => {
            setFocused(isTouched);
          }
        }}
        isDontChange={filterOption?.mode !== 'default'}
        readOnly={readOnly}
      />

      {items?.length > 0 && (
        <Styled.SuggestedBlock
          id="SuggestedBlock" ref={inputHintBlockRef}
          $position={(filterOption as filterOptionDefault)?.position}
        >

          {
            filterOption && filterOption.mode === 'new' ? (
              <div id="search">
                <Input
                  height="3rem"
                  width="80%"
                  name="search"
                  noFormikValue={{
                    value: search,
                    setFieldValue: (_, value) => setSearch(value)
                  }}
                  isAutoFocus
                  startIcon={{
                    icon: searchIcon
                  }}
                />
              </div>
            ) : null
          }

          {_items.map((item, ind) => {
            const visible = onTransformValue(item);
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
