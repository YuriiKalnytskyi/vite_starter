import { getIn, useFormikContext } from 'formik';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
// overriding styles
import 'react-day-picker/dist/style.css';

import calendarIcon from '@/assets/icons/calendar.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import { useClickOutside } from '@/module/common/hooks';
import { DateSelection, ICalendarProps } from '@/module/common/types';
import '@/module/common/styles/react-day-picker.css';
import { CalendarFormatUtil, functionStub } from '@/utils';

import { Input } from '../index';
import * as Styled from './input-calendar.styled';

export const InputCalendar = ({
    name,
    label,
    width,
    placeholder,
    height,
    isIcon = true,
    noFormikValue,
    mode,
    isFlexLabel = false,
    isSelectYearOrMounts,
    disabledDay,
    numberOfMonths,
    ...props
}: ICalendarProps) => {
    const { setFieldValue, value } = (() => {
        if (noFormikValue) {
            return {
                value: noFormikValue.value,
                setFieldValue: noFormikValue.onSetValue
            };
        } else {
            return {
                value: getIn(useFormikContext().values, name),
                setFieldValue: useFormikContext().setFieldValue
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
        <Styled.CalendarContainer ref={ref} width={width} {...props} className='calendarContainer'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {isFlexLabel && (
                    <p style={{ minWidth: 'fit-content', fontSize: '0.875rem' }}>{label}</p>
                )}
                <Input
                    noFormikValue={{
                        value: CalendarFormatUtil(selected, mode),
                        onSetValue: functionStub
                    }}
                    name={name}
                    label={isFlexLabel ? '' : label}
                    placeholder={placeholder}
                    width='100%'
                    height={height}
                    onClick={handleButtonClick}
                    {...(isIcon ? { startIcon: { icon: calendarIcon } } : {})}
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
            </div>

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
        </Styled.CalendarContainer>
    );
};
