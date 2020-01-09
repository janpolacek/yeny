import { Container, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useScrollTop } from 'utils';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    }
}));

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let classes = useStyles();
    useScrollTop();

    return (
        <Container component="main" fixed maxWidth="lg" className={classes.container}>
            {children}
        </Container>
    );
};
