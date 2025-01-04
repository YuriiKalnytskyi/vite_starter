import styled, { css } from 'styled-components';

import { Fonts } from '@/module/common/styles';
import { COLORS, FONTS, SPACES } from '@/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${SPACES.xxxxxxl_};
  padding-bottom: 5rem;
  background-color: inherit;
`;

export const PaginateButtonsList = styled.ul`
  list-style: none;
  min-width: 18rem;

  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${SPACES.xxs};
  }
`;
export const PaginateButtonsListItem = styled.li``;

const buttonsCommonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin: 0;

  background-color: ${COLORS.white};
  ${Fonts};

  border-radius: 50%;
  cursor: pointer;
`;

export const PaginationButton = styled.button`
  ${buttonsCommonStyles};

  width: 2rem;
  height: 2rem;
  border-radius: ${SPACES.xxsm};

  &.selected {
    // border: 1px solid ${COLORS.tableHeader};
    background: ${COLORS.tableHeader};
    color: ${COLORS.white};
    font-weight: ${FONTS.WEIGHTS.semi_bold};
  }

  &:hover {
    background: ${COLORS.tableHeader};
    color: ${COLORS.white};
    font-weight: ${FONTS.WEIGHTS.semi_bold};
  }
`;

const prevNextBtnStyles = css`
  ${buttonsCommonStyles};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${SPACES.xxsm};

  &:hover {
    background-color: ${COLORS.rgba(COLORS.tableRowActive, 0.3)};
  }

  &:disabled {
    opacity: 0.5;
    background-color: ${COLORS.white};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const PrevPageButton = styled.button`
  ${prevNextBtnStyles};
  margin-right: 0.5rem;
  .icon {
    background: ${COLORS.tableHeader};
  }
`;

export const NextPageButton = styled.button`
  ${prevNextBtnStyles};
  margin-left: 0.5rem;
  .icon {
    background: ${COLORS.tableHeader};
  }
`;
