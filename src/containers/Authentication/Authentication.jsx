import React, {Component} from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import SignIn from '../../components/Authentication/SignIn/SignIn';
import NoMatch from '../../containers/NoMatch/NoMatch';

import './Authentication.scss';

class Authentication extends Component {

    render(){
        const { match } = this.props;

        return (
            <div className='authentication_container'>
                <div className="container">
                    <Switch>
                        <Route exact path={`${match.url}`}  render={() => <SignIn />} />
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Authentication;

