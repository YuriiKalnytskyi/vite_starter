import { getIn, useFormikContext } from 'formik';
import { ChangeEvent, useCallback, useState } from 'react';

import addAvatarIcon from '@/assets/icons/default/add-avatar-icon.svg';

import { fileService } from '../../services';
import * as Styled from './avatar-setup.styled';

export interface IAvatarSetup {
  label?: string;
  name: string;
  readOnly?: boolean;
}

export const AvatarSetup = ({ label, name, readOnly }: IAvatarSetup) => {
  const { values, setFieldValue } = useFormikContext();

  const avatar = getIn(values, name);
  const [dragging, setDragging] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileBase64 = await fileService.convertBase64(file);
      setFieldValue(name, fileBase64);
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e.dataTransfer.files);
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  return (
    <Styled.OptionBlock>
      {label && <Styled.FieldLabel>{label}</Styled.FieldLabel>}
      <Styled.AvatarContainer
        onDragOver={handleDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
        dragging={dragging}
      >
        {avatar ? <Styled.Avatar src={avatar} alt='avatar' key={avatar} /> : null}

        {!avatar && (
          <>
            <label htmlFor='field-upload'>
              <Styled.AddAvatar src={addAvatarIcon} alt='avatar' />
            </label>
            {!readOnly && (
              <>
                <input
                  id='field-upload'
                  type='file'
                  accept='image/*'
                  onChange={onChange}
                  title=''
                />
              </>
            )}
          </>
        )}
        {avatar && !readOnly && (
          <Styled.CloseButton onClick={delAvatar}>&#10006;</Styled.CloseButton>
        )}
      </Styled.AvatarContainer>
    </Styled.OptionBlock>
  );
};
