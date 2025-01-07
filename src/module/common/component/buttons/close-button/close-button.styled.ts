import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: none;
  cursor: pointer;
  background: none;
  &:active {
    transform: scale(0.8);
  }
`;

export const CloseIcon = styled.img<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '1.25rem'};
  height: ${({ width }) => width || '1.25rem'};
  color: ${({ theme }) => theme.COLORS.primary};
`;

export const Styled = {
  Button,
  CloseIcon
};
