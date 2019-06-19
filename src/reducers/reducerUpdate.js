import * as types from "../actions/constants";

const INITIAL_STATE = {
    tab: 0,

};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.ACTIVE_TAB :
            return {...state, tab : action.data};

        default:
            return state;
    }
}