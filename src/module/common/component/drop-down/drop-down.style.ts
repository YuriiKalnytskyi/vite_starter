import styled from 'styled-components';
import { FONTS, INDEX, SPACES } from '@/theme';
import { Fonts, Margin } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { motion } from "framer-motion";

export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
}

export const Wrapper = styled.div<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};
    
    ${Margin};
`;

export const ItemContainer = styled(motion.ul).withConfig({
    shouldForwardProp: (prop) => !['position'].includes(prop),
})<{
  position?: 'left' | 'right';
  width?: string;
}>`
    background-color: ${({ theme }) => theme.COLORS.white};
    box-shadow: 0 2px 8px ${({ theme }) => theme.COLORS.rgba(theme.COLORS.black, 0.1)};
    border-radius: ${SPACES.xxsm};
    width: ${({ width }) => (width ? width : '100%')} !important;
    max-height: 14rem;

    position: absolute;
    z-index: ${INDEX.absolute};
    overflow-y: auto !important;
    overflow-x: hidden;

    ${({ position }) =>
            position === 'left'
                    ? 'left: 0;'
                    : 'right: 0'};
`;


export const Item = styled(motion.li)<{
  $selected: boolean;
}>`
    padding: ${SPACES.xs} ${SPACES.m};
    background: ${({
                       $selected,
                       theme
                   }) => ($selected ? theme.COLORS.primary : theme.COLORS.white)};
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
`;
