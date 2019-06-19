import React from 'react';
import App from '../containers/App';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Container from '../containers/Container/Container';
import Authentication from '../containers/Authentication/Authentication';
import NoMatch from '../containers/NoMatch/NoMatch';

export default (
    <App>
        <Switch>
            <Route path='/' exact render={() => !!localStorage.token ? <Redirect to="/main"/> : <Redirect to="/authentication"/>}  />
            {/*<Route path='/' exact component={Landing}   />*/}
            <Route path='/main' component={Container} />
            <Route path='/authentication' component={Authentication}  />
            <Route component={NoMatch}/>
        </Switch>
    </App>
)