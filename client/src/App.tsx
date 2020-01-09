import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apolloClient from './apolloClient';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { Header } from './components/Header';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { PageContainer } from './components/PageContainer';
import { CreateEventPage } from './pages/CreateEventPage';
import { Footer } from './components/Footer';

const useStyles = makeStyles(theme => ({
    app: {
        background: theme.palette.common.white,
        minHeight: 'calc(100vh - 64px)'
    }
}));

const App = () => {
    const classes = useStyles();
    return (
        <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Router>
                <main className={classes.app}>
                    <Header />
                    <PageContainer>
                        <Switch>
                            <Route path={'/create-event'} children={() => <CreateEventPage />} />
                            <Route
                                path={'/event/:url'}
                                children={props => <EventDetailPage url={props.match?.params.url} />}
                            />
                            <Route children={() => <HomePage />} />
                        </Switch>
                    </PageContainer>
                    <Footer />
                </main>
            </Router>
        </ApolloProvider>
    );
};

export default App;
