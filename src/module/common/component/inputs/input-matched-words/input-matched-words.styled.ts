import styled, { css } from 'styled-components';

import { IMargin } from '@/module/common/types';
import { COLORS, FONTS, SPACES } from '@/theme';
import { Center, Fonts } from '@/module/common/styles';


export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $focused: boolean;
}

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};

    #icon {
        transition: transform 0.5s ease;
    }

    ${({ $focused }) => $focused ? (
            css`
                #SuggestedBlock {
                    display: flex;
                }

                .endIcon {
                    transform: rotate(180deg);
                }
            `
    ) : (
            css`
                #SuggestedBlock {
                    display: none;
                }

                .endIcon {
                    transform: rotate(360deg);
                }
            `
    )}
`;


export const SuggestedBlock = styled.ul<{ $position?: string }>`
    display: none;
    background: ${COLORS.white};
    border-radius: 8px;
    width: 100%;
    flex-direction: column;
    max-height: 14rem;
    position: absolute;
    z-index: 1;
    box-shadow: 0 0 4px ${COLORS.gray100};

    #search {
        width: 100%;
        ${Center};
        background: ${COLORS.white};
        padding: ${SPACES.l} 0;
        position: ${({ $position }) => $position ?? 'sticky'};
        top: 0;
        z-index: 1;
    }

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 0.1px;
        background-color: ${COLORS.green};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${COLORS.black};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${COLORS.green};
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
`;


export const HintOption = styled.li<{
  $selected: boolean;
  $isChip: boolean;
}>`
    padding: ${SPACES.xs} ${SPACES.m};
    background: ${({ $selected }) => ($selected ? COLORS.primary : COLORS.white)};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    ${Fonts};
    font-weight: ${FONTS.WEIGHTS.medium};
    cursor: pointer;


    &:hover {
        ${({ $selected }) =>
                $selected &&
                css`
                    background: ${COLORS.white200};
                `}

        ${({ $isChip, $selected }) =>
                $isChip && $selected
                        ? css`
                            background: ${COLORS.white200};
                        `
                        : css`
                            background: ${COLORS.primary};
                        `}
    }

}
`;
