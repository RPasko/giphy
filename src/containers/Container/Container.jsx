import React, {Component, Fragment} from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from "../../components/Header/Header"
import Loader from '../../components/HelpersBlocks/Loader/Loader';
import Dashboard from '../../components/Dashboard/Dashboard';
import Collection from '../../components/Collection/Collection';


class Container extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        this.baseUrl = match.url[match.url.length - 1] === '/' ? match.url : match.url + '/';
        this.state = {
            loader: false
        };
    }

   render(){
        const {match, main} = this.props;
        const {loader} = this.state;

        return (
            <Fragment>
                {!localStorage.auth  ? <Redirect to={'/authentication'} push/> : null}

                {loader ? "" : <Header main={main}></Header>}
                <div >
                    {loader ?
                        <div className="loader-in-container-wrapper">
                            <Loader />
                        </div>
                        :
                        <Switch>
                            <Route exact path={`${this.baseUrl}`}  render={()=>(<Redirect to={`/main/dashboard`} push/>)}/>
                            <Route exact path={`${match.url}/dashboard`} component={Dashboard}/>
                            <Route exact path={`${match.url}/my-collection`} component={Collection}/>

                            <Route render={() =>  <Redirect to="/no-match" push /> } />
                        </Switch>
                    }
                </div>

            </Fragment>
        );
    }
}

Container.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};


function mapStateToProps(state) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);