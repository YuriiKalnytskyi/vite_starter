import { getIn, useFormikContext } from 'formik';
import ImageResize from 'quill-image-resize-module-react';
import { forwardRef } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { functionStub } from '@/utils';

import { IInputTextareaProps } from '../../../types';
import * as CommonStyled from '../input-text-area/input-text-area.styled';
import * as Styled from './input-text-area-editor.styled.ts';

// import BlotFormatter from "quill-blot-formatter";

Quill.register('modules/imageResize', ImageResize);

export const InputTextAreaEditor = forwardRef<HTMLDivElement, IInputTextareaProps>(
  (
    { rows, noFormikValue, label, name, placeholder, margin, maxLength, readOnly, ...props },
    ref
  ) => {
    const { setFieldValue, setFieldTouched, value, touched, error } = (() => {
      if (noFormikValue) {
        return {
          touched: false,
          error: '',
          value: noFormikValue.value,
          setFieldValue: noFormikValue.onSetValue,
          setFieldTouched: functionStub
        };
      } else {
        const { touched, values, errors, setFieldValue, setFieldTouched } = useFormikContext();
        return {
          touched: getIn(touched, name),
          error: getIn(errors, name),
          value: getIn(values, name),
          setFieldTouched: setFieldTouched,
          setFieldValue: setFieldValue
        };
      }
    })();

    const isError = !!error && touched;

    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['image']
      ],
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      }
    };

    const formats = [
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'link',
      'image',
      'list',
      'bullet',
      'indent'
    ];

    const onChange = (_text: any) => {
      setFieldValue(name, _text);
    };

    const onBlur = () => {
      setFieldTouched(name, true);
    };

    return (
      <CommonStyled.InputContainer margin={margin || ''} ref={ref} {...props}>
        {label && (
          <CommonStyled.Label isError={isError} htmlFor={name}>
            {label}
          </CommonStyled.Label>
        )}

        <Styled.InputReactQuill
          isError={isError}
          theme='snow'
          placeholder={placeholder ? placeholder : 'Type here'}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          onBlur={onBlur}
        />

        {maxLength ? (
          <CommonStyled.MaxLength>
            <CommonStyled.MaxLengthText>
              {value?.length}/{maxLength}
            </CommonStyled.MaxLengthText>
          </CommonStyled.MaxLength>
        ) : null}

        {isError && error !== 'is required' ? (
          <CommonStyled.ErrorInfoContainer>
            <CommonStyled.ErrorInfoText>{error}</CommonStyled.ErrorInfoText>
          </CommonStyled.ErrorInfoContainer>
        ) : null}
      </CommonStyled.InputContainer>
    );
  }
);
