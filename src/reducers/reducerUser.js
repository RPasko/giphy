import * as types from "../actions/constants";

const INITIAL_STATE = {
    gifs: {},
    collection: [],
    is_search: false,
    is_trending: false,

    error: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.SEARCH_GIPHY_SUCCESS :
            let renderNewGifsSearch = state.gifs;
            if (!!state.gifs.data) {
                renderNewGifsSearch.data.push(...action.payload.data.data);
                renderNewGifsSearch.pagination = action.payload.data.pagination;
            }
            return {...state, gifs : state.is_trending ? action.payload.data : !!state.gifs.data ?  renderNewGifsSearch : action.payload.data, is_search: true, is_trending: false};
        case types.SEARCH_GIPHY_NEW_SUCCESS :
            return {...state, gifs :  action.payload.data, is_search: true, is_trending: false};
        case types.GET_ONE_GIPHY_SUCCESS :
            return {...state, collection : [...state.collection, action.payload.data]};
        case types.RANDOM_GIPHY_SUCCESS :
            let renderNewGifs = state.gifs;
            if (!!state.gifs.data) {
                renderNewGifs.data.push(...action.payload.data.data);
                renderNewGifs.pagination = action.payload.data.pagination;
            }
            return {...state, gifs : state.is_search ? action.payload.data : !!state.gifs.data ?  renderNewGifs : action.payload.data, is_search: false, is_trending: true};

        // case types.DELETE_GIF :
        //     return {...state, error : action.error.response.data};
        default:
            return state;
    }
}