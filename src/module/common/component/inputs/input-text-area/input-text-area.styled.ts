import styled, { css } from 'styled-components';

import { IInputPropsStyles, IInputTextareaProps } from '@/module/common/types';
import { COLORS, FONTS, SPACES } from '@/theme';

import { commonStyles } from '../input/input.styled';

export const InputContainer = styled.div<Partial<IInputTextareaProps>>`
  margin: ${({ margin }) => margin};
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};
  position: relative;

  padding-bottom: ${SPACES.l};
`;

export const Input = styled.textarea<Partial<IInputPropsStyles>>`
  ${commonStyles};

  outline: none;
  resize: vertical;

  transition: height 0.5s ease;
`;

export const ErrorInfoContainer = styled.div<{ mb?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;

  left: 0;
  bottom: -3px
    ${({ mb }) =>
      mb &&
      css`
        margin-bottom: ${mb};
      `};
`;

export const MaxLength = styled(ErrorInfoContainer)`
  justify-content: flex-end;

  position: absolute;

  right: 0;
  bottom: -3px;
`;

export const ErrorInfoText = styled.div`
  box-sizing: border-box;
  font-family: ${FONTS.FAMILIES.inter};
  font-style: normal;
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  line-height: ${FONTS.SIZES.xxl};
  color: ${COLORS.mainRed};
`;

export const MaxLengthText = styled(ErrorInfoText)`
  color: ${COLORS.black};
  opacity: 0.88;
`;
