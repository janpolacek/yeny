import { Container, makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    }
}));

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let classes = useStyles();
    return (
        <Container component="main" fixed className={classes.container}>
            {children}
        </Container>
    );
};
