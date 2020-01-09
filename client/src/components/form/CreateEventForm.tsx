import React, { useEffect } from 'react';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { DateTimePicker } from './DateTimePicker';
import { endOfTomorrow, startOfTomorrow } from 'date-fns';
import { BannerUpload, uploadToImgur } from './BannerUpload';
import { PriceInput } from './PriceInput';
import { Form, Formik } from 'formik';
import { CreateEventFormValues } from '../../_types/CreateEventForm';
import { useCreateEventFormikContext } from './useCreateEventFormikContext';
import { useMutation } from '@apollo/react-hooks';
import { CreateEvent, CreateEvent_createEvent, CreateEventVariables } from '../../_generated/CreateEvent';
import { CREATE_EVENT_MUTATION } from '../../_queries/CreateEvent';
import { generatedCreateEventData } from './fixtures/fakeEvent';
import { FormTitle } from './FormTitle';
import { Password } from './Password';
import { LocationField } from './location/LocationField';

const DEV_ENV = true;

const initialValues = DEV_ENV
    ? generatedCreateEventData()
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

export const CreateEventForm: React.FC<{ afterSubmit: (data: CreateEvent_createEvent) => void }> = ({
    afterSubmit
}) => {
    const [submitData, { data }] = useMutation<CreateEvent, CreateEventVariables>(CREATE_EVENT_MUTATION);
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

    useEffect(() => {
        if (data?.createEvent) {
            afterSubmit(data.createEvent);
        }
    }, [data?.createEvent]);

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
            <Grid item xs={12} sm={6}>
                <TextField {...getFieldProps('organizer.name')} label="Name / Organization" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...getFieldProps('organizer.email')}
                    label="E-mail address"
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
            <FormTitle>Event banner</FormTitle>
            <Grid item xs={12}>
                <BannerUpload />
            </Grid>
            <FormTitle>Event details</FormTitle>
            <Grid item xs={12}>
                <TextField {...getFieldProps('title')} label="Title" fullWidth required />
            </Grid>
            <LocationField />
            <Grid item xs={12}>
                <TextField
                    {...getFieldProps('description')}
                    label="Description"
                    multiline
                    variant={'outlined'}
                    rows={4}
                    fullWidth
                    required
                />
            </Grid>
            <Grid container item spacing={2}>
                <Grid item xs={12} sm={6}>
                    <DateTimePicker name="dateFrom" label="Date from" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DateTimePicker name="dateTo" label="Date to" />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <PriceInput {...getFieldProps('price')} label="Price" placeholder="Free" />
            </Grid>
        </>
    );
};

const Submit = () => {
    const { submitForm } = useCreateEventFormikContext();
    return (
        <Button variant={'outlined'} onClick={submitForm}>
            Create event
        </Button>
    );
};
