import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import successIcon from '@/assets/icons/default/success-icon.svg';
import visibilityOnIcon from '@/assets/icons/default/visibility-icon.svg';
import visibilityOffIcon from '@/assets/icons/default/visibility-off-icon.svg';
import { Icon } from '@/module/common/component';
import { RegexConst, passwordError } from '@/module/common/constants';
import { IconCommon } from '@/module/common/styles';
import { SPACES } from '@/theme';
import { functionStub } from '@/utils';

import * as Styled from './input.styled';
import { IInputProps } from './input.type.ts';
import { useTheme } from 'styled-components';

export const Input= ({
                        height,
                        name,
                        label,
                        refProps,
                        type,
                        placeholder,
                        isAutoComplete = false,
                        isAutoFocus = false,
                        isSpellCheck = false,
                        isDontChange = false,
                        onClick,
                        onKeyDown,
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
  const theme = useTheme();


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

  useEffect(() => {
    if (!ref.current) return;

    const includesClasses = [
      'Label',
      'Input'
    ];

    const children = Array.from(ref.current.children);
    const allowedItems = children.filter((child) => {
      const className = (child as HTMLElement).className;
      return includesClasses.some((includedClass) => className.includes(includedClass));
    });

    const contentHeight = allowedItems.reduce((acc, child) => {
      const className = (child as HTMLElement).className;
      return acc + ((child as HTMLElement).offsetHeight / (className.includes('Input') ? 1.7 : 1));
    }, 0);

    const updateIconTop = (className: string) => {
      const iconElement = children.find((child) =>
        (child as HTMLElement).className.includes(className)
      ) as HTMLElement | undefined;

      if (iconElement) {
        iconElement.style.top = `${contentHeight - (allowedItems.length  === 1 ? 5 : 0)}px`;
      }
    };

    updateIconTop('startIcon');
    updateIconTop('endIcon');
    updateIconTop('passwordIcon');
  }, [startIcon?.icon, endIcon?.icon]);

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
    (endIcon && `${SPACES.l} ${SPACES.xxxxxxl_} ${SPACES.l} ${SPACES.l}`) ??
    (endIcon && startIcon && `${SPACES.l}  ${SPACES.xxxxxxl_} ${SPACES.l} ${SPACES.xxxxxxl_}`) ??
    (type === 'password' ? `${SPACES.xs} ${SPACES.xxxxxxl} ${SPACES.xs} ${SPACES.m}` : undefined);

  const isError = touched && !!error;
  const isPasswordError = isError && passwordError.includes(error ?? '');

  return (
    <Styled.Wrapper
      id="input"
      {...props}
      ref={ref}
      onClick={onClick ? onClick : functionStub}
      {...{ inert: props.readOnly ? '' : undefined }}
    >
      {label && (
        <Styled.Label
          className="Label"
          htmlFor={name}
          $isError={isError}
          $required={typeof label === 'object' && 'required' in label ? label.required : false}
        >
          {typeof label === 'object' && 'text' in label ? label.text : label}
        </Styled.Label>
      )}

      <Styled.Input
        id={name}
        className="Input"
        ref={refProps}
        name={name}
        {...(isAutoComplete ? {} : { autoComplete: 'off', role: 'presentation' })}
        {...(isAutoFocus ? { autoFocus: true } : { autoFocus: false })}
        spellCheck={isSpellCheck}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
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

      {isPasswordError && (
        <Styled.ErrorPasswordContainer className="errorPassword">
          {passwordError.map((text, index) => {
            const isError = text === error;
            const isSuccess = successPasswordMessages.includes(text);
            return (
              <Styled.ErrorPassword $isError={isError} $isSuccess={isSuccess} key={index}>
                <IconCommon
                  icon={successIcon}
                  background={isError ? theme.COLORS.error : isSuccess ? theme.COLORS.primary : theme.COLORS.rgba(theme.COLORS.black, 0.8)}
                />

                {text}
              </Styled.ErrorPassword>
            );
          })}
        </Styled.ErrorPasswordContainer>
      )}
    </Styled.Wrapper>
  );
};
