import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apolloClient from 'apolloClient';
import { HomePage } from 'pages/HomePage';
import { EventDetailPage } from 'pages/EventDetailPage';
import { Header } from 'components/Header';
import { PageContainer } from 'components/PageContainer';
import { CreateEventPage } from 'pages/CreateEventPage';
import { Footer } from 'components/Footer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
    app: {
        background: theme.palette.common.white,
        minHeight: 'calc(100vh - 64px)',
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Router>
                <main className={classes.app}>
                    <Header />
                    <Switch>
                        <Route
                            path={'/create-event'}
                            children={() => (
                                <PageContainer>
                                    <CreateEventPage />
                                </PageContainer>
                            )}
                        />
                        <Route
                            path={'/event/:url'}
                            children={props => (
                                <PageContainer>
                                    <EventDetailPage url={props.match?.params.url} />
                                </PageContainer>
                            )}
                        />
                        <Route
                            children={() => (
                                <PageContainer>
                                    <HomePage />
                                </PageContainer>
                            )}
                        />
                    </Switch>
                    <Footer />
                </main>
            </Router>
        </ApolloProvider>
    );
};

export default App;
