import styled, { css } from 'styled-components';

import { COLORS, FONTS, MEDIA, SHADOWS, SPACES, TRANSITIONS } from '@/theme';

import { Fonts } from '../../styles';

const layoutCss = css`
    display: table;
    width: 100%;
    height: 2.5rem;
    table-layout: fixed;
`;

const cellControlledSizes = css`
    padding: ${FONTS.SIZES.xxsm} ${FONTS.SIZES.l};

    &.title {
        width: 100% !important;
        position: relative;
        padding: ${FONTS.SIZES.xxsm} ${FONTS.SIZES.l};
    }

    &.id {
        width: clamp(3rem, 3rem, 3rem) !important;
    }
`;

// ================= table components START ====================//
export const Container = styled.div`
    box-shadow: 0 0 0.625rem ${COLORS.rgba(COLORS.black, 0.2)};

    &.scroll {
        width: 100% !important;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
            height: 0.4rem;
        }

        & > table {
            display: table;
            width: fit-content;
            table-layout: auto;

            & > thead > tr > th,
            & > tr > td {
                width: clamp(50px, 150px, 400px);

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
    overflow: hidden;
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

    @media screen and (max-width: ${MEDIA.tablet_s}) {
        width: 1300px;
    }
`;

export const Head = styled.thead`
    ${layoutCss};
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const Body = styled.tbody`
    position: relative;

    ${layoutCss};
    & > tr {
        border-bottom: 1px solid ${COLORS.rgba(COLORS.black, 0.1)};
    }
    & > tr:hover * {
        cursor: pointer;
    }
`;

export const HeadRow = styled.th`
    ${Fonts};
    height: 3rem;
    letter-spacing: 0.0175rem;
    text-transform: uppercase;
    color: ${COLORS.white};
    background-color: ${COLORS.tableHeader};

    &:last-child {
        border-right: none;
    }

    ${cellControlledSizes}
`;

export const Row = styled.tr`
    ${layoutCss};

    z-index: 1;
    transition: background 0.4s ease-in-out;

    & > td > strong {
        text-transform: none;
    }

    &:hover {
        background: ${COLORS.rgba(COLORS.tableRowActive, 0.3)};
        box-shadow: 0 2px 8px ${COLORS.rgba(COLORS.black, 0.1)};
    }
`;

export const Data = styled.td`
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.m};
    color: ${COLORS.gray};
    word-break: break-word;
    position: relative;
    
    &:hover::before {
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        top: -9999px;
        bottom: -9999px;
        background-color: ${COLORS.rgba(COLORS.tableRowActive, 0.2)};
        z-index: -1;
    }

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

export const ItemLabel = styled.strong<{
    linesToTruncate?: number;
    tooltipLength?: number;
    tooltipText: string;
    background?: string;
}>`
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    ${({ linesToTruncate }) =>
            linesToTruncate &&
            css`
            -webkit-line-clamp: ${linesToTruncate};
        `}
    

    &.onLine {
        -webkit-line-clamp: 1;
    }

    ${labelPriceCommonStyles}
    &.tooltip::after {
        position: absolute;
        bottom: 35%;
        left: 40%;
        width: max-content;
        max-height: 5.5rem;
        max-width: 12rem;
        content: ${({ tooltipText }) => `'${tooltipText}'`};
        padding: ${`${SPACES.xxxxxs} ${SPACES.xs}`};
        font-weight: ${FONTS.WEIGHTS.normal};
        font-size: ${FONTS.SIZES.s};
         border: 1px solid ${COLORS.tableHeader};
        border-radius: ${SPACES.xxsm};
        word-break: break-all;
        background-color: ${COLORS.white};
        box-shadow: ${SHADOWS.xs};

        visibility: hidden;
        overflow-y: auto;
       
        z-index: 11;

        transition: visibility ${`${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear}`};
        
        &.tooltip::after::-webkit-scrollbar {
            width: 8px;
        }

        &.tooltip::after::-webkit-scrollbar-thumb {
            background-color: ${COLORS.tableHeader}; 
            border-radius: 4px;
        }

        &.tooltip::after::-webkit-scrollbar-track {
            background: ${COLORS.tableRowActive}; 
            border-radius: 4px;
        }
    }

    ${({ tooltipText, tooltipLength  = 16 }) =>
        tooltipText?.length >= tooltipLength &&
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
