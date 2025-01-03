import styled from 'styled-components';

import { InputMatchedWords } from '@/module/common/component';
import { Fonts } from '@/module/common/styles';
import { COLORS, FONTS } from '@/theme';

export const Countries = styled(InputMatchedWords)`
    & > label {
        padding-bottom: 0.375rem;
    }

    .start_icon {
        z-index: 1;
        top: 50%;
        left: 5%;
    }

    ul {
        max-height: 12.1875rem;

        li {
            padding: 0.625rem 0.5rem 0.625rem 1.5rem !important;
            font-size: ${FONTS.SIZES.m};
            font-weight: ${FONTS.WEIGHTS.medium};
            line-height: 1.25rem;
            justify-content: flex-start;
            text-transform: capitalize !important;
            cursor: pointer;
        }
    }

    & > input {
        margin-top: 0 !important;
        padding-left: 3.5rem !important;
        ${Fonts};
        font-size: ${FONTS.SIZES.l};
        font-weight: ${FONTS.WEIGHTS.medium};
        line-height: 1.25rem;

        &::placeholder {
            text-transform: none !important;
        }

        &:focus {
            border: 1px solid ${COLORS.green};
        }
    }
`;
