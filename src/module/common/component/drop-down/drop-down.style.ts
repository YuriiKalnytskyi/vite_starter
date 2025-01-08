import styled from 'styled-components';

import {  INDEX, SPACES } from '@/theme';

export const VisibleBlock = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
`;

export const PopupBlock = (component:any) => styled(component)<{
  position?: 'left' | 'right' ;
  width?: string;
}>`
  position: absolute;
  z-index: ${INDEX.absolute};
  background-color: ${ ({theme})=>  theme.COLORS.white};
  box-shadow: 0 2px 8px ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.1)};
  border-radius: ${SPACES.xxsm};
  width: ${({ width }) => (width ? width : '100%')}!important;

  ${({ position }) =>
      position === 'left'
          ? 'left: 0;'
          : 'right: 0'};
`;
