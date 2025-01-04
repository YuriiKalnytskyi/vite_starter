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
  width: 100%;

  &.scroll {
    width: 100% !important;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      height: 0.4rem;
    }

    & > table {
      display: table;
      table-layout: auto;

      & > thead > tr > th,
      & > tr > td {
        width: clamp(3.125rem, 9.375rem, 25rem);

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
  box-shadow: 0 0 0.625rem ${COLORS.rgba(COLORS.black, 0.2)};
`;
export const Table = styled.table`
  min-width: 100%;

  &.full {
    width: 81.25rem;
  }
  &.scroll {
    width: 81.25rem;
  }

  &.pointer {
    tbody tr * {
      cursor: pointer !important;
    }
  }

  border-collapse: collapse;

  @media screen and (max-width: ${MEDIA.tablet_s}) {
    width: 81.25rem;
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
  background-color: ${COLORS.primary};

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
    background: ${COLORS.rgba(COLORS.primary, 0.2)};
    box-shadow: 0 2px 8px ${COLORS.rgba(COLORS.black, 0.1)};
  }
`;

export const Data = styled.td`
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  word-break: break-word;
  position: relative;

  &:hover::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: ${COLORS.rgba(COLORS.primary, 0.1)};
    z-index: -1;
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
  lastIndexHorizontal?: boolean;
  firstIndexVertical?: boolean;
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
  ${labelPriceCommonStyles}
    .tooltipHover {
    position: absolute;
    ${({ firstIndexVertical }) =>
      firstIndexVertical
        ? css`
            bottom: 35%;
          `
        : css`
            top: 35%;
          `}
    ${({ lastIndexHorizontal }) =>
      lastIndexHorizontal
        ? css`
            right: 40%;
          `
        : css`
            left: 40%;
          `}
        width: max-content;
    max-height: 5.5rem;
    max-width: 16rem;
    content: ${({ tooltipText }) => `'${tooltipText}'`};
    padding: ${`${SPACES.xxxxxs} ${SPACES.xs}`};
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.s};
    border: 1px solid ${COLORS.primary};
    border-radius: ${SPACES.xxsm};
    word-break: break-all;
    background-color: ${COLORS.white};
    box-shadow: ${SHADOWS.xs};

    visibility: hidden;
    overflow-y: auto;

    z-index: 11;

    transition: visibility ${`${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear}`};

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${COLORS.primary};
      border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 0.25rem;
    }
  }

  ${({ tooltipText, tooltipLength = 16 }) =>
    tooltipText?.length >= tooltipLength &&
    css`
      &:hover .tooltipHover {
        visibility: visible;
      }
    `}
`;

export const WrapperPagination = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
