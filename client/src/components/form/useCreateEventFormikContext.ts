import { useFormikContext } from 'formik';
import { CreateEventFormValues } from '_types/CreateEventForm';

export const useCreateEventFormikContext = () => useFormikContext<CreateEventFormValues>();
