import { getIn, useFormikContext } from 'formik';

import * as Styled from './phone.styled.ts';
import * as StyledCommon from '../input/input.styled.ts';
import { IInputDefault, IMargin } from '@/module/common/types';
import { passwordError } from '@/module/common/constants';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { functionStub } from '@/utils';

interface IPhone extends IInputDefault, IMargin {
  width?: string;
  readOnly?: boolean;
  noFormikValue?: {
    value: string;
    setFieldValue: (name: string, value: string) => void;
    error?: string;
    touched?: boolean;
    setFieldTouched?: (name: string, isTouched: boolean) => void;
    setFieldFocus?: (name: string, isTouched: boolean) => void;
  };
}

export const Phone = ({ label, name, width, noFormikValue, readOnly, ...props }: IPhone) => {

  const { setFieldValue, value, error, touched, setFieldTouched, setFieldFocus } = (() => {
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
      const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext();

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

  const onChange = (phone: string) => {
    setFieldValue(name, phone);
  };

  const onBlur = () => {
    setFieldTouched(name, false);
  };
  const onFocus = () => {
    setFieldFocus(name, true);
  };

  const isError = touched && !!error;


  return (
    <Styled.Wrapper
      width={width}
      $isError={isError}
      readOnly={readOnly}
      {...{ inert: readOnly ? '' : undefined }}
      {...props}
    >
      {label && (
        <StyledCommon.Label
          className="Label"
          htmlFor={name}
          $isError={isError}
          $required={typeof label === 'object' && 'required' in label ? label.required : false}
        >
          {typeof label === 'object' && 'text' in label ? label.text : label}
        </StyledCommon.Label>
      )}
      <Styled.Phone
        isError={isError}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      {isError &&
      !passwordError.includes(error ?? '') &&
      error !== 'common.is_required' &&
      error !== 'invalid date' ? (
        <StyledCommon.Error className="errorMessage">{translate(error as string)}</StyledCommon.Error>
      ) : null}
    </Styled.Wrapper>
  );
};
