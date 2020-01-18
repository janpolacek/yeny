import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
