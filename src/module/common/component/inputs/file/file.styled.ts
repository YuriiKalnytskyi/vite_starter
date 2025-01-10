import styled from 'styled-components';

import {  SPACES } from '@/theme';
import { motion } from 'framer-motion';
import { IMargin } from '@/module/common/types';
import { Center, Margin, textSizes } from '@/module/common/styles';
import { Trans } from 'react-i18next';


export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  height?:string
  dragging: boolean
}

export const Wrapper = styled(motion.div)<IWProps>`
    position: relative;
    width: 100%;
    max-width: ${({ width }) => width ?? '100%'};
    height: 4rem;


    background: ${({ dragging, theme }) => dragging ? theme.COLORS.rgba(theme.COLORS.primary, 0.6) : 'transparent'};
    border: 1px dashed ${({
                              dragging,
                              theme
                          }) => (dragging ? theme.COLORS.primary : theme.COLORS.rgba(theme.COLORS.primary, 0.6))};
    border-radius: 10px;


    input {
        position: absolute;
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;

        z-index: -1;
    }

    ${Center};
    ${Margin};
`;

export const TranslateText = styled(Trans)<{color: string}>`
    ${textSizes.l};
`
export const Span = styled.span`
    color: ${({theme})=>  theme.COLORS.primary};
    margin-right: ${SPACES.xxsm};


`

export const Avatar = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;


export const CloseButton = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  background: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.8)};
  padding: 0;
  margin: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 80%;
  border-radius: 5px;
  cursor: pointer;
`;
