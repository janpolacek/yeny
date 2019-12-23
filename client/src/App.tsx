import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import client from './client';
import './App.css';
import { Homepage } from './pages/Homepage';
import { EventDetail } from './pages/EventDetail';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <main className="App">
                    <header className="App-header">Common Header</header>
                    <Switch>
                        <Route path={'/event/:url'} children={props => <EventDetail url={props.match?.params.url} />} />
                        <Route children={() => <Homepage />} />
                    </Switch>
                </main>
            </Router>
        </ApolloProvider>
    );
};

export default App;
