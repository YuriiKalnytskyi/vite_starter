import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';

import { Fonts, Margin } from '@/module/common/styles';
import { COLORS, FONTS } from '@/theme';
import { IMargin } from '@/module/common/types';

export interface IWProps extends IMargin {
        readOnly?: boolean;
        width?: string;
        $isError?: boolean
}

export const Wrapper = styled.div<IWProps>`
    width: ${({ width }) => width ?? '100%'};
    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};
        
    ${Margin};    


    label {
        ${Fonts};
        color: ${({ $isError }) => ($isError ? COLORS.error : COLORS.black)};
        font-size: ${FONTS.SIZES.m};
        font-weight: ${FONTS.WEIGHTS.normal};
    }

    span:first-child {
        margin-left: 0.25rem;
        color: ${COLORS.error};
    }

    .country-list {
        border: 1px solid ${COLORS.rgba(COLORS.black, 0.4)};
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
    margin-top: 0.375rem;


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
        border-radius: 0.75rem !important;
        border-color: ${COLORS.rgba(COLORS.black, 0.4)};
        font-family: ${FONTS.FAMILIES.roboto} !important;
        font-size: ${FONTS.SIZES.l} !important;
        font-weight: ${FONTS.WEIGHTS.medium} !important;
        color: ${COLORS.black};
        border: ${({ isError }) =>
                isError ? `1px solid ${COLORS.error}` : `1px solid ${COLORS.rgba(COLORS.black, 0.4)}`};

        &:focus,
        &:focus-within {
            outline: none;
            border: 1px solid ${COLORS.primary} !important;
        }
    }

    .country-list {
        margin: 0.125rem 0 0 -0.125rem !important;
        width: 1130% !important;
        border-radius: 0.75rem !important;
        box-shadow: none !important;

        .country {
            padding: 0.5rem 1.5rem !important;
            color: ${COLORS.black};
            font-family: ${FONTS.FAMILIES.roboto} !important;
            font-size: ${FONTS.SIZES.m} !important;
            font-weight: ${FONTS.WEIGHTS.medium} !important;

            &:hover {
                background: ${COLORS.rgba(COLORS.primary, 0.6)};
                color: ${COLORS.black} !important;
            }
        }
    }

    .country.highlight {
        background: ${COLORS.primary} !important;

        .dial-code {
            color: ${COLORS.black} !important;
        }
    }
`;
