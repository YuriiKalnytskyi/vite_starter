import { IIconInput, IMargin } from '@/module/common/types';

import * as Styled from './input.styled';
import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { getIn, useFormikContext } from 'formik';

import successIcon from '@/assets/icons/default/success-icon.svg';
import visibilityOnIcon from '@/assets/icons/default/visibility-icon.svg';
import visibilityOffIcon from '@/assets/icons/default/visibility-off-icon.svg';

import { IconCommon } from '@/module/common/styles';
import { COLORS, SPACES } from '@/theme';
import { passwordError, RegexConst } from '@/module/common/constants';
import { useTranslation } from 'react-i18next';
import { functionStub } from '@/utils';
import { Icon } from '@/module/common/component';

export interface IInputProps extends IMargin {
  name: string;
  type?: 'password' | 'email' | 'text' | 'number';
  label?: string | ReactNode | {
    text: string | ReactNode,
    required?: boolean
  };
  placeholder?: string
  isAutoComplete?: boolean;
  isAutoFocus?: boolean
  height?: string;
  width?: string;
  readOnly?: boolean;
  isDontChange?: boolean
  noFormikValue?: {
    value: string,
    setFieldValue: (name: string, value: string) => void,
    setFieldTouched?: (name: string, isTouched: boolean) => void,
    setFieldFocus?: (name: string, isTouched: boolean) => void,
    error?: string
    touched?: boolean
  };
  startIcon?: IIconInput;
  endIcon?: IIconInput;
  optionOnChange?: (name: string, value: string, setFieldValue: (name: string, value: string) => void) => void,
}

export const Input = ({
                        height,
                        name,
                        label,
                        type,
                        placeholder,
                        isAutoComplete = false,
                        isAutoFocus = false,
                        isDontChange = false,
                        noFormikValue,
                        endIcon,
                        startIcon,
                        optionOnChange,
                        ...props
                      }: IInputProps) => {

  const { setFieldValue, value, error, setFieldTouched, setFieldFocus, touched } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        error: noFormikValue.error ?? '',
        touched: noFormikValue?.touched ?? false,
        setFieldValue: noFormikValue.setFieldValue,
        setFieldTouched: noFormikValue?.setFieldTouched ?? functionStub,
        setFieldFocus: noFormikValue?.setFieldFocus ?? functionStub

      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { values, setFieldValue, errors, setFieldTouched, touched } = useFormikContext();

      return {
        value: getIn(values, name),
        error: getIn(errors, name),
        touched: getIn(touched, name),
        setFieldValue,
        setFieldTouched,
        setFieldFocus: setFieldTouched
      };
    }
  })();
  const { t: translate } = useTranslation();


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = isDontChange ? '' : e.target.value;
    optionOnChange ? optionOnChange(name, _value, setFieldValue) : setFieldValue(name, _value);
  };

  const onBlur = () => {
    setFieldTouched(name, false);
  };
  const onFocus = () => {
    setFieldFocus(name, true);
  };


  const [isPassword, setIsPassword] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);


  const [top, setTop] = useState('50%');
  useEffect(() => {
    if (type === 'password' || startIcon || endIcon) {
      const children = ref.current?.children;
      if (!children) return;

      const totalHeight = Array.from(children).reduce((acc, child) => {
        const className = (child as HTMLElement).className;
        const shouldInclude = !['startIcon', 'endIcon', 'passwordIcon', 'errorPassword', 'errorMessage']
          .some((excludedClass) => className.includes(excludedClass));
        return shouldInclude ? acc + (child as HTMLElement).offsetHeight : acc;
      }, 0);

      setTop(`${totalHeight / 1.8}px`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successPasswordMessages = useMemo(() => {
    if (type === 'password' && value) {
      return passwordError.filter((_error, index) => {
        switch (index) {
          case 0:
            return RegexConst.LOWERCASE.test(value);
          case 1:
            return RegexConst.CAPITAL.test(value);
          case 2:
            return RegexConst.SPECIAL.test(value);
          case 3:
            return value.length >= 8;
          default:
            return false;
        }
      });
    }
    return [];
  }, [type, value]);

  const paddingInput =
    (startIcon && `${SPACES.l}  ${SPACES.xxxxxxl} ${SPACES.l} ${SPACES.xxxxxxl_}`) ??
    (endIcon && `${SPACES.l}  ${SPACES.xxxxxxl_} ${SPACES.l} ${SPACES.l}`) ??
    (endIcon && startIcon && `${SPACES.l}  ${SPACES.xxxxxxl_} ${SPACES.l} ${SPACES.xxxxxxl_}`) ??
    (type === 'password' ? `${SPACES.xs} ${SPACES.xxxxxxl} ${SPACES.xs} ${SPACES.m}` : undefined);


  const isError = touched && !!error;
  const isPasswordError = isError && passwordError.includes(error ?? '');

  return (
    <Styled.Wrapper id='input' $top={top} {...props} ref={ref}>
      {label && (
        <Styled.Label
          htmlFor={name}
          $isError={isError}
          $required={typeof label === 'object' && 'required' in label ? label.required : false}

        >
          {typeof label === 'object' && 'text' in label ? label.text : label}
        </Styled.Label>
      )}

      <Styled.Input
        name={name}
        {...(isAutoComplete ? {} : { autoComplete: 'off', role: 'presentation' })}
        {...(isAutoFocus ? { autoFocus: true } : {autoFocus: false})}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder ?? ''}
        type={type === 'password' ? (isPassword ? 'text' : 'password') : type}
        height={height}
        $isError={isError}
        $padding={paddingInput}
        {...props}
      />

      {type === 'password' && (
        <Styled.VisibilityIcon
          icon={isPassword ? visibilityOnIcon : visibilityOffIcon}
          height="1.5rem"
          onClick={() => {
            setIsPassword(!isPassword);
          }}
          className="passwordIcon"
        />
      )}

      {startIcon && <Icon {...startIcon} className="startIcon" />}
      {endIcon && <Icon {...endIcon} className="endIcon" />}

      {isError &&
      !passwordError.includes(error ?? '') &&
      error !== 'common.is_required' &&
      error !== 'invalid date' ? (
        <Styled.Error className="errorMessage">{translate(error as string)}</Styled.Error>
      ) : null}

      {
        isPasswordError && (
          <Styled.ErrorPasswordContainer className="errorPassword">
            {passwordError.map((text, index) => {
              const isError = text === error;
              const isSuccess = successPasswordMessages.includes(text);
              return (
                <Styled.ErrorPassword
                  $isError={isError}
                  $isSuccess={isSuccess}
                  key={index}
                >
                  <IconCommon
                    icon={successIcon}
                    background={
                      isError ? COLORS.error : isSuccess ? COLORS.primary : COLORS.gray
                    }
                  />

                  {text}
                </Styled.ErrorPassword>
              );
            })}
          </Styled.ErrorPasswordContainer>
        )
      }


    </Styled.Wrapper>
  );
};
