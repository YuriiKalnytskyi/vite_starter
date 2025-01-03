import styled, { css } from 'styled-components';

import { IMargin } from '@/module/common/types';
import { Fonts, IconCommon, Margin } from '@/module/common/styles';
import { COLORS, FONTS, MEDIA, SPACES } from '@/theme';


export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $top?: string;
}

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};

    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};

    ${Margin};


    & .startIcon,
    & .endIcon,
    & .passwordIcon {
        position: absolute;
        top: ${({ $top }) => $top ?? '34%'};
    }

    & .startIcon {
        left: ${SPACES.l};
    }

    & .endIcon {
        right: ${SPACES.xs};
    }

    & .passwordIcon {
        right: ${SPACES.xs};
    }
`;

export const Label = styled.label<{ $required?: boolean; $isError: boolean }>`
    position: relative;
    display: block;
    ${Fonts};
    white-space: nowrap;

    text-transform: capitalize;

    color: ${({ $isError }) => ($isError ? COLORS.mainRed : COLORS.black)};
    margin-bottom: ${SPACES.xxxs};


    ${({ $required }) =>
            $required &&
            css`
                &::after {
                    content: '*';
                    right: 0;
                    top: 0;
                }
            `}
`;

export const commonStyles = css<{ $innerPads?: string, $isError?: boolean }>`
    margin: 0;
    padding: ${({ $innerPads }) => $innerPads ?? `${SPACES.xxl} ${SPACES.xxxxl}`};

    border: 1px solid ${({ $isError }) => ($isError ? COLORS.mainRed : COLORS.rgba(COLORS.black, 0.4))};
    border-radius: 10px;
    background-color: ${COLORS.white};
    font-size: ${FONTS.SIZES.l};
    font-weight: ${FONTS.WEIGHTS.normal};

    &:not(:focus-within) {
        cursor: pointer;
    }

    &::placeholder {
        color: ${COLORS.rgba(COLORS.black, 0.4)};
    }

    &:focus-within {
        border: 1px solid ${COLORS.primary};
        outline: none;
    }
`;


export const Input = styled.input<{ height?: string, $isError: boolean, $innerPads?: string }>`
    width: 100% !important;
    height: ${({ height }) => height ?? '3rem'};

    ${commonStyles};

    &:focus-within {
        outline: ${({ readOnly }) => readOnly && 'none'};
    }

    background: ${({ readOnly }) => readOnly && COLORS.white};
    position: relative;

    caret-color: ${COLORS.primary};
    font-family: ${FONTS.FAMILIES.inter};

    cursor: ${({ readOnly }) => (readOnly ? 'initial' : 'pointer')};
    pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'initial')};


    &[type='number'] {
        appearance: none;
        -moz-appearance: textfield;
    }

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
    }
`;

export const VisibilityIcon = styled(IconCommon)`
    height: 1.5rem;
    aspect-ratio: 1/1;
    color: ${COLORS.black};
    cursor: pointer;
    position: absolute;
    right: 2rem;
`;

export const ImgIcon = styled.img<{ height?: string; }>`
    height: ${({ height }) => `${height}` ?? '1.5rem'} !important;
    aspect-ratio: 1/1;
`;

export const ErrorPasswordContainer = styled.div`
    width: 100%;
    left: ${SPACES.xxxxxs};
    bottom: -${SPACES.xxxs};
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    @media screen and (max-width: ${MEDIA.mobile_l}) {
        flex-wrap: wrap;
        position: relative;
    }
    @media screen and (max-width: ${MEDIA.tablet}) {
        flex-wrap: wrap;
        position: relative;
    }
`;

export const Error = styled.div`
    position: absolute;
    left: ${SPACES.xxxxxs};
    font-size: ${FONTS.SIZES.s};
    color: ${COLORS.mainRed};
`;


export const ErrorPassword = styled.div<{ $isError: boolean; $isSuccess: boolean }>`
    ${Fonts};
    color: ${({ $isError, $isSuccess }) => $isError ? COLORS.error : $isSuccess ? COLORS.primary : COLORS.gray};
    display: flex;
    gap: 2px;
`;
