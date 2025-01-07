import styled from 'styled-components';

import { CloseButton } from '@/module/common/component';
import { MEDIA, SPACES } from '@/theme';

export const Container = styled.div`
  width: 26.563rem;
  height: 100%;
  background-color: ${ ({theme})=>  theme. white};

  overflow-y: scroll;

  padding: ${SPACES.xxxxxxls} ${SPACES.xxxxl};

    &::-webkit-scrollbar-track {
        background-color: ${ ({theme})=>  theme. primary};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${ ({theme})=>  theme.COLORS.rgba(theme.COLORS.primary, 0.8)};
        border-radius: 0.25rem;
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
