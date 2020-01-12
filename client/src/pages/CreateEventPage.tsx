import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { CreateEventForm } from 'components/form/CreateEventForm';
import { CreateEvent_createEvent } from '_generated/CreateEvent';
import { CreateEventSuccess } from 'components/form/CreateEventSuccess';

const useStyles = makeStyles(theme => ({
    root: {},
}));
export const CreateEventPage = () => {
    const classes = useStyles();
    const [createdEvent, setCreatedEvent] = useState<CreateEvent_createEvent>();
    return (
        <div className={classes.root}>
            {!createdEvent ? (
                <CreateEventForm
                    afterSubmit={event => {
                        setCreatedEvent(event);
                    }}
                />
            ) : (
                <CreateEventSuccess event={createdEvent} />
            )}
        </div>
    );
};
