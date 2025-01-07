import styled from 'styled-components';

import { IMargin } from '../../../types';
import { commonStyles } from '../input/input.styled';
import { Fonts, Margin } from '@/module/common/styles';
import {  SPACES, FONTS } from '@/theme';

export const Wrapper = styled.div<IMargin & { width?: string, readOnly?: boolean }>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};

    ${Margin};
`;
export const Input = styled.textarea<{ $isError: boolean, readOnly?: boolean }>`
    width: 100%;
    height: 100%;
    ${commonStyles};
    padding: ${SPACES.xxl} ${SPACES.xxxxl};
    box-sizing: border-box;

    outline: none;
    resize: vertical;
    overflow-y: auto;
    transition: height 0.5s ease;

    scroll-margin-top: 10px;

    &::-webkit-scrollbar {
        width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
        background-color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.primary, 0.2)};

    }

    &::-webkit-scrollbar-thumb {
        background-color: ${ ({theme})=>  theme.COLORS.primary};
        border-radius: 0.25rem;
    }
`;

export const MaxLength = styled.p`
    position: absolute;
    ${Fonts};
    font-size: ${FONTS.SIZES.s};
    color: ${ ({theme})=>  theme.COLORS.error};
    justify-content: flex-end;


    right: 0;
    bottom: -10px;
`;


// export const MaxLength = styled(Error)`
//     justify-content: flex-end;
//
//     position: absolute;
//
//     right: 0;
//     bottom: -3px;
// `;
//
//
//
// export const MaxLengthText = styled(ErrorInfoText)`
//     color: ${ ({theme})=>  theme.COLORS.black};
//     opacity: 0.88;
// `;
