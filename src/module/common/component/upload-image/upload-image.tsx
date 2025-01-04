import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';

import deleteIcon from '@/assets/icons/delete-file-icon.svg';
import uploadIcon from '@/assets/icons/fileupload.svg';
import { DivCommon, IconCommon, TitleCommon } from '@/module/common/styles';
import { COLORS } from '@/theme';

import { fileService } from '../../services';
import * as Styled from './upload-image.styled.ts';

export interface IAvatarSetup {
  label?: string;
  name: string;
  readOnly?: boolean;
  noFormikValue?: { value: any | null; onSetValue: (name: string, value: any | null) => void };
}

export const UploadImage = ({ name, noFormikValue, readOnly }: IAvatarSetup) => {
  const { setFieldValue, value } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.onSetValue
      };
    } else {
      return {
        value: getIn(useFormikContext().values, name),
        setFieldValue: useFormikContext().setFieldValue
      };
    }
  })();

  const ref = useRef<HTMLInputElement>(null);
  const clickInput = () => {
    ref.current?.click();
  };

  const [dragging, setDragging] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const delAvatar = () => {
    setFieldValue(name, null);
    setDragging(false);
  };

  const onDrop = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (file) {
        const fileBase64 = await fileService.convertBase64(file);
        setFieldValue(name, fileBase64);
      }
    },
    [setFieldValue, name]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e.dataTransfer.files);
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  return (
    <Styled.OptionBlock readOnly={readOnly}>
      <Styled.AvatarContainer
        onDragOver={handleDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
        dragging={dragging}
        onClick={clickInput}
      >
        {value ? (
          <Styled.Avatar src={value.path ? value.path : value} alt='avatar' key={value} />
        ) : (
          <DivCommon ai='center' jc='center' gap='1rem'>
            <IconCommon height='3rem' icon={uploadIcon} cursor='pointer' className='upload-icon' />
            <DivCommon fd='row' ai='center' jc='center' gap='0.375rem'>
              <TitleCommon cursor='pointer' fs='0.9375rem' fw='400' color={COLORS.blue}>
                Image Add
              </TitleCommon>
            </DivCommon>
          </DivCommon>
        )}

        <input
          ref={ref}
          id='field-upload'
          type='file'
          accept='image/*'
          onChange={onChange}
          title=''
        />
      </Styled.AvatarContainer>
      <div className='wrapper'>
        {value && (
          <Styled.CloseButton onClick={delAvatar} className='close'>
            <img src={deleteIcon} alt={'icon delete'} />
          </Styled.CloseButton>
        )}
      </div>
    </Styled.OptionBlock>
  );
};
