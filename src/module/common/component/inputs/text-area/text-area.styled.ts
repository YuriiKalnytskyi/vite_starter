import styled from 'styled-components';

import { IMargin } from '../../../types';
import { commonStyles } from '../input/input.styled';
import { Margin } from '@/module/common/styles';
import { COLORS, SPACES } from '@/theme';

export const Wrapper = styled.div<IMargin & {width?:string, readOnly?: boolean}>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};
    
    
    ${Margin};
`;
export const Input = styled.textarea<{ $isError: boolean, readOnly?:boolean }>`
    width: 100%;
    height: 100%;
    ${commonStyles};
    padding: ${SPACES.xxl} ${SPACES.xxxxl};


    outline: none;
    resize: vertical;
    overflow-y: auto;
    transition: height 0.5s ease;

    &::-webkit-scrollbar {
        width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
        background-color: ${COLORS.rgba(COLORS.primary, 0.2)};

    }

    &::-webkit-scrollbar-thumb {
        background-color: ${COLORS.primary};
        border-radius: 0.25rem;
    }
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
//     color: ${COLORS.black};
//     opacity: 0.88;
// `;
