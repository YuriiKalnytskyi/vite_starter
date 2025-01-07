import { getIn, useFormikContext } from 'formik';
import { RefObject, useState } from 'react';
import { DateRange, DaySelectionMode } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import calendarIcon from '@/assets/icons/default/calendar.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import { useClickOutside, useIsMobile } from '@/module/common/hooks';
import { dateTransform, functionStub } from '@/utils';

import { Input } from '../index';
import * as Styled from './calendar.styled';
import { IInputDefault } from '@/module/common/types';
import { PopupLayout } from '@/module/common/layout';
import { MEDIA } from '@/theme';

export type DateSelection = DateRange | Date[] | Date | undefined;


export interface ICalendarProps extends IInputDefault {
  readOnly?: boolean;
  width?: string;
  height?: string;
  isIcon?: boolean;
  visibleOfMonths?: 1 | 2;
  noFormikValue?: {
    value: DateSelection;
    setFieldValue: (name: string, value: DateSelection) => void;
  };
  disabledDay?: Date;
  mode?: DaySelectionMode | undefined;
  isFlexLabel?: boolean;
  isSelectYearOrMounts?: { fromYear?: number; toYear?: number };
}

const CalendarFormatUtil = <T extends DateSelection>(
  data: T,
  mode: DaySelectionMode | undefined
): string => {
  let filterDate = '';

  if (data && mode === 'range' && 'from' in data && 'to' in data) {
    const startDate = dateTransform(data.from, true);
    const endDate = dateTransform(data.to, true);

    filterDate = `${startDate} - ${endDate.includes('NaN') ? '' : endDate}`;
  }

  if (data && mode === 'single' && data instanceof Date) {
    filterDate = dateTransform(data, true);
  }

  if (data && mode === 'multiple' && Array.isArray(data)) {
    filterDate = data.map((v) => dateTransform(v, true)).join(' - ');
  }

  return filterDate;
};


export const Calendar = ({
                           name,
                           label,
                           width,
                           placeholder,
                           height,
                           noFormikValue,
                           readOnly,
                           mode,
                           isSelectYearOrMounts,
                           disabledDay,
                           visibleOfMonths,
                           ...props
                         }: ICalendarProps) => {
  const { setFieldValue, value } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.setFieldValue
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setFieldValue, values } = useFormikContext();
      return {
        value: getIn(values, name),
        setFieldValue
      };
    }
  })();

  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsCalendarOpened(!isCalendarOpened);
  };

  const onSelect = (data: DateSelection | undefined) => {
    if (data && 'to' in data && data.to) {
      const to = new Date(data.to);
      to.setHours(23, 59, 59, 999);

      setFieldValue(name, { ...data, to });
    } else {
      setFieldValue(name, data);
    }
  };

  const selected: DateSelection =
    (mode === 'range' && (value as DateRange)) ||
    (mode === 'multiple' && (value as Date[])) ||
    (mode === 'single' && (value as Date)) ||
    undefined;

  const isMobile = useIsMobile();
  const isTabletS = useIsMobile(MEDIA.tablet_s);

  const { ref } = useClickOutside(() => {
    if (isCalendarOpened && !isMobile) {
      handleButtonClick();
    }
  });

  const CalendarCommon = () => (
    <Styled.Calendar
      mode={mode as any}
      onSelect={onSelect}
      selected={selected as DateSelection}
      numberOfMonths={isTabletS ? 1 : isMobile && visibleOfMonths === 1 ? 2 : visibleOfMonths ?? 2}
      {...(disabledDay ? { disabled: { after: disabledDay } } : {})}
      weekStartsOn={1}
      {...(isSelectYearOrMounts
        ? {
          captionLayout: 'dropdown-buttons',
          fromYear: isSelectYearOrMounts.fromYear ?? 2022,
          toYear: isSelectYearOrMounts.toYear ?? new Date().getFullYear()
        }
        : { captionLayout: 'dropdown' })}
    />
  );


  return (
    <Styled.Wrapper ref={ref as RefObject<HTMLDivElement>} width={width} {...props} className="calendarContainer">
      <Input
        noFormikValue={{
          value: CalendarFormatUtil(selected, mode),
          setFieldValue: functionStub
        }}
        name={name}
        label={label}
        placeholder={placeholder}
        width="100%"
        height={height}
        onClick={handleButtonClick}
        startIcon={{ icon: calendarIcon }}
        {...(value && {
          endIcon: {
            icon: closeIcon,
            height: '1rem',
            onClick: () => {
              onSelect(undefined);
            },
            cursor: 'pointer'
          }
        })}
        isDontChange
        readOnly={readOnly}
      />

      {isCalendarOpened && !isMobile && (
        <CalendarCommon />
      )}

      {/*{isCalendarOpened && isMobile && (*/}
      {/*<Drawer*/}
      {/*  onClose={handleButtonClick}*/}
      {/*  open={isCalendarOpened && isMobile}*/}
      {/*  slidePosition="bottom"*/}
      {/*  contentPosition="bottom"*/}
      {/*>*/}
        <PopupLayout height="50%" contentPosition="bottom" slidePosition='bottom' onClose={handleButtonClick} open={isCalendarOpened && isMobile}>
          <CalendarCommon />
        </PopupLayout>
      {/*</Drawer>*/}
      {/*)*/}
      {/*}*/}

    </Styled.Wrapper>
  );
};
