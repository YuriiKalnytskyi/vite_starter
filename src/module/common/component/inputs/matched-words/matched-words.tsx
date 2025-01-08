import { getIn, useFormikContext } from 'formik';
import { ReactNode, KeyboardEvent, useEffect, useRef, useState, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import searchIcon from '@/assets/icons/default/search.svg';
import { Input } from '@/module/common/component';
import { useClickOutside, useHandleKeyPress, usePortalPositioning } from '@/module/common/hooks';
import { IconCommon } from '@/module/common/styles';

import {
  filterOptionNew,
  FilterOptions,
  IInputMatchedWordsProps,
  IInputMatchedWordsType,
  Item,
  Items,
  Obj
} from './matched-words.type.ts';

import * as Styled from './matched-words.styled';
import { useTheme } from 'styled-components';


const onTransformValue = (_value: Item, visibleItem?: string): string => {
  if (visibleItem && typeof _value === 'object' && _value !== null) {
    return String((_value as Obj)[visibleItem] ?? '');
  }
  return String(_value ?? '');
};

export const MatchedWords = <
  I extends Items,
  F extends FilterOptions,
  T extends IInputMatchedWordsType<I>
>({
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
  const {COLORS } = useTheme();


  const visibleValue = onTransformValue(value, visibleItem);

  const [focused, setFocused] = useState(false);
  const [newItemFlag, setNewItemFlag] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState(filterOption?.mode === 'default' ? visibleValue : '');

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);


  useEffect(() => {
    if (filterOption?.mode === 'default' && search !== visibleValue) {
      setSearch(visibleValue);
    }
  }, [visibleValue, filterOption]);

  const addItem = (item: Item) => {
    if (type && type.mode === 'multi') {
      if (Array.isArray(value)) {
        const isAlreadyAdded = value.find(
          (v) =>
            onTransformValue(v, visibleItem).toLowerCase() ===
            onTransformValue(item, visibleItem).toLowerCase()
        );
        !isAlreadyAdded && setFieldValue(name, [...value, item] as Item[]);
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
  const inputHintBlockRef = useRef<HTMLUListElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mainInputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
      setSearch(filterOption?.mode === 'default' ? visibleValue : '');
      if (newItemFlag) {
        setNewItemFlag(false);
        setNewItem('');
      }
    }
  }, [inputHintBlockRef]);

  const filterItems = () => {
    if (
      (search.length && filterOption && filterOption?.type === 'sort') ||
      (filterOption &&
        filterOption.type === 'filter' &&
        filterOption.mode === 'default' &&
        filterOption.isSavePreviousSelection)
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
    if (
      filterOption?.mode === 'new' &&
      type &&
      type.mode === 'multi' &&
      type.addNewItem &&
      !newItemFlag
    ) {
      searchInputRef.current?.focus();
    }
  };
  const handleKeyPressWithProps = (() => {
    return (e: KeyboardEvent<HTMLInputElement>) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useHandleKeyPress(e, {
        setInputValue: (v: Item, index: number | null) => {
          addItem(v);
          setSelectedItemIndex(index);
        },
        selectedItemIndex: selectedItemIndex ?? 0,
        setSelectedItemIndex,
        items,
        ref: inputHintBlockRef
      });
    };
  })();

  const { setting, Component, isParentScroll } = usePortalPositioning(ref.current, focused);

  return (
    <Styled.Wrapper
      $focused={newItemFlag ? false : focused}
      $newItemFlag={newItemFlag}
      {...props}
      ref={ref as RefObject<HTMLDivElement>}
    >
      {type && type.mode === 'multi' && type.addNewItem ? (
        <IconCommon
          id="addOrCloseIcon"
          icon={closeIcon}
          onClick={(e) => {
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
          }}
        />
      ) : null}
      <Input
        name={name}
        width={props.width}
        height={props.height}
        placeholder={placeholder}
        label={label}
        {...(startIcon ? { startIcon } : {})}
        endIcon={{
          icon: newItemFlag ? closeIcon : arrowBottom,
          height: newItemFlag ? '1rem' : '1.5rem',
          width: newItemFlag ? '1rem' : '1.5rem',
          className: focused ? 'rotate' :'',
          onClick: () => {
            if (newItemFlag) {
              addItem(visibleItem ? { [visibleItem]: newItem } : newItem);
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
            if (filterOption?.mode === 'default') {
              setSelectedItemIndex(0);
              setSearch(value);
            }
          },
          error: Array.isArray(error) ? error[0] : error,
          touched: true,
          setFieldFocus: (_, isTouched) => {
            setFocused(isTouched);
            handleFocus();
          }
        }}
        onClick={() => {
          handleFocus();
        }}
        onKeyDown={handleKeyPressWithProps}

        isDontChange={newItemFlag ? false : filterOption?.mode !== 'default'}
        readOnly={readOnly}
        refProps={mainInputRef}
      />

      {items?.length > 0 && focused && (
        <Component>
          <Styled.SuggestedBlock
            id="SuggestedBlock"
            ref={inputHintBlockRef}
            $position={(filterOption as filterOptionNew)?.position}
            style={isParentScroll ? setting : {}}
          >
            {filterOption && filterOption.mode === 'new' ? (
              <div id="search">
                <Input
                  refProps={searchInputRef}
                  height="3rem"
                  width="80%"
                  name="search"
                  noFormikValue={{
                    value: search,
                    setFieldValue: (_, value) => {
                      setSearch(value);
                      setSelectedItemIndex(0);
                    }
                  }}
                  onKeyDown={handleKeyPressWithProps}
                  startIcon={{
                    icon: searchIcon
                  }}
                  isAutoFocus
                />
              </div>
            ) : null}
            {_items.length ? (
              _items.map((item, ind) => {
                const visible = onTransformValue(item, visibleItem);
                const selected = visible === visibleValue;
                const selectedIndex = ind === selectedItemIndex;
                const _visible = parseValue ? parseValue(visible as string, item) : visible;
                const isChip =
                  type &&
                  Array.isArray(value) &&
                  type.mode === 'multi' &&
                  ((value ?? []) as Item[]).find(
                    (v) =>
                      onTransformValue(v, visibleItem).toLowerCase() ===
                      onTransformValue(item, visibleItem).toLowerCase()
                  );

                const onSetSelectedItemIndex = () => {
                  setSelectedItemIndex(ind);
                };

                return (
                  <Styled.HintOption
                    key={`${ind}}`}
                    $isChip={!!isChip}
                    $selected={selected || selectedIndex}
                    onClick={addItem.bind(this, item)}
                    onMouseUp={onSetSelectedItemIndex}
                    onFocus={onSetSelectedItemIndex}
                  >
                    {_visible as string | ReactNode}
                  </Styled.HintOption>
                );
              })
            ) : (
              <Styled.HintOption $isChip={false} $selected={false} className="notFound">
                {translate('common.not_found_item')}
              </Styled.HintOption>
            )}
          </Styled.SuggestedBlock>
        </Component>
      )}

      {type && type.mode === 'multi' && (value as Item[])?.length ? (
        <Styled.ChipContainer>
          {(value as Item[]).map((item, index) => {
            const visible = onTransformValue(item, visibleItem);
            const _visible = type.parseValue
              ? type.parseValue(visible, item)
              : onTransformValue(item, visibleItem);
            return (
              <Styled.Chip key={index}>
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
          })}
        </Styled.ChipContainer>
      ) : null}
    </Styled.Wrapper>
  );
};
