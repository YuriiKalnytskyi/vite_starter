import styled from 'styled-components';

import { SPACES } from '@/theme';

import { Fonts, Margin } from '../../styles';
import { IMargin } from '@/module/common/types';

export interface IWProps extends IMargin {
  width?: string;
}

export const Details = styled.details<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    
    & > * {
        ${Fonts};
    }
    
    .rotate {
        transform: rotate(180deg) !important;
    }

    & > summary::-webkit-details-marker {
        display: none;
    }

    ${Margin};
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
