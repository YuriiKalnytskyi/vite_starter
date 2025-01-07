import styled from 'styled-components';

import {  INDEX, SPACES } from '@/theme';

export const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const Children = (component:any) => styled(component)`
  background: red;
  position: absolute;
  z-index: ${INDEX.absolute};

`;

export const TitleWrapper = styled.div<{ $isOpen: boolean }>`
    width: fit-content;
    cursor: pointer;
    .icon {
        transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
`;
export const ChildrenWrapper = styled.div<{
  position?: 'left' | 'right' ;
  $isOpen: boolean;
  width?: string;
  padding?: string;
}>`
  background-color: ${ ({theme})=>  theme.COLORS.white};
  width: ${({ width }) => (width ? width : '100%')};
  ${({ position }) =>
      position === 'left'
          ? 'left: 0;'
          : 'right: 0'};
  border: 1px solid #f9f9f9;
  border-radius: ${SPACES.xxs};
  padding: ${({ padding }) => padding ?? `${SPACES.l} ${SPACES.l} ${SPACES.xxxxl}`};
  box-shadow: 0 2px 8px ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.1)};

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  .padding {
    padding: ${SPACES.sm} ${SPACES.m};
  }
`;
