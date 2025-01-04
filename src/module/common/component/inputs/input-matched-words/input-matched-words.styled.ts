import styled, { css } from 'styled-components';

import { IMargin } from '@/module/common/types';
import { COLORS, FONTS, SPACES } from '@/theme';
import { Center, Fonts } from '@/module/common/styles';


export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $focused: boolean;
  $newItemFlag: boolean
}

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};

    #icon {
        transition: transform 0.5s ease;
    }

    #addOrCloseIcon {
        height: 1rem;

        position: absolute;
        right: ${SPACES.m};
        z-index: 1;

        transition: transform 0.5s ease;
        transform: rotate( ${({$newItemFlag})=> $newItemFlag ?  '45deg' : '0deg'  }} );
        cursor: pointer;
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

    ${({ $newItemFlag }) => $newItemFlag ? (
            css`
            #addOrCloseIcon {
                transform: rotate(90deg);
            }

            .endIcon {
                transform: rotate(45deg) ;
            }

        `
    ) : (
            css`
                #addOrCloseIcon {
                    transform: rotate(45deg);
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
    background: ${({ $selected, $isChip }) => (($selected || $isChip) ? COLORS.primary : COLORS.white)};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    ${Fonts};
    font-weight: ${FONTS.WEIGHTS.medium};
    cursor: pointer;

    &:hover {
        background: ${({ $selected }) => $selected ? COLORS.rgba(COLORS.primary, 0.9) : COLORS.rgba(COLORS.primary, 0.6)};
    }

    &.notFound {
        cursor: default;
        background: ${COLORS.white};
        ${Center};
        

        &:hover {
            background: ${COLORS.white}
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
    background: ${COLORS.white100};
    border-radius: 4px;

    word-break: break-word;
`;
