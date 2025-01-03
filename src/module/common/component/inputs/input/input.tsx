import { getIn, useField, useFormikContext } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import successIcon from '@/assets/icons/default/success-icon.svg';
import visibilityOnIcon from '@/assets/icons/default/visibility-icon.svg';
import visibilityOffIcon from '@/assets/icons/default/visibility-off-icon.svg';
import { RegexConst, passwordError } from '@/module/common/constants';
import { IconCommon } from '@/module/common/styles';
import { IInputProps, IStartIcon } from '@/module/common/types';
import { SPACES } from '@/theme';

import * as Styled from './input.styled';

export const Input = memo(
    ({
       name,
       label,
       gapFromLabel,
       height = '3rem',
       startIcon,
       endIcon: endIconProps,
       innerPads,
       required,
       className,
       type = 'text',
       labelClassName,
       inputType = 1,
       isOptional = false,
       format_type,
       isAutoComplete,
       noFormikValue,
       maxLength,
       isRequiredArrow,
       isDontChange = false,
       ...props
     }: IInputProps) => {
      const formikContext = useFormikContext();
      const fields = useField(name);
      const { type: endIconType, ...endIcon } = {
        ...endIconProps,
        type: endIconProps?.type ?? 'svg'
      } as IStartIcon;
      const { setFieldValue, value, field, touched, error } = (() => {
        if (noFormikValue) {
          return {
            touched: false,
            error: '',
            field: {
              onChange: () => {
                void 0;
              }
            },
            value: noFormikValue.value,
            setFieldValue: noFormikValue.onSetValue
          };
        } else {
          const [field, { touched, error }] = fields;
          return {
            touched,
            error,
            field,
            value: getIn(formikContext.values, name),
            setFieldValue: formikContext.setFieldValue
          };
        }
      })();

      const isCommonError = touched ? error : touched || error;

      const pads =
          (startIcon ? `${SPACES.xs} ${SPACES.xxxxxxl_}` : innerPads) ||
          (type === 'password'
              ? `${SPACES.xxl} ${SPACES.xxxxxxl} ${SPACES.xxl} ${SPACES.xxxxl}`
              : undefined);

      const [types, setTypes] = useState(type);
      const [isPassword, setIsPassword] = useState(false);
      const [successMessage, setSuccessMessage] = useState<string[]>([]);
      const { t: translate } = useTranslation();

      useEffect(() => {
        if (type === 'password' && isPassword) {
          setTypes('text');
        } else {
          setTypes(type);
        }
      }, [type, isPassword]);

      useEffect(() => {
        if (name.includes('password')) {
          const addStr = (str: string) => {
            if (!successMessage.includes(str)) {
              setSuccessMessage((prev) => [...prev, str]);
            }
          };
          const deleteStr = (str: string) => {
            const index = successMessage.indexOf(str);

            if (index > -1) {
              setSuccessMessage((prev: any) => {
                prev.splice(index, 1);

                return [prev];
              });
            }
          };
          const is = (reservation: any, _error: string) => {
            if (reservation) {
              addStr(_error);
            } else {
              deleteStr(_error);
            }
          };

          is(RegexConst.LOWERCASE.test(value), passwordError[0]);
          is(RegexConst.CAPITAL.test(value), passwordError[1]);
          is(RegexConst.SPECIAL.test(value), passwordError[2]);
          is(value?.length >= 8, passwordError[3]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [name, value]);

      const onClickPassword = () => {
        setIsPassword(!isPassword);
      };

      const isPasswordError = !!isCommonError && passwordError.includes(error ?? '');

      const ref = useRef<HTMLDivElement | null>(null);

      const [top, setTop] = useState('50%');

      useEffect(() => {
        if (type === 'password' || startIcon || endIcon || inputType === 2) {
          const calculateTopHeight = () => {
            const childrenRef = ref.current?.children;
            // @ts-ignore
            const childrenRefHTML = Array.from(
                childrenRef ?? []
            ) as HTMLCollectionOf<HTMLElement>;
            const childrenRefHTMLArray = Array.from(childrenRefHTML).splice(
                0,
                inputType === 1 ? 2 : 1
            );

            return (
                childrenRefHTMLArray.reduce((acc, child, i) => {
                  if (i === 1 && !label) {
                    return acc  / 2.4;
                  }
                  if (i === 1) {
                    return acc + child.offsetHeight / 2.5;
                  }

                  if (inputType === 2) {
                    return acc + child.offsetHeight / 3.5;
                  }

                  return acc + child.offsetHeight;
                }, 0) + 'px'
            );
          };



          setTop(calculateTopHeight());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const formatCreditCardNumber = (_value: string) => {
        const cleanNumber = _value?.replace(/\D/g, '').slice(0, 16);
        const formattedNumber = cleanNumber?.match(/.{1,4}/g) ?? [];

        return formattedNumber ? formattedNumber.join('  ') : '';
      };

      const formatCreditCardDate = (_value: string) => {
        const cleanDate = _value?.replace(/\D/g, '').slice(0, 4);
        const formattedDate = cleanDate?.match(/.{1,2}/g);

        return formattedDate ? formattedDate.join(' / ') : '';
      };

      const formatCVC = (_value: string) => {
        return _value?.replace(/\D/g, '').slice(0, 3);
      };

      const formatObject = {
        card: formatCreditCardNumber,
        date: formatCreditCardDate,
        cvc: formatCVC
      };
      const [maskedValue, setMaskedValue] = useState('');
      const [rawValue, setRawValue] = useState('');

      useEffect(() => {
        if (format_type === 'cvc' && rawValue.length === 3) {
          setMaskedValue(rawValue.replace(/\d/g, '•').split('').join(' '));
        } else {
          setMaskedValue(rawValue);
        }
      }, [rawValue, format_type]);

      const _value = !format_type ? value : formatObject[format_type](value);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        if (isDontChange) {
          return;
        }

        if (format_type === 'cvc') {
          const cleanCVC = formatCVC(inputValue);
          setRawValue(cleanCVC);
          setMaskedValue(cleanCVC);
          setFieldValue(name, cleanCVC);
        } else {
          const formattedValue = format_type
              ? formatObject[format_type](inputValue)
              : inputValue;
          setFieldValue(name, formattedValue);
        }
      };

      return (
          <Styled.Wrapper className={className} {...props} ref={ref} top={top}>
            {label && inputType === 1 && (
                <Styled.Label
                    isError={!!isCommonError}
                    required={required}
                    htmlFor={name}
                    className={labelClassName}
                >
                  {label}
                  {isRequiredArrow && <span className='is_required_arrow'>*</span>}
                  {isOptional && <Styled.LabelOptional>· Optional</Styled.LabelOptional>}
                </Styled.Label>
            )}

            {inputType === 1 ? (
                <Styled.Input
                    height={height}
                    id={name}
                    name={name}
                    {...(isAutoComplete ? {} : { autoComplete: 'off', role: 'presentation' })}
                    isError={!!isCommonError}
                    gapFromLabel={gapFromLabel}
                    innerPads={pads}
                    type={types}
                    step='any'
                    {...field}
                    {...props}
                    value={format_type === 'cvc' ? maskedValue : _value}
                    maxLength={format_type === 'cvc' ? 3 : undefined}
                    onChange={handleChange}
                    isDontChange={isDontChange}
                />
            ) : (
                <Styled.Input2
                    isError={!!isCommonError}
                    id={name}
                    name={name}
                    type={types}
                    top={top}
                    height={height}
                    required
                    {...field}
                    {...props}
                    value={format_type === 'cvc' ? maskedValue : _value}
                    maxLength={format_type === 'cvc' ? 3 : undefined}
                    onChange={handleChange}
                />
            )}

            {label && inputType === 2 && (
                <Styled.Label2 htmlFor={name} top={top} className={labelClassName}>
                  {label}
                </Styled.Label2>
            )}

            {startIcon && <IconCommon {...startIcon} className='startIcon' />}
            {endIcon ? (
                endIconType === 'svg' ? (
                    <IconCommon
                        {...(endIcon as Omit<IStartIcon, 'type'>)}
                        className='endIcon'
                    />
                ) : (
                    <img src={endIcon.icon} alt='icon' className='endIcon' />
                )
            ) : null}

            {type === 'password' && (
                <Styled.VisibilityIcon
                    icon={isPassword ? visibilityOnIcon : visibilityOffIcon}
                    height={'25px'}
                    onClick={onClickPassword}
                    className='passwordIcon'
                />
            )}

            {isCommonError &&
            !passwordError.includes(error ?? '') &&
            error !== 'common.is_required' &&
            error !== 'invalid date' ? (
                <Styled.Error className='error'>{translate(error as string)}</Styled.Error>
            ) : null}

            {isPasswordError ? (
                <Styled.ErrorPasswordContainer>
                  {passwordError.map((text, index) => {
                    const isError = text === error;
                    const isSuccess = successMessage.includes(text);
                    return (
                        <Styled.ErrorPassword
                            isError={isError}
                            isSuccess={isSuccess}
                            key={index}
                        >
                          <Styled.Icon
                              isError={isError}
                              isSuccess={isSuccess}
                              style={{
                                WebkitMaskImage: `url(${successIcon})`,
                                WebkitMaskSize: '100% 100%',
                                maskImage: `url(${successIcon})`
                              }}
                          />

                          {text}
                        </Styled.ErrorPassword>
                    );
                  })}
                </Styled.ErrorPasswordContainer>
            ) : null}
          </Styled.Wrapper>
      );
    }
);
