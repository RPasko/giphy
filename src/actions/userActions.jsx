import * as types from './constants.jsx';
import GphApiClient from 'giphy-js-sdk-core';

//authentication actions


export function searchGiphy(data, page) {
    return {
        type: types.SEARCH_GIPHY,
        client: GphApiClient("hapSiD9i0AKmdjreWqGB9m3YThNmQMV8"),
        payload: {
            request: {
                url: `/gifs/search?q=${data}&offset=${page}&api_key=hapSiD9i0AKmdjreWqGB9m3YThNmQMV8`,
                method: "get",
            }
        }
    };
}
export function searchGiphyNew(data) {
    return {
        type: types.SEARCH_GIPHY_NEW,
        client: GphApiClient("hapSiD9i0AKmdjreWqGB9m3YThNmQMV8"),
        payload: {
            request: {
                url: `/gifs/search?q=${data}&api_key=hapSiD9i0AKmdjreWqGB9m3YThNmQMV8`,
                method: "get",
            }
        }
    };
}

export function getOneGiphy(id) {
    return {
        type: types.GET_ONE_GIPHY,
        client:'default',
        payload: {
            request: {
                url: `/gifs/${id}?api_key=hapSiD9i0AKmdjreWqGB9m3YThNmQMV8`,
                method: "get",
            }
        }
    };
}
export function randomGiphy(page) {
    return {
        type: types.RANDOM_GIPHY,
        client: GphApiClient("hapSiD9i0AKmdjreWqGB9m3YThNmQMV8"),
        payload: {
            request: {
                url: `/gifs/trending?offset=${page}&api_key=hapSiD9i0AKmdjreWqGB9m3YThNmQMV8`,
                method: "get",
            }
        }
    };
}

export function postFile(data) {
    return {
        type: types.POST_FILE,
        client: GphApiClient("hapSiD9i0AKmdjreWqGB9m3YThNmQMV8"),
        payload: {
            request: {
                url: `http://upload.giphy.com/v1/gifs`,
                method: "post",
                data
            }
        }
    };
}


//
//
//
// export function deleteTerminal(id, data) {
//     return {
//         type: types.DELETE_TERMINAL,
//         payload: {
//             client: 'default',
//             request: {
//                 url: `/user-terminals/${id}/`,
//                 method: "delete",
//                 data
//             }
//         }
//     };
// }




