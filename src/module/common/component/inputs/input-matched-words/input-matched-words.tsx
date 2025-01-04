import { IIconInput, IMargin } from '@/module/common/types';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import searchIcon from '@/assets/icons/default/search.svg';
import * as Styled from './input-matched-words.styled';
import { Input } from '@/module/common/component';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { getIn, useFormikContext } from 'formik';
import { useClickOutside } from '@/module/common/hooks';
import { useTranslation } from 'react-i18next';

type Obj = Record<string, unknown>
type Item = Obj | string;
type Items = Item[];

type filterOptionNew = {
  mode: 'new';
  includes: 'includes' | 'startsWith'
  type: 'sort' | 'filter'
};

type filterOptionDefault = {
  mode: 'default';
  includes: 'includes' | 'startsWith'
  type: 'sort' | 'filter'
  position?: 'sticky' | 'static';
};

type FilterOptions = filterOptionNew | filterOptionDefault;


type  IInputMatchedWordsTypeMulti = {
  mode: 'multi';
}

type IInputMatchedWordsType = IInputMatchedWordsTypeMulti


type IInputMatchedWordsProps<I extends Items, F extends FilterOptions, T extends IInputMatchedWordsType> = IMargin & {
  name: string;
  type?: T
  filterOption?: F;
  items: I;
  visibleItem?: I extends Obj[] ? keyof I[number] : never | undefined;
  parseValue?: (value: string, valueObj: I[number]) => unknown;
  label?: string | ReactNode | {
    text: string | ReactNode,
    required?: boolean
  };
  placeholder?: string;
  startIcon?: IIconInput;

  width?: string;
  readOnly?: boolean;

  noFormikValue?: {
    // value: I[number] | any[]; //TODO
    // setFieldValue: (name: string, value: I[number]) => void;

    value: T extends IInputMatchedWordsTypeMulti ? I[number][] : I[number];
    setFieldValue: (name: string, value: I[number] | I[number][]) => void;


    error?: string;
  };

}

//TODO search input correct startIcon
//TODO  make logic with display of many items
//TODO  make logic that will allow you to add new items quite easily
//TODO check for errors

const onTransformValue = (_value: Item, visibleItem?: string): string => {
  if (visibleItem && typeof _value === 'object' && _value !== null) {
    return String((_value as Obj)[visibleItem] ?? '');
  }
  return String(_value ?? '');
};

export const InputMatchedWords = <I extends Items, F extends FilterOptions, T extends IInputMatchedWordsType>({
                                                                                                                name,
                                                                                                                placeholder,
                                                                                                                type,
                                                                                                                label,
                                                                                                                visibleItem,
                                                                                                                items,
                                                                                                                readOnly,
                                                                                                                noFormikValue,
                                                                                                                startIcon,
                                                                                                                parseValue,
                                                                                                                filterOption,
                                                                                                                ...props
                                                                                                              }: IInputMatchedWordsProps<I, F, T>) => {

  const { setFieldValue, value, error } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        error: noFormikValue?.error ?? '',
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

  const { t: translate } = useTranslation();

  const visibleValue = onTransformValue(value, visibleItem);

  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState(filterOption?.mode === 'default' ? visibleValue : '');

  const inputHintBlockRef = useRef<HTMLUListElement | null>(null);


  useEffect(() => {
    if (filterOption?.mode === 'default' && search !== visibleValue) {
      setSearch(visibleValue);
    }
  }, [visibleValue, filterOption]);

  const onClickHintOption = (item: Item) => {
    if (type && type.mode === 'multi') {
      if (Array.isArray(value)) {
        const isAlreadyAdded = value.find((v) => onTransformValue(v, visibleItem).toLowerCase() === onTransformValue(item, visibleItem).toLowerCase());
        !isAlreadyAdded && setFieldValue(name, ([...value, item] as Item[]));
      } else {
        setFieldValue(name, [item] as Item[]);
      }
      setSearch('');

    } else {
      setFieldValue(name, item as I[number]);
      setSearch(filterOption?.mode === 'default' ? onTransformValue(item, visibleItem) : '');
    }

    setFocused(false);
  };


  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
      setSearch(filterOption?.mode === 'default' ? visibleValue : '');
    }
  });

  const filterItems = () => {
    if (search.length && filterOption && filterOption?.type === 'sort') {
      return items.sort((a, b) => {
        const aVisible = onTransformValue(a, visibleItem).toString().toLowerCase();
        const bVisible = onTransformValue(b, visibleItem).toString().toLowerCase();

        const aIncludes = aVisible[filterOption.includes](search.toLowerCase());
        const bIncludes = bVisible[filterOption.includes](search.toLowerCase());

        if (aIncludes && bIncludes) return 0;

        if (aIncludes) return -1;

        if (bIncludes) return 1;

        return 0;
      });
    }

    if (search.length && filterOption && filterOption?.type === 'filter') {
      return items.filter((item) => {
        const visible = (visibleItem ? item[visibleItem] : item).toString().toLowerCase();
        return visible[filterOption.includes](search.toLowerCase());
      });
    }

    return items;
  };

  const valueType = () => {
    if ((type && type.mode === 'multi') || (filterOption && filterOption?.mode === 'default')) {
      return search;
    }
    return visibleValue;
  };

  const _value = valueType();

  const _items = filterItems();

  const handleFocus = () => {
    if (filterOption?.mode === 'new') {
      searchInputRef.current?.focus();
    }
  };

  console.log(value);

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
            handleFocus();
          },
          cursor: 'pointer'
        }}
        noFormikValue={{
          value: _value,
          setFieldValue: (_, value) => {
            filterOption?.mode === 'default' && setSearch(value);
          },
          error,
          setFieldFocus: (_, isTouched) => {
            setFocused(isTouched);
            handleFocus();
          }
        }}
        onClick={() => {
          handleFocus();
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
                  refProps={searchInputRef}
                  height="3rem"
                  width="80%"
                  name="search"
                  noFormikValue={{
                    value: search,
                    setFieldValue: (_, value) => setSearch(value)
                  }}
                  startIcon={{
                    icon: searchIcon
                  }}
                  isAutoFocus
                />
              </div>
            ) : null
          }
          {_items.length ? _items.map((item, ind) => {
              const visible = onTransformValue(item, visibleItem);
              const selected = visible === visibleValue;

              const _visible = parseValue ? parseValue(visible as string, item) : visible;
              const isChip =  type && type.mode === 'multi' &&  ((value ?? []) as Item[]).find((v  ) => onTransformValue(v, visibleItem).toLowerCase() === onTransformValue(item, visibleItem).toLowerCase());

              return (
                <Styled.HintOption
                  key={`${ind}}`}
                  $isChip={!!isChip}
                  $selected={selected}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickHintOption(item);
                  }
                  }
                >
                  {_visible as string | ReactNode}
                </Styled.HintOption>
              );
            }) :
            <Styled.HintOption
              $isChip={false}
              $selected={false}
              className="notFound"

            >
              {translate('common.not_found_item')}
            </Styled.HintOption>
          }
        </Styled.SuggestedBlock>
      )}
    </Styled.Wrapper>
  );
};
