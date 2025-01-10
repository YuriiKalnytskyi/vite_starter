import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import deleteIcon from '@/assets/icons/default/delete.svg';
import { DivCommon, IconCommon, TitleCommon } from '@/module/common/styles';

import * as Styled from './file.styled.ts';
import { fileService } from '@/module/common/services';
import { useTheme } from 'styled-components';
import { Span, TranslateText } from './file.styled.ts';


export interface IAvatarSetup {
  readOnly?: boolean;
  width?: string;
  height?: string;

  label?: string;
  name: string;
  noFormikValue?: { value: any | null; onSetValue: (name: string, value: any | null) => void };
}

export const File = ({ name, noFormikValue, label, ...props }: IAvatarSetup) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const theme = useTheme();

  const { setFieldValue, value } = noFormikValue
    ? { value: noFormikValue.value, setFieldValue: noFormikValue.onSetValue }
    : {
      value: getIn(useFormikContext().values, name),
      setFieldValue: useFormikContext().setFieldValue
    };

  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const clickInput = () => ref.current?.click();

  const handleFileChange = async (file: File | null) => {
    if (file) {
      const fileBase64 = await fileService.convertBase64(file);
      setFieldValue(name, {
        path: fileBase64,
        name: file.name,
        size: file.size,
        mimeType: file.type
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] || null);
  };

  const onDrop = useCallback(
    async (files: FileList) => {
      handleFileChange(files[0]);
    },
    [setFieldValue, name]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e.dataTransfer.files);
  };

  const onDragEnter = () => setDragging(true);
  const onDragLeave = () => setDragging(false);

  const delAvatar = () => {
    setFieldValue(name, null);
    setDragging(false);
  };

  return (
    <Styled.Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      dragging={dragging}
      onClick={clickInput}
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      {...props}
    >
      {value ? (
        <Styled.Avatar
          as={motion.img}
          src={value.path}
          alt="avatar"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        />
      ) : (
        <Styled.TranslateText
          i18nKey="common.file"
          components={{
            span: (
              <Styled.Span />
            )
          }}
        />
      )
      }

      <input ref={ref} id="field-upload" type="file" accept="image/*" onChange={onChange} title="" />

      {
        value && (
          <Styled.CloseButton
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={delAvatar}
          >
            <img src={deleteIcon} alt={'icon delete'} />
          </Styled.CloseButton>
        )
      }
    </Styled.Wrapper>

  );
};
