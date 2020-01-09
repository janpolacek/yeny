import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    footer: {
        height: '32px'
    }
}));
export const Footer = () => {
    const classes = useStyles();
    return <div className={classes.footer} />;
};
