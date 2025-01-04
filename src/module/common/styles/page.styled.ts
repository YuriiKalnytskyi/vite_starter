import styled, { css } from 'styled-components';

import { Margin } from '@/module/common/styles/margin.styled.ts';
import { IDivCommon, IIcon } from '@/module/common/types';
import { COLORS } from '@/theme';

export const Center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivCommon = styled.div<IDivCommon>`
  width: ${({ width }) => width ?? '100%'};
  max-width: ${({ maxWidth }) => maxWidth ?? '100%'};
  height: ${({ height }) => height ?? 'fit-content'};
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ padding }) => padding ?? '0'};
  gap: ${({ gap }) => gap ?? '0'};

  display: flex;
  flex-direction: ${({ fd }) => fd ?? 'column'};
  justify-content: ${({ jc }) => jc ?? 'stretch'};
  align-items: ${({ ai }) => ai ?? 'stretch'};

  position: relative;

  ${({ background }) => background && `background: ${background};`}
  ${({ anyStyled }) => anyStyled}
`;

export const IconCommon = styled.div<IIcon>`
  height: ${({ height }) => height ?? '1.25rem'};

  ${({ width }) =>
    width
      ? css`
          width: ${width ?? '1.25rem'};
        `
      : css`
          aspect-ratio: 1/1;
        `}

  background: ${({ background }) => background ?? COLORS.black};

  -webkit-mask-image: url(${({ icon }) => icon});
  -webkit-mask-size: 100% 100%;
  mask-image: url(${({ icon }) => icon});
  cursor: ${({ cursor }) => cursor ?? 'text'};

  ${Margin};
`;
