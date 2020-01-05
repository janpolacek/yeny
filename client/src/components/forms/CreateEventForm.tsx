import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { DateTimePicker } from './DateTimePicker';
import { endOfTomorrow, startOfTomorrow } from 'date-fns';
import { BannerUpload, uploadToImgur } from './BannerUpload';
import { PriceInput } from './PriceInput';
import { LocationAutoComplete } from './LocationAutoComplete';
import { Form, Formik } from 'formik';
import { CreateEventFormValues } from '../../_types/CreateEventForm';
import { useCreateEventFormikContext } from './useCreateEventFormikContext';
import { useMutation } from '@apollo/react-hooks';
import { CreateEvent, CreateEventVariables } from '../../_generated/CreateEvent';
import { CREATE_EVENT_MUTATION } from '../../_queries/CreateEvent';
import { generateEventData } from './fixtures/fakeEvent';

const DEV_ENV = true;
const initialValues = DEV_ENV
    ? generateEventData()
    : {
          organizer: {
              name: '',
              email: ''
          },
          image: null,
          title: '',
          location: {
              name: '',
              longitude: null,
              latitude: null
          },
          description: '',
          dateFrom: startOfTomorrow(),
          dateTo: endOfTomorrow(),
          password: '',
          price: null
      };

export const CreateEventForm = () => {
    const [submitData, data] = useMutation<CreateEvent, CreateEventVariables>(CREATE_EVENT_MUTATION);
    const handleSubmit = async (values: CreateEventFormValues) => {
        let image = null;
        if (values.image) {
            const { link } = await uploadToImgur(values.image);
            image = link;
        }
        await submitData({
            variables: {
                title: values.title,
                description: values.description,
                organizer: values.organizer,
                dateFrom: values.dateFrom,
                dateTo: values.dateTo,
                image: image,
                price: values.price,
                location: values.location,
                password: values.password
            }
        });
    };
    return (
        <Formik<CreateEventFormValues> initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <Grid container spacing={2}>
                    <EventOrganizer />
                    <EventDetails />
                    <Password />
                    <Submit />
                </Grid>
            </Form>
        </Formik>
    );
};

const EventOrganizer = () => {
    const { getFieldProps } = useCreateEventFormikContext();
    return (
        <>
            <FormTitle>Organizer info</FormTitle>
            <Grid item sm={12}>
                <TextField {...getFieldProps('organizer.name')} label="Your name" fullWidth required />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    {...getFieldProps('organizer.email')}
                    label="Email address"
                    type="email"
                    fullWidth
                    required
                />
            </Grid>
        </>
    );
};

const EventDetails = () => {
    const { getFieldProps } = useCreateEventFormikContext();

    return (
        <>
            <FormTitle>Event details</FormTitle>
            <Grid item sm={12}>
                <BannerUpload />
            </Grid>
            <Grid item sm={12}>
                <TextField {...getFieldProps('title')} label="Event title" fullWidth required />
            </Grid>
            <Grid item sm={12}>
                <LocationAutoComplete />
            </Grid>
            <Grid item sm={12}>
                <TextField {...getFieldProps('description')} label="Description" multiline fullWidth required />
            </Grid>
            <Grid container item>
                <Grid item sm={6}>
                    <DateTimePicker name="dateFrom" label="Date from" />
                </Grid>
                <Grid item sm={6}>
                    <DateTimePicker name="dateTo" label="Date to" />
                </Grid>
            </Grid>
            <Grid item sm={12}>
                <PriceInput {...getFieldProps('price')} label="Price" placeholder="Free" />
            </Grid>
        </>
    );
};

const Password = () => {
    const { getFieldProps } = useCreateEventFormikContext();
    return (
        <>
            <FormTitle>Password</FormTitle>
            <FormSubTitle>You will need it for editing of your event</FormSubTitle>
            <Grid item sm={12}>
                <TextField
                    {...getFieldProps('password')}
                    label="Password"
                    placeholder="Password"
                    type={'password'}
                    fullWidth
                />
            </Grid>
        </>
    );
};

const Submit = () => {
    const { submitForm } = useCreateEventFormikContext();
    return (
        <Button variant={'outlined'} onClick={submitForm}>
            Submit
        </Button>
    );
};

const FormTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid item sm={12}>
            <Typography variant={'h5'}>{children}</Typography>
        </Grid>
    );
};

const FormSubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid item sm={12}>
            <Typography variant={'subtitle1'}>{children}</Typography>
        </Grid>
    );
};
