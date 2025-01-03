import styled, { css } from 'styled-components';

import { COLORS, FONTS, MEDIA, SHADOWS, SPACES, TRANSITIONS } from '@/theme';

import { Fonts } from '../../styles';

const layoutCss = css`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const cellControlledSizes = css`
    padding: ${FONTS.SIZES.xxsm} ${FONTS.SIZES.l};

    &.title {
        width: clamp(10.5rem, fit-conrent, 10.5rem) !important;
        position: relative;
        padding: ${FONTS.SIZES.xxsm} ${FONTS.SIZES.l};
    }

    &.id {
        width: clamp(3rem, 3rem, 3rem) !important;
    }

    &.delete {
        width: clamp(4rem, 4rem, 4rem) !important;
    }
    &.full {
        width: 50%;
    }

    &.full60 {
        width: 60% !important;
    }

    &.cell {
        width: clamp(10.5rem, 10.5rem, 10.5rem) !important;
    }

    &.status {
        width: 12.5rem !important;
    }
    &.email {
        width: 14.5rem !important;
    }

    &.options {
        width: 17.5rem !important;
    }
`;

// ================= table components START ====================//
export const Container = styled.div`
    &.scroll {
        width: 100% !important;
        overflow-x: auto;

        & > table {
            display: table;
            width: fit-content;
            table-layout: auto;

            & > thead > tr > th,
            & > tr > td {
                width: clamp(50px, 150px, 400px) !important;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                & > strong {
                    display: inline-block;
                    max-width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
`;

export const Wrapper = styled.div`
    overflow: auto;
    ::-webkit-scrollbar {
        width: 4px;
    }
`;
export const Table = styled.table`
    min-width: 100%;

    &.full {
        width: 1300px;
    }

    &.pointer {
        tbody tr * {
            cursor: pointer !important;
        }
    }

    border-collapse: collapse;
    border-radius: 2.5rem;
    margin: ${SPACES.xxxxl} 0;

    @media screen and (max-width: ${MEDIA.tablet_s}) {
        width: 1300px;
    }
`;

export const Head = styled.thead`
    ${layoutCss};
    position: sticky;
    top: 0;
    z-index: 1;

    background: ${COLORS.white};
`;

export const Body = styled.tbody`
    ${layoutCss}
    & > tr:hover * {
        cursor: pointer;
    }
`;

export const HeadRow = styled.th`
    ${Fonts};
    height: 3rem;
    letter-spacing: 0.28px;
    text-transform: uppercase;
    // padding: ${SPACES.m} ${SPACES.l};
    color: ${COLORS.gray};
    background-color: ${COLORS.white200};

    &:last-child {
        border-right: none;
    }

    ${cellControlledSizes}
`;

export const Row = styled.tr`
    ${layoutCss};
    border-bottom: 1px solid ${COLORS.black};

    transition: background 0.4s ease-in-out;

    & > td > strong {
        text-transform: none;
    }

    &:hover {
        background: ${COLORS.white200};
    }
`;

export const Data = styled.td`
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.m};
    color: ${COLORS.gray};
    word-break: break-word;
    position: relative;

    & > div.parseValue > p {
        font-weight: ${FONTS.WEIGHTS.normal};
        font-size: ${FONTS.SIZES.m};
        color: ${COLORS.gray};
        word-break: break-word;
    }

    & > div.parseValue > p.sub {
        font-size: ${FONTS.SIZES.s};
        color: ${COLORS.gray};
        word-break: break-word;
    }

    ${cellControlledSizes}
`;
// ================= table components END ====================//

const labelPriceCommonStyles = css`
    ${Fonts};
`;

export const ItemImage = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    margin-left: ${SPACES.s};

    object-position: center;
    object-fit: cover;
    overflow: hidden;

    border-radius: 50%;
    cursor: pointer;
`;

export const ItemLabel = styled.strong<{
    linesToTruncate?: number;
    tooltipText: string;
    background?: string;
}>`
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.onLine {
        -webkit-line-clamp: 1;
    }

    ${labelPriceCommonStyles}
    &.tooltip::after {
        position: absolute;
        bottom: 70%;
        left: 40%;
        width: max-content;
        max-width: 12rem;
        content: ${({ tooltipText }) => `'${tooltipText}'`};
        padding: ${`${SPACES.xxs} ${SPACES.xs}`};
        font-weight: ${FONTS.WEIGHTS.normal};
        font-size: ${FONTS.SIZES.s};
        border: 0.0625rem solid ${COLORS.black};
        border-radius: ${SPACES.m};
        word-break: break-all;
        background-color: ${COLORS.white};
        box-shadow: ${SHADOWS.xs};

        visibility: hidden;
        z-index: 11;

        transition: visibility ${`${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear}`};
    }

    ${({ tooltipText }) =>
        tooltipText?.length >= 17 &&
        css`
            &.tooltip:hover::after {
                visibility: visible;
            }
        `}

    ${({ background }) =>
        background &&
        css<{ background?: string }>`
            color: ${({ background }) => background} !important;

            &::before {
                content: '';
                display: inline-block;

                margin-right: 0.5rem;
                height: 0.75rem;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background: ${({ background }) => background ?? COLORS.black};
            }
        `}
`;

export const WrapperPagination = styled.div`
    width: fit-content;
    margin: 0 auto;
`;
