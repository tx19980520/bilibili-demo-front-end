import {ANIME_FETCH_FAILURE,ANIME_FETCH_START,ANIME_FETCH_SUCCESS} from "./actionType";//anime
import {GET_TOTAL_PAGE,GET_PAGE_SUCCESS,GET_PAGE_FAILURE} from "./actionType.js";//page
import {SEARCH_WORD_FAILURE,SEARCH_WORD_START,SEARCH_WORD_SUCCESS} from "./actionType.js";
//search
export const fetchAnimeStart=()=>({
    type:ANIME_FETCH_START
});
export const fetchAnimeSucess=(result)=>({
    type:ANIME_FETCH_SUCCESS,
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
};
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
};




const  fetchPageStart =()=>({
        type: GET_TOTAL_PAGE
    }
);
export const fetchPageSucess =(result)=>({
        type: GET_PAGE_SUCCESS,
        result
    }
);
const fetchPageFailure =(error)=>({
        type:GET_PAGE_FAILURE,
        error
    }
);
export const fetchPage=()=>{
    return (dispatch) => {
        const apiUrl = `/api/getPage`;

        dispatch(fetchPageStart());

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatch(fetchPageSucess(responseJson));
            }).catch((error) => {
                dispatch(fetchPageFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchPageFailure(error));
        })
    };
};

/**/
const searchInitStart=()=>(
    {
        type:SEARCH_WORD_START
    });
const searchInitSucess=(result)=>(
    {
        type: SEARCH_WORD_SUCCESS,
        result
    });
const searchInitFailure=(err)=>(
    {
        type: SEARCH_WORD_FAILURE,
        err
    });
export const searchInit=(word)=>{
    return (dispatch) => {
        const apiUrl = `/api/getSearchList?word=`+word;//这个地方我们改成了使用动态的后台取数据
        console.log("go");
        dispatch(searchInitStart());

        return fetch(apiUrl).then((response) => {
            response.json().then((responseJson) => {
                dispatch(searchInitSucess(responseJson));
            }).catch((error) => {
                dispatch(searchInitFailure(error));
            });
        }).catch((error) => {
            dispatch(searchInitFailure(error));
        })
    };
};
const searchWordStart=()=>({
    type:SEARCH_WORD_START
});
const searchWordFailure=(err)=>({
    type:SEARCH_WORD_FAILURE,
    err
});
const searchWordSuccess=(result)=>({
    type:SEARCH_WORD_SUCCESS,
    result
});
let searchId = 0;
export const searchWord=(word,page=1)=>{
    return (dispatch)=>{
        let containerUrl = `/api/getSearchList?word=${word}&page=${page}`;
        const seqId = ++ searchId;
        const dispatchIfValid=(action)=>{
            if(searchId === seqId)
            {
                return dispatch(action);
            }
        };
        dispatchIfValid(searchWordStart());
        fetch(containerUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatchIfValid(searchWordSuccess(responseJson))
            }).catch((err)=>{
                dispatchIfValid(searchWordFailure(err))
            });
        }).catch((err)=>{
            dispatchIfValid(searchWordFailure(err))
        });
    }
};