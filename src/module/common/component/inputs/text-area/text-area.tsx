import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, forwardRef, useRef } from 'react';

import { useAutoResizeTextArea } from '../../../hooks';
import { IInputDefault, IMargin } from '../../../types';
import * as Styled from './text-area.styled.ts';
import * as StyledCommon from '../input/input.styled.ts';
import { functionStub } from '@/utils';
import { useTranslation } from 'react-i18next';


export interface IInputTextareaProps extends IInputDefault, IMargin {
  readOnly?: boolean;
  rows: number;
  maxLength?: number;
  resizable?: boolean;

  width?: string;

  noFormikValue?: {
    value: string;
    setFieldValue: (name: string, value: string) => void;
    setFieldTouched?: (name: string, isTouched: boolean) => void;
    setFieldFocus?: (name: string, isTouched: boolean) => void;
    error?: string;
    touched?: boolean;
  };
}

export const TextArea = forwardRef<HTMLDivElement, IInputTextareaProps>(
  (
    {
      rows,
      label,
      name,
      resizable = true,
      placeholder,
      maxLength,
      noFormikValue,
      readOnly,
      ...props
    },
    ref
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    useAutoResizeTextArea(resizable ? textAreaRef.current : null, value, rows);


    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const _value = e.target.value;
      setFieldValue(name, _value);
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
        ref={ref}
        {...props}
        {...{ inert: readOnly ? '' : undefined }}
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

        <Styled.Input
          id={name}
          ref={resizable ? textAreaRef : null}
          $isError={isError}
          readOnly={readOnly}
          disabled={readOnly}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {maxLength ? (
          <StyledCommon.Error className='maxLength'>
            {value?.length}/{maxLength}
          </StyledCommon.Error>
        ) : null}


        {
          isError && error !== 'common.is_required' && (
            <StyledCommon.Error className="errorMessage textArea">{translate(error as string)}</StyledCommon.Error>
          )
        }

      </Styled.Wrapper>
    );
  }
);
