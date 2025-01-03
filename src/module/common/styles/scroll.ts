import { css } from 'styled-components';

import { IScroll } from '@/module/common/types';
import { COLORS } from '@/theme';

export const Scroll = css<IScroll>`
  overflow-y: ${({ oy }) => oy ?? 'auto'};
  overflow-x: ${({ ox }) => ox ?? 'auto'};

  &::-webkit-scrollbar {
    display: ${({ scrollbar_display }) => scrollbar_display ?? 'none'};
    height: ${({ scrollbar_height }) => scrollbar_height ?? 'none'};
    width: ${({ scrollbar_width }) => scrollbar_width ?? 'none'};
    background-color: ${({ scrollbar_background }) => scrollbar_background ?? COLORS.black};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ scrollbar_thumb_background }) =>
      scrollbar_thumb_background ?? 'transparent'};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
