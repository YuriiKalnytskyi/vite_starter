import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import { ICalendarProps } from '@/module/common/types';
import { COLORS, INDEX, MEDIA, SPACES } from '@/theme';

export const CalendarContainer = styled.div<Partial<ICalendarProps>>`
  position: relative;

  width: ${({ width }) => width ?? '100%'};

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};
  & > div {
    display: flex;
    align-items: baseline;
    gap: ${SPACES.xs};
  }
`;

export const Calendar = styled(DayPicker)`
  position: absolute;
  top: 2.5rem;
  right: -1rem;
  padding: 1rem;
  z-index: ${INDEX.absolute};
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
  background-color: ${COLORS.white};
  cursor: pointer;

  @media screen and (max-width: ${MEDIA.tablet_s}) {
    border: none;
    margin: 1rem auto;
  }
`;
