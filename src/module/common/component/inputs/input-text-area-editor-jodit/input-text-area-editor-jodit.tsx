import { getIn, useFormikContext } from 'formik';
import { useMemo, useRef } from 'react';

import { IOnSetValue } from '@/module/common/types';
import { functionStub } from '@/utils';

import * as Styled from './input-text-area-editor-jodit.styled.ts';

interface IInputTextAreaEditorJodit {
  name: string;
  placeholder?: string;
  noFormikValue?: { value: string; onSetValue: IOnSetValue };
}

export const InputTextAreaEditorJodit = ({
  placeholder,
  noFormikValue,
  name
}: IInputTextAreaEditorJodit) => {
  const editor = useRef<null>(null);
  const { setFieldValue, setFieldTouched, values, touched, errors } = useFormikContext<any>();

  const fieldProps = noFormikValue
    ? {
        value: noFormikValue.value,
        touched: false,
        error: '',
        setFieldValue: noFormikValue.onSetValue,
        setFieldTouched: functionStub
      }
    : {
        value: getIn(values, name),
        touched: getIn(touched, name),
        error: getIn(errors, name),
        setFieldValue,
        setFieldTouched
      };

  const onChange = (newContent: string) => {
    fieldProps.setFieldValue(name, newContent);
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      toolbarSticky: false,
      uploader: {
        insertImageAsBase64URI: true
      },
      imageResizable: true,
      imageResizeHandle: true,
      allowResizeX: true,
      allowResizeY: true,
      keepAspectRatio: false,
      showPoweredBy: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false
    }),
    [placeholder]
  );

  return (
    <Styled.WrapeerJoditEditor
      ref={editor}
      value={fieldProps.value}
      config={config}
      // tabIndex={1}
      onBlur={() => fieldProps.setFieldTouched(name, true)}
      onChange={onChange}
    />
  );
};
