import styled, { css } from 'styled-components';

import { Fonts, IconCommon } from '@/module/common/styles';
import { IInputProps, IInputPropsStyles, IWProps } from '@/module/common/types';
import { COLORS, FONTS, MEDIA, SPACES } from '@/theme';

export const commonStyles = css<IInputPropsStyles>`
    margin: 0;
    padding: ${({ innerPads }) => innerPads ?? `${SPACES.xxl} ${SPACES.xxxxl}`};

    border: 1px solid ${({ isError }) => (isError ? COLORS.mainRed : COLORS.border3)};
    border-radius: 5px;
    background-color: ${COLORS.white};
    font-size: ${FONTS.SIZES.l};
    font-weight: ${FONTS.WEIGHTS.normal};

    margin-top: ${({ gapFromLabel }) => gapFromLabel ?? SPACES.xxxs};

    &:not(:focus-within) {
        cursor: pointer;
    }

    &::placeholder {
        color: ${({ placeholderColor }) => placeholderColor ?? COLORS.placeholderCommon};
    }

    &:focus-within {
        border: 1px solid ${COLORS.darkerGreen};
        outline: none;
    }
`;

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};

    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};

    margin-left: ${({ ml }) => ml ?? '0'};
    margin-right: ${({ mr }) => mr ?? '0'};
    margin-bottom: ${({ mb }) => mb ?? '0'};
    margin-top: ${({ mt }) => mt ?? '0'};

    &.flex {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    & .startIcon {
        position: absolute;
        top: ${({ top }) => top ?? '50%'};
        left: ${SPACES.l};
        opacity: 1;
    }

    & .endIcon {
        position: absolute;
        top: ${({ top }) => top ?? '50%'};
        right: ${SPACES.l};
        max-height: 1rem;
    }

    & .passwordIcon {
        position: absolute;
        top: ${({ top }) => top ?? '50%'};
        right: ${SPACES.xs};
    }
`;

export const Label = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isError'
})<{ required?: boolean; isError: boolean }>`
    position: relative;
    display: block;
    ${Fonts};
    white-space: nowrap;

    text-transform: capitalize;

    color: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.black)};

    ${({ required }) =>
        required &&
        css`
            &::after {
                content: '*';
                right: 0;
                top: 0;
            }
        `}
`;

export const LabelOptional = styled.label`
    ${Fonts};
    color: ${COLORS.gray};
    margin-left: 2px;
`;

export const Input = styled.input.withConfig({
    shouldForwardProp: (prop) =>
        !['isError', 'innerPads', 'gapFromLabel', 'isDontChange'].includes(prop)
})<
    IInputProps & {
        isError?: boolean;
        innerPads?: string;
        gapFromLabel?: string;
        isDontChange?: boolean;
    }
>`
    width: 100% !important;
    height: ${({ height }) => (height ? `${height} !important` : '100%')};

    ${commonStyles};

    &:focus-within {
        outline: ${({ readOnly }) => readOnly && 'none'};
    }

    background: ${({ readOnly }) => readOnly && COLORS.white};
    position: relative;

    caret-color: ${COLORS.blue};
    font-family: ${FONTS.FAMILIES.baiJamjuree};

    cursor: ${({ readOnly }) => (readOnly ? 'initial' : 'pointer')};
    pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'initial')};

    ${({ isDontChange }) =>
        isDontChange &&
        css`
            pointer-events: none;
            cursor: pointer !important;
        `};

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

export const Input2 = styled.input<IInputProps & { top?: string }>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height ?? '100%'};

    ${commonStyles};

    outline: none;
    transition: 0.5s;

    &&:valid ~ label,
    &&:focus ~ label {
        color: ${COLORS.black};
        transform: translateX(10px)
            translateY(${({ top }) => (top ? `calc(-${top} - 10px)` : '7px')});
        font-size: ${SPACES.xs};
        padding: 0 ${SPACES.xs};
        background: ${COLORS.white};
        border-left: 1px solid ${COLORS.white};
        border-right: 1px solid ${COLORS.white};
        letter-spacing: 0.2em;
    }
`;

export const Label2 = styled.label<{ top?: string }>`
    position: absolute;
    left: 0;
    top: ${({ top }) => top ?? '0'};
    padding-left: ${SPACES.xs};

    pointer-events: none;
    color: ${COLORS.black};
    transition: 0.5s;

    ${Fonts};
`;

export const Error = styled.div`
    position: absolute;
    left: ${SPACES.xxxxxs};
    font-size: ${FONTS.SIZES.s};
    color: ${COLORS.mainRed};
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

export const ErrorPassword = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isError', 'isSuccess'].includes(prop)
})<{ isError: boolean; isSuccess: boolean }>`
    ${Fonts};
    color: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray)};
    ${({ isSuccess }) =>
        isSuccess &&
        css`
            color: ${COLORS.blue};
        `}

    display: flex;
    gap: 2px;
`;

export const Icon = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isError', 'isSuccess'].includes(prop)
})<{ isError: boolean; isSuccess: boolean }>`
    width: 13px;
    aspect-ratio: 1/1;
    background: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray)};

    ${({ isSuccess }) =>
        isSuccess &&
        css`
            background: ${COLORS.blue};
        `}
`;

export const VisibilityIcon = styled(IconCommon)<{ height?: string }>`
    height: 1.5rem;
    aspect-ratio: 1/1;
    color: ${COLORS.black};
    cursor: pointer;
    position: absolute;
    top: ${({ height }) => (height ? '1.5rem' : '1.5rem')};
    /* right: ${SPACES.s}; */
    right: 2rem;
`;
