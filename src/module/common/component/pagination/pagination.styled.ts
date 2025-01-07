import styled, { css } from 'styled-components';

import { Fonts } from '@/module/common/styles';
import {  FONTS, SPACES } from '@/theme';

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

  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${SPACES.xxs};
  }
    
    .Input {
        height: 2rem;
        width: 2rem;
        padding: 0;
        border-radius: 0.25rem;
        text-align: center;
        font-size: ${FONTS.SIZES.m};
    }
`;
export const PaginateButtonsListItem = styled.li`
    cursor: pointer
`;
export const PaginateInput = styled.li`
    input {
        cursor: text;
    }
`;

const buttonsCommonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin: 0;

  background-color: ${ ({theme})=> theme.COLORS.white};
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
    background: ${ ({theme})=> theme.COLORS.primary};
    color: ${ ({theme})=> theme.COLORS.white};
    font-weight: ${FONTS.WEIGHTS.semi_bold};
  }

  &:hover {
    background: ${ ({theme})=> theme.COLORS.primary};
    color: ${ ({theme})=> theme.COLORS.white};
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
        background-color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.primary, 0.3)};
    }

    &:disabled {
        opacity: 0.5;
        background-color: ${ ({theme})=> theme.COLORS.white};

        .icon {
            background: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.3)};
        }
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }
`;

export const PrevPageButton = styled.button`
  ${prevNextBtnStyles};
  margin-right: 0.5rem;
  .icon {
    background: ${ ({theme})=> theme.COLORS.primary};
  }
`;

export const NextPageButton = styled.button`
  ${prevNextBtnStyles};
  margin-left: 0.5rem;
  .icon {
    background: ${ ({theme})=> theme.COLORS.primary};
  }
`;
