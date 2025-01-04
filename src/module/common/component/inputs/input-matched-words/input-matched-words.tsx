import { IIconInput, IMargin } from '@/module/common/types';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import searchIcon from '@/assets/icons/default/search.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';

import * as Styled from './input-matched-words.styled';
import { Input } from '@/module/common/component';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { getIn, useFormikContext } from 'formik';
import { useClickOutside } from '@/module/common/hooks';
import { useTranslation } from 'react-i18next';
import { IconCommon } from '@/module/common/styles';
import { COLORS } from '@/theme';

type Obj = Record<string, unknown>
type Item = Obj | string;
type Items = Item[];


type BaseFilterOption = {
  includes: 'includes' | 'startsWith';
  type: 'sort' | 'filter';
};

type filterOptionNew = BaseFilterOption & {
  mode: 'new';
  position?: 'sticky' | 'static';
};

type filterOptionDefault = BaseFilterOption & {
  mode: 'default';
  isSavePreviousSelection?: boolean
};

type FilterOptions = filterOptionNew | filterOptionDefault;


type IParseValue<I extends Items> = (value: string, valueObj: I[number]) => unknown;


type IInputMatchedWordsTypeMulti<I extends Items> = {
  mode: 'multi';
  parseValue?: IParseValue<I>;
  addNewItem?: {
    onClick?: () => void
  } | boolean
};

type IInputMatchedWordsType<I extends Items> = IInputMatchedWordsTypeMulti<I>;


type IInputMatchedWordsProps<I extends Items, F extends FilterOptions, T extends IInputMatchedWordsType<I>> =
  IMargin
  & {
  name: string;
  type?: T
  filterOption?: F;
  items: I;
  visibleItem?: I extends Obj[] ? keyof I[number] : never | undefined;
  parseValue?: IParseValue<I>;
  label?: string | ReactNode | {
    text: string | ReactNode,
    required?: boolean
  };
  placeholder?: string;
  startIcon?: IIconInput;

  width?: string;
  readOnly?: boolean;

  noFormikValue?: {
    value: T extends IInputMatchedWordsType<I> ? I[number][] : I[number];
    setFieldValue: (name: string, value: I[number] | I[number][]) => void;
    error?: string;
  };
}

//TODO search input correct startIcon
//TODO search input correct plasIcom
//TODO check for errors

const onTransformValue = (_value: Item, visibleItem?: string): string => {
  if (visibleItem && typeof _value === 'object' && _value !== null) {
    return String((_value as Obj)[visibleItem] ?? '');
  }
  return String(_value ?? '');
};

export const InputMatchedWords = <I extends Items, F extends FilterOptions, T extends IInputMatchedWordsType<I>>({
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
  const [newItemFlag, setNewItemFlag] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState(filterOption?.mode === 'default' ? visibleValue : '');

  const inputHintBlockRef = useRef<HTMLUListElement | null>(null);


  useEffect(() => {
    if (filterOption?.mode === 'default' && search !== visibleValue) {
      setSearch(visibleValue);
    }
  }, [visibleValue, filterOption]);

  const addItem = (item: Item) => {
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

  const deleteItem = (item: Item) => {
    if (type && type.mode === 'multi') {
      const nextValue = (value as Item[])?.filter((v: any) => {
        const transfonmValue = onTransformValue(v, visibleItem).toLowerCase();
        const deleteValue = onTransformValue(item, visibleItem).toLowerCase();
        return transfonmValue !== deleteValue;
      });

      setFieldValue(name, nextValue);
    }
  };


  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
      setSearch(filterOption?.mode === 'default' ? visibleValue : '');
    }
  });

  const filterItems = () => {
    if (
      search.length && filterOption && filterOption?.type === 'sort' ||
      (filterOption && filterOption.type === 'filter' && filterOption.mode === 'default' && filterOption.isSavePreviousSelection)
    ) {
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
    if (filterOption?.mode === 'new' && (type && type.mode === 'multi' && type.addNewItem && !newItemFlag)) {
      searchInputRef.current?.focus();
    }
  };

  return (
    <Styled.Wrapper $focused={newItemFlag ? false : focused} $newItemFlag={newItemFlag} {...props} ref={ref}>
      {
        type && type.mode === 'multi' && type.addNewItem ? (
          <IconCommon id="addOrCloseIcon" icon={closeIcon} onClick={(e) => {
            e.stopPropagation();
            if (typeof type.addNewItem === 'object' && type.addNewItem.onClick) {
              type.addNewItem?.onClick();
              return;
            }

            if (newItemFlag) {
              setNewItemFlag(false);
              setFocused(false);
              setNewItem('');

              return;
            }

            setNewItemFlag(true);
            mainInputRef.current?.focus();

          }
          } />
        ) : null
      }
      <Input
        name={name}
        placeholder={placeholder}
        label={label}
        {...(startIcon ? { startIcon } : {})}
        endIcon={{
          icon: newItemFlag ? closeIcon : arrowBottom,
          height: newItemFlag ? '1rem' : '1.5rem',
          width: newItemFlag ? '1rem' : '1.5rem',
          onClick: () => {
            if (newItemFlag) {
              addItem(visibleItem ? {[visibleItem]: newItem} : newItem)
              setNewItem('');
              setNewItemFlag(false);

              return;
            }
            setFocused(!focused);
            handleFocus();
          },
          cursor: 'pointer'
        }}
        noFormikValue={{
          value: newItemFlag ? newItem : _value,
          setFieldValue: (_, value) => {
            newItemFlag && setNewItem(value);
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
        isDontChange={newItemFlag ? false : filterOption?.mode !== 'default'}
        readOnly={readOnly}
        refProps={mainInputRef}
      />

      {items?.length > 0 && (
        <Styled.SuggestedBlock
          id="SuggestedBlock" ref={inputHintBlockRef}
          $position={(filterOption as filterOptionNew)?.position}
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
              const isChip = type && Array.isArray(value) && type.mode === 'multi' && ((value ?? []) as Item[]).find((v) => onTransformValue(v, visibleItem).toLowerCase() === onTransformValue(item, visibleItem).toLowerCase());

              return (
                <Styled.HintOption
                  key={`${ind}}`}
                  $isChip={!!isChip}
                  $selected={selected}
                  onClick={addItem.bind(this, item)}
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

      {type && type.mode === 'multi' && (value as Item[])?.length ? (
        <Styled.ChipContainer>
          {(value as Item[]).map((item, index) => {
              const visible = onTransformValue(item, visibleItem);
              const _visible = type.parseValue ? type.parseValue(visible, item) : onTransformValue(item, visibleItem);
              return (
                <Styled.Chip
                  key={index}>
                  {_visible as string | ReactNode}
                  <IconCommon
                    height="0.625rem"
                    cursor="pointer"
                    icon={closeIcon}
                    background={COLORS.black}
                    onClick={deleteItem.bind(this, item)}
                  />
                </Styled.Chip>
              );
            }
          )}
        </Styled.ChipContainer>
      ) : null}

    </Styled.Wrapper>
  );
};
