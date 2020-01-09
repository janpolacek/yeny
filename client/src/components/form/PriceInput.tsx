import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    price: {}
}));
export const PriceInput: React.FC<{ label: string; name: string; placeholder?: string }> = ({
    label,
    name,
    placeholder
}) => {
    const classes = useStyles();
    return (
        <TextField
            label={label}
            name={name}
            className={classes.price}
            fullWidth
            type="number"
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            inputProps={{ min: 0 }}
        />
    );
};
