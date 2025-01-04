import { getIn, useFormikContext } from 'formik';
import { useState } from 'react';
import { DateRange, DaySelectionMode } from 'react-day-picker';
// overriding styles
import 'react-day-picker/dist/style.css';

import calendarIcon from '@/assets/icons/default/calendar.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import { useClickOutside } from '@/module/common/hooks';
// import '@/module/common/styles/react-day-picker.css';
import { CalendarFormatUtil, functionStub } from '@/utils';

import { Input } from '../index';
import * as Styled from './input-calendar.styled';
import { IInputDefault } from '@/module/common/types';

export type DateSelection = DateRange | Date[] | Date | undefined;


export interface ICalendarProps extends IInputDefault {
  name: string;
  width?: string;
  height?: string;
  isIcon?: boolean;
  numberOfMonths?: number;
  noFormikValue?: {
    value: DateSelection;
    setFieldValue: (name: string, value: DateSelection) => void;
  };
  disabledDay?: Date;
  mode?: DaySelectionMode | undefined;
  isFlexLabel?: boolean;
  isSelectYearOrMounts?: { fromYear?: number; toYear?: number };
}

export const InputCalendar = ({
                                name,
                                label,
                                width,
                                placeholder,
                                height,
                                noFormikValue,
                                mode,
                                isSelectYearOrMounts,
                                disabledDay,
                                numberOfMonths,
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

  const { ref } = useClickOutside(() => {
    if (isCalendarOpened) {
      handleButtonClick();
    }
  });

  return (
    <Styled.Wrapper ref={ref} width={width} {...props} className="calendarContainer">
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
      />

      {isCalendarOpened && (
        <Styled.Calendar
          mode={mode as any}
          onSelect={onSelect}
          selected={selected as DateSelection}
          numberOfMonths={numberOfMonths ?? 2}
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
      )}
    </Styled.Wrapper>
  );
};
