import styled, { css } from 'styled-components';

import { Fonts, IconCommon, Margin } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { FONTS, MEDIA, SPACES } from '@/theme';

export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
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
        transform: translate(0%, -50%);
    }

    & .startIcon {
        left: ${SPACES.l};
    }

    & .passwordIcon,
    & .endIcon {
        right: ${SPACES.xs};
    }
`;

export const Label = styled.label<{ $required?: boolean; $isError: boolean }>`
    position: relative;
    display: block;
    ${Fonts};
    white-space: nowrap;

    text-transform: capitalize;

    color: ${({ $isError, theme }) => ($isError ? theme.COLORS.error : theme.COLORS.black)};
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

export const commonStyles = css<{ $isError?: boolean, readOnly?: boolean }>`
    background: ${({ readOnly, theme }) => readOnly && theme.COLORS.white};
    border: 1px solid ${({ $isError, theme }) => ($isError ? theme.COLORS.error : theme.COLORS.rgba(theme.COLORS.black, 0.4))};
    border-radius: 10px;

    font-family: ${FONTS.FAMILIES.inter};
    font-size: ${FONTS.SIZES.l};
    font-weight: ${FONTS.WEIGHTS.normal};

    cursor: ${({ readOnly }) => (readOnly ? 'initial' : 'pointer')};
    pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'initial')};

    caret-color: ${ ({theme})=>  theme. primary};

    &:not(:focus-within) {
        cursor: pointer;
    }

    &:focus,
    &:focus-within {
        outline: none;
        border: 1px solid ${ ({theme})=>  theme.COLORS.primary} !important;
    }

    &::placeholder {
        color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.4)};
    }
`;

export const Input = styled.input<{
  height?: string;
  $isError: boolean;
  $padding?: string;
  readOnly?: boolean;
}>`
    ${commonStyles};
    width: 100% !important;
    height: ${({ height }) => height ?? '3rem'};
    padding: ${({ $padding }) => $padding ?? `${SPACES.xxl} ${SPACES.xxxxl}`};

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
    color: ${ ({theme})=>  theme. black};
    cursor: pointer;
    position: absolute;
    right: 2rem;
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
    color: ${ ({theme})=>  theme. error};

    &.textArea {
        bottom: -${SPACES.m};
    }

    &.maxLength {
        width: fit-content;
        right: 0 ;
        left: auto;
        color: ${ ({theme})=>  theme. black};
    }
`;

export const ErrorPassword = styled.div<{ $isError: boolean; $isSuccess: boolean }>`
    ${Fonts};
    color: ${({ $isError, $isSuccess, theme }) =>
            $isError ? theme.COLORS.error : $isSuccess ? theme.COLORS.primary : theme.COLORS.rgba(theme.COLORS.black, 0.8)};
    display: flex;
    gap: 2px;
`;
