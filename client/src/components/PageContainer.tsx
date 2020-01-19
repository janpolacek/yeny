import * as React from 'react';
import { useScrollTop } from 'utils';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 64 + theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
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
