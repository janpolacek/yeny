import React, { useState } from 'react';
import { makeStyles, Step, StepLabel, Stepper } from '@material-ui/core';
import { CreateEventForm } from '../components/create/CreateEventForm';

const useStyles = makeStyles(theme => ({
    stepper: {
        padding: theme.spacing(2, 0)
    }
}));
export const CreateEventPage = () => {
    const classes = useStyles();
    const steps = ['Event details', 'Review', 'Confirmation'];
    const [activeStep, setActiveStep] = useState(0);
    return (
        <>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && <CreateEventForm />}
        </>
    );
};
