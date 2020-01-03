import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    },
    button: {}
}));

export const ImageInput: React.FC<{ id: string; name: string; label: string }> = ({ id, name, label }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <input accept="image/*" className={classes.input} id={id} type="file" />
            <label htmlFor={id}>
                <Button component="span" className={classes.button} variant={'outlined'}>
                    {label}
                </Button>
            </label>
        </React.Fragment>
    );
};
