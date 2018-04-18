import {ANIME_FETCH_FAILURE,ANIME_FETCH_START,ANIME_FETCH_SUCESS} from "./actionType";
export const fetchAnimeStart=()=>({
    type:ANIME_FETCH_START
});
export const fetchAnimeSucess=(result)=>({
    type:ANIME_FETCH_SUCESS,
    result
});
export const  fetchAnimeFailure=(error)=>({
    type:ANIME_FETCH_FAILURE,
    error
});

export const fetchAnime = () => {
    return (dispatch) => {
        const apiUrl = `/api/getAnime`;

        dispatch(fetchAnimeStart());

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatch(fetchAnimeSucess(responseJson));
            }).catch((error) => {
                dispatch(fetchAnimeFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchAnimeFailure(error));
        })
    };
}
export const fetchAnimebyPage = (page) => {
    return (dispatch) => {
        const apiUrl = `/api/getAnime?`+`page=`+page;
        console.log(apiUrl);
        dispatch(fetchAnimeStart());

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatch(fetchAnimeSucess(responseJson));
            }).catch((error) => {
                dispatch(fetchAnimeFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchAnimeFailure(error));
        })
    };
}