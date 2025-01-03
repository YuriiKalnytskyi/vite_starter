import ReactQuill from 'react-quill';
import styled from 'styled-components';

import { COLORS, FONTS, SPACES } from '@/theme';

export const InputReactQuill = styled(ReactQuill)<{ isError: boolean }>`
    width: 100%;
    min-height: 12.5rem;
    margin: ${SPACES.xxxxs} 0 0 0;
    background: ${COLORS.gray50};
    border: 1px solid ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray380)};
    color: ${COLORS.gray800};

    border-radius: ${SPACES.xxsm};
    outline: none;
    resize: vertical;

    transition: height 0.5s ease;

    &:focus-within {
        outline: 1px solid ${COLORS.blue};
    }

    & > .ql-toolbar.ql-snow {
        border: none;
        border-radius: 0.5rem 0.5rem 0 0;
        border-bottom: 1px solid ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray380)};
    }

    & > .ql-container {
        min-height: 10.5rem;
        border: none;
        border-radius: 0 0 0.5rem 0.5rem;
    }

    &:disabled {
        background-color: ${COLORS.grayP100};
        color: ${COLORS.grayP100};
    }

    .ql-editor.ql-blank:before {
        font-style: normal;
        font-family: ${FONTS.FAMILIES.poppins};
        font-size: ${FONTS.SIZES.l};
        color: ${COLORS.gray400};
    }

    .ql-tooltip.ql-editing {
        margin-left: 5.5rem;
    }
`;
