import styled from 'styled-components';

import { CloseButton } from '@/module/common/component';
import { COLORS, MEDIA, SPACES } from '@/theme';

export const Container = styled.div`
  width: 26.563rem;
  height: 100%;
  background-color: ${COLORS.white};

  overflow-y: scroll;

  padding: ${SPACES.xxxxxxls} ${SPACES.xxxxl};

  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${COLORS.green};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.green};
  }

  @media screen and (max-width: ${MEDIA.tablet}) {
    width: 22rem;
  }
`;

export const CloseBtn = styled(CloseButton)`
  margin: 0 0 0 auto;
  width: 1.5rem;
  height: 1.5rem;
`;
