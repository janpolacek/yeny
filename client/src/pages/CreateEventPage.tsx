import React, { useCallback, useState } from 'react';
import { CreateEventForm } from 'components/form/CreateEventForm';
import { CreateEvent_createEvent } from '_generated/CreateEvent';
import { CreateEventSuccess } from 'components/form/CreateEventSuccess';

export const CreateEventPage = () => {
    const [createdEvent, setCreatedEvent] = useState<CreateEvent_createEvent>();
    const afterSubmit = useCallback((event: CreateEvent_createEvent) => {
        setCreatedEvent(event);
    }, []);
    if (createdEvent) {
        return <CreateEventSuccess event={createdEvent} />;
    }
    return <CreateEventForm afterSubmit={afterSubmit} />;
};
