import { InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';

export const PriceInput: React.FC<{ label: string; id: string; name: string; placeholder?: string }> = ({
    label,
    id,
    name,
    placeholder
}) => {
    return (
        <TextField
            label={label}
            id={id}
            name={name}
            fullWidth
            type={'number'}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: <InputAdornment position="end">EUR</InputAdornment>
            }}
        />
    );
};
