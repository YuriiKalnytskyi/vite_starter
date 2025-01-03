import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';

import closeIcon from '@/assets/icons/default/close-icon.svg';
import plusIcon from '@/assets/icons/default/plus-icon.svg';
import { IconCommon } from '@/module/common/styles';
import { IInputMatchedWordsDynamic } from '@/module/common/types';
import { COLORS } from '@/theme';

import * as Styled from '../input-matched-words/input-matched-words.styled';
import * as StyledCommon from '../input/input.styled';

export const InputMatchedWordsDynamic = memo(
  ({
    name,
    label,
    readOnly,
    height = '3rem',
    width,
    placeholder,
    ...props
  }: IInputMatchedWordsDynamic) => {
    const { values, touched, errors, setFieldValue, setValues, setFieldTouched } =
      useFormikContext();

    const value = getIn(values, name);
    const touche = getIn(touched, name);
    const error = getIn(errors, name);

    const [onChangeValue, setOnChangeValue] = useState('');

    const onSetTouched = () => setFieldTouched(name, true);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setOnChangeValue(e.target.value);

    const addItem = () => {
      if (onChangeValue) {
        setFieldValue(name, [...value, onChangeValue]);
        setOnChangeValue('');
      }
    };

    const deleteItem = (str: any) => {
      setValues((v: any) => {
        const index = value.indexOf(str);
        if (index > -1) {
          value.splice(index, 1);
        }
        return { ...v, [name]: [...value] };
      });
    };

    const isError = !!error && touche;

    const [top, setTop] = useState('50%');
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const calculateTopHeight = () => {
        const childrenRef = ref.current?.children;
        // @ts-ignore
        const childrenRefHTML = Array.from(childrenRef ?? []) as HTMLCollectionOf<HTMLElement>;
        const childrenRefHTMLArray = Array.from(childrenRefHTML).splice(0, 2);

        return (
          childrenRefHTMLArray.reduce((acc, child, i) => {
            if (i === 1) {
              return acc + child.offsetHeight / 2.5;
            }

            return acc + child.offsetHeight;
          }, 0) + 'px'
        );
      };

      setTop(calculateTopHeight());
    }, []);

    return (
      <Styled.InputBlock width={width} ref={ref} readOnly={readOnly} {...props}>
        {label && (
          <StyledCommon.Label isError={isError} htmlFor='avatar'>
            {label}
          </StyledCommon.Label>
        )}
        <StyledCommon.Input
          autoComplete='off'
          isError={isError}
          width={width}
          height={height}
          name={name}
          value={onChangeValue}
          id={name}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onSetTouched}
        />

        <Styled.PlusIcon top={top} src={plusIcon} alt='arrowIcon' onClick={addItem} />

        {isError && error !== 'is required' ? (
          <Styled.ErrorInfoContainer>
            <Styled.ErrorInfoText>{error}</Styled.ErrorInfoText>
          </Styled.ErrorInfoContainer>
        ) : null}

        {value?.length ? (
          <Styled.ChipContainer>
            {value.map((str: string, index: number) => (
              <Styled.Chip onClick={deleteItem.bind(this, str)} key={index}>
                {str}
                <IconCommon
                  height='0.625rem'
                  cursor='pointer'
                  icon={closeIcon}
                  background={COLORS.black}
                />
              </Styled.Chip>
            ))}
          </Styled.ChipContainer>
        ) : null}
      </Styled.InputBlock>
    );
  }
);
