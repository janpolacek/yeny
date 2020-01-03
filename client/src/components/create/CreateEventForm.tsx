import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DateTimePicker } from '../common/DateTimePicker';
import { endOfTomorrow, startOfTomorrow } from 'date-fns';
import { ImageInput } from '../common/ImageInput';
import { PriceInput } from '../common/PriceInput';
import { LocationAutocomplete } from '../common/LocationAutocomplete';

export const CreateEventForm = () => {
    return (
        <Grid container spacing={2}>
            <AboutYou />
            <Event />
        </Grid>
    );
};

const AboutYou = () => {
    return (
        <>
            <Typography variant={'h5'}>About you</Typography>
            <Grid item sm={12}>
                <TextField required id="name" name="name" label="Your name" fullWidth autoComplete="name" />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    required
                    id="email"
                    type={'email'}
                    name="email"
                    label="Email address"
                    fullWidth
                    autoComplete="email"
                />
            </Grid>
        </>
    );
};

const Event = () => {
    return (
        <>
            <Typography variant={'h5'}>Event</Typography>
            <Grid item sm={12}>
                <TextField required id="title" name="title" label="Event title" fullWidth autoComplete="title" />
            </Grid>
            <Grid item sm={12}>
                <TextField required id="description" name="description" label="Description" multiline fullWidth />
            </Grid>
            <Grid item sm={6}>
                <DateTimePicker id="dateFrom" name={'dateFrom'} label="Date from" startDate={startOfTomorrow()} />
            </Grid>
            <Grid item sm={6}>
                <DateTimePicker id="dateTo" name={'dateTo'} label="Date to" startDate={endOfTomorrow()} />
            </Grid>
            <Grid item sm={12}>
                <PriceInput id="price" name="price" label="Price" placeholder={'Free'} />
            </Grid>
            <Grid item sm={6}>
                <ImageInput id={'image'} label={'Upload your banner'} name={'image'} />
            </Grid>
            <Grid item sm={12}>
                <LocationAutocomplete />
            </Grid>
        </>
    );
};
