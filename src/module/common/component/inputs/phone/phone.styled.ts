import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';

import { Fonts } from '@/module/common/styles';
import { COLORS, FONTS } from '@/theme';

export const PhoneWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isError'
})<{ isError: boolean; width?: string }>`
    width: ${({ width }) => width ?? '100%'};
    label {
        ${Fonts};
        color: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.black)};
        font-size: ${FONTS.SIZES.m};
        font-weight: ${FONTS.WEIGHTS.normal};
    }

    span:first-child {
        margin-left: 0.25rem;
        color: ${COLORS.mainRed};
    }

    .react-tel-input .country-list .country.highlight {
        background: rgba(247, 158, 27, 0.1);
    }
    .flag-dropdown.open {
        background: transparent;
    }
`;

export const Phone = styled(PhoneInput)<{ isError?: boolean }>`
    height: 3.5rem;
    .flag-dropdown {
        border: none !important;
        background-color: transparent;
        width: fit-content;
        height: 3.5rem;
    }

    .selected-flag {
        border-radius: 0.75rem 0 0 0.75rem !important;
        height: 3.3rem !important;
        margin-left: 1px;
        margin-top: 1px;
        background: transparent;
    }

    .form-control {
        height: 3.5rem;
        padding-left: 3rem !important;
        width: 100% !important;
        border-radius: 0.3125rem !important;
        border-color: ${COLORS.border3};
        font-family: ${FONTS.FAMILIES.baiJamjuree} !important;
        font-size: ${FONTS.SIZES.l} !important;
        font-weight: ${FONTS.WEIGHTS.medium} !important;
        color: ${COLORS.textAndIconPrimary};
        border: ${({ isError }) =>
            isError ? `1px solid ${COLORS.mainRed}` : `1px solid ${COLORS.border3}`};
    }

    .country-list {
        margin: 0.125rem 0 0 -0.125rem !important;
        width: 1130% !important;
        border-radius: 0.75rem !important;
        box-shadow: none !important;

        .country {
            padding: 0.5rem 1.5rem !important;
            color: ${COLORS.textAndIconPrimary};
            font-family: ${FONTS.FAMILIES.baiJamjuree} !important;
            font-size: ${FONTS.SIZES.m} !important;
            font-weight: ${FONTS.WEIGHTS.medium} !important;

            &:hover {
                background: rgba(247, 158, 27, 0.1);
                color: ${COLORS.textAndIconPrimary} !important;
            }
        }

        &::-webkit-scrollbar {
            width: 0.25rem;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${COLORS.thumb};
            border-radius: 0.25rem;
        }
    }
`;
