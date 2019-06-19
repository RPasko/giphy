import * as types from './constants.jsx';

export function activeTab(data) {
    return {
        type: types.ACTIVE_TAB,
        data
    }
}
