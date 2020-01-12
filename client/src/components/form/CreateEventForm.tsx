import React, { useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from 'components/form/DateTimePicker';
import { endOfTomorrow, startOfTomorrow } from 'date-fns';
import { BannerUpload, uploadToImgur } from 'components/form/BannerUpload';
import { PriceInput } from 'components/form/PriceInput';
import { Form, Formik } from 'formik';
import { CreateEventFormValues } from '_types/CreateEventForm';
import { useCreateEventFormikContext } from 'components/form/useCreateEventFormikContext';
import { useMutation } from '@apollo/react-hooks';
import { CreateEvent, CreateEvent_createEvent, CreateEventVariables } from '_generated/CreateEvent';
import { CREATE_EVENT_MUTATION } from '_queries/CreateEvent';
import { generatedCreateEventData } from 'components/form/fixtures/fakeEvent';
import { FormTitle } from 'components/form/FormTitle';
import { Password } from 'components/form/Password';
import { LocationField } from 'components/form/location/LocationField';
import { Prompt } from 'react-router-dom';

const DEV_ENV = true;

const initialValues = DEV_ENV
    ? generatedCreateEventData()
    : {
          organizer: {
              name: '',
              email: '',
          },
          image: null,
          title: '',
          location: {
              name: '',
              longitude: null,
              latitude: null,
          },
          description: '',
          dateFrom: startOfTomorrow(),
          dateTo: endOfTomorrow(),
          password: '',
          price: null,
      };

export const CreateEventForm: React.FC<{ afterSubmit: (data: CreateEvent_createEvent) => void }> = ({
    afterSubmit,
}) => {
    const [submitData, { data }] = useMutation<CreateEvent, CreateEventVariables>(CREATE_EVENT_MUTATION, {});
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
                password: values.password,
            },
        });
    };

    useEffect(() => {
        if (data?.createEvent) {
            afterSubmit(data.createEvent);
        }
    }, [data, afterSubmit]);

    return (
        <Formik<CreateEventFormValues> initialValues={initialValues} onSubmit={handleSubmit}>
            <FormikContent />
        </Formik>
    );
};

const FormikContent = () => {
    const { dirty } = useCreateEventFormikContext();

    return (
        <>
            <Prompt when={dirty} message="Are you sure you want to leave?" />
            <Form>
                <Grid container spacing={2}>
                    <EventOrganizer />
                    <EventDetails />
                    <Password />
                    <Submit />
                </Grid>
            </Form>
        </>
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
        <Button type={'submit'} variant={'outlined'} onClick={submitForm}>
            Create event
        </Button>
    );
};
