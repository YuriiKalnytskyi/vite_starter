import styled, { css } from 'styled-components';

import { Center, Fonts } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import {  FONTS, SPACES } from '@/theme';

export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $focused: boolean;
  $newItemFlag: boolean;
}

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    cursor: pointer;
}

${({ $focused }) =>
        $focused
                ? css`
                    #SuggestedBlock {
                        display: flex;
                    }

                    .endIcon {
                        transform: translate(0%, -50%) rotate(180deg);
                    }
                `
                : css`
                    #SuggestedBlock {
                        display: none;
                    }

                    .endIcon {
                        transform: translate(0%, -50%) rotate(360deg);
                    }
                `}
${({ $newItemFlag }) =>
        $newItemFlag
                ? css`
                    #addOrCloseIcon {
                        transform: rotate(90deg);
                    }

                    .endIcon {
                        right: ${SPACES.m};
                        transform: translate(0%, -50%) rotate(45deg);
                    }
                `
                : css`
                    #addOrCloseIcon {
                        transform: rotate(45deg);
                    }
                `}
`;

export const SuggestedBlock = styled.ul<{ $position?: string }>`
    display: none;
    background: ${ ({theme})=>  theme.COLORS.white};
    border: 1px solid ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.4)};

    border-radius: 8px;
    width: 100%;
    min-width: 16rem;
    flex-direction: column;
    max-height: 14rem;
    box-shadow: 0 0 4px ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.8)};

    #search {
        width: 100%;
        ${Center};
        background: ${ ({theme})=>  theme.COLORS.white};
        padding: ${SPACES.l} 0;
        position: ${({ $position }) => $position ?? 'sticky'};
        top: 0;
        z-index: 1;
    }
    
    position: absolute;
    z-index: 1;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
        background-color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.primary, 0.2)};

    }

    &::-webkit-scrollbar-thumb {
        background-color: ${ ({theme})=>  theme.COLORS.primary};
        border-radius: 0.25rem;
    }

`;

export const HintOption = styled.li<{
  $selected: boolean;
  $isChip: boolean;
}>`
  padding: ${SPACES.xs} ${SPACES.m};
  background: ${({ $selected, $isChip, theme }) => ($selected || $isChip ? theme.COLORS.primary : theme.COLORS.white)};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.medium};
  cursor: pointer;

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected ? theme.COLORS.rgba(theme.COLORS.primary, 0.9) : theme.COLORS.rgba(theme.COLORS.primary, 0.6)};
  }

  &.notFound {
    cursor: default;
    background: ${ ({theme})=>  theme.COLORS.white};
    ${Center};

    &:hover {
      background: ${ ({theme})=>  theme.COLORS.white};
    }
  }
`;

export const ChipContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${SPACES.xs};
  flex-wrap: wrap;

  margin-top: ${SPACES.xxs};
  position: absolute;
`;

export const Chip = styled.li`
  width: fit-content;
  cursor: pointer;

  gap: ${SPACES.xs};

  ${Center};
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.semi_bold};

  padding: ${SPACES.xxs} ${SPACES.s};
  background: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.3)};
  border-radius: 4px;

  word-break: break-word;
`;
