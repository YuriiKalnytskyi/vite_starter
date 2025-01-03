import styled from 'styled-components';

import { CloseButton } from '@/module/common/component';
import { COLORS, FONTS, MEDIA, SPACES } from '@/theme';

export const Container = styled.div<{ width?: string; minWidth?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3.5rem;
  width: ${({ width }) => width ?? '21rem'};
  min-width: ${({ minWidth }) => minWidth ?? '21rem'};
  font-family: ${FONTS.FAMILIES.inter};
  border-radius: 12px;
  background: ${COLORS.white};
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

  position: relative;

  & button:nth-of-type(1) {
    margin-bottom: ${SPACES.s};
  }
`;

export const ContainerBottom = styled.div<{ styled?: any }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3.5rem;
  width: 21rem;
  min-width: 21rem;
  font-family: ${FONTS.FAMILIES.inter};
  border-radius: 12px;
  background: ${COLORS.white};
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

  position: relative;

  & button:nth-of-type(1) {
    margin-bottom: ${SPACES.s};
  }

  @media screen and (max-width: ${MEDIA.tablet}) {
    width: 100%;
    max-height: 90%;
    border-radius: ${SPACES.l} ${SPACES.l} 0 0;
    padding: 1.5rem;
  }

  ${({ styled }) => styled};
`;

export const CloseBtn = styled(CloseButton)`
  width: 1rem;

  position: absolute;
  top: 1rem;
  right: 1rem;
`;
