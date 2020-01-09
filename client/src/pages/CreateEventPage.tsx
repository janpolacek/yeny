import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { CreateEventForm } from '../components/form/CreateEventForm';
import { CreateEvent_createEvent } from '../_generated/CreateEvent';

const useStyles = makeStyles(theme => ({
    stepper: {
        padding: theme.spacing(2, 0)
    }
}));
export const CreateEventPage = () => {
    const classes = useStyles();
    const [createdEvent, setCreatedEvent] = useState<CreateEvent_createEvent>();
    const [activeStep, setActiveStep] = useState(0);
    return (
        <>
            {activeStep === 0 && (
                <CreateEventForm
                    afterSubmit={event => {
                        setActiveStep(1);
                        setCreatedEvent(event);
                    }}
                />
            )}
            {activeStep === 1 && createdEvent && (
                <div>
                    Event was succesfully created, confirm ..
                    <a href={`/event/${createdEvent.url}`}>{createdEvent.title}</a>
                </div>
            )}
        </>
    );
};
