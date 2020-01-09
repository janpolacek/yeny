import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export const FormTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid item xs={12}>
            <Typography variant={'h6'}>{children}</Typography>
        </Grid>
    );
};

export const FormSubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid item xs={12}>
            <Typography variant={'subtitle1'}>{children}</Typography>
        </Grid>
    );
};
