import { css } from 'styled-components';

import { IMargin, IPadding } from '@/module/common/types';

export const Margin = css<IMargin>`
  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};
`;

export const Padding = css<IPadding>`
  padding-left: ${({ pl }) => pl ?? '0'};
  padding-right: ${({ pr }) => pr ?? '0'};
  padding-bottom: ${({ pb }) => pb ?? '0'};
  padding-top: ${({ pt }) => pt ?? '0'};
`;
