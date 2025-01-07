import styled, { css } from 'styled-components';

import { Margin } from '@/module/common/styles/margin.styled';
import { IFonts, IMargin } from '@/module/common/types';
import {  FONTS } from '@/theme';

export const Fonts = css<IFonts>`
  font-family: ${({ ff }) => ff ?? FONTS.FAMILIES.roboto};
  font-weight: ${({ fw }) => (fw ? `${fw} !important` : FONTS.WEIGHTS.normal)};
  font-size: ${({ fs }) => (fs ? `${fs} !important` : FONTS.SIZES.m)};
  line-height: ${({ lh }) => (lh ? `${lh} !important` : FONTS.SIZES.xxl)};
  color: ${({ color, theme }) => color ?? theme.COLORS.black};
  cursor: ${({ cursor }) => cursor ?? 'text'};

  text-align: ${({ ta }) => ta ?? 'left'};

  ${({ width }) =>
    width &&
    css<{ width?: string }>`
      width: ${({ width }) => width};
    `}
`;

export const TitleCommon = styled.p<IFonts & IMargin>`
  ${Fonts};
  font-family: ${FONTS.FAMILIES.roboto};

  font-size: ${FONTS.SIZES.xxxxl};
  line-height: 1.5;
  ${Margin};
`;
