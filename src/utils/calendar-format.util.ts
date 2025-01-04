import { DaySelectionMode } from 'react-day-picker';

import { dateTransform } from '@/utils/time.util.ts';

export const CalendarFormatUtil = (data: any, mode: DaySelectionMode | undefined) => {
  let filterDate = '';

  if (data && mode === 'range') {
    const startDate = dateTransform(data.from, true);
    const endDate = dateTransform(data.to, true);

    filterDate = `${startDate} - ${endDate.includes('NaN') ? '' : endDate}`;
  }
  if (data && mode === 'single') {
    filterDate = dateTransform(data, true);
  }

  return filterDate;
};
