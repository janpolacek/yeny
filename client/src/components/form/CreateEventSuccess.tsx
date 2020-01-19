import { CreateEvent_createEvent } from '_generated/CreateEvent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import * as colors from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    },
    icon: {
        color: colors.green['A700'],
        fontSize: 70,
    },
    title: {
        color: colors.green['A700'],
    },
    center: { textAlign: 'center' },
    continueWrap: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    },
    continueButton: {
        marginTop: theme.spacing(4),
        borderColor: colors.green.A700,
        backgroundColor: colors.green.A700,
        margin: theme.spacing(2, 0),
        '&:hover': {
            borderColor: fade(colors.green.A700, 0.8),
            backgroundColor: fade(colors.green.A700, 0.8),
        },
    },
}));

export const CreateEventSuccess: React.FC<{ event: CreateEvent_createEvent }> = ({ event }) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.center}>
                <CheckCircleIcon className={classes.icon} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h5'} className={`${classes.center} ${classes.title}`}>
                    Your event has been successfully submited!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'body1'} className={classes.center}>
                    Now check your email <b>{event.organizer.email}</b> to confirm it's creation.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.continueWrap}>
                <Button
                    variant={'contained'}
                    size={'large'}
                    type={'button'}
                    className={classes.continueButton}
                    onClick={() => history.push('/')}
                    endIcon={<ChevronRightSharpIcon />}
                >
                    Continue
                </Button>
            </Grid>
        </Grid>
    );
};
