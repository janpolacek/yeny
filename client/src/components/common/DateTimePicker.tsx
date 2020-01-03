import React, { useState } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DATE_TIME_FORMAT } from '../../utils';
import DateFnsUtils from '@date-io/date-fns';
import { startOfTomorrow } from 'date-fns';

export const DateTimePicker: React.FC<{ id: string; name: string; label: string; startDate?: any }> = ({
    id,
    name,
    label,
    startDate = startOfTomorrow()
}) => {
    const [selectedDate, handleDateChange] = useState(startDate);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                id={id}
                name={name}
                variant="inline"
                ampm={true}
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth={true}
                format={DATE_TIME_FORMAT}
            />
        </MuiPickersUtilsProvider>
    );
};
