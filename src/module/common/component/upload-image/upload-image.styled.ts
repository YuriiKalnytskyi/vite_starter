import styled, { css } from 'styled-components';

import { Fonts } from '@/module/common/styles';
import { COLORS, FONTS, SPACES } from '@/theme';

export const OptionBlock = styled.div<{ readOnly: boolean | undefined }>`
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
  gap: ${SPACES.xxs};
  position: relative;

  ${({ readOnly }) =>
    readOnly &&
    css`
      & > .wrapper > div > button,
      & > .wrapper > .close {
        opacity: 0.3;
        pointer-events: none;
      }
    `}
  & > div.wrapper {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const FieldLabel = styled.label`
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.medium};
  font-size: ${FONTS.SIZES.xl};
  padding-bottom: ${SPACES.xxs};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${SPACES.xs};
`;

export const AvatarContainer = styled.div<{ dragging: boolean }>`
  position: relative;
  width: 38.3125rem;
  height: 18.25rem;
  backdrop-filter: blur(0.125rem);
  background: ${({ dragging }) => dragging ? COLORS.rgba(COLORS.black, 0.4) : COLORS.rgba(COLORS.black, 0.8)};
  border-radius: ${SPACES.xs};
  border: 1px dashed ${COLORS.rgba(COLORS.black, 0.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .upload-icon {
    opacity: 0.4;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    z-index: -1;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  & > img {
    height: 1.5rem;
    aspect-ratio: 1/1;
    border-radius: ${SPACES.xxsm};
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const CentralBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${SPACES.l};
`;
