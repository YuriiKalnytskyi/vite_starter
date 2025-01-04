import styled from 'styled-components';

import { Fonts } from '@/module/common/styles';
import { COLORS, FONTS } from '@/theme';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${Fonts};
  max-width: 91.875rem;
  width: 100%;
  padding: 1rem 0;

  span {
    font-size: ${FONTS.SIZES.m};
    padding-left: 0.25rem;
    .separator {
      color: ${COLORS.black};
    }
    &:not(:last-of-type) {
      color: ${COLORS.rgba(COLORS.black, 0.6 )};
      cursor: pointer;
      &:hover {
          color: ${COLORS.black};
      }
    }
  }
`;
