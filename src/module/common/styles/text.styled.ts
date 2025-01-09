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


const textSizes = {
  s: css`
    font-size: 2rem;
    font-weight: ${FONTS.WEIGHTS.medium};
    line-height: 1.2;
  `,
  m: css`
    font-size: 3rem;
    font-weight: ${FONTS.WEIGHTS.semi_bold};
    line-height: 1.2;
  `,
  l: css`
    font-size: 4rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.2;
  `,
};

type TSizes = 's' | 'm' | 'l';
type THeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export const TitleCommon = styled.p.withConfig({
  shouldForwardProp: (prop) => !['ml', 'mr', 'mb', 'mt', 'size'].includes(prop),
})<IFonts & IMargin & {
  size?: TSizes;
  as?: THeading ;
}>`
  ${Fonts};
  ${Margin};


  ${({ size }) => size && textSizes[size]};
`;
