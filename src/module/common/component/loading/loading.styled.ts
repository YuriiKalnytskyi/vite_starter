import styled, { css } from 'styled-components';

import { COLORS } from '@/theme';

import { ILoaderProps } from '../../types';

const small = css`
  height: 2rem;
  aspect-ratio: 1/1;
`;
const medium = css`
  height: 3rem;
  aspect-ratio: 1/1;
`;
const large = css`
  width: 5.25rem;
  height: 5.25rem;
`;

export const MyContainer = styled.div<{ margin?: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.div<ILoaderProps>`
  &:after {
    content: '';
    display: block;
    ${({ size }) => {
      switch (size) {
        case 'small':
          return small;
        case 'large':
          return large;
        default:
          return medium;
      }
    }}

    border-radius: 50%;
    border: ${({ color }) => `0.375rem solid  ${color ?? COLORS.primary}`};
    border-color: ${({ color }) => `${color ?? COLORS.primary} transparent
    ${color ?? COLORS.primary} transparent`};
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
