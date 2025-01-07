import styled from 'styled-components';

import {  INDEX, SPACES } from '@/theme';

export const Wrapper = styled.div`
  position: relative;
`;
export const TitleWrapper = styled.div<{ isOpen: boolean }>`
    width: fit-content;

    .icon {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
`;
export const ChildrenWrapper = styled.div<{
  position?: 'left' | 'right' | 'center' | 'rightBlock';
  isOpen: boolean;
  minWidth?: string;
  padding?: string;
}>`
  background-color: ${ ({theme})=>  theme. white};
  position: absolute;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '8.2rem')};
  top: 2.75rem;
  z-index: ${INDEX.popup};
  ${({ position }) =>
    position === 'left'
      ? 'left: 0;'
      : position === 'right'
      ? 'right: 0;'
      : position === 'rightBlock'
      ? 'top: 0; left: 2.875rem;'
      : 'left: -75%; transform: translateX(-50%);'};
  border: 1px solid #f9f9f9;
  border-radius: ${SPACES.xxs};
  padding: ${({ padding }) => padding ?? `${SPACES.l} ${SPACES.l} ${SPACES.xxxxl}`};
  box-shadow: 0 12px 80px 0 rgba(0, 44, 109, 0.05);

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;

  .separator {
    width: 100%;
    margin: ${SPACES.xxs} 0;
    border-bottom: 1px solid ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.8)};
  }

  .item {
    padding: ${SPACES.xxsm} ${SPACES.xxs};

    &:hover {
      cursor: pointer;
      border-radius: ${SPACES.xxsm};
      background-color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.black, 0.8)};
    }
  }

  .padding {
    padding: ${SPACES.sm} ${SPACES.m};
  }
`;
