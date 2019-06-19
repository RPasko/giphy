import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import UserReducer from './reducerUser';
import UpdateReduxReducer from './reducerUpdate';
import {reducer as formReducer} from 'redux-form';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    main: UserReducer,
    update: UpdateReduxReducer
});

export default rootReducer;