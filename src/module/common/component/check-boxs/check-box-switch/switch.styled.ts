import styled from 'styled-components';

import { COLORS, INDEX, SPACES } from '@/theme';

export const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: ${SPACES.l};
`;
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 3.25rem;
  height: 2rem;
  border-radius: 100px;
  background: ${COLORS.white};
  border: 2px solid ${COLORS.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s, border 0.2s;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    height: 1.25rem;
    aspect-ratio: 1/1;

    margin: ${SPACES.xxs};
    background: ${COLORS.black};
    transition: background 0.2s;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  z-index: ${INDEX.default};
  border-radius: 15px;
  width: 3.25rem;
  height: 2rem;
  &:checked + ${CheckBoxLabel} {
    background: ${COLORS.primary};
    border: 2px solid ${COLORS.primary};
    &::after {
      content: '';
      display: block;
      background: ${COLORS.white};
      border-radius: 50%;
      height: 1.25rem;
      aspect-ratio: 1/1;
      margin-left: 1.5rem;
      transition: background 0.2s;
    }
  }
`;
