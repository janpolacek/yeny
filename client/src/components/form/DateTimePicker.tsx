import React, { useCallback } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DATE_TIME_FORMAT } from '../../utils';
import DateFnsUtils from '@date-io/date-fns';
import { useCreateEventFormikContext } from './useCreateEventFormikContext';

export const DateTimePicker: React.FC<{ name: string; label: string }> = ({ name, label }) => {
    const { getFieldProps, setFieldValue } = useCreateEventFormikContext();

    const handleChange = useCallback(
        date => {
            setFieldValue(name, date);
        },
        [name, setFieldValue]
    );
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                name={getFieldProps(name).name}
                value={getFieldProps(name).value}
                onChange={handleChange}
                variant="dialog"
                inputVariant={'filled'}
                ampm={false}
                label={label}
                fullWidth={true}
                format={DATE_TIME_FORMAT}
            />
        </MuiPickersUtilsProvider>
    );
};
