import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Calendar } from '../_generated/Calendar';
import { CALENDAR } from '../_queries/Calendar';
import { Calendar as CalendarPicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format, isSameDay } from 'date-fns';

type DaysMap = Record<string, boolean>;
export const EventsDayCalendar: React.FC<{ onChange: (date: Date | null) => void }> = ({ onChange }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const { loading, error, data } = useQuery<Calendar>(CALENDAR);
    const days = data?.calendar?.days ?? [];
    const parsedDates = days.length
        ? days.reduce<DaysMap>((acc, day) => {
              acc[day] = true;
              return acc;
          }, {})
        : {};

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CalendarPicker
                date={selectedDate ?? new Date()}
                onChange={date => {
                    let newDate: null | Date;
                    if (!date || (selectedDate && isSameDay(date, selectedDate))) {
                        newDate = null;
                    } else {
                        newDate = date;
                    }
                    setSelectedDate(newDate);
                    onChange(newDate);
                }}
                renderDay={(day, _, dayInCurrentMonth, dayComponent) => {
                    const isSelected = day && selectedDate ? isSameDay(day, selectedDate) : false;
                    const isDisabled = day ? !parsedDates[format(day, 'yyyy-MM-dd')] : true;
                    return React.cloneElement(dayComponent, {
                        selected: isSelected,
                        disabled: isDisabled,
                    });
                }}
            />
        </MuiPickersUtilsProvider>
    );
};
