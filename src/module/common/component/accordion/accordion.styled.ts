import styled from 'styled-components';

import { SPACES } from '@/theme';

import { Fonts } from '../../styles';

export const Details = styled.details<{ styled: any; readOnly?: boolean }>`
  width: 100%;
  cursor: pointer;

  & > summary::-webkit-details-marker {
    display: none;
  }

  ${({ styled }) => styled};
  & > .summary > div > .icons {
    right: ${({ readOnly }) => (readOnly ? '1.5rem' : '0.25rem')};
  }
`;

export const Summary = styled.summary`
  list-style: none;
  display: flex;
  justify-content: space-between;

  overflow: auto;
  ${Fonts};

  & > img {
    transition: all 0.35s ease-out;
  }

  cursor: pointer;
`;

export const Span = styled.span`
  ${Fonts};
  cursor: pointer;
`;

export const IconContainer = styled.div<{ iconHeight?: string }>`
  display: flex;
  align-items: center;

  gap: ${SPACES.s};
  cursor: pointer;

  img {
    display: block;
    height: ${({ iconHeight }) => iconHeight ?? '1rem'};
    min-width: 1rem;
  }
`;

export const Icon = styled.img`
  &.active {
    transform: rotate(-180deg);
  }
`;
